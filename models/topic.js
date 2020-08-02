'use strict';
const Schema = require('../config/config').Schema
const mongoose = require('../config/config').mongoose

const topicSchema = new Schema({
    name: { type: String, required: true, unique: true},
    imageUrl: { type: String, required: true},
	created_at: { type: Date, default: Date.now },
});

const Topics = mongoose.model('topics', topicSchema, 'topics');
module.exports = Topics;
