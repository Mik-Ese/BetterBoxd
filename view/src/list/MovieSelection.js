import "./styles/MovieSelection.css";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const MovieSelection = ({ selectedMovies, setSelectedMovies }) => {

  const removeMovieSelection = (movieID) => {
    setSelectedMovies(
      (oldState) => oldState.filter((item) => item.movieID !== movieID)
    );
  }

  const movieSelectionFactory = (selectedMovies) => {
    var movieSelectionContents = [];
    for (var i = 0; i < selectedMovies.length; i++) {
      var url = selectedMovies[i].url;
      var movieID = selectedMovies[i].movieID;
      movieSelectionContents.push(
      <div className="movie-poster-wrapper">
        <img className="movie-poster" src={url}/>
        <div className="delete-poster" onClick={
          (function(movieID) {
            return function() {
              removeMovieSelection(movieID);
            }
          })(movieID)
        }><DeleteForeverIcon /></div>
      </div>
      );
    }
    return <div className="movie-selection">{movieSelectionContents}</div>;
  };

  return (
    <div>
      {movieSelectionFactory(selectedMovies)}
    </div>
  );
};

export default MovieSelection;