import { useState } from 'react';
import SearchBar from './SearchBar';
import PopularMovie from './PopularMovie';
import PopularReview from './PopularReview';
import JustReviewed from './JustReviewed';
import Divider from '@mui/material/Divider';
import MovieSelectedPage from './MovieSelectedPage';
import './styles/baseMovieStyles.css';
import { baseURL } from '../consts/consts.js';
import CircularProgress from '@mui/material/CircularProgress';

const MoviePage = ({ movieSelected, setMovieSelected }) => {
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);
    const [mostWatchedMovies, setMostWatchedMovies] = useState([]);
    const [makingQueries, setMakingQueries] = useState(false);
    const [popularReviews, setPopularReviews] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getPopularMovies = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/get-most-watched-movies`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var newPopMovies = [];
                data.map((data) => {
                    newPopMovies.push({
                        imgLink: data.url,
                        numViews: data.watchers,
                        numLists: data.no_of_lists,
                        numLikes: data.no_of_comments,
                        movieID: data.trakt_id
                    });
                });
                setIsLoading(false);
                setPopularMovies(newPopMovies);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getMostWatchedMovies = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/get-popular-movies`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var newWatchedMovies = [];
                data.map((data) => {
                    newWatchedMovies.push({
                        imgLink: data.url,
                        movieID: data.trakt_id
                    });
                });
                setMostWatchedMovies(newWatchedMovies);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getPopularReviews = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/trending-movie-reviews`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var newPopReviews = [];
                data.map((data) => {
                    newPopReviews.push({
                        authorName: data.author,
                        imgLink: data.url,
                        title: data.title,
                        year: data.year,
                        numStars: data.rating,
                        numComments: data.replies,
                        description: data.comment,
                        numLikes: data.likes,
                        movieID: data.trakt_id
                    });
                });
                setPopularReviews(newPopReviews);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const popularMovieFactory = () => {
        var movies = [];
        for (var i = 0; i < popularMovies.length && i < 6 /*temporary*/; i++) {
            var movieData = popularMovies[i];
            movies.push(<PopularMovie {...{ movieData, setMovieSelected }} />);
        }
        return (
            <div className="popular-movie-components-container">{movies}</div>
        );
    };

    const justReviewedFactory = () => {
        var movies = [];
        for (var i = 0; i < mostWatchedMovies.length && i < 6; i++) {
            var movieData = mostWatchedMovies[i];
            movies.push(<JustReviewed {...{ movieData, setMovieSelected }} />);
        }
        return (
            <div className="just-reviewed-components-container">{movies}</div>
        );
    };

    const popularReviewFactory = () => {
        var reviews = [];
        for (var i = 0; i < popularReviews.length; i++) {
            var reviewData = popularReviews[i];
            reviews.push(
                <>
                    <div
                        style={{
                            width: '100%',
                            marginBottom: '.5rem',
                            marginTop: '-.5rem'
                        }}
                    >
                        <Divider />
                    </div>
                    <PopularReview {...{ reviewData, setMovieSelected }} />
                </>
            );
        }
        return (
            <div className="popular-review-components-container">{reviews}</div>
        );
    };
    const closeSearchResults = (props) => {
        if (
            props.target.className !==
            'MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input'
        ) {
            setSearchResultsOpen(false);
        }
    };
    const makeQueries = () => {
        if (makingQueries === false) {
            getPopularReviews();
            getPopularMovies();
            getMostWatchedMovies();
            setMakingQueries(true);
        }
    };
    return (
        <div className="movie-page-root" onClick={closeSearchResults}>
            {isLoading ? (
                <>
                    <CircularProgress
                        fontSize="large"
                        style={{ marginTop: '25%', marginLeft: '48%' }}
                    />
                    {makeQueries()}
                </>
            ) : (
                <>
                    {movieSelected !== null ? (
                        <div>
                            <MovieSelectedPage
                                {...{ movieSelected, setMovieSelected }}
                            />
                        </div>
                    ) : (
                        <div className="movie-page-home">
                            <SearchBar
                                {...{
                                    searchResultsOpen,
                                    setSearchResultsOpen,
                                    setMovieSelected
                                }}
                            />
                            <div className="base-movie-subtitle">
                                POPULAR FILMS THIS WEEK
                            </div>
                            {popularMovieFactory()}
                            <div className="base-movie-subtitle">
                                MOST WATCHED MOVIES THIS WEEK
                            </div>
                            {justReviewedFactory()}
                            <div className="base-movie-subtitle">
                                POPULAR REVIEWS THIS WEEK
                            </div>
                            {popularReviewFactory()}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MoviePage;
