const NavBar = ({
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
}) => {
    const logOut = () => {
        setLoggedIn(false);
        setHomePageOpen(true);
        setMoviePageOpen(false);
        setJournalPageOpen(false);
        setListPageOpen(false);
    };
    const openHomePage = () => {
        setHomePageOpen(true);
        setMoviePageOpen(false);
        setJournalPageOpen(false);
        setListPageOpen(false);
    };
    const openListPage = () => {
        setHomePageOpen(false);
        setMoviePageOpen(false);
        setJournalPageOpen(false);
        setListPageOpen(true);
    };
    const openJournalPage = () => {
        setHomePageOpen(false);
        setMoviePageOpen(false);
        setJournalPageOpen(true);
        setListPageOpen(false);
    };
    const openMoviePage = () => {
        setHomePageOpen(false);
        setMoviePageOpen(true);
        setJournalPageOpen(false);
        setListPageOpen(false);
    };
    const logIn = () => {
        setSigningUp(false);
        setLoggingIn(true);
    };
    const signUp = () => {
        setLoggingIn(false);
        setSigningUp(true);
    };
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" style={{ cursor: 'auto' }}>
                    <span className="text-primary">B</span>
                    <span className="text-success">e</span>
                    <span className="text-danger">t</span>
                    <span className="text-warning">t</span>
                    <span className="text-info">e</span>
                    <span className="text-primary">r</span>
                    <span className="text-success">B</span>
                    <span className="text-danger">o</span>
                    <span className="text-warning">x</span>
                    <span className="text-info">e</span>
                    <span className="text-primary">d</span>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li
                            class="nav-item"
                            onClick={openHomePage}
                            style={{ cursor: 'pointer' }}
                        >
                            <a
                                class={
                                    homePageOpen
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Home
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            onClick={openMoviePage}
                            style={{ cursor: 'pointer' }}
                        >
                            <a
                                class={
                                    moviePageOpen
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Movies
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            onClick={openListPage}
                            style={{ cursor: 'pointer' }}
                        >
                            <a
                                class={
                                    listPageOpen
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Lists
                            </a>
                        </li>
                        {loggedIn ? (
                            <li
                                class="nav-item"
                                onClick={openJournalPage}
                                style={{ cursor: 'pointer' }}
                            >
                                <a
                                    class={
                                        journalPageOpen
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }
                                >
                                    Journal
                                </a>
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                    <form class="d-flex">
                        {loggedIn ? (
                            <>
                                <div
                                    style={{
                                        marginTop: '.35rem',
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        marginRight: '1rem',
                                        marginLeft: '.5rem'
                                    }}
                                >
                                    {user !== null ? user.username : ''}
                                </div>

                                <div
                                    class="btn btn-outline-success"
                                    onClick={logOut}
                                    style={{ marginLeft: 8, width: '7rem' }}
                                >
                                    Log Out
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    class="btn btn-outline-success"
                                    onClick={signUp}
                                    style={{ marginLeft: 8, width: '7rem' }}
                                >
                                    Sign Up
                                </div>
                                <div
                                    class="btn btn-outline-success"
                                    onClick={logIn}
                                    style={{ marginLeft: 8, width: '7rem' }}
                                >
                                    Log In
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
