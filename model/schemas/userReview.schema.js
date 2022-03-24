const mongoose = require('mongoose');
const connection = require('../util/database');
const User = require('./user.schema');

const userReview = new mongoose.Schema({
    // no "_id" field since it is automatically generated
    user_id: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    trakt_id: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    no_likes: { type: Number, required: true },
    no_comments: { type: Number, required: true },
    created_at: { type: Date, required: true }
});

const UserReview = connection.model('UserReview', userReview);
module.exports = UserReview;
