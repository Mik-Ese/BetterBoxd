var mongoose = require('mongoose');
const { Schema } = mongoose;

const showExtendedSchema = new Schema(
    {
        // no "_id" field since it is automatically generated
        title: String,
        year: Number,
        ids: [
            {
                trakt: Number,
                slug: String,
                tvdb: Number,
                imdb: String,
                tmdb: Number,
                tvrage: String
            }
        ],
        overview: String,
        first_aired: String,
        airs: [
            {
                day: String,
                time: String,
                timezone: String
            }
        ],
        runtime: Number,
        certification: String,
        network: String,
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
        aired_episodes: Number
    },
    { collection: 'showsExtended' }
);

module.exports = mongoose.model(
    'ShowExtended',
    showExtendedSchema,
    'showsExtended'
);
