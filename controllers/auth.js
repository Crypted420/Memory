const express = require('express');
const User = require('../models/user');
const Token = require('../models/token');
var salt = require('../utils/auth');
const passport = require('passport');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto')
require('dotenv').config();
exports.login = (req, res) => {
    const messages = req.flash();
    res.render('auth', { title: 'Login', messages })
};
exports.login_post =
    passport.authenticate('local', {
        failureRedirect: '/user/login', successRedirect: '/home',
        failureFlash: 'The username and password is not found!'
    });

exports.logout = (req, res) => {
    req.session.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('/user/login')

    });
}
exports.create = (req, res) => {
    const messages = req.flash();
    res.render('create', { title: 'Memory - Create an account', messages });
}
exports.create_post = [
    body('username').trim().escape(),
    body('email').trim().escape(),
    body('password').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            User.findOne({ 'username': req.body.username }, (err, found_user) => {
                if (err) {
                    throw err;
                }
                if (found_user) {
                    req.flash('unique_username', 'Username already exist!')
                    res.redirect('/user/create-account');
                }
                else {
                    User.findOne({ 'email': req.body.email }, (err, found_email) => {
                        if (err) { throw err };
                        if (found_email) {
                            req.flash('unique_email', 'Email already exist!')
                            res.redirect('/user/create-account');
                        }
                        else {
                            var users = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: salt.hashPassword(req.body.password),
                                gender: 'null',
                                record_title: 'Memory Title'
                            });

                            users.save((err) => {
                                if (err) {
                                    throw err;
                                }
                                req.flash('success', 'Account created successfully!');
                                res.redirect('/user/login');
                            })
                        }
                    })

                }

            })

        }
        else {
            res.redirect('/user/create')
        }
    }
];
exports.forgot_password = (req, res) => {
    const messages = req.flash();
    res.render('forgot', { title: 'forgot password', messages })
};

exports.forgot_password_post = (req, res) => {
    const mailTransport = (email, userId, token) => {
        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const link = 'https://memoryit.herokuapp.com/user/reset-password/' + token + '/' + userId;
        const mailOptions = {
            from: 'Memory <memory.customercare@gmail.com>',
            to: email,
            subject: 'Reset Your Memory Password',
            html: `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Open+Sans:wght@300;400;500&display=swap"
                    rel="stylesheet">
            </head>
            <body style="font-family: 'Open Sans', sans-serif;">
            <h2 style="text-align:center" >
            <img src="https://www.dropbox.com/s/ql3vi9h3tltakce/bitmap.png?raw=1" width="100px" height="100px" alt="Memory" srcset="">
            </h2>
                <table border="0"
                    style="min-width: 50%; max-width: 90%; color: gray; margin:0 auto; box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;">
                    <tr>
                        <td style="text-align: left; padding:20px 40px 20px 40px; font-size: 0.9rem;">
                            <h2>Hey!</h2>
                            <p>
                                It looks like someone submitted a request to reset your <span style="font-family:'Mochiy Pop P One', sans-serif">Memory</span> pasword.
                            </p>
                            <p>
                                Follow the link below to reset your password and get back into your account~
                            </p>
                            <p>Click the button below to reset it.</p>
                            <button
                                style="font-family:'Open Sans', sans-serif; font-weight: 700; padding:10px 20px; border: 0px; background-color: dodgerblue; color: white; border-radius: 3px;"><a
                                    href="${link}" style="text-decoration: none; color: white">Reset my password</a></button>
                            <p>click <a href="${link}" style="text-decoration: none; color: #1877f2">here</a> if the button is not working.
                            </p>
                            <a href="mailto:shedrack_samaila@yahoo.com" style="text-decoration: none; color: #1877f2">Need help?</a>
                        </td>
                    </tr>
                </table>
            </body>

            </html>`
        }

        mailTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
                const messages = req.flash('smtp_error', 'An error occured. Please try again later');
                res.redirect('/user/forgot-password') ;
            }
            else {
                const messages = req.flash('sent', 'Instruction sent.!');
                res.redirect('/user/forgot-password');
            }
        })
    }
    User.findOne({ email: req.body.email }, (err, user_detail) => {
        if (err) { throw err }
        if (user_detail == null) {
            const messages = req.flash('nullEmail', 'Email not registered');
            res.redirect('/user/forgot-password');
        }
        else {
            Token.findOne({ userId: user_detail._id }, (err, result) => {
                if (err) { return next(err) }
                if (result == null) {
                    var newToken = crypto.randomBytes(20).toString('hex');
                    var token = new Token({
                        userId: user_detail._id,
                        token: salt.hashPassword(newToken),
                    });
                    token.save((err) => {
                        if (err) { throw err }
                        Token.findOne({ userId: user_detail._id }, (err, result) => {
                            if (err) { throw err };
                            return mailTransport(user_detail.email, result.userId, result.token);
                        });
                    });
                }
                else {
                    return mailTransport(user_detail.email, result.userId, result.token);
                }
            })
        }
    })
}

exports.reset_password = (req, res) => {
    Token.findOne({ token: req.params.token }, (err, result) => {
        if (err) { throw err }
        if (result == null) {
            res.sendStatus(401)
        }
        res.render('reset', { title: 'Reset password' });

    })
}

exports.reset_password_post = [
    body('new_password').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const password = salt.hashPassword(req.body.new_password);
            User.findOneAndUpdate({ _id: req.params.user }, { password: password }, (err) => {
                if (err) { return next(err) }
                Token.findOneAndRemove({ token: req.params.token }, (err) => {
                    if (err) { throw err }
                    const messages = req.flash('reset', 'Password reset was a success');
                    res.redirect('/');

                })
            })
        }
        else {
            return next();
        }
    }
]
