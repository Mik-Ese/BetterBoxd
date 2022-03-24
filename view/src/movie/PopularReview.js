import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import StarIcon from "@mui/icons-material/Star";

import "./styles/popularReview.css";
const PopularReview = ({ reviewData, setMovieSelected }) => {
  const selectMovie = () => {
    setMovieSelected(reviewData.movieID);
  };
  const createStars = () => {
    let stars = [];
    for (let i = 0; i < reviewData.numStars; i++) {
      stars.push(<StarIcon />);
    }
    return stars;
  };
  const openComments = () => {

  }
  
  return (
    <div className="popular-review-container">
      <div className="popular-review-icon" onClick={selectMovie}>
        <img className="popular-review-image" src={reviewData.imgLink} />
      </div>
      <div className="popular-review-description-container">
        <div className="popular-review-title-container">
          <div className="popular-review-title">{reviewData.title}</div>
          <div className="popular-review-year">{reviewData.year}</div>
        </div>
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
          <div className="popular-review-comments" onClick = {openComments}>
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
          <div className="popular-review-likes-icon">{<FavoriteIcon />}</div>
          <div className="popular-review-likes-text">{reviewData.numLikes}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularReview;
