/**
 * @param {*} period - daily, weekly, monthly or yearly
 * @returns API query string for recommended shows
 */
function genRecShowsQuery(period) {
    return `https://api.trakt.tv/shows/recommended/${period}`;
}

/**
 * @param {*} period - daily, weekly, monthly or yearly
 * @returns API query string for recommended movies
 */
function genRecMoviesQuery(period) {
    return `https://api.trakt.tv/movies/recommended/${period}`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for rating of show
 */
function genShowRatingQuery(id) {
    return `https://api.trakt.tv/shows/${id}/ratings`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for rating of movie
 */
function genMovieRatingQuery(id) {
    return `https://api.trakt.tv/movies/${id}/ratings`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for show
 */
function genShow(id) {
    return `https://api.trakt.tv/shows/${id}`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for movie
 */
function genMovie(id) {
    return `https://api.trakt.tv/movies/${id}`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for show summary
 */
function genShowExtended(id) {
    return `https://api.trakt.tv/shows/${id}?extended=full`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for movie summary
 */
function genMovieExtended(id) {
    return `https://api.trakt.tv/movies/${id}?extended=full`;
}

module.exports = {
    genRecShowsQuery,
    genRecMoviesQuery,
    genShowRatingQuery,
    genMovieRatingQuery,
    genShow,
    genMovie,
    genShowExtended,
    genMovieExtended,
    getPopShows: 'https://api.trakt.tv/shows/popular',
    getPopMovies: 'https://api.trakt.tv/movies/popular'
};
