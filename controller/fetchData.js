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
async function getRecommendMovies(period){
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
    const APIquery = APIqueries.genRecMoviesQuery(period);
    try {
        const key = `recMovies${period.toLowerCase()}`; // cache key

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
async function getMovieExtended(id){
    const APIquery = `https://api.trakt.tv/movies/${id}?extended=full`
    const movieStats = `https://api.trakt.tv/movies/${id}/stats`
    try {
        const key = `movies`; // cache key
        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            const array = JSON.parse(cacheResponse);
            let found = false;
            array.forEach((element, index) => {
                if(element["trakt_id"]=== id){
                    found = index;
                }
            })
            if(found === false){
                const response = await axios.get(APIquery, config);
                const fanartQuery = `http://webservice.fanart.tv/v3/movies/${response.data.ids.tmdb}?api_key=${credentials.fanartKey}`
                const fanartResponse = await axios.get(fanartQuery);
                // const movieStatsResponse = await axios.get(movieStats, config);
                // saving to cache
                const send_to_UI = {
                    ...response.data,
                    "trakt_id" : response.data.ids.trakt,
                    "url": fanartResponse.data.movieposter[0],
                }
                delete send_to_UI.ids; // deletes other ids
                array.push(send_to_UI);
                redisClient.set(key, JSON.stringify(array), {
                    EX: 604800 // seconds in a week (expiry)
                    // NX: true    // Only set the key if it does not already exist
                });
                return send_to_UI
            }
            else{
                return array[found];
            }
        } else {
            // making API request
            const response = await axios.get(APIquery, config);
            console.log(response.data.ids.imdb)
            const fanartQuery = `http://webservice.fanart.tv/v3/movies/${response.data.ids.tmdb}?api_key=${credentials.fanartKey}`
            console.log(fanartQuery)
            const fanartResponse = await axios.get(fanartQuery);
            // const movieStatsResponse = await axios.get(movieStats, config);
            // saving to cache
            const send_to_UI = {
                ...response.data,
                "trakt_id" : response.data.ids.trakt,
                "url": fanartResponse.data.movieposter[0],
            }
            delete send_to_UI.ids;
            const movie = [send_to_UI];
            redisClient.set(key, JSON.stringify(movie), {
                EX: 604800 // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            return send_to_UI
        }
    } catch (error) {
        // console.log(error)
        throw new Error(error);
    }
}
async function getPopularShows(period){
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
    const APIquery = `https://api.trakt.tv/movies/watched/${period}`
    
    try {
        const key = `popularShows${period.toLowerCase()}`; // cache key
        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse)
        } else {
            // making API request
            let response = await axios.get(APIquery, config);
            // saving to cache
            for(let element of response){
                const fanartQuery = `http://webservice.fanart.tv/v3/movies/${element.ids.tmdb}?api_key=${credentials.fanartKey}`
                const fanartResponse = await axios.get(fanartQuery);
                element = {
                    ...element,
                    "url": fanartResponse.data.movieposter[0]
                }
                delete element.ids;

            }
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

async function main(){
    await getMovieExtended(1244);
}
main()
// module.exports = {
//     getRecommendShows
// }