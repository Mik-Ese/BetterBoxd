const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');

/**
 * @param {*} review - the review to post
 * @returns
 */
async function postUserReview(review) {
    return await UserReview.insertMany(review);
}

/**
 * @param {*} user - the user to post
 * @returns
 */
async function postUser(user) {
    return await User.insertMany(user);
}

module.exports = { postUserReview, postUser };
