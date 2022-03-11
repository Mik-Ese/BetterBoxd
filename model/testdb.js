// const mongoose = require("mongoose");

const mongodb = require("mongodb");


const uri = "mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/BetterBoxd?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri);
// async function run(){
//     await mongoose.connect(uri);
//     // const connection = mongoose.connection;
//     // const collections = connection.db.collection("Users")
//     // const arr = collections.find({});
//     // console.log(arr)
//     const schema = new mongoose.Schema({ _id: String, name: String,}, 
//         { collection : 'Users' });   // collection name
//     schema.


// }
async function run(){
    await client.connect();
    const database = client.db("BetterBoxd");
    const users = database.collection("users");
    const query = {};
    const usersFound = users.find(query);
    const count = await usersFound.count();
    // console.log(count); 
    const foundDocuments = await usersFound.toArray();
    console.log(foundDocuments); 
    client.close();
}

run();