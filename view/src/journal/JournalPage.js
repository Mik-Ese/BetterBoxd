import { useState, useCallback, useEffect } from 'react';
import JournalReview from './JournalReview';
import AlertDialogSlide from './reviewPopUp';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { baseURL } from '../consts/consts.js';
import CircularProgress from '@mui/material/CircularProgress';

const JournalPage = ({ user }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviewPageOpen, setReviewPageOpen] = useState(false);
    const [JournalReviews, setJournalReview] = useState([]);
    const [viewableJournalReviews, setViewableJournalReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getJournalEntries = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(
            `${baseURL}/get-journal-entries?user_id=${user._id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                let newJournalReviews = [];
                data.entries.map((data) => {
                    newJournalReviews.push({
                        imgLink: data.url,
                        title: data.movie_title,
                        movie_review: data.description
                    });
                });

                setJournalReview(newJournalReviews);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getJournalEntries();
    }, [user]);

    useEffect(() => {
        initializeJournalReviews();
    }, [JournalReviews]);

    const initializeJournalReviews = () => {
        let newArr = [];
        for (
            let i = currentIndex;
            i < currentIndex + 4 && i < JournalReviews.length;
            i++
        ) {
            newArr.push(JournalReviews[i]);
        }
        setViewableJournalReviews(newArr);
    };

    const updateViewableJournalReviews = useCallback(() => {
        let newArr = [];
        for (
            let i = currentIndex;
            i < currentIndex + 4 && i < JournalReviews.length;
            i++
        ) {
            newArr.push(JournalReviews[i]);
        }
        setViewableJournalReviews(newArr);
    }, [currentIndex]);
    useEffect(() => {
        updateViewableJournalReviews();
    }, [updateViewableJournalReviews]);

    const reviewFactory = () => {
        let journalEntries = [];
        for (let i = 0; i < viewableJournalReviews.length; i++) {
            let review = viewableJournalReviews[i];
            journalEntries.push(<JournalReview {...{ review }} />);
        }

        return journalEntries;
    };
    return (
        <div>
            {isLoading ? (
                <>
                <CircularProgress
                        fontSize="large"
                        style={{ marginTop: '25%'}}
                    />
                    {getJournalEntries()}
                </>
            ) : (
                <>
                <div>
            <div className="Journal-Page-Header-Text">
                <h1 className="display-1 Journal-Review-Text text-primary mt-2">
                    <div d-inline-flex flex-row justify-content-center p-2 m-3>
                        <span className="text-dark"> Your </span>{' '}
                        <span className="text-dark"> Movie </span>
                        <span className="text-dark"> Journal  &#127871;</span>
                    </div>
        
                    <div class="d-inline-flex flex-row justify-content-center p-3">
                        <button
                            type="button"
                            class="btn-outline-primary btn m-4 p-3"
                            onClick={() => {
                                setReviewPageOpen(true);
                            }}
                        >
                            Write a review
                        </button>
                        <div>
                            {reviewPageOpen ? (
                                <div>
                                    <AlertDialogSlide
                                        {...{ setReviewPageOpen, user, getJournalEntries }}
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <button
                            type="button"
                            class="btn-outline-danger btn m-4 px-5"
                            onClick={() => {
                                if (currentIndex - 1 >= 0)
                                    setCurrentIndex(currentIndex - 1);
                            }}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            class="btn-outline-success btn m-4 px-5"
                            onClick={() => {
                                if (
                                    currentIndex + 1 <
                                    JournalReviews.length - 3
                                )
                                    setCurrentIndex(currentIndex + 1);
                            }}
                        >
                           Next
                        </button>
                        
                    </div>
                    <div
                        className="reviewed-movie-image-container my-journal-reviews d-inline-flex flex-row justify-content-center"
                        style={{
                            diplay: 'flex',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}
                    >
                        {reviewFactory()}
                    </div>
                </h1>
            </div>
        </div>
                </>
            )}
        </div>
        
    );
};

export default JournalPage;
