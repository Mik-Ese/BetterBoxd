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
    try {
        var res = await User.insertMany(user);
    } catch (error) {
        console.log(error);
        return error;
    }
    return res;
}

/**
 * @param {*} rating - the rating to post
 * @returns
 */
async function postUserRating(rating) {
    try {
        var res = await UserRating.insertMany(rating);
    } catch (error) {
        console.log(error);
        return error;
    }
    return res;
}

/**
 * @param user_id - the id of the user who is reviewing the movie
 * @param trakt_id - the id of the movie that is being reviewed
 * @param {Number} rating - the rating (out of ten) that the user gave
 * @param {String} description - the description of the user's review
 * @returns
 */
async function postUserReview(user_id, trakt_id, rating, description) {
    var review = {
        user_id: user_id,
        trakt_id: trakt_id,
        rating: rating,
        description: description
    };
    try {
        var res = await UserReview.insertMany(review);
    } catch (error) {
        console.log(error);
        return error;
    }
    return res;
}

/**
 * @param {*} id - id of the user to fetch
 * @returns The user with that id
 */
async function fetchUser(id) {
    try {
        var res = await User.findById(id).exec();
    } catch (e) {
        console.log(e);
        return e;
    }
    return res;
}

/**
 * @param {String} username - the username that you want to login with
 * @param {String} password - the password that you want to login with
 * @returns The user with that id
 */
async function loginUser(username, password) {
    try {
        var user = await User.find({ username: username, password: password });
    } catch (e) {
        console.log(e);
        return e;
    }

    if (user.at(0)) {
        return true;
    }
    return false;
}

/**
 * @param {*} user_id - id of the user who's ratings you want to fetch
 * @returns All the ratings of that user
 */
async function fetchUserRatings(user_id) {
    try {
        var res = await UserRating.find({ user_id: user_id });
    } catch (e) {
        console.log(e);
        return e;
    }
    return res;
}

/**
 * @param {*} user_id - id of the user who's reviews you want to fetch
 * @param {String} password - the user's password
 * @returns All the reviews of that user
 */
async function fetchUserReviews(user_id, password) {
    try {
        var res = await UserReview.find({
            user_id: user_id,
            password: password
        });
    } catch (e) {
        console.log(e);
        return e;
    }
    return res;
}

/**
 * @param {*} user_id - id of the user who's movie lists you want to fetch
 * @returns All the movie lists of that user
 */
async function fetchMovieLists(user_id) {
    try {
        var res = await MovieList.find({ user_id: user_id });
    } catch (e) {
        console.log(e);
        return e;
    }
    return res;
}

/**
 * @param {*} user_id - id of the user who's journal entries you want to fetch
 * @returns All the journal entries of that user
 */
async function fetchJournalEntries(user_id) {
    try {
        var res = await JournalEntry.find({ user_id: user_id });
    } catch (e) {
        console.log(e);
        return e;
    }
    return res;
}

module.exports = {
    fetchUser,
    fetchUserReviews,
    postUserReview,
    postUser,
    loginUser
};
