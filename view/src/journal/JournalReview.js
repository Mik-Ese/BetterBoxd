import { useState } from "react";

const JournalReview = (review) => {

    return (
        <div className="App">
            <div className="text-dark">
            </div>
            <div class="d-inline-flex flex-row justify-content-center">
                <div class="card align-middle border-0 p-0" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src={review.review.imgLink} class="card-img-top rounded" style={{ height: "30rem", width: "22rem" }} alt="..." />
                        <h5 class="card-title fs-3 mt-3 text-danger text-bold">{review.review.title}</h5>
                        <p class="card-text text-dark fs-5">Your Review:</p>
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
