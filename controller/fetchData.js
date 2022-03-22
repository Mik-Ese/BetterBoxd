const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const credentials = require('./credentials');
const APIqueries = require('./api/APIqueries');

// const redisClient = redis.createClient('localhost', 6379);
const redisClient = redis.createClient(
    credentials.redisAddress ? credentials.redisAddress : 'localhost',
    6379
);

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

async function getRecommendShows(period) {
    if (
        period !== 'daily' &&
        period !== 'weekly' &&
        period !== 'monthly' &&
        period !== 'yearly' &&
        period !== 'all'
    ) {
        return 'invalid parameter';
    }
    let expiry = 86400; // 1 day (default)
    if (period.toLowerCase() === 'weekly') {
        expiry = 604800; // 7 days
    } else if (period.toLowerCase() === 'monthly') {
        expiry = 2592000; // 31 days
    } else if (period.toLowerCase() === 'yearly') {
        expiry = 31536000; // 365 days
    }
    const APIquery = APIqueries.genRecShowsQuery(period);
    try {
        const key = `recShows${period.toLowerCase()}`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);
            // saving to cache
            redisClient.set(key, JSON.stringify(response.data), {
                EX: expiry // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            return response.data;
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function getMovieData(movie_id) {}
async function getMovieData(movie_id) {}

/**
 * @param {*} mediaType - "movies" or "tv"
 * @param {*} id - media ID from TMDB (preferred) or IMDB
 * @param {*} artType - "poster", "logo", "clearlogo" "thumbs", "bg", "banner", "disc", "art", "clearart"
 * @return array of objects witl the fileds 'id', 'url', 'lang', and 'likes'
 */
async function getMediaArt(mediaType, id, artType) {
    if (
        !mediaType.toLowerCase() === 'movies' ||
        !mediaType.toLowerCase() === 'tv'
    ) {
        return `invalid "mediaType" parameter: ${mediaType}`;
    }
    let expiry = 86400; // 1 day (default)
    const APIquery = APIqueries.genArtQuery(
        credentials.fanartKey,
        mediaType,
        id
    );
    try {
        const key = `${mediaType}Art_${id}`; // cache key
        let fullResult;

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            fullResult = JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);
            // saving to cache
            redisClient.set(key, JSON.stringify(response.data), {
                EX: expiry // seconds in a week (expiry)
            });
            fullResult = response.data;
        }

        if (mediaType.toLowerCase() === 'movies') {
            if (artType.toLowerCase() === 'poster') {
                if (fullResult.hasOwnProperty('movieposter')) {
                    return fullResult.movieposter;
                }
                throw new Error('Could not find any posters');
            } else if (artType.toLowerCase() === 'logo') {
                if (fullResult.hasOwnProperty('hdmovielogo')) {
                    return fullResult.hdmovielogo;
                } else if (fullResult.hasOwnProperty('movielogo')) {
                    return fullResult.movielogo;
                }
                throw new Error('Could not find any logos');
            } else if (artType.toLowerCase() === 'clearlogo') {
                if (fullResult.hasOwnProperty('hdmovieclearlogo')) {
                    return fullResult.hdmovieclearlogo;
                } else if (fullResult.hasOwnProperty('movieclearlogo')) {
                    return fullResult.movieclearlogo;
                }
                throw new Error('Could not find any logos');
            } else if (artType.toLowerCase() === 'thumbs') {
                if (fullResult.hasOwnProperty('moviethumb')) {
                    return fullResult.moviethumb;
                }
                throw new Error('Could not find any thumbnails');
            } else if (artType.toLowerCase() === 'bg') {
                if (fullResult.hasOwnProperty('moviebackground')) {
                    return fullResult.moviebackground;
                }
                throw new Error('Could not find any backgrounds');
            } else if (artType.toLowerCase() === 'banner') {
                if (fullResult.hasOwnProperty('moviebanner')) {
                    return fullResult.moviebanner;
                }
                throw new Error('Could not find any banners');
            } else if (artType.toLowerCase() === 'disk') {
                if (fullResult.hasOwnProperty('moviedisk')) {
                    return fullResult.moviedisk;
                }
                throw new Error('Could not find any disk art');
            } else if (artType.toLowerCase() === 'art') {
                if (fullResult.hasOwnProperty('hdmovieart')) {
                    return fullResult.hdmovieart;
                } else if (fullResult.hasOwnProperty('movieart')) {
                    return fullResult.movieart;
                }
                throw new Error('Could not find any art');
            } else if (artType.toLowerCase() === 'clearart') {
                if (fullResult.hasOwnProperty('hdmovieclearart')) {
                    return fullResult.hdmovieclearart;
                } else if (fullResult.hasOwnProperty('movieclearart')) {
                    return fullResult.movieclearart;
                }
                throw new Error('Could not find any clear art');
            }
        }

        if (mediaType.toLowerCase() === 'tv') {
            throw new Error('Sorry, TV shows have not been implemented');
        }

        return `${mediaType} art type: "${artType}" not found`;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @param {String} movieName
 * @returns
 */
async function getMovieSearchResults(movieName) {
    let expiry = 900; // 15 mins
    const APIquery = APIqueries.genMovieSearchQuery(movieName.toLowerCase());
    try {
        const key = `search${movieName.toLowerCase()}`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);
            // saving to cache
            redisClient.set(key, JSON.stringify(response.data), {
                EX: expiry
            });

            return response.data;
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRecommendShows,
    getMediaArt,
    getMovieSearchResults
};
