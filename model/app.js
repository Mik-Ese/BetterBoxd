const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://betterboxd:movie@main.6pjwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.post("/post", (req, res) => {
  console.log("React connected");

  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    console.log("Did make collection?");
    // perform actions on the collection object
    client.close();
  });

  res.redirect("/");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));