import { useState } from "react";

const JournalReview = (review) => {

    return (
        <div className="App">
            <div className="text-primary">
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">
                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src={review.review.imgLink} class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <h5 class="card-title display-5 mt-3">{review.review.title}</h5>
                        <p class="card-text text-success fs-4">Your Review:</p>
                        <p class="card-text text-dark fs-4 ">{review.review.movie_review}</p>
                    </div>
                </div>
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">



            </div>
            
        </div>
    );
};

export default JournalReview;
