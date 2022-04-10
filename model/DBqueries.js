const User = require('./schemas/user.schema');
const JournalEntry = require('./schemas/journalEntry.schema');
const MovieList = require('./schemas/movieList.schema');
const bcrypt = require('bcryptjs');
const fetchData = require('../controller/fetchData');

/**
 * @param {*} user - the user to post
 * @returns the user object posted, along with a status
 */
async function postUser(user) {
    let status = 'good';

    if (await User.findOne({ username: user.username })) {
        status = 'another user with that username already exists';
        return { user: null, status: status };
    } else if (await User.findOne({ email_address: user.email_address })) {
        status = 'another user with that email already exists';
        return { user: null, status: status };
    }
    let res;
    try {
        res = await User.create(user);
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
    let user;
    try {
        user = await User.findOne({
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
    let status = 'good';
    let res;
    try {
        res = await JournalEntry.find({
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
    let promises = [];
    for (entry of res) {
        promises.push(fetchData.getMovieExtended(entry.trakt_id));
    }
    const response = await Promise.all(promises);
    let index = 0;
    for (entry of res) {
        let j = {
            user_id: entry.user_id,
            movie_title: response[index].title,
            trakt_id: entry.trakt_id,
            description: entry.description,
            no_likes: entry.no_likes,
            no_comments: entry.no_comments,
            created_at: entry.created_at,
            url: response[index].url
        };
        entries.push(j);
        index++;
    }

    return { entries: entries, status: status };
}

/**
 * @param {*} list - the list to post
 * @returns the list object posted, along with a status
 */
async function postList(list) {
    let status = 'good';
    let res;
    try {
        res = await MovieList.create(list);
    } catch (error) {
        console.log(error);
        status = error;
    }

    return {
        list: res,
        status: status
    };
}

/**
 * @param {*} entry - the journal entry to post
 * @returns the journal entry posted, along with a status
 */
async function postJournalEntry(entry) {
    let status = 'good';
    let res;
    try {
        res = await JournalEntry.create(entry);
    } catch (error) {
        console.log(error);
        status = error;
    }

    return {
        list: res,
        status: status
    };
}
/**
 * @returns all database's user movie lists
 */
async function getMovieLists() {
    let status = 'good';
    let res;
    try {
        res = await MovieList.find({});
    } catch (e) {
        console.log(e);
        return {
            entries: null,
            status: e
        };
    }
    let promises = [];
    const entries = [];
    for (entry of res) {
        for (let i = 0; i < entry.trakt_ids.length; i++) {
            promises.push(fetchData.getMovieExtended(entry.trakt_ids[i]));
        }
    }
    let results = await Promise.all(promises);
    for (entry of res) {
        let new_trakt_ids = [];
        for (let i = 0; i < entry.trakt_ids.length; i++) {
            let obj = {};
            obj.trakt_id = entry.trakt_ids[i];
            obj.url = results[i].url;
            new_trakt_ids.push(obj);
        }
        for (let i = 0; i < entry.trakt_ids.length; i++) {
            results.shift();
        }
        let user_list_name = await User.find({ _id: entry.user_id });
        let j = {
            title: entry.title,
            username: user_list_name[0].username,
            trakt_ids: new_trakt_ids,
            description: entry.description
        };
        entries.push(j);
    }

    return { entries: entries, status: status };
}
/**
 * @param {String} user_id - the user who's journal entries you want to view
 * @returns the user's journal entries
 */
async function getUserMovieLists(user_id) {
    let status = 'good';
    let res;
    try {
        res = await MovieList.find({ user_id: user_id });
    } catch (e) {
        console.log(e);
        return {
            entries: null,
            status: e
        };
    }

    const entries = [];
    for (entry of res) {
        let new_trakt_ids = [];
        for (let i = 0; i < entry.trakt_ids.length; i++) {
            let obj = {};
            let tmdb_id = (await fetchData.getMovieExtended(entry.trakt_ids[i]))
                .ids.tmdb;
            obj.trakt_id = entry.trakt_ids[i];
            obj.url = await fetchData.getMediaArt('movies', tmdb_id, 'poster');
            new_trakt_ids.push(obj);
        }
        let j = {
            title: entry.title,
            user_id: entry.user_id,
            trakt_ids: new_trakt_ids,
            description: entry.description
        };
        j.url = await fetchData.getMediaArt('movies', tmdb_id, 'poster');
        entries.push(j);
    }

    return { entries: entries, status: status };
}

module.exports = {
    postUser,
    loginUser,
    postList,
    getJournalEntries,
    postJournalEntry,
    getUserMovieLists,
    getMovieLists
};
