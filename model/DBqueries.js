const User = require('./schemas/user.schema');
const JournalEntry = require('./schemas/journalEntry.schema');
const MovieList = require('./schemas/movieList.schema');
const bcrypt = require('bcryptjs');
const fetchData = require('../controller/fetchData');
// const UserReview = require('./schemas/userReview.schema');
// const UserRating = require('./schemas/userRating.schema');

/**
 * @param {*} user - the user to post
 * @returns the user object posted, along with a status
 */
async function postUser(user) {
    var status = 'good';

    if (await User.findOne({ username: user.username })) {
        status = 'another user with that username already exists';
        return { user: null, status: status };
    } else if (await User.findOne({ email_address: user.email_address })) {
        status = 'another user with that email already exists';
        return { user: null, status: status };
    }

    try {
        var res = await User.create(user);
    } catch (error) {
        console.log(error);
        status = error;
    }

    return {
        user: res,
        status: status
    };
}

/**
 * @param {String} username - the username that you want to login with
 * @param {String} password - the password that you want to login with
 * @returns The user with that id, along with a status of the response
 */
async function loginUser(username, password) {
    try {
        var user = await User.findOne({
            username: username
        });
    } catch (e) {
        console.log(e);
        return {
            user: user,
            status: e
        };
    }

    if (!user) {
        return {
            user: null,
            status: 'no user found matching those credentials'
        };
    } else if (!bcrypt.compareSync(password, user.password)) {
        return { user: null, status: 'incorrect password' };
    } else {
        return { user: user, status: 'good' };
    }
}

/**
 * @param {String} user_id - the user who's journal entries you want to view
 * @returns the user's journal entries
 */
async function getJournalEntries(user_id) {
    var status = 'good';

    try {
        var res = await JournalEntry.find({
            user_id: user_id
        });
    } catch (e) {
        console.log(e);
        return {
            entries: null,
            status: e
        };
    }

    const entries = [];
    for (entry of res) {
        let tmdb_id = (await fetchData.getMovieExtended(entry.trakt_id)).ids
            .tmdb;

        let j = {
            user_id: entry.user_id,
            trakt_id: entry.trakt_id,
            description: entry.description,
            no_likes: entry.no_likes,
            no_comments: entry.no_comments,
            created_at: entry.created_at
        };
        j.url = await fetchData.getMediaArt('movies', tmdb_id, 'poster');
        entries.push(j);
    }

    return { entries: entries, status: status };
}

/**
 * @param {*} list - the list to post
 * @returns the list object posted, along with a status
 */
async function postList(list) {
    var status = 'good';

    try {
        var res = await MovieList.create(list);
    } catch (error) {
        console.log(error);
        status = error;
    }

    return {
        list: res,
        status: status
    };
}

// /**
//  * @param {*} rating - the rating to post
//  * @returns
//  */
// async function postUserRating(rating) {
//     try {
//         var res = await UserRating.insertMany(rating);
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
//     return res;
// }

// /**
//  * @param user_id - the id of the user who is reviewing the movie
//  * @param trakt_id - the id of the movie that is being reviewed
//  * @param {Number} rating - the rating (out of ten) that the user gave
//  * @param {String} description - the description of the user's review
//  * @returns
//  */
// async function postUserReview(user_id, trakt_id, rating, description) {
//     var review = {
//         user_id: user_id,
//         trakt_id: trakt_id,
//         rating: rating,
//         description: description
//     };
//     try {
//         var res = await UserReview.insertMany(review);
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
//     return res;
// }

// /**
//  * @param {*} id - id of the user to fetch
//  * @returns The user with that id
//  */
// async function fetchUser(id) {
//     try {
//         var res = await User.findById(id).exec();
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
//     return res;
// }

// /**
//  * @param {*} user_id - id of the user who's ratings you want to fetch
//  * @returns All the ratings of that user
//  */
// async function fetchUserRatings(user_id) {
//     try {
//         var res = await UserRating.find({ user_id: user_id });
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
//     return res;
// }

// /**
//  * @param {*} user_id - id of the user who's reviews you want to fetch
//  * @param {String} password - the user's password
//  * @returns All the reviews of that user
//  */
// async function fetchUserReviews(user_id, password) {
//     try {
//         var res = await UserReview.find({
//             user_id: user_id,
//             password: password
//         });
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
//     return res;
// }

// /**
//  * @param {*} user_id - id of the user who's movie lists you want to fetch
//  * @returns All the movie lists of that user
//  */
// async function fetchMovieLists(user_id) {
//     try {
//         var res = await MovieList.find({ user_id: user_id });
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
//     return res;
// }

// /**
//  * @param {*} user_id - id of the user who's journal entries you want to fetch
//  * @returns All the journal entries of that user
//  */
// async function fetchJournalEntries(user_id) {
//     try {
//         var res = await JournalEntry.find({ user_id: user_id });
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
//     return res;
// }

module.exports = {
    // fetchUser,
    // fetchUserReviews,
    // postUserReview,
    postUser,
    loginUser,
    postList,
    getJournalEntries
};
