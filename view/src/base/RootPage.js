import NavBar from "./NavBar.js";
import UserPage from "../user/UserPage";
import MoviePage from "../movie/MoviePage";
import HomePage from "../home/HomePage";
import ListPage from "../list/ListPage";

import { useState } from "react";
const RootPage = ({ setLoggedIn }) => {
  const [homePageOpen, setHomePageOpen] = useState(true);
  const [listPageOpen, setListPageOpen] = useState(false);
  const [userPageOpen, setUserPageOpen] = useState(false);
  const [moviePageOpen, setMoviePageOpen] = useState(false);

  return (
    <div>
      <NavBar
        {...{
          setLoggedIn,
          setHomePageOpen,
          setListPageOpen,
          setUserPageOpen,
          setMoviePageOpen,
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
      {userPageOpen ? (
        <UserPage/>
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
