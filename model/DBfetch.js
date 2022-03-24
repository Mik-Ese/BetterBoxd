const User = require('./schemas/user.schema');
const UserReview = require('./schemas/userReview.schema');
const JournalEntry = require('./schemas/journalEntry.schema');

async function fetchById(id, model) {
    var res = await model.findById(id).exec();
    return res;
}

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchUser(id) {
    return await fetchById(id, User);
}

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchUserReview(id) {
    return await fetchById(id, UserReview);
}

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchJournalEntry(id) {
    return await fetchById(id, JournalEntry);
}
module.exports = { fetchUser };
