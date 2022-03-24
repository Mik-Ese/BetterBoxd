var mongoose = require('mongoose');
const { Schema } = mongoose;

const showSchema = new Schema(
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
        ]
    },
    { collection: 'shows' }
);

module.exports = mongoose.model('Show', showSchema, 'shows');
