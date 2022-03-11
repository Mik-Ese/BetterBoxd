const express = require('express');
const app = express();
const axios = require('axios');

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

app.post('/test', (req, res) => {
    console.log('React connected!');
    res.redirect('/');
});

app.post('/weekly', async (req, res) => {
    console.log('Recommnded shows [weekly]');
    let data;
    const APIquery = APIqueries.genShowExtended(10);
    try {
        const response = await axios.get(APIquery, config);
        console.log(response.data);
    } catch (error) {
        console.log('Error during GET request:');
        console.log(APIquery);
        console.log(`${error.response.status} - ${error.response.statusText}`);
    }
    res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
