import { useState } from 'react';
import './styles/justReviewed.css';
import { baseURL } from '../consts/consts.js';

const JustReviewed = ({ movieData, setMovieSelected }) => {
    const selectMovie = () => {
        setMovieSelected(movieData.movieID);
    };
    return (
        <div className="just-reviewed-container">
            <div
                className="just-reviewed-image-container"
                onClick={selectMovie}
            >
                <img className="just-reviewed-image" src={movieData.imgLink} />
            </div>
        </div>
    );
};

export default JustReviewed;