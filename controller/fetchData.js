const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const credentials = require('../credentials');
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

/**
 * @param {*} mediaType - "movies" or "tv"
 * @param {*} id - media ID from TMDB (preferred) or IMDB
 * @param {*} artType - "poster", "logo", "clearlogo" "thumbs", "bg", "banner", "disc", "art", "clearart"
 * @return array of objects witl the fileds 'id', 'url', 'lang', and 'likes'
 */
async function getMediaArt(mediaType, id, artType) {
    if (
        !(mediaType.toLowerCase() === 'movies') &&
        !(mediaType.toLowerCase() === 'tv')
    ) {
        return `invalid "mediaType" parameter: ${mediaType}`;
    }
    let expiry = 86400; // 1 day (default)
    const APIquery = APIqueries.genArtQuery(
        credentials.fanartKey,
        mediaType,
        id
    );
    const key = `${mediaType}Art_${id}`; // cache key
    try {
        let fullResult;
        let result;

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            result = JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);

            fullResult = response.data;

            if (fullResult['invalid_fanart']) {
                result = fullResult['invalid_fanart'];
            }
            if (mediaType.toLowerCase() === 'movies') {
                if (artType.toLowerCase() === 'poster') {
                    if (fullResult.hasOwnProperty('movieposter')) {
                        result = fullResult.movieposter[0].url;
                    } else {
                        throw new Error('Could not find any posters');
                    }
                } else if (artType.toLowerCase() === 'logo') {
                    if (fullResult.hasOwnProperty('hdmovielogo')) {
                        result = fullResult.hdmovielogo[0].url;
                    } else if (fullResult.hasOwnProperty('movielogo')) {
                        result = fullResult.movielogo[0].url;
                    } else {
                        throw new Error('Could not find any logos');
                    }
                } else if (artType.toLowerCase() === 'clearlogo') {
                    if (fullResult.hasOwnProperty('hdmovieclearlogo')) {
                        result = fullResult.hdmovieclearlogo[0].url;
                    } else if (fullResult.hasOwnProperty('movieclearlogo')) {
                        result = fullResult.movieclearlogo[0].url;
                    } else {
                        throw new Error('Could not find any logos');
                    }
                } else if (artType.toLowerCase() === 'thumbs') {
                    if (fullResult.hasOwnProperty('moviethumb')) {
                        result = fullResult.moviethumb[0].url;
                    } else {
                        throw new Error('Could not find any thumbnails');
                    }
                } else if (artType.toLowerCase() === 'bg') {
                    if (fullResult.hasOwnProperty('moviebackground')) {
                        result = fullResult.moviebackground[0].url;
                    } else {
                        throw new Error('Could not find any backgrounds');
                    }
                } else if (artType.toLowerCase() === 'banner') {
                    if (fullResult.hasOwnProperty('moviebanner')) {
                        result = fullResult.moviebanner[0].url;
                    } else {
                        throw new Error('Could not find any banners');
                    }
                } else if (artType.toLowerCase() === 'disk') {
                    if (fullResult.hasOwnProperty('moviedisk')) {
                        result = fullResult.moviedisk[0].url;
                    } else {
                        throw new Error('Could not find any disk art');
                    }
                } else if (artType.toLowerCase() === 'art') {
                    if (fullResult.hasOwnProperty('hdmovieart')) {
                        result = fullResult.hdmovieart[0].url;
                    } else if (fullResult.hasOwnProperty('movieart')) {
                        result = fullResult.movieart[0].url;
                    } else {
                        throw new Error('Could not find any art');
                    }
                } else if (artType.toLowerCase() === 'clearart') {
                    if (fullResult.hasOwnProperty('hdmovieclearart')) {
                        result = fullResult.hdmovieclearart[0].url;
                    } else if (fullResult.hasOwnProperty('movieclearart')) {
                        result = fullResult.movieclearart[0].url;
                    } else {
                        throw new Error('Could not find any clear art');
                    }
                }
            } else {
                throw new Error(
                    'Sorry, other types of media have not been implemented'
                );
            }

            // saving to cache
            redisClient.set(key, JSON.stringify(result), {
                EX: expiry // seconds in a week (expiry)
            });
        }

        if (typeof result !== 'undefined') {
            return result;
        } else {
            throw new Error(`${mediaType} art type: "${artType}" not found`);
        }
    } catch (error) {
        const invalid_fanart =
            'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png';
        redisClient.set(
            key,
            JSON.stringify([
                {
                    invalid_fanart: invalid_fanart
                }
            ]),
            {
                EX: expiry // seconds in a week (expiry)
            }
        );
        return invalid_fanart;
    }
}

async function getPopularMovies(period) {
    if (
        period !== 'weekly' &&
        period !== 'monthly' &&
        period !== 'daily' &&
        period !== 'yearly' &&
        period !== 'all'
    ) {
        return 'invalid parameter';
    }
    let expiry = 0;
    if (period.toLowerCase() === 'weekly') {
        expiry = 604800;
    }
    if (period.toLowerCase() === 'monthly') {
        expiry = 2592000;
    }
    const APIquery = `https://api.trakt.tv/movies/watched/${period}`;

    try {
        const key = `popularMovies${period.toLowerCase()}`; // cache key
        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            let {data: response} = await axios.get(APIquery, config);
            // saving to cache
            for (let element of response) {
                const fanartResponse = await getMediaArt(
                    'movies',
                    element.movie.ids.tmdb,
                    'poster'
                );
                element['trakt_id'] = element.movie.ids.trakt;
                element['url'] = fanartResponse;
                // console.log(element)
            }
            redisClient.set(key, JSON.stringify(element), {
                EX: expiry // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            return response;
        }
    } catch (error) {
        throw new Error(error);
    }
}
/**
 * @param {*} id - Trakt ID
 * @return Object with fields of summart
 */
async function getMovieExtended(id) {
    const APIquery = APIqueries.genMovieExtendedQuery(id);
    const movieStats = genMovieStatsQuery(id);
    try {
        const key = `movieExtended_${id}`; // cache key
        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            const array = JSON.parse(cacheResponse);
            let found = false;
            array.forEach((element, index) => {
                if (element['trakt_id'] === id) {
                    found = index;
                }
            });
            if (found === false) {
                const {data: response} = await axios.get(APIquery, config);
                const fanartResponse = await getMediaArt(
                    'movies',
                    response.ids.tmdb,
                    'poster'
                );
                // const movieStatsResponse = await axios.get(movieStats, config);
                // saving to cache
                const send_to_UI = {
                    ...response,
                    trakt_id: response.ids.trakt,
                    url: fanartResponse
                };
                array.push(send_to_UI);
                redisClient.set(key, JSON.stringify(array), {
                    EX: 604800 // seconds in a week (expiry)
                    // NX: true    // Only set the key if it does not already exist
                });
                return send_to_UI;
            } else {
                return array[found];
            }
        } else {
            // making API request
            const {data: response} = await axios.get(APIquery, config);
            const fanartResponse = await getMediaArt(
                'movies',
                response.ids.tmdb,
                'poster'
            );
            // const movieStatsResponse = await axios.get(movieStats, config);
            // saving to cache
            const send_to_UI = {
                ...response,
                trakt_id: response.ids.trakt,
                url: fanartResponse
            };
            const movie = [send_to_UI];
            redisClient.set(key, JSON.stringify(movie), {
                EX: 604800 // seconds in a week (expiry)
                // NX: true    // Only set the key if it does not already exist
            });

            return send_to_UI;
        }
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

            const result = response.data.map(function (entry) {
                return {
                    title: entry.movie.title,
                    year: entry.movie.year,
                    trakt_id: entry.movie.ids.trakt
                };
            });

            // saving to cache
            redisClient.set(key, JSON.stringify(result), {
                EX: expiry
            });

            return result;
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function getTrendingMovieReviews() {
    let expiry = 86400; // 1 day
    const APIquery = APIqueries.getTrendingMovieReviewsQuery;
    try {
        const key = `trendingMovieReviews`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);

            const result = await Promise.all(
                response.data.map(async function (entry) {
                    let fanartResponse = await getMediaArt(
                        'movies',
                        entry.movie.ids.tmdb,
                        'poster'
                    );
                    return {
                        // movie info
                        title: entry.movie.title,
                        year: entry.movie.year,
                        url: fanartResponse,
                        trakt_id: entry.movie.ids.trakt,

                        // review info
                        comment_id: entry.comment.id,
                        comment: entry.comment.comment,
                        spoiler: entry.comment.spoiler, // review contains spoilers (true/false)
                        likes: entry.comment.likes,
                        replies: entry.comment.replies,
                        rating: entry.comment.user_rating, // rating from 1 to 10
                        author: entry.comment.user.username
                    };
                })
            );

            // saving to cache
            redisClient.set(key, JSON.stringify(result), {
                EX: expiry
            });

            return result;
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function getMovieRatingDistribution(id) {
    let expiry = 259200; // 3 days
    const APIquery = APIqueries.genMovieRatingDistributionQuery(id);
    try {
        const key = `movieRatingDis_${id}`; // cache key

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

async function getMovieComments(id) {
    let expiry = 86400; // 1 day
    const APIquery = APIqueries.genMovieCommentsQuery(id);
    try {
        const key = `movieComments_${id}`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);

            const result = await Promise.all(
                response.data.map(async function (entry) {
                    return {
                        comment_id: entry.id,
                        comment: entry.comment,
                        spoiler: entry.spoiler, // review contains spoilers (true/false)
                        likes: entry.likes,
                        replies: entry.replies,
                        rating: entry.user_rating, // rating from 1 to 10
                        author: entry.user.username
                    };
                })
            );

            // saving to cache
            redisClient.set(key, JSON.stringify(result), {
                EX: expiry
            });

            return result;
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function getMovieStats(id) {
    let expiry = 86400; // 1 day
    const APIquery = APIqueries.genMovieStatsQuery(id);
    try {
        const key = `movieStats_${id}`; // cache key

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

async function getMoviePeople(id) {
    let expiry = 604800; // 7 days
    const APIquery = APIqueries.genMoviePeopleQuery(id);
    try {
        const key = `moviePeople_${id}`; // cache key

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

async function getMoviePage(id) {
    let expiry = 86400; // 1 day
    const movieExtended = getMovieExtended(id);
    const people = getMoviePeople(id);
    const ratingDis = getMovieRatingDistribution(id);
    const stats = getMovieStats(id);
    const comments = getMovieComments(id);
    try {
        const key = `moviePage_${id}`; // cache key

        // checking cache
        const cacheResponse = await redisClient.get(key);
        if (cacheResponse) {
            return JSON.parse(cacheResponse);
        } else {
            // making API request
            const response = await axios.get(APIquery, config);

            const result = {
                movieExtended,
                people,
                ratingDis,
                stats,
                comments
            };

            // saving to cache
            redisClient.set(key, JSON.stringify(result), {
                EX: expiry
            });

            return result;
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRecommendShows,
    getMediaArt,
    getMovieSearchResults,
    getMovieExtended,
    getTrendingMovieReviews,
    getPopularMovies,
    getMovieRatingDistribution,
    getMovieComments,
    getMovieStats,
    getMoviePeople,
    getMoviePage
};
