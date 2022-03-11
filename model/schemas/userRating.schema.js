var mongoose = require("mongoose");
const { Schema } = mongoose;

const userRatingSchema = new Schema({
  user_id: Number,
  trakt_id: Number,
  rating: Number,
});

module.exports = mongoose.model("MediaRating", ratingSchema);
