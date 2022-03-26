import { useEffect, useState } from 'react';
import './styles/movieSelectedPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { baseURL } from '../consts/consts.js';
const MovieSelectedPage = ({ movieSelected, setMovieSelected }) => {
    const [data, setData] = useState({
        title: '',
        director: '',
        imgLink: '',
        backgroundLink: '',
        description: '',
        views: '',
        lists: '',
        likes: '',
        cast: [],
        reviews: [],
        ratings: []
    });

    var totalRatings = 0;
    for (var i = 0; i < 10; i++) {
        totalRatings += data.ratings[i];
    }
    const getMovieInfo = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/get-movie-page?id=${movieSelected}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let director = 'No Director';
                var cast = [];
                console.log(data.people.directing.length);
                for (var i = 0; i < data.people.directing.length; i++) {
                    console.log(data.people.directing);
                    if (data.people.directing[i].job === 'Director') {
                        director = data.people.directing[i].person.name;
                    }
                }
                for (var i = 0; i < data.people.cast.length && i < 8; i++) {
                    cast.push(data.people.cast[i].person.name);
                }
                let ratingDist = [];
                ratingDist.push(data.ratingDistribution.distribution['1']);
                ratingDist.push(data.ratingDistribution.distribution['2']);
                ratingDist.push(data.ratingDistribution.distribution['3']);
                ratingDist.push(data.ratingDistribution.distribution['4']);
                ratingDist.push(data.ratingDistribution.distribution['5']);
                ratingDist.push(data.ratingDistribution.distribution['6']);
                ratingDist.push(data.ratingDistribution.distribution['7']);
                ratingDist.push(data.ratingDistribution.distribution['8']);
                ratingDist.push(data.ratingDistribution.distribution['9']);
                ratingDist.push(data.ratingDistribution.distribution['10']);

                setData({
                    title: data.movieExtended.title,
                    director: director,
                    imgLink: data.movieExtended.url,
                    backgroundLink: data.background,
                    description: data.movieExtended.overview,
                    views: data.stats.watchers,
                    lists: data.stats.lists,
                    likes: data.stats.votes,
                    cast: cast,
                    reviews: data.comments.map((comment) => {
                        return {
                            authorName: comment.author,
                            numStars: comment.rating,
                            description: comment.comment,
                            numLikes: comment.likes,
                            numComments: comment.replies
                        };
                    }),
                    ratings: ratingDist
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createCast = () => {
        var cast = [];
        for (var i = 0; i < data.cast.length; i++) {
            cast.push(
                <div className="movie-selected-page-cast-item">
                    {data.cast[i]}
                </div>
            );
        }
        return cast;
    };

    const createReviews = () => {
        var reviews = [];
        for (var i = 0; i < data.reviews.length; i++) {
            let reviewData = data.reviews[i];
            reviews.push(<Review {...{ reviewData }} />);
        }
        return reviews;
    };

    const unselectMovie = () => {
        setMovieSelected(null);
    };

    useEffect(() => {
        getMovieInfo();
    }, [movieSelected]);
    return (
        <div className="movie-selected-page-container">
            <div
                className="movie-selected-page-background-image-container"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.1), rgba(255,255,255,0)), url('${data.backgroundLink}'`
                }}
            >
                <div
                    className="movie-selected-page-back-button"
                    onClick={unselectMovie}
                >
                    <ArrowBackIcon />
                </div>
            </div>
            <div className="movie-selected-page-content">
                <div className="movie-selected-page-left">
                    <div className="movie-selected-page-image-container">
                        <img
                            className="movie-selected-page-image"
                            src={data.imgLink}
                        />
                    </div>
                    <div className="movie-selected-page-image-details">
                        <div className="movie-selected-page-icon">
                            <VisibilityIcon />
                        </div>
                        <div className="movie-selected-page-detail-number">
                            {Math.round(data.views / 1000) / 10}k
                        </div>
                        <div className="movie-selected-page-icon">
                            <AutoAwesomeMosaicIcon />
                        </div>
                        <div classNmae="movie-selected-page-detail-number">
                            {Math.round(data.lists / 1000) / 10}k
                        </div>
                        <div className="movie-selected-page-icon">
                            <FavoriteIcon />
                        </div>
                        <div classNmae="movie-selected-page-detail-number">
                            {Math.round(data.likes / 1000) / 10}k
                        </div>
                    </div>
                </div>
                <div className="movie-selected-page-right">
                    <div className="movie-selected-page-heading">
                        <div className="movie-selected-page-title">
                            {data.title}
                        </div>
                        <div className="movie-selected-page-year">
                            {data.year}
                        </div>
                        <div className="movie-selected-page-directed-by-text">
                            Directed by
                        </div>
                        <div className="movie-selected-page-director">
                            {data.director}
                        </div>
                    </div>
                    <div className="movie-selected-page-description">
                        {data.description}
                    </div>
                    <Divider
                        style={{ marginTop: '1.5rem', marginBottom: '.5rem' }}
                    />
                    <div className="movie-selected-page-cast-container">
                        <div className="movie-selected-page-cast">CAST</div>
                        <div className="movie-selected-page-cast-list">
                            {createCast()}
                        </div>
                    </div>

                    <div className="movie-selected-page-rating-container">
                        <div className="movie-selected-page-rating-heading">
                            <div className="movie-selected-page-rating-title">
                                RATINGS
                            </div>
                            <div className="movie-selected-page-total-ratings">
                                {totalRatings} total ratings
                            </div>
                        </div>
                        <Divider />
                        <BarGraph {...{ data }} />
                    </div>
                    <Divider className="movie-selected-page-review-divider" />
                    <div className="movie-selected-page-reviews">
                        <div className="movie-selected-page-review-title">
                            REVIEWS
                        </div>

                        {createReviews()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BarGraph = ({ data }) => {
    var max = 0;
    var totalRating = 0;
    var totalRatings = 0;
    for (var i = 0; i < 10; i++) {
        if (data.ratings[i] > max) {
            max = data.ratings[i];
        }
        totalRating += (i + 1) * data.ratings[i];
        totalRatings += data.ratings[i];
    }
    totalRating /= totalRatings;
    totalRating = Math.round(totalRating * 10) / 10;

    const createBars = () => {
        var height = 8;
        var bars = [];
        for (var i = 0; i < 10; i++) {
            height = 7 * (data.ratings[i] / max);
            bars.push(<Bar {...{ height }} />);
        }
        return bars;
    };
    return (
        <div className="movie-selected-page-bar-graph-container">
            <div className="movie-selected-page-bar-graph-one-star">
                <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
            </div>
            {createBars()}
            <div className="movie-selected-page-bar-graph-right">
                <div className="movie-selected-page-average-rating">
                    {totalRating}
                </div>
                <div className="movie-selected-page-bar-graph-ten-stars">
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                    <StarIcon sx={{ color: 'rgb(91, 255, 85)' }} />
                </div>
            </div>
        </div>
    );
};

const Bar = ({ height }) => {
    const heightText = height + 'rem';
    return (
        <div
            className="movie-selected-page-bar-graph-bar"
            style={{ height: heightText, marginTop: '-' + heightText }}
        ></div>
    );
};

const Review = ({ reviewData }) => {
    const createStars = () => {
        let stars = [];
        for (let i = 0; i < reviewData.numStars; i++) {
            stars.push(<StarIcon />);
        }
        return stars;
    };
    return (
        <div className="movie-selected-review-container">
            <div className="popular-review-description-container">
                <div className="popular-review-info">
                    <div className="popular-review-author-image-container">
                        <img
                            className="popular-review-author-image"
                            src={reviewData.authorImg}
                        />
                    </div>
                    <div className="popular-review-author-name">
                        {reviewData.authorName}
                    </div>
                    <div className="popular-review-stars">{createStars()}</div>
                    <div className="popular-review-comments">
                        <div className="popular-review-comment-icon">
                            <ModeCommentIcon />
                        </div>
                        <div className="popular-review-comment-number">
                            {reviewData.numComments}
                        </div>
                    </div>
                </div>
                <div className="popular-review-description">
                    {reviewData.description}
                </div>
                <div className="popular-review-likes-container">
                    <div className="popular-review-likes-icon">
                        {<FavoriteIcon />}
                    </div>
                    <div className="popular-review-likes-text">
                        {reviewData.numLikes}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSelectedPage;
