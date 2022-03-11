const mongoose = require('mongoose');
const uri =
    'mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/BetterBoxd?retryWrites=true&w=majority';
const UserModel = require('./schemas/user.schema');
const MovieModel = require('./schemas/movie.schema');
const ShowModel = require('./schemas/show.schema');
const MovieExtendedModel = require('./schemas/movieExtended.schema');
const ShowExtendedModel = require('./schemas/showExtended.schema');
const UserRatingModel = require('./schemas/show.schema');
const MediaRatingModel = require('./schemas/mediaRating.schema');
// const testSchema = new mongoose.Schema({name: {type:String, unique:true}}, { collection : 'testMongoose' });   // collection name
// const testModel = mongoose.model('testMongoose', testSchema, "testMongoose");
// const client = new mongodb.MongoClient(uri);
async function readFromCollection() {
    // const connection = mongoose.connection;
    const foundMovies = await MovieExtendedModel.find({});
    console.log(foundMovies);
}
// async function addToCollection() {
//     let testData = new testModel({ name: "hi" });
//     await testData.save();
// }
async function main() {
    await mongoose.connect(uri);
    // await addToCollection();
    await readFromCollection();
    await mongoose.connection.close();
}
main();
// run();
