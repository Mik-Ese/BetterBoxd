import { useState, useCallback, useEffect } from "react";
import JournalReview from './JournalReview';
import AlertDialogSlide from "./reviewPopUp";
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';


const JournalPage = () => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewPageOpen, setReviewPageOpen] = useState(false);

  const [JournalReviews, setJournalReview] = useState([
    {
      imgLink: "https://m.media-amazon.com/images/M/MV5BYTExZTdhY2ItNGQ1YS00NjJlLWIxMjYtZTI1MzNlMzY0OTk4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
      title: "The Batman",
      movie_review: "This was a really good movie, I thoroughly enjoyed it! I love the Batman"
    },
    {
      imgLink: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/d1pklzbuyaab0la-1552597012.jpg",
      title: "Avengers Endgame",
      movie_review: "Greatest Marvel Movie ever!"

    },
    {
      imgLink: "https://www.joblo.com/wp-content/uploads/2014/11/paddington_bear_ver6_xxlg-1.jpg",
      title: "Paddington",
      movie_review: "Cute Bear"
    },
    {
      imgLink: "https://m.media-amazon.com/images/M/MV5BOGUwYTU4NGEtNDM4MS00NDRjLTkwNmQtOTkwMWMyMjhmMjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      title: "Fantastic Mr. Fox",
      movie_review: "Foxes"
    }

  ]);

  const [threeJournalReviews, setThreeJournalReviews] = useState([[JournalReviews[0]], [JournalReviews[1]], [JournalReviews[2]]])
  const updateThreeJournalReviews = useCallback(() => {
    var newArr = []
    for (var i = currentIndex; i < currentIndex + 3; i++) {
      newArr.push(JournalReviews[i])
    }
    setThreeJournalReviews(newArr)
  }, [currentIndex]
  )
  useEffect(() => {
    updateThreeJournalReviews();
  }, [updateThreeJournalReviews])

  const reviewFactory = () => {

    var journalEntries = [];
    for (var i = 0; i < threeJournalReviews.length; i++) {
      var review = threeJournalReviews[i];
      journalEntries.push(<JournalReview {...{ review }} />);
    }

    return journalEntries;

  };


  return (
    <div>
      <div className="Journal-Page-Header-Text">
        <h1 className="display-1 Journal-Review-Text text-primary">
          <div d-inline-flex flex-row justify-content-center p-3 m-5>
            <span className="text-primary"> Your </span>  <span className="text-warning"> Movie </span>
            <span className="text-success"> Journal </span></div>
          <div className="my-journal-reviews d-inline-flex flex-row justify-content-center p-3">{reviewFactory()}</div>
          <div class="d-inline-flex flex-row justify-content-center p-3">
            <button type="button" class="btn-lg btn btn-primary m-4 p-3" onClick={() => { setReviewPageOpen(true); }}>Write a review</button>
            <div>
              {reviewPageOpen ? (
                <div><AlertDialogSlide{...{setReviewPageOpen}} /></div>
              ) : (
                <div></div>
              )}
            </div>
            <button type="button" class="btn-lg btn btn-danger m-4 p-3" onClick={() => {

              if (currentIndex - 1 >= 0)
                setCurrentIndex(currentIndex - 1)


            }
            }>Toggle Back</button>
            <button type="button" class="btn-lg btn btn-success m-4 p-3" onClick={() => {

              if (currentIndex + 1 < JournalReviews.length - 2)
                setCurrentIndex(currentIndex + 1)


            }
            }>Toggle Next</button>

          </div>

        </h1>
      </div>
    </div>
  );

};





export default JournalPage;
