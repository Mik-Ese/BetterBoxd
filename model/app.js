const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '../.env' });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

app.post('/post', (req, res) => {
    console.log('React connected');

    client.connect((err) => {
        const collection = client.db('test').collection('devices');
        console.log('Did make collection?');
        // perform actions on the collection object
        client.close();
    });

    res.redirect('/');
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
