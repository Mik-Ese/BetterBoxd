const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');
const JournalEntry = require('./schemas/journalEntry.schema');
const MovieList = require('./schemas/movieList.schema');
const UserRating = require('./schemas/userRating.schema');

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchUser(id) {
    return await User.findById(id).exec();
}

/**
 * @param {*} user_id - id of the user who's ratings you want to fetch
 * @returns All the ratings of that user
 */
async function fetchUserRatings(user_id) {
    return await UserRating.find({ user_id: user_id });
}

/**
 * @param {*} user_id - id of the user who's reviews you want to fetch
 * @returns All the reviews of that user
 */
async function fetchUserReviews(user_id) {
    return await UserReview.find({ user_id: user_id });
}

/**
 * @param {*} user_id - id of the user who's movie lists you want to fetch
 * @returns All the movie lists of that user
 */
async function fetchMovieLists(user_id) {
    return await MovieList.find({ user_id: user_id });
}

/**
 * @param {*} user_id - id of the user who's journal entries you want to fetch
 * @returns All the journal entries of that user
 */
async function fetchJournalEntries(user_id) {
    return await JournalEntry.find({ user_id: user_id });
}

module.exports = {
    fetchUser,
    fetchJournalEntries,
    fetchUserReviews,
    fetchUserRatings,
    fetchMovieLists
};
