var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // no "_id" field since it is automatically generated
  username: String,
  email_address: String,
  password: String,
  lists: [{ list_name: String, media_ids: [String] }],
});

module.exports = mongoose.model("User", userSchema);
