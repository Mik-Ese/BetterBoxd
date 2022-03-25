import { useState } from "react";
import JournalReview from './JournalReview';

const JournalPage = () => {

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
  }

])

  const reviewFactory = () => {
    
    var journalEntries = [];
    for (var i = 0; i < JournalReviews.length; i++) {
        var review = JournalReviews[i];
        journalEntries.push(<JournalReview {...{review}} />);
    }

    return journalEntries;
   
  };

  return (
    <div>
      <div className="Journal-Page-Header-Text">
        <h1 className="display-1 Journal-Review-Text text-primary">
          <span className="text-primary"> Your </span>  <span className="text-warning"> Movie </span>
          <span className="text-success"> Journal </span> 
          <div className ="my-journal-reviews">{reviewFactory()}</div>
          <div class="d-inline-flex flex-row justify-content-center p-3">
                <button type="button" class="btn-lg btn btn-primary m-4 p-3">Write a review</button>
                <button type="button" class="btn-lg btn btn-success m-4 p-3">Toggle Next</button>
            </div>

        </h1>
      </div>
    </div> 
  );
    
};



  

export default JournalPage;
