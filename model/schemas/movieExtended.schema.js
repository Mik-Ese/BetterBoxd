var mongoose = require('mongoose');
const { Schema } = mongoose;

const movieExtendedSchema = new Schema(
    {
        // no "_id" field since it is automatically generated
        title: String,
        year: Number,
        ids: [
            {
                trakt: Number,
                slug: String,
                imdb: String,
                tmdb: Number
            }
        ],
        tagline: String,
        overview: String,
        released: String,
        runtime: Number,
        country: String,
        trailer: String,
        homepage: String,
        status: String,
        rating: Number,
        votes: Number,
        comment_count: Number,
        updated_at: String,
        language: String,
        available_translations: [String],
        genres: [String],
        certification: String
    },
    { collection: 'moviesExtended' }
);

module.exports = mongoose.model(
    'MovieExtended',
    movieExtendedSchema,
    'moviesExtended'
);
