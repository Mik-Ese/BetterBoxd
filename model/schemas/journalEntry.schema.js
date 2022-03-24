var mongoose = require('mongoose');
const { Schema } = mongoose;

const journalEntrySchema = new Schema({
    // no "_id" field since it is automatically generated
    movieIds: [
        {
            trakt: Number,
            slug: String,
            imdb: String,
            tmdb: Number
        }
    ],
    userId: String,
    rating: Number, //Rating that the user gave to the movie
    content: String //Content of the journal entry
}, { collection: 'journal_entries'});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
