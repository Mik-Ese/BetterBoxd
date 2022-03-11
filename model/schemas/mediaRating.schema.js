var mongoose = require('mongoose');
const { Schema } = mongoose;

const mediaRatingSchema = new Schema({
    // no "_id" field since it is automatically generated
    rating: Number,
    votes: Number,
    distribution: [
        {
            1: Number,
            2: Number,
            3: Number,
            4: Number,
            5: Number,
            6: Number,
            7: Number,
            8: Number,
            9: Number,
            10: Number
        }
    ]
});

module.exports = mongoose.model('MediaRating', mediaRatingSchema);
