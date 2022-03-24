const mongoose = require('mongoose');
const uri = credentials.mongo_uri;
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
async function readFromMovieCollection(model) {
    try{
        await mongoose.connect(uri);
        // const connection = mongoose.connection;
        const foundMovies = await MovieModel.find({});
        console.log(foundMovies);
        await mongoose.connection.close();
        return foundMovies;
    }
    catch(error){
        console.log(error);
        return error
    }

}
// async function addToUserList(movie_id) {
//     await mongoose.connect(uri);
//     const foundMovies = await UserModel.find({});
//     console.log(foundMovies);
//     await mongoose.connection.close();

// }
async function addToMovieCollection(model, data) {
    try{
        await mongoose.connect(uri);
        let testData = new MovieModel({ name: "hi" });
        await testData.save();
        await mongoose.connection.close();
        return "Successful"
    }
    catch(error){
        console.log(error)
    }
}
async function main() {
    // await addToCollection();
    await readFromMovieCollection();
}
main();
