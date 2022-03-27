import { useState } from "react";

const JournalReview = (review) => {

    return (
        <div className="App">
            <div className="text-dark">
            </div>
            <div class="d-inline-flex flex-row justify-content-center">
                <div class="card align-middle border-0 p-0" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src={review.review.imgLink} class="card-img-top rounded" style={{ height: "15rem", width: "11rem" }} alt="..." />
                        <h5 class="card-title fs-5 mt-3 text-dark text-bold">{review.review.title}</h5>
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
