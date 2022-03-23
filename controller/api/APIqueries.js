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
function genShowQuery(id) {
    return `https://api.trakt.tv/shows/${id}`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for movie
 */
function genMovieQuery(id) {
    return `https://api.trakt.tv/movies/${id}`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for show summary
 */
function genShowExtendedQuery(id) {
    return `https://api.trakt.tv/shows/${id}?extended=full`;
}

/**
 * @param {*} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for movie summary
 */
function genMovieExtendedQuery(id) {
    return `https://api.trakt.tv/movies/${id}?extended=full`;
}

/**
 * @param {*} key - API key from fanart.tv
 * @param {*} mediaType - "movies" or "tv"
 * @param {*} id - media ID from TVDB <- MOST COMPATIBLE (NOT IMDB or TMDB)
 */
function genArtQuery(key, mediaType, id) {
    return `https://webservice.fanart.tv/v3/${mediaType}/${id}?api_key=${key}`;
}

/**
 * @param {string} text - movie name
 * @returns API query string for movie summary
 */
function genMovieSearchQuery(text) {
    return `https://api.trakt.tv/search/movie?query=${text}`;
}

module.exports = {
    genRecShowsQuery,
    genRecMoviesQuery,
    genShowRatingQuery,
    genMovieRatingQuery,
    genShowQuery,
    genMovieQuery,
    genShowExtendedQuery,
    genMovieExtendedQuery,
    genArtQuery,
    genMovieSearchQuery,
    getPopShows: 'https://api.trakt.tv/shows/popular',
    getPopMovies: 'https://api.trakt.tv/movies/popular'
};
