const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
/*const uri =
  "mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});*/

//Import the mongoose module
var mongoose = require("mongoose");
const model = require("./model");
//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/BetterBoxd?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((ans) => {
    console.log("ConnectedSuccessful");
  })
  .catch((err) => {
    console.log("Error in the Connection");
  });
const Schema = mongoose.Schema;

const collection_structure = new Schema({
  name: {
    type: String,
    require: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
});

// Creating collection
const testCollection = mongoose.model("Test", collection_structure);

// Inserting one document
/*collections
  .create({
    name: "aayush",
    marks: 10,
  })
  .then((ans) => {
    console.log("Document inserted");
  })
  .catch((err) => {
    console.log(err.Message);
  });*/

await testCollection.findOne({ name: 'aayush' }).exec();

//Get the default connection
/*var db = mongoose.connection;
var user = {
  name: "abc",
};
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.collection("Test").createIndex(user);
*/
app.post("/post", (req, res) => {
  console.log("React connected");

  /*client.connect((err) => {
    const collection = client.db("BetterBoxd").collection("Test").insertMany(user);
    console.log("Did make collection?");
    collectio
    // perform actions on the collection object
    client.close();
  });*/

  res.redirect("/");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
