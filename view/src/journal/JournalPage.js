import { useState } from "react";
import JournalReview from './JournalReview';

const JournalPage = () => {

  return (
    <div>
      <div className="Journal-Page-Header-Text">
        <h1 className="display-1 Journal-Review-Text text-primary">

          <span className="text-primary"> Your </span>  <span className="text-warning"> Movie </span>
          <span className="text-success"> Review </span>

        </h1>
      </div>



      <JournalReview />




    </div>


  );
};

export default JournalPage;
