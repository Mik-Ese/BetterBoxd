import { useState } from "react";
import SearchBar from './SearchBar';
import PopularMovies from './PopularMovies';
import MovieReviews from './MovieReviews';

import "./styles/baseMovieStyles.css";
const MoviePage = () => {
  return (
    <div className="movie-page-root">
      <SearchBar />
      <div className="base-movie-subtitle">POPULAR FILMS THIS WEEK</div>
      <PopularMovies />
      <div className="base-movie-subtitle">POPULAR REVIEWS THIS WEEK</div>
      <MovieReviews />
    </div>
  );
};

export default MoviePage;
