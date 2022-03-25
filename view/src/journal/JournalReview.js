import { useState } from "react";
const JournalReview = () => {

    return (
        <div className="App">
            <div className="text-primary">
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">
                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src="https://coolhdwall.com/storage/202105/the-batman-movie-hd-phone-wallpaper-1080x1920.jpg" class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <h5 class="card-title display-5">The Batman</h5>
                        <p class="card-text text-primary">Your Review:</p>
                        <p class="card text-md-dark ">Batman is cool, I really loved this movie! Gotham is portrayed in a totally different light very different to the Nolan films.</p>
                    </div>
                </div>
                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/91D1tVKccBL.jpg" class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <h5 class="card-title display-5">The French Dispath</h5>
                        <p class="card-text text-primary">Your Review:</p>
                        <p class="card text-md-dark ">French elegance at its finest, this is one of Andersons' best work and completely captures the aestetic of rural France via it's depection of the fictional town "Enueui"</p>
                    </div>
                </div>

                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg" class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <h5 class="card-title display-5">Avengers Endgame</h5>
                        <p class="card-text text-primary">Your Review:</p>
                        <p class="card">Best marvel movie every made, need I say more!</p>
                    </div>
                </div>
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">

            <button type="button" class="btn-lg btn btn-primary m-4 p-3">Write a review</button>
            <button type="button" class="btn-lg btn btn-success m-4 p-3">Toggle Next</button>


            </div>
            

        </div>
    );
};

export default JournalReview;
