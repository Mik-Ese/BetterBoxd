const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');

/**
 * @param {*} period - daily, weekly, monthly or yearly
 * @returns API query string for recommended shows
 */
function postUserReview(review) {
    UserReview.insertOne('e');
}

/**
 * @param {*} user - the user to post
 * @returns
 */
async function postUser(user) {
    return await User.insertMany(user);
}

module.exports = { postUserReview, postUser };
