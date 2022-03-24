const mongoose = require('mongoose');
const credentials = require('../credentials');
const uri = credentials.mongo_uri;
const ReviewModel = require('./schemas/userReview.schema');

async function readReviewsFromMovie(id) {
    try {
        await mongoose.connect(uri);
        const foundReviews = await ReviewModel.find({ trakt_id: id });
        await mongoose.connection.close();
        return foundReviews;
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function getAllReviews() {
    try {
        await mongoose.connect(uri);
        const foundReviews = await ReviewModel.find({}).sort(
            '-review_created_at'
        );
        await mongoose.connection.close();
        return foundReviews;
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function addReview(movie_id, user_id, rating, description) {
    try {
        await mongoose.connect(uri);
        let reviewData = new ReviewModel({
            user_id: user_id,
            trakt_id: movie_id,
            review_rating: rating,
            review_description: description,
            review_likes: 0,
            review_no_of_comments: Math.floor(Math.random() * 100000),
            review_created_at: Date.now()
        });
        await reviewData.save();
        await mongoose.connection.close();
        return 'Successful';
    } catch (error) {
        console.log(error);
    }
}
async function addLikeToReview(review_id) {
    try {
        await mongoose.connect(uri);
        const foundReview = await ReviewModel.findOne({ _id: review_id });
        foundReview.likes++;
        await foundReview.save();
        await mongoose.connection.close();
        return 'Successfully Added like';
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function removeLikeToReview(review_id) {
    try {
        await mongoose.connect(uri);
        const foundReview = await ReviewModel.findOne({ _id: review_id });
        if (foundReview.likes > 0) {
            foundReview.likes--;
        }
        await foundReview.save();
        await mongoose.connection.close();
        return 'Successfully Removed like';
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    readReviewsFromMovie,
    getAllReviews,
    addReview,
    addLikeToReview,
    removeLikeToReview
};
