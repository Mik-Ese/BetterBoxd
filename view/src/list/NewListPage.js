import './styles/NewListPage.css';
import MovieSelection from './MovieSelection';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { baseURL } from '../consts/consts.js';

const NewListPage = ({ setNewListOpen, user }) => {
    const [listTitle, setListTitle] = useState('');
    const [summary, setSummary] = useState('');

    const onListTitleChange = (event) => {
        setListTitle(event.target.value);
    };
    const onSummaryChange = (event) => {
        setSummary(event.target.value);
    };
    const closeNewList = () => {
        setNewListOpen(false);
    };
    //call this function when the 'submit' button is clicked
    //and some movies are selected and a summary and title is written
    const postList = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: /*description here,*/ 'temp',
                user_id: user._id,
                title: /*title here*/ 'title',
                trakt_ids: /*ids here*/ []
            })
        };
        fetch(`${baseURL}/post-movie-list`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //close the tab here now
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <div className="icon-bar">
                <div className="back-arrow" onClick={closeNewList}>
                    <ArrowBackIcon />
                </div>
            </div>
            <div className="title">
                <b>Add a New List</b>
            </div>
            <div className="input-wrapper">
                <TextField
                    className="list-title-input"
                    id="standard-basic"
                    label="List Title"
                    variant="standard"
                    value={listTitle}
                    onChange={onListTitleChange}
                    sx={{ n: 1, width: 400 }}
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
                    sx={{ n: 1, width: 400 }}
                />
            </div>
            <div>[Movie Search Here]</div>
            <div>
                <MovieSelection />
            </div>
        </div>
    );
};

export default NewListPage;
