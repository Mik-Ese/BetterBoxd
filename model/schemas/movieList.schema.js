var mongoose = require('mongoose');
const { Schema } = mongoose;

const movieListSchema = new Schema({
    // no "_id" field since it is automatically generated
    title: String,
    userId: String,
    movieIds: [
        {
            trakt: Number,
            slug: String,
            imdb: String,
            tmdb: Number
        }
    ]
}, { collection: 'movie_lists' });

module.exports = mongoose.model('MovieList', movieListSchema);
