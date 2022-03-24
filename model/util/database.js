const mongoose = require('mongoose');
const credentials = require('../../credentials');

const connection = mongoose.createConnection(credentials.mongo_uri);

module.exports = connection;
