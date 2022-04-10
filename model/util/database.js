const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connection = mongoose.createConnection(process.env.MONGO_URI);

module.exports = connection;
