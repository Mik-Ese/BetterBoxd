import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./styles/searchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const onSearchChange = (props) => {
    setSearch(props.target.value);
    //make search with 'search'
  };
  return (
    <div className="search-bar-dropdowns">
      <div className="movie-search-input">
        <TextField
          className="movie-title-input"
          id="standard-basic"
          label="Movie Title"
          variant="standard"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;