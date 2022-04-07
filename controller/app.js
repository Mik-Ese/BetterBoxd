const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const APIRoutes = require('./api/APIroutes');
const APIqueries = require('./api/APIqueries');
const fetchData = require('./fetchData');
const cors = require('cors');

require('dotenv').config({ path: '../.env' });

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
    origin: process.env.CORS_URL || '*',
}));
app.use('/api/', APIRoutes);

const PORT = process.env.EXPRESS_PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
