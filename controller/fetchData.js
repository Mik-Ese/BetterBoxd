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



async function main(){
    await getMovieExtended(1234);
}
main()
// module.exports = {
//     getRecommendShows
// }