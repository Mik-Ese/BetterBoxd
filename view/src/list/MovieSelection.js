import "./styles/MovieSelection.css";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const MovieSelection = () => {
  const images = [
    "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", 
    "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_FMjpg_UX1000_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTQ0MTE3OTUwMl5BMl5BanBnXkFtZTcwODg5NjgwNw@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg"
  ]

  const [imagePaths, setImagePaths] = useState([]);

  const removeImage = (imagePath) => {
    setImagePaths((oldState) => oldState.filter((item) => item !== imagePath));
  }

  useEffect(() => {
    setImagePaths(images);
  }, []);

  const movieSelectionFactory = (imagePaths) => {
    var movieSelectionContents = [];
    for (var i = 0; i < imagePaths.length; i++) {
      var imagePath = imagePaths[i];
      movieSelectionContents.push(
      <div className="movie-poster-wrapper">
        <img className="movie-poster" src={imagePath}/>
        <div className="delete-poster" onClick={
          (function(imagePath) {
            return function() {
              removeImage(imagePath);
            }
          })(imagePath)
        }><DeleteForeverIcon /></div>
      </div>
      );
    }
    return <div className="movie-selection">{movieSelectionContents}</div>;
  };

  return (
    <div>
      {movieSelectionFactory(imagePaths)}
    </div>
  );
};

export default MovieSelection;