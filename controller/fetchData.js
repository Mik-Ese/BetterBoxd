const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const credentials = require('./credentials');
const APIqueries = require('./api/APIqueries');

const redisClient = redis.createClient('localhost', 6379);
// host: '172.27.210.32'

const config = {
        headers: {
            Authorization: `Bearer ${credentials.accessToken}`,
            'Content-type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': credentials.clientId
        }
    };
(async () => {
    redisClient.on('ready', function () {
        console.log('Redis Client ready');
    });

    redisClient.on('error', (err) => console.log('Redis CLient Error', err));

    await redisClient.connect();

})();

async function getRecommendShows(period){
    if((period !== 'weekly') && (period !== 'monthly') && (period !== 'daily') && (period !== 'yearly') && (period !== 'all')){
        return 'invalid parameter';
    }
    let expiry = 0;
    if(period.toLowerCase() === 'weekly'){
        expiry = 604800;
    }
    if(period.toLowerCase() === 'monthly'){
        expiry = 2592000;
    }  
    const APIquery = APIqueries.genRecShowsQuery(period);
    try {
        const key = `recShows${period.toLowerCase()}`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse)
        } else {
            // making API request
            const response = await axios.get(APIquery, config);
            // saving to cache
            redisClient.set(key, JSON.stringify(response.data), {
                EX: expiry // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            return response.data
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function getMovieData(movie_id){

}
async function getMovieData(movie_id){

}
module.exports = {
    getRecommendShows
}