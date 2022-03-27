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

const JournalPage = ({ user }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviewPageOpen, setReviewPageOpen] = useState(false);
    const [JournalReviews, setJournalReview] = useState([]);
    const [viewableJournalReviews, setViewableJournalReviews] = useState([]);

    //call this function somewhere so it gets executed once when the page loads
    //likely using useEffect()
    const getJournalEntries = () => {
        console.log(user);
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
                console.log(data);
                var newJournalReviews = [];
                data.entries.map((data) => {
                    newJournalReviews.push({
                        imgLink: data.url,
                        title: data.movie_title,
                        movie_review: data.description                     
                    });
                });
             
                console.log("The NEW ARRAY:", newJournalReviews)
                setJournalReview(newJournalReviews);
                //map 'data' to your journal entries here.
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(()=>{
        getJournalEntries();
    },[user])
    useEffect(()=>{
        initializeJournalReviews();
        console.log(viewableJournalReviews)
    },[JournalReviews])
    

    const initializeJournalReviews =() => {
        var newArr = [];
        for (var i = currentIndex; i < currentIndex + 5 && i < JournalReviews.length; i++) {
            newArr.push(JournalReviews[i]);
        }
        setViewableJournalReviews(newArr);
    }

    
    const updateViewableJournalReviews = useCallback(() => {
        var newArr = [];
        for (var i = currentIndex; i < currentIndex + 5 && i < JournalReviews.length; i++) {
            newArr.push(JournalReviews[i]);
        }
        setViewableJournalReviews(newArr);
    }, [currentIndex]);
    useEffect(() => {
        updateViewableJournalReviews();
    }, [updateViewableJournalReviews]);

    const reviewFactory = () => {
        var journalEntries = [];
        for (var i = 0; i < viewableJournalReviews.length; i++) {
            var review = viewableJournalReviews[i];
            journalEntries.push(<JournalReview {...{ review }} />);
        }

        return journalEntries;
    };
    return (

        <div>
            <div className="Journal-Page-Header-Text">
                <h1 className="display-1 Journal-Review-Text text-primary">
                    <div d-inline-flex flex-row justify-content-center p-3 m-5>
                        <span className="text-primary"> Your </span>{' '}
                        <span className="text-warning"> Movie </span>
                        <span className="text-success"> Journal </span>
                    </div>
                    <div className="reviewed-movie-image-container my-journal-reviews d-inline-flex flex-row justify-content-center" style={{diplay: "flex", flexWrap: "wrap", width: "100%"}}>
                        {reviewFactory()}
                    </div>
                    <div class="d-inline-flex flex-row justify-content-center p-3">
                        <button
                            type="button"
                            class="btn-lg btn btn-primary m-4 p-3"
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
                                        {...{ setReviewPageOpen, user }}
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <button
                            type="button"
                            class="btn-lg btn btn-danger m-4 p-3"
                            onClick={() => {
                                if (currentIndex - 1 >= 0)
                                    setCurrentIndex(currentIndex - 1);
                            }}
                        >
                            Toggle Back
                        </button>
                        <button
                            type="button"
                            class="btn-lg btn btn-success m-4 p-3"
                            onClick={() => {
                                if (
                                    currentIndex + 1 <
                                    JournalReviews.length - 4
                                )
                                    setCurrentIndex(currentIndex + 1);
                            }}
                        >
                            Toggle Next
                        </button>
                    </div>
                </h1>
            </div>
        </div>
    );
};

export default JournalPage;
