const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');

const credentials = require('./credentials');
const APIqueries = require('./APIqueries');

const config = {
    headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
        'Content-type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': credentials.clientId
    }
};

// redis
// const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
const redisClient = redis.createClient({
    // ip address and port of redis-server
    host: '172.27.210.32',
    port: 6379
});

(async () => {
    redisClient.on('ready', function () {
        console.log('Redis Client ready');
    });

    redisClient.on('error', (err) => console.log('Redis CLient Error', err));

    await redisClient.connect();

    // await redisClient.set('key', 'value');
    // const value = await redisClient.get('key');

    // console.log(`value should be value and is ${value}`);
})();

app.post('/test', (req, res) => {
    console.log('React connected!');
    res.redirect('/');
});

// no caching
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
    console.log('Recommnded shows [weekly]');
    // let data;
    const APIquery = APIqueries.genRecShowsQuery('weekly');
    try {
        const key = 'recShowsWeekly'; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            // return res.json(JSON.parse(cacheResponse));
            console.log('returning cached response');
            console.log(JSON.parse(cacheResponse));
            return;
        } else {
            // making API request
            const response = await axios.get(APIquery, config);

            // saving to cache
            redisClient.set(key, JSON.stringify(response.data), {
                EX: 604800 // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            // return res.json(response.data);
            console.log('returning API response');
            console.log(response.data);
        }
    } catch (error) {
        console.log('Error during GET request:');
        console.log(APIquery);
        console.log(error);
    }
    res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
