const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, minLength:3, required:true},
    email: {type: String},
    record_title: {type:String, maxLength: 12},
    gender: {type:String, maxLength:6},
    password: {type:String, minLength:6},
    creation_date: {type:Date, default: Date.now},
    token: {type:Schema.Types.ObjectId, ref:'token', default:null }
})

module.exports = mongoose.model('user', userSchema, 'user');