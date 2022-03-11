var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        // no "_id" field since it is automatically generated
        username: { type: String, unique: true },
        email_address: { type: String, unique: true },
        password: String,
        lists: [{ list_name: String, media_ids: [String] }]
    },
    { collection: "users" }
);

module.exports = mongoose.model("User", userSchema, "users");
