const mongoose = require('mongoose');
const { Schema } = mongoose;

var recordSchema = new Schema({
    title: String,
    description: String,
    date: String,
    time: String,
    user: {type:Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('record', recordSchema, 'record');