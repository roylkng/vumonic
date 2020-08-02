'use strict';
const Schema = require('../config/config').Schema
const mongoose = require('../config/config').mongoose
const Topic = require("./topic")

const articleSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Topic
    },
    tags: [String],
    isFeatured: { type: Boolean, required: true},
    count: { type: Number, default: 0},
    imageUrl: { type: String, required: true},
	created_at: { type: Date, default: Date.now },
});

const Articles = mongoose.model('articles', articleSchema, 'articles');
module.exports = Articles;
