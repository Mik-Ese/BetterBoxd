const mongoose = require('mongoose');
const connection = require('../util/database');
const User = require('./user.schema');

const journalEntry = new mongoose.Schema({
    // no "_id" field since it is automatically generated
    user_id: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    trakt_id: { type: Number, required: true },
    // rating: { type: Number, required: true },
    description: { type: String, required: true },
    no_likes: { type: Number, default: 0 },
    no_comments: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const JournalEntry = connection.model('JournalEntry', journalEntry);
module.exports = JournalEntry;
