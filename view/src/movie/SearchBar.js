import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Popper from '@mui/material/Popper';
import './styles/searchBar.css';
import Divider from '@mui/material/Divider';
import { baseURL } from '../consts/consts.js';
let searchID = 1;
const SearchBar = ({
    searchResultsOpen,
    setSearchResultsOpen,
    setMovieSelected
}) => {
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
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
                        movieID: data.trakt_id
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
                            onClick={() => {
                                setMovieSelected(searchResults[i].movieID);
                            }}
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
    return (
        <div className="search-bar-dropdowns">
            <div className="movie-search-input" onClick={openSearchResults}>
                <TextField
                    className="movie-title-input"
                    id="standard-basic"
                    label="Movie Title"
                    variant="standard"
                    onChange={onSearchChange}
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
        </div>
    );
};

export default SearchBar;
