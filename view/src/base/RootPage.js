import NavBar from "./NavBar.js";
import JournalPage from "../journal/JournalPage";
import MoviePage from "../movie/MoviePage";
import HomePage from "../home/HomePage";
import ListPage from "../list/ListPage";
import { useState } from "react";

const RootPage = ({ setLoggedIn }) => {
  const [homePageOpen, setHomePageOpen] = useState(true);
  const [listPageOpen, setListPageOpen] = useState(false);
  const [journalPageOpen, setJournalPageOpen] = useState(false);
  const [moviePageOpen, setMoviePageOpen] = useState(false);
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
          moviePageOpen
        }}
      />
      {homePageOpen ? (
        <HomePage/>
      ): (
        <></>
      )}
      {listPageOpen ? (
        <ListPage/>
      ): (
        <></>
      )}
      {journalPageOpen ? (
        <JournalPage/>
      ): (
        <></>
      )}
      {moviePageOpen ? (
        <MoviePage/>
      ): (
        <></>
      )}
    </div>
  );
};

export default RootPage;
