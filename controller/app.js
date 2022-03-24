const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const APIRoutes = require('./api/APIroutes');
const credentials = require('../credentials');
const APIqueries = require('./api/APIqueries');
const fetchData = require('./fetchData');

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/', APIRoutes);

app.post('/test', (req, res) => {
    console.log('React connected!');
    res.redirect('/');
});

// no caching (use if you haven't setup redis)
// app.post('/weekly', async (req, res) => {
//     console.log('Recommnded shows [weekly]');
//     let data;
//     const APIquery = APIqueries.genRecShowsQuery('weekly');
//     try {
//         const response = await axios.get(APIquery, config);
//         console.log(response.data);
//     } catch (error) {
//         console.log('Error during GET request:');
//         console.log(APIquery);
//         console.log(`${error.response.status} - ${error.response.statusText}`);
//     }
//     res.redirect('/');
// });

app.post('/weekly', async (req, res) => {
    try {
        const data = await fetchData.getRecommendShows('weekly');
        console.log(data);
    } catch (error) {
        console.log('Error during GET request:');
        console.log(error);
    }
    res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
