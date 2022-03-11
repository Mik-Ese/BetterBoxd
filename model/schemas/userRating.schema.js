var mongoose = require('mongoose');
const { Schema } = mongoose;

const userRatingSchema = new Schema({
    user_id: String,
    trakt_id: Number,
    rating: Number
});

module.exports = mongoose.model('MediaRating', ratingSchema);
