import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "./styles/searchBar.css";

const SearchBar = () => {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [popular, setPopular] = useState("");

  const changeYear = (props) => {
    setYear(props.target.value);
  };

  const changeGenre = (props) => {
    setGenre(props.target.value);
  };
  
  const changePopular = (props) => {
    setPopular(props.target.value);
  };

  return (
    <div className="search-bar-dropdowns">
      <FormControl className="search-movie-dropdown" fullWidth>
        <InputLabel>Genre</InputLabel>
        <Select
          className="search-movie-genre-dropdown"
          value={genre}
          label="Genre"
          onChange={changeGenre}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Action"}>Action</MenuItem>
          <MenuItem value={"Adventure"}>Adventure</MenuItem>
          <MenuItem value={"Animation"}>Animation</MenuItem>
          <MenuItem value={"Comedy"}>Comedy</MenuItem>
          <MenuItem value={"Crime"}>Crime</MenuItem>
          <MenuItem value={"Documentary"}>Documentary</MenuItem>
          <MenuItem value={"Drama"}>Drama</MenuItem>
          <MenuItem value={"Family"}>Family</MenuItem>
          <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
          <MenuItem value={"History"}>History</MenuItem>
          <MenuItem value={"Horror"}>Horror</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Mystery"}>Mystery</MenuItem>
          <MenuItem value={"Romance"}>Romance</MenuItem>
          <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
          <MenuItem value={"Thriller"}>Thriller</MenuItem>
          <MenuItem value={"TV Movie"}>TV Movie</MenuItem>
          <MenuItem value={"War"}>War</MenuItem>
          <MenuItem value={"Western"}>Western</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="search-movie-dropdown" fullWidth>
        <InputLabel>Year</InputLabel>
        <Select
          className="search-movie-year-dropdown"
          value={year}
          label="Year"
          onChange={changeYear}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
          <MenuItem value={"2020"}>2020s</MenuItem>
          <MenuItem value={"2010"}>2010s</MenuItem>
          <MenuItem value={"2000"}>2000s</MenuItem>
          <MenuItem value={"1990"}>1990s</MenuItem>
          <MenuItem value={"1980"}>1980s</MenuItem>
          <MenuItem value={"1970"}>1970s</MenuItem>
          <MenuItem value={"1960"}>1960s</MenuItem>
          <MenuItem value={"1950"}>1950s</MenuItem>
          <MenuItem value={"1940"}>1940s</MenuItem>
          <MenuItem value={"1930"}>1930s</MenuItem>
          <MenuItem value={"1920"}>1920s</MenuItem>
          <MenuItem value={"1910"}>1910s</MenuItem>
          <MenuItem value={"1900"}>1900s</MenuItem>
          <MenuItem value={"1890"}>1890s</MenuItem>
          <MenuItem value={"1880"}>1880s</MenuItem>
          <MenuItem value={"1870"}>1870s</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="search-movie-dropdown" fullWidth>
        <InputLabel>Popular</InputLabel>
        <Select
          className="search-movie-popular-dropdown"
          value={popular}
          label="Popular"
          onChange={changePopular}
        >
          <MenuItem value={"All Time"}>All Time</MenuItem>
          <MenuItem value={"This Year"}>This Year</MenuItem>
          <MenuItem value={"This Month"}>This Month</MenuItem>
          <MenuItem value={"This Week"}>This Week</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchBar;
