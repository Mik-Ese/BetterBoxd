import NavBar from './NavBar.js';
import JournalPage from '../journal/JournalPage';
import MoviePage from '../movie/MoviePage';
import HomePage from '../home/HomePage';
import ListPage from '../list/ListPage';
import { useEffect, useState } from 'react';
import LoginPage from '../login/LoginPage';
import SignupPage from '../login/SignupPage';

const RootPage = () => {
    const [homePageOpen, setHomePageOpen] = useState(true);
    const [listPageOpen, setListPageOpen] = useState(false);
    const [journalPageOpen, setJournalPageOpen] = useState(false);
    const [moviePageOpen, setMoviePageOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [user, setUser] = useState(null);
    const [movieSelected, setMovieSelected] = useState(null);
    useEffect(() => {
        if (movieSelected === null) {
        } else {
            setListPageOpen(false);
            setMoviePageOpen(true);
        }
    }, [movieSelected]);
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
                    user
                }}
            />
            {loggingIn ? (
                <>
                    <LoginPage {...{ setLoggedIn, setLoggingIn, setUser }} />
                </>
            ) : (
                <>
                    {signingUp ? (
                        <>
                            <SignupPage
                                {...{ setSigningUp, setUser, setLoggedIn }}
                            />
                        </>
                    ) : (
                        <>
                            {homePageOpen ? (
                                <HomePage {...{ setSigningUp }} />
                            ) : (
                                <></>
                            )}
                            {listPageOpen ? (
                                <ListPage
                                    {...{
                                        loggedIn,
                                        user,
                                        loggedIn,
                                        setMovieSelected
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                            {journalPageOpen ? (
                                <JournalPage {...{ user }} />
                            ) : (
                                <></>
                            )}
                            {moviePageOpen ? (
                                <MoviePage
                                    {...{ movieSelected, setMovieSelected }}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default RootPage;
