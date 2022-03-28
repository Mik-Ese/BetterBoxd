import { useState } from "react";
import "./homePage.css";
const HomePage = ({ setSigningUp }) => {
  return (
    <div>
      <div
        className="home-page-background-image-container"
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.1), rgba(255,255,255,0)), url('https://media.newyorker.com/photos/617726db3a9f1e32755a7aee/master/pass/Brody-Dispatch.jpg')`
        }}
      />
      <div className="home-page-content">
        <div className="home-page-welcome-text-container">
          <div className="home-page-welcome-text">Welcome to BetterBoxd. Browse</div>
          <div className="home-page-welcome-text">
            movies, make lists, and keep
          </div>
          <div className="home-page-welcome-text">notes on your favourites.</div>
        </div>
        <div
          className="btn btn-lg  btn-outline-light p-2 home-page-sign-up-button"
          onClick={() => {
            setSigningUp(true);
          }}
          style={{ width: "7rem" }}
        >
          Get Started
        </div>
      </div>
    </div>
  );
};

export default HomePage;
