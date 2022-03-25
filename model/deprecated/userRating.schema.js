const mongoose = require('mongoose');
const connection = require('../util/database');
const User = require('../schemas/user.schema');

const userRating = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    trakt_id: { type: Number, required: true },
    rating: { type: Number, required: true }
});

const UserRating = connection.model('UserRating', userRating);
module.exports = UserRating;
