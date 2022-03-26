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

/**
 * @param {string} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for movie rating distribution
 */
function genMovieRatingDistributionQuery(id) {
    return `https://api.trakt.tv/movies/${id}/ratings`;
}

/**
 * @param {string} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for a movie's comments
 */
function genMovieCommentsQuery(id) {
    return `https://api.trakt.tv/movies/${id}/comments/likes`;
}

/**
 * @param {string} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for a movie's stats
 */
function genMovieStatsQuery(id) {
    return `https://api.trakt.tv/movies/${id}/stats`;
}

/**
 * @param {string} id - Trakt ID, Trakt slug, or IMDB ID
 * @returns API query string for a movie's cast and crew
 */
function genMoviePeopleQuery(id) {
    return `https://api.trakt.tv/movies/${id}/people`;
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
    genMovieRatingDistributionQuery,
    genMovieCommentsQuery,
    genMovieStatsQuery,
    genMoviePeopleQuery,
    getTrendingMovieReviewsQuery:
        'https://api.trakt.tv/comments/trending/reviews/movies?include_replies=false',
    getPopShows: 'https://api.trakt.tv/shows/popular',
    getPopMovies: 'https://api.trakt.tv/movies/popular'
};
