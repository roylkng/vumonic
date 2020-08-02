'use strict';
const Schema = require('../config/config').Schema
const mongoose = require('../config/config').mongoose

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default:false},
	created_at: { type: Date, default: Date.now },
});

const Users = mongoose.model('users', userSchema, 'users');
module.exports = Users;
