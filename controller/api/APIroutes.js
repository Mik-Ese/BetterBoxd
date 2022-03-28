const express = require('express');
const DBqueries = require('../../model/DBqueries');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const { send } = require('express/lib/response');
const fetchData = require('../fetchData');
const router = express.Router();

router.get('/get-all-movie-lists', async(req, res) => {
    const data = await DBqueries.getMovieLists();
    res.send(data);
})
router.post('/post-journal-entry', async (req, res) => {
    console.log(req.body);
    const data = await DBqueries.postJournalEntry(req.body);
    console.log(data);
    res.send(data);
});

router.post('/post-movie-list', async (req, res) => {
    console.log(req.body);
    const data = await DBqueries.postList(req.body);
    console.log(data);
    res.send(data);
});

router.get('/login', async (req, res) => {
    const { username, password } = req.query;
    const data = await DBqueries.loginUser(username, password);
    res.send(data);
});

router.get('/get-journal-entries', async (req, res) => {
    const { user_id } = req.query;
    const data = await DBqueries.getJournalEntries(user_id);
    res.send(data);
});

router.post('/register-user', async (req, res) => {
    console.log(req.body);
    const data = await DBqueries.postUser(req.body);
    res.send(data);
});

router.get('/get-recommended-shows', async (req, res) => {
    const { period } = req.query;
    const data = await fetchData.getRecommendShows(period);
    res.send(data);
});

// for test purposes
router.get('/get-movie-poster', async (req, res) => {
    const { id } = req.query;
    const data = await fetchData.getMediaArt('movies', id, 'poster');
    res.send(data);
});

router.get('/get-popular-movies', async (req, res) => {
    const data = await fetchData.getPopularMovies();
    res.send(data);
});

router.get('/movie-search', async (req, res) => {
    const { movieName } = req.query;
    const data = await fetchData.getMovieSearchResults(movieName);
    res.send(data);
});

router.get('/trending-movie-reviews', async (req, res) => {
    const data = await fetchData.getTrendingMovieReviews();
    res.send(data);
});

router.get('/get-movie-page', async (req, res) => {
    const { id } = req.query;
    const data = await fetchData.getMoviePage(id);
    res.send(data);
});

router.get('/get-most-watched-movies', async(req, res) => {
    const data = await fetchData.getMostWatchedMovies("weekly");
    res.send(data);
})





module.exports = router;
