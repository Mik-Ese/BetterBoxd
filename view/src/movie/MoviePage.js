import { useState } from "react";
import SearchBar from "./SearchBar";
import PopularMovie from "./PopularMovie";
import PopularReview from "./PopularReview";
import JustReviewed from "./JustReviewed";
import Divider from "@mui/material/Divider";
import MovieSelectedPage from "./MovieSelectedPage";
import "./styles/baseMovieStyles.css";

const MoviePage = () => {
  const [movieSelected, setMovieSelected] = useState(null);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [data, setData] = useState({
    popularMovies: [
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        numViews: 187000,
        numLists: 37000,
        numLikes: 68000,
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        numViews: 187000,
        numLists: 37000,
        numLikes: 68000,
        movieID: "2",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        numViews: 187000,
        numLists: 37000,
        numLikes: 68000,
        movieID: "3",
      },
    ],
    justReviewed: [
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        movieID: "1",
      },
    ],
    popularReviews: [
      {
        imgLink:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        title: "Turning Red",
        year: "2022",
        authorImg:
          "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
        authorName: "james",
        numStars: 4,
        numComments: 18,
        description:
          "miriam talmiriam talking about boysking about boysmiriam talking about boysmiriam talking about boysmiriam talking about boys",
        numLikes: 6201,
        movieID: "1",
      },
    ],
  });

  const popularMovieFactory = (data) => {
    var movies = [];
    for (var i = 0; i < data.popularMovies.length; i++) {
      var movieData = data.popularMovies[i];
      movies.push(<PopularMovie {...{ movieData, setMovieSelected }} />);
    }
    return <div className="popular-movie-components-container">{movies}</div>;
  };

  const justReviewedFactory = (data) => {
    var reviews = [];
    for (var i = 0; i < data.justReviewed.length; i++) {
      var reviewData = data.justReviewed[i];
      reviews.push(<JustReviewed {...{ reviewData, setMovieSelected }} />);
    }
    return <div className="just-reviewed-components-container">{reviews}</div>;
  };

  const popularReviewFactory = (data) => {
    var reviews = [];
    for (var i = 0; i < data.popularReviews.length; i++) {
      var reviewData = data.popularReviews[i];
      reviews.push(<PopularReview {...{ reviewData, setMovieSelected }} />);
    }
    return <div className="popular-review-components-container">{reviews}</div>;
  };
  const closeSearchResults = (props) => {
    if (
      props.target.className !==
      "MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
    ) {
      setSearchResultsOpen(false);
    }
  };
  return (
    <div className="movie-page-root" onClick={closeSearchResults}>
      {movieSelected !== null ? (
        <div>
          <MovieSelectedPage {...{ movieSelected, setMovieSelected }} />
        </div>
      ) : (
        <div className="movie-page-home">
          <SearchBar {...{ searchResultsOpen, setSearchResultsOpen, setMovieSelected }} />
          <div className="base-movie-subtitle">POPULAR FILMS THIS WEEK</div>
          {popularMovieFactory(data)}
          <div className="base-movie-subtitle">JUST REVIEWED...</div>
          {justReviewedFactory(data)}
          <div className="base-movie-subtitle">POPULAR REVIEWS THIS WEEK</div>
          {popularReviewFactory(data)}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
