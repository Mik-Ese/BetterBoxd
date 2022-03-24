const mongoose = require('mongoose');
const connection = require('../util/database');

const user = new mongoose.Schema({
    // no "_id" field since it is automatically generated
    username: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = connection.model('User', user);
module.exports = User;
