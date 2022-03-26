const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const connection = require('../util/database');

const user = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

user.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = connection.model('User', user);
module.exports = User;
