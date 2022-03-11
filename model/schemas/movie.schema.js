var mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  // no "_id" field since it is automatically generated
  title: String,
  year: Number,
  ids: [
    {
      trakt: Number,
      slug: String,
      imdb: String,
      tmdb: Number,
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
