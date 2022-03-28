import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./styles/popularMovie.css";
const PopularMovie = ({ movieData, setMovieSelected }) => {
  var numViews = movieData.numViews;
  var numLists = movieData.numLists;
  var numLikes = movieData.numLikes;

  if(numViews>=1000){
    numViews /= 1000;
    numViews = Math.round(numViews* 10) / 10 + 'k'
  }
  if(numLikes>=1000){
    numLikes /= 1000;
    numLikes = Math.round(numLikes* 10) / 10 + 'k'
  }
  if(numLists>=1000){
    numLists /= 1000;
    numLists = Math.round(numLists* 10) / 10 + 'k'
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
            <div>{numViews}</div>
          </div>
        </div>
        <div className="popular-movie-item">
          <div className="popular-movie-icon">
            <AutoAwesomeMosaicIcon />
          </div>
          <div className="popular-movie-number">{numLists}</div>
        </div>
        <div className="popular-movie-item">
          <div style={{marginTop: '.1rem', marginRight: '.23rem'}}className="popular-movie-icon">
            <ModeCommentIcon />
          </div>
          <div className="popular-movie-number">{numLikes}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularMovie;
