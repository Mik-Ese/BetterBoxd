const express = require('express');
const {route} = require('express/lib/application');
const res = require('express/lib/response');
const {send} = require('express/lib/response');
const fetchData = require('../fetchData');
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
    res.send(data[0].url);
});

router.post('/add-user', async (req, res) => {});
router.get('/get-user', async (req, res) => {});
router.post('/add-list', async (req, res) => {});
router.put('/add-media-list', async (req, res) => {});
router.put('/remove-media-list', async (req, res) => {});

module.exports = router;
