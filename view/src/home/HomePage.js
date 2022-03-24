import { useState } from "react";
import "./homePage.css";
const HomePage = ({ setSigningUp }) => {
  return (
    <div>
      <div
        className="home-page-background-image-container"
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.1), rgba(255,255,255,0)), url('https://deadline.com/wp-content/uploads/2022/03/batman-5-e1646492922697.jpeg?crop=455px%2C0px%2C4699px%2C2635px&resize=681%2C383')`,
        }}
      />
      <div className="home-page-content">
        <div className="home-page-welcome-text-container">
          <div className="home-page-welcome-text">Welcome to BetterBoxd.</div>
          <div className="home-page-welcome-text">
            Browse movies, and write about
          </div>
          <div className="home-page-welcome-text">the ones you loved.</div>
        </div>
        <div
          className="btn btn-outline-success home-page-sign-up-button"
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
