const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchUser(id) {
    var user = await User.findById(id).exec();
    console.log(user);
    return user;
}

module.exports = { fetchUser };
