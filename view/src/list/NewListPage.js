import './styles/NewListPage.css';
import MovieSelection from './MovieSelection';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { baseURL } from '../consts/consts.js';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
let searchID = 1;
const NewListPage = ({ setNewListOpen, user, getListEntries }) => {
    const [listTitle, setListTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);

    const onListTitleChange = (event) => {
        setListTitle(event.target.value);
    };
    const onSummaryChange = (event) => {
        setSummary(event.target.value);
    };

    const closeNewList = () => {
        setNewListOpen(false);
    };

    const addMovieSelection = (searchResults, i) => {
        var movieSelection = {
            url: searchResults[i].url,
            movieID: searchResults[i].movieID
        };
        for (var i = 0; i < selectedMovies.length; i++) {
            if (selectedMovies[i].movieID === movieSelection.movieID) {
                return;
            }
        }
        setSelectedMovies((oldState) => [...oldState, movieSelection]);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchID++;
            makeSearch(searchID);
        }, 50);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const onSearchChange = (props) => {
        setAnchorEl(props.currentTarget);
        if (props.target.value === '') {
            setSearchResultsOpen(false);
            setSearch('');
            setSearchResults([]);
        } else {
            setSearchResultsOpen(true);
            setSearch(props.target.value);
        }
    };

    const openSearchResults = (props) => {
        if (search !== '') {
            setSearchResultsOpen(true);
        }
    };

    const makeSearch = (id) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/movie-search?movieName=${search}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var results = [];
                data.map((data) => {
                    results.push({
                        title: data.title,
                        year: data.year,
                        movieID: data.trakt_id,
                        url: data.poster
                    });
                });
                if (id === searchID) {
                    setSearchResults(results);
                }
            })
            .catch((error) => {});
    };

    const createListItems = () => {
        let list = [];
        for (let i = 0; i < searchResults.length && i < 10; i++) {
            list.push(
                <div className="search-bar-search-result-item-container">
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={(function (searchResults, i) {
                                return function () {
                                    setSearchResultsOpen(false);
                                    addMovieSelection(searchResults, i);
                                };
                            })(searchResults, i)}
                        >
                            <div className="search-bar-search-result-title">
                                {searchResults[i].title}
                            </div>
                            <div className="search-bar-search-result-year">
                                ({searchResults[i].year})
                            </div>
                        </ListItemButton>
                    </ListItem>
                    {i === searchResults.length - 1 || i === 9 ? (
                        <></>
                    ) : (
                        <Divider className="search-results-divider" />
                    )}
                </div>
            );
        }
        return list;
    };

    //call this function when the 'submit' button is clicked
    //and some movies are selected and a summary and title is written
    const postList = () => {
        var trakt_ids = [];
        selectedMovies.map((data) => {
            trakt_ids.push(data.movieID);
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: summary,
                user_id: user._id,
                title: listTitle,
                trakt_ids: trakt_ids
            })
        };
        fetch(`${baseURL}/post-movie-list`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                getListEntries();
                setNewListOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
        return new Promise((resolve, reject) => {
            resolve('sucessfully posted');
        });
    };

    const closeSearchResults = (props) => {
        if (
            props.target.className !==
            'MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input'
        ) {
            setSearchResultsOpen(false);
        }
    };
    return (
        <div onClick={closeSearchResults}>
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
                    id="standard-basic-list-title"
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
            <div className="movie-search-input" onClick={openSearchResults}>
                <TextField
                    className="search-input"
                    id="standard-basic-list-search"
                    label="Search a Movie to Add"
                    variant="standard"
                    value={search}
                    onChange={onSearchChange}
                    sx={{ n: 1, width: 400 }}
                />
            </div>
            <Popper
                className="search-bar-popper"
                open={searchResultsOpen}
                anchorEl={anchorEl}
            >
                <div className="search-bar-search-results">
                    {searchResults.length === 0 ? (
                        <div className="search-bar-no-results">
                            No matching results found. Please try a different
                            search input.
                        </div>
                    ) : (
                        <List>{createListItems()}</List>
                    )}
                </div>
            </Popper>
            <div>
                <MovieSelection {...{ selectedMovies, setSelectedMovies }} />
            </div>
            <button
                type="button"
                class="btn-outline-success btn m-4 px-5"
                onClick={() => {
                    if (selectedMovies.length > 0) {
                        if (summary !== '') {
                            if (listTitle !== '') {
                                postList().then((value) => {
                                    closeNewList();
                                });
                            }
                        }
                    }
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default NewListPage;
