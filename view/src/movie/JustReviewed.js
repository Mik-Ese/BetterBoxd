import { useState } from 'react';
import './styles/justReviewed.css';
import { baseURL } from '../consts/consts.js';

const JustReviewed = ({ reviewData, setMovieSelected }) => {
    const selectMovie = () => {
        setMovieSelected(reviewData.movieID);
    };
    return (
        <div className="just-reviewed-container">
            <div
                className="just-reviewed-image-container"
                onClick={selectMovie}
            >
                <img className="just-reviewed-image" src={reviewData.imgLink} />
            </div>
        </div>
    );
};

export default JustReviewed;