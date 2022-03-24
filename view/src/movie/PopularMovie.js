import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./styles/popularMovie.css";
const PopularMovie = ({ movieData, setMovieSelected }) => {
  var numViews = movieData.numViews;
  var numLists = movieData.numLists;
  var numLikes = movieData.numLikes;

  if(numViews>=1000){
    numViews /= 1000;
    numViews = Math.round(numViews* 10) / 10;
  }
  if(numLikes>=1000){
    numLikes /= 1000;
    numLikes = Math.round(numLikes* 10) / 10;
  }
  if(numLists>=1000){
    numLists /= 1000;
    numLists = Math.round(numLists* 10) / 10;
  }
  const selectMovie = () => {
    setMovieSelected(movieData.movieID);
  }
  return (
    <div className="popular-movie-container">
      <div className="popular-movie-image-container" onClick={selectMovie}>
        <img className="popular-movie-image" src={movieData.imgLink} />
      </div>
      <div className="popular-movie-lower-stats-container">
        <div className="popular-movie-item">
          <div className="popular-movie-icon">
            <VisibilityIcon />
          </div>
          <div className="popular-movie-number">
            <div>{numViews}k</div>
          </div>
        </div>
        <div className="popular-movie-item">
          <div className="popular-movie-icon">
            <AutoAwesomeMosaicIcon />
          </div>
          <div className="popular-movie-number">{numLists}k</div>
        </div>
        <div className="popular-movie-item">
          <div className="popular-movie-icon">
            <FavoriteIcon />
          </div>
          <div className="popular-movie-number">{numLikes}k</div>
        </div>
      </div>
    </div>
  );
};

export default PopularMovie;
