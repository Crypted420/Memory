const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    token: {type: String },
    expiresAt: {type: Date, default: Date.now, expires: 1200}
}, {timestamps: true});

module.exports = mongoose.model('token', tokenSchema, 'token');