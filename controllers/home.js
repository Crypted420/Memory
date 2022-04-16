var express = require('express');
var userModel  = require('../models/user');
var recordModel  = require('../models/record');
var async = require('async');
var mongoose = require('mongoose');
var { body, validationResult } = require('express-validator');
exports.home = (req, res)=>{
    if(!req.isAuthenticated()){
        res.redirect("/user/login");
        
    };
    async.parallel({
        user: function(callback){
            userModel.findById(req.user._id).exec(callback)
        },
        record: function(callback){
            recordModel.find({user: req.user._id}).exec(callback)
        }
    },
        function(err, results){
            if(err){throw err}
            res.render('index', {title: results.user.username + ' Record', user:results.user, records:results.record})
        })
}

exports.user_profile = (req, res)=>{
    if(!req.isAuthenticated()){
        res.redirect('/user/login')
    };
    async.parallel({
        user: function(callback){
            userModel.findById(req.user._id).exec(callback);
        },
        records: function(callback){
            recordModel.countDocuments({'user': req.user._id}).exec(callback)
        }
    },
        function(err, results){
            const messages = req.flash();
            if(err){throw err};
             res.render('profile', {title: 'Your profile', user: results.user, messages, record_count: results.records});
        }
    )
}

exports.user_profile_post = [
    body('gender').trim().escape(),
    body('record_title').trim().escape(),

    (req, res, next) =>  {
        if(!req.isAuthenticated()){
            res.redirect('/home/profile')
        }
        var error = validationResult(req);
        if(error.isEmpty()){
        var body = req.body;
        const user = new userModel({
            _id: req.user._id,
            gender: body.gender,
            record_title:body.record
        });
        userModel.findOne({email:req.body.email_edit}).exec(function(err, result){
            if(err){throw err}
            userModel.findByIdAndUpdate(req.user._id, user, (err)=>{
                if(err){return next(err)}
                res.redirect('/home/profile');
            })
        });
    }
    else{
        res.redirect('/home/profile')
    }
}
];

exports.record_post = (req, res, next)=>{
    body('title').trim().escape();
    body('description').trim().escape();
    var errors = validationResult(req);
    if(!req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        if(errors.isEmpty()){
        const record = new recordModel({
            title: req.body.title,
            description: req.body.detail,
            date: req.body.date,
            time: req.body.time,
            user: req.user._id
        })
        record.save((err)=>{
            if(err){
                throw err;
            }
            res.redirect('/home');
        })
    }   
        else{
            res.redirect('/home');
        }
    }
}

exports.record_delete = (req, res, next) => {
        recordModel.findByIdAndDelete(req.body.record_name).exec(function(err){
            if(err){throw err}
            res.redirect('/home')
        })

}