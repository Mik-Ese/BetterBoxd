const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');
const JournalEntry = require('./schemas/journalEntry.schema');
const MovieList = require('./schemas/movieList.schema');
const UserRating = require('./schemas/userRating.schema');

/**
 * @param {*} user - the user to post
 * @returns
 */
async function postUser(user) {
    return await User.insertMany(user);
}

/**
 * @param {*} rating - the rating to post
 * @returns
 */
async function postUserRating(rating) {
    return await UserRating.insertMany(rating);
}

/**
 * @param {*} review - the review to post
 * @returns
 */
async function postUserReview(review) {
    return await UserReview.insertMany(review);
}

module.exports = { postUserReview, postUser, postUserRating };
