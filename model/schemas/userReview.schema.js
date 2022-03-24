const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
const { Schema } = mongoose;

const userReviewSchema = new Schema({
    user_id: String,
    trakt_id: Number,
    review_rating: Number,
    review_description: String,
    review_likes: Number,
    review_no_of_comments: Number,
    review_created_at: Date
}, { collection: 'reviews'});

module.exports = mongoose.model('reviews', userReviewSchema);