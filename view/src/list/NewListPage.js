import "./styles/NewListPage.css";
import MovieSelection from "./MovieSelection";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewListPage = ({ newListOpen, setNewListOpen }) => {
  
  const [listTitle, setListTitle] = useState("");
  const [summary, setSummary] = useState("");

  const onListTitleChange = (event) => {
    setListTitle(event.target.value);
  }
  const onSummaryChange = (event) => {
    setSummary(event.target.value);
  }
  const closeNewList = () => {
    setNewListOpen(false);
  }

  return (
    <div>
      <div className="icon-bar">
        <div className="back-arrow" onClick={closeNewList}>
          <ArrowBackIcon/>
        </div>
      </div>
      <div className="input-wrapper">
        <TextField
          className="list-title-input"
          id="standard-basic"
          label="List Title"
          variant="standard"
          value={listTitle}
          onChange={onListTitleChange}
          sx={{ n: 1, width: 400}}
        />
      </div>
      <div className="input-wrapper">
        <TextField
          className="summary-input"
          id="standard-multiline-flexible"
          label="Summary"
          multiline
          minRows={6}
          variant="standard"
          value={summary}
          onChange={onSummaryChange}
          sx={{ n: 1, width: 400}}
        />
      </div>
      <div>[Movie Search Here]</div>
      <div><MovieSelection /></div>
    </div>
  );
};

export default NewListPage;