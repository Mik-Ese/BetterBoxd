import './styles/ListPage.css';
import ListItem from './ListItem.js';
import ListSelectedPage from './ListSelectedPage.js';
import NewListPage from './NewListPage.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { baseURL } from '../consts/consts.js';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
const stringSimilarity = require('string-similarity');

const ListPage = ({ user, loggedIn, setMovieSelected }) => {
    const [listSelected, setListSelected] = useState(null);
    const [newListOpen, setNewListOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // change to true when you actually do it prop
    const [listEntries, setListEntries] = useState([]);
    const [listSearch, setListSearch] = useState('');
    const [visibleListEntries, setVisibleListEntries] = useState([]);
    useEffect(() => {
        if (listSearch === '') {
            setVisibleListEntries(listEntries);
        } else {
            let mappedListEntries = listEntries.map((data) => {
                return {
                    listTitle: data.listTitle,
                    user: data.user,
                    description: data.description,
                    movies: data.movies,
                    similarity: stringSimilarity.compareTwoStrings(
                        listSearch,
                        data.listTitle
                    )
                };
            });
            let sortedListEntries = mappedListEntries.sort(function (a, b) {
                if (a.similarity < b.similarity) {
                    return 1;
                } else return -1;
            });
            setVisibleListEntries(sortedListEntries);
        }
    }, [listSearch]);

    const changeListSearch = (event) => {
        setListSearch(event.target.value);
    };
    const getListEntries = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/get-all-movie-lists`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                var newListItems = [];
                data.entries.map((data) => {
                    var newMovies = [];
                    data.trakt_ids.map((data) => {
                        newMovies.push({
                            movieTitle: 'to be implemented',
                            url: data.url,
                            movieID: data.trakt_id
                        });
                    });
                    newListItems.push({
                        listTitle: data.title,
                        user: data.username,
                        description: data.description,
                        movies: newMovies
                    });
                });
                newListItems = newListItems.reverse();
                setListEntries(newListItems);
                setVisibleListEntries(newListItems);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const listItemFactory = () => {
        var listItemContents = [];
        listItemContents.push(<hr className="divider" />);
        for (var i = 0; i < visibleListEntries.length; i++) {
            var listData = visibleListEntries[i];
            listItemContents.push(
                <ListItem {...{ listData, setListSelected }} />
            );
            listItemContents.push(<hr className="divider" />);
        }
        return (
            <div className="list-item-components-container">
                {listItemContents}
            </div>
        );
    };

    const makeQueries = () => {
        if (listEntries.length == 0) {
            getListEntries();
        }
    };

    const openNewList = () => {
        setNewListOpen(true);
    };

    return (
        <div className="list-page-root">
            {isLoading ? (
                <>
                    <CircularProgress
                        fontSize="large"
                        style={{ marginTop: '25%' }}
                    />
                    {makeQueries()}
                </>
            ) : (
                <>
                    {listSelected != null ? (
                        <div>
                            <ListSelectedPage
                                {...{
                                    listSelected,
                                    setListSelected,
                                    setMovieSelected
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            {newListOpen ? (
                                <div>
                                    <NewListPage
                                        {...{
                                            newListOpen,
                                            setNewListOpen,
                                            user,
                                            getListEntries
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="list-page-home">
                                    {!loggedIn ? ( //change back later
                                        <></>
                                    ) : (
                                        <div
                                            className="add-list-button"
                                            onClick={openNewList}
                                        >
                                            <AddCircleIcon /> Add List
                                        </div>
                                    )}
                                    <div>
                                        <div className="input-wrapper">
                                            <TextField
                                                className="list-title-input"
                                                id="standard-basic"
                                                label="Search Lists"
                                                variant="standard"
                                                style={{
                                                    marginTop: '1rem',
                                                    marginBottom: '1rem',
                                                    width: '80%'
                                                }}
                                                value={listSearch}
                                                onChange={changeListSearch}
                                                sx={{ n: 1, width: 400 }}
                                            />
                                        </div>
                                        {listItemFactory()}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ListPage;
