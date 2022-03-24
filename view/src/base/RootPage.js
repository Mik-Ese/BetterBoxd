import NavBar from "./NavBar.js";
import JournalPage from "../journal/JournalPage";
import MoviePage from "../movie/MoviePage";
import HomePage from "../home/HomePage";
import ListPage from "../list/ListPage";
import { useState } from "react";
import LoginPage from "../login/LoginPage";
import SignupPage from "../login/SignupPage";

const RootPage = () => {
  const [homePageOpen, setHomePageOpen] = useState(true);
  const [listPageOpen, setListPageOpen] = useState(false);
  const [journalPageOpen, setJournalPageOpen] = useState(false);
  const [moviePageOpen, setMoviePageOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  return (
    <div>
      <NavBar
        {...{
          setLoggedIn,
          setHomePageOpen,
          setListPageOpen,
          setJournalPageOpen,
          setMoviePageOpen,
          homePageOpen,
          listPageOpen,
          journalPageOpen,
          moviePageOpen,
          loggedIn,
          setLoggingIn,
          setSigningUp,
        }}
      />
      {loggingIn ? (
        <>
          <LoginPage {...{ setLoggedIn, setLoggingIn }} />
        </>
      ) : (
        <>
          {signingUp ? (
            <>
              <SignupPage {...{ setSigningUp }} />
            </>
          ) : (
            <>
              {homePageOpen ? <HomePage /> : <></>}
              {listPageOpen ? <ListPage {...{ loggedIn }} /> : <></>}
              {journalPageOpen ? <JournalPage /> : <></>}
              {moviePageOpen ? <MoviePage /> : <></>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RootPage;
