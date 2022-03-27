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

const MoviePage = () => {
    const [movieSelected, setMovieSelected] = useState(null);
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);
    const [data, setData] = useState({
        popularMovies: [
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                numViews: 187000,
                numLists: 37000,
                numLikes: 68000,
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                numViews: 187000,
                numLists: 37000,
                numLikes: 68000,
                movieID: '2'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                numViews: 187000,
                numLists: 37000,
                numLikes: 68000,
                movieID: '3'
            }
        ],
        justReviewed: [
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            },
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                movieID: '1'
            }
        ],
        popularReviews: [
            {
                imgLink:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                title: 'Turning Red',
                year: '2022',
                authorImg:
                    'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
                authorName: 'james',
                numStars: 4,
                numComments: 18,
                description:
                    'miriam talmiriam talking about boysking about boysmiriam talking about boysmiriam talking about boysmiriam talking about boys',
                numLikes: 6201,
                movieID: '1'
            }
        ]
    });
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
        fetch(`${baseURL}/get-popular-movies?period=weekly`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var newPopMovies = [];
                data.map((data) => {
                    newPopMovies.push({
                        imgLink: data.url,
                        numViews: data.watcher_count,
                        numLists: 3,
                        numLikes: 3,
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
                console.log(data);
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
        var reviews = [];
        for (var i = 0; i < data.justReviewed.length; i++) {
            var reviewData = data.justReviewed[i];
            reviews.push(
                <JustReviewed {...{ reviewData, setMovieSelected }} />
            );
        }
        return (
            <div className="just-reviewed-components-container">{reviews}</div>
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
                                JUST REVIEWED...
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
