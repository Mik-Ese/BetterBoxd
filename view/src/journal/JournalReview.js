import { useState } from "react";
const JournalReview = (review) => {


    return (
        <div className="App">
            <div className="text-primary">
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">
                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src={review.imgLink} class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <div class="card-title display-5">{review.title}</div>
                        <p class="card-text text-primary">Your Review:</p>
                        <div class="card text-md-dark ">{review.movie_review}</div>
                    </div>
                </div>

            </div>
            

        </div>
    );
};

export default JournalReview;
