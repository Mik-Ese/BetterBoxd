const express = require('express');
const app = express();
const axios = require('axios');

const credentials = require('./credentials');
const APIqueries = require('./APIqueries');

const headers = {
    Authorization: `Bearer ${credentials.accessToken}`,
    // Connection: 'keep-alive',
    // 'User-Agent': 'NodeJS Axios',
    'Content-type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': credentials.clientId
};

app.post('/test', (req, res) => {
    console.log('React connected!');
    res.redirect('/');
});

app.post('/weekly', (req, res) => {
    console.log('Recommnded shows [weekly]');
    let data;
    const APIquery = APIqueries.genRecShowsQuery('weekly');
    axios
        .get(APIquery, headers)
        .then((getResponse) => {
            console.log('GET response:');
            console.log(getResponse.data);
            data = getResponse.data;
            // response.send(response);
        })
        .catch(function (error) {
            console.log('Error during GET request:');
            console.log(APIquery);
            console.log(error);
        });
    res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
