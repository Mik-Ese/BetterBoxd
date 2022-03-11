const mongoose = require("mongoose");

// const mongodb = require("mongodb");
// const { default: mongoose } = require("mongoose");


const uri = "mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/BetterBoxd?retryWrites=true&w=majority";
const testSchema = new mongoose.Schema({name: {type:String, unique:true}}, { collection : 'testMongoose' });   // collection name
const testModel = mongoose.model('testMongoose', testSchema, "testMongoose");
// const client = new mongodb.MongoClient(uri);
async function readFromCollection(){
    // const connection = mongoose.connection;
    const foundMovies = await testModel.find({});
    console.log(foundMovies);
    // const arr = collections.find({});
    // console.log(arr)
    // const schema = new mongoose.Schema({ _id: String, name: String,}, { collection : 'Users' });   // collection name
    // schema.
}
async function addToCollection(){
    let testData = new testModel({name: "hi"})
    await testData.save()
    // const foundMovies = await testModel.find({});
    // const arr = collections.find({});
    // console.log(arr)    // schema.
}
// async function run(){
//     await client.connect();
//     const database = client.db("BetterBoxd");
//     const users = database.collection("users");
//     const query = {};
//     const usersFound = users.find(query);
//     const count = await usersFound.count();
//     // console.log(count); 
//     const foundDocuments = await usersFound.toArray();
//     console.log(foundDocuments); 
//     client.close();
// }
// async function addToCollection(){
//     await client.connect();
//     const database = client.db("BetterBoxd");
//     const users = database.collection("users");
//     const query = {};
//     const usersFound = users.find(query);
//     const count = await usersFound.count();
//     // console.log(count); 
//     const foundDocuments = await usersFound.toArray();
//     console.log(foundDocuments); 
//     client.close();
// }
async function main(){
    await mongoose.connect(uri);
    await addToCollection();
    await readFromCollection();
    await mongoose.connection.close()
}
main();
// run();