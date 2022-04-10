import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MultilineTextFields from './textField';
import SearchAppBar from './search';
import { baseURL } from '../consts/consts.js';
let searchID = 1;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    setReviewPageOpen,
    user,
    getJournalEntries
}) {
    const [open, setOpen] = useState(true);
    const [movieSelected, setMovieSelected] = useState(null);
    const [description, setDescription] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (description !== '') {
            if (movieSelected !== null) {
                postReview().then((value) => {
                    setOpen(false);
                    setReviewPageOpen(false);
                });
            }
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchID++;
            makeSearch(searchID);
        }, 50);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

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
                                setMovieSelected({
                                    movieID: searchResults[i].movieID,
                                    title: searchResults[i].title,
                                    year: searchResults[i].year
                                });
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
    //call this function when the 'submit' button is clicked
    //and a movie is selected and a descriptpion is rwritten
    const postReview = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                user_id: user._id,
                trakt_id: movieSelected.movieID
            })
        };
        fetch(`${baseURL}/post-journal-entry`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                getJournalEntries();
            })
            .catch((error) => {
                console.log(error);
            });
        return new Promise((resolve, reject) => {
            resolve('sucessfully posted');
        });
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="text-center">
                    {'Which movie would you like to review?'}
                </DialogTitle>
                <DialogContent>
                    <SearchAppBar className="mt-5" {...{ setSearch }} />
                    {movieSelected === null ? (
                        <>{search !== '' ? <>{createListItems()}</> : <></>}</>
                    ) : (
                        <div
                            style={{
                                marginLeft: '.5rem',
                                marginTop: '1rem',
                                display: 'flex',
                                backgroundColor: '#ededed',
                                padding: '.7rem',
                                width: '97%',
                                borderRadius: '.5rem',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '.5rem' }}>
                                    Movie Selected:
                                </div>
                                <div
                                    style={{
                                        marginRight: '1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {movieSelected.title} ({movieSelected.year})
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    setMovieSelected(null);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    marginTop: '-.1rem',
                                    marginRight: '.5rem'
                                }}
                            >
                                <DeleteIcon />
                            </div>
                        </div>
                    )}
                    <MultilineTextFields {...{ description, setDescription }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
