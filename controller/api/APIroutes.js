const express = require('express');
const {route} = require('express/lib/application');
const res = require('express/lib/response');
const {send} = require('express/lib/response');
const fetchData = require('../fetchData');
const reviewsDB = require('../../model/reviewsdb');
const loginDB = require('../../model/logindb');
const router = express.Router();

router.get('/get-recommended-shows', async (req, res) => {
    const {period} = req.query;
    const data = await fetchData.getRecommendShows(period);
    res.send(data);
});

// for test purposes
router.get('/get-movie-poster', async (req, res) => {
    const {id} = req.query;
    const data = await fetchData.getMediaArt('movies', id, 'poster');
    res.send(data);
});

router.get('/get-popular-movies', async (req, res) => {
    const {period} = req.query;
    const data = await fetchData.getPopularMovies(period);
    res.send(data);
});

router.get('/movie-search-results', async (req, res) => {
    const {movieName} = req.query;
    const data = await fetchData.getMovieSearchResults(movieName);
    res.send(data);
});

router.get('/trending-movie-reviews', async (req, res) => {
    const data = await fetchData.getTrendingMovieReviews();
    res.send(data);
});

router.get('/all-reviews', async (req, res) => {
    let data = await reviewsDB.getAllReviews();
    for (element of data) {
        let movie_data = await fetchData.getMovieExtended(element.trakt_id);
        element = {
            ...element,
            ...movie_data
        };
    }
    res.send(data);
});

router.get('/get-movie-reviews', async (req, res) => {
    const {movie_id} = req.query;
    const data = await reviewsDB.readReviewsFromMovie(movie_id);
    res.send(data);
});

// WIP - DO NOT USE
router.get('/get-movie-page', async (req, res) => {
    const {movie_id} = req.query;
    const data = await reviewsDB.readReviewsFromMovie(movie_id);
    res.send(data);
});

router.post('/add-user', async (req, res) => {
    const {username, password} = req.body;
});
router.get('/validate-login', async (req, res) => {
    const {username, password} = req.query;
    const result = await loginDB.checkLogIn(username, password);
    if (result) {
        res.send({
            validate: true
        });
    } else {
        res.send({
            validate: false
        });
    }
});
router.get('/get-user', async (req, res) => {});
router.post('/add-list', async (req, res) => {});
router.put('/add-media-list', async (req, res) => {});
router.put('/remove-media-list', async (req, res) => {});

module.exports = router;
