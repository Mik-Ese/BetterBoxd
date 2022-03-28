import './styles/ListSelectedPage.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListSelectedPage = ({
    listSelected,
    setListSelected,
    setMovieSelected
}) => {
    const closeListSelected = () => {
        setListSelected(null);
    };

    const moviePosterFactory = (listSelected) => {
        var moviePosterContents = [];
        for (var i = 0; i < listSelected.movies.length; i++) {
            var imagePath = listSelected.movies[i].url;
            var movieID = listSelected.movies[i].movieID;
            moviePosterContents.push(
                <img
                    /*onClick={() => {
                        setMovieSelected(movieID);
                    }}*/
                    className="movie-poster"
                    src={imagePath}
                />
            );
        }
        return <div className="movie-list-posters">{moviePosterContents}</div>;
    };

    return (
        <div>
            <div className="icon-bar">
                <div className="back-arrow" onClick={closeListSelected}>
                    <ArrowBackIcon />
                </div>
            </div>
            <div class="list-selected-content">
                <div class="list-selected-title">
                    <b>{listSelected.listTitle}</b>
                </div>
                <div class="list-selected-user">
                    List by <b>{listSelected.user}</b>
                    <br />
                    <br />
                </div>
                <div class="list-selected-description">
                    {listSelected.description}
                </div>
            </div>
            {moviePosterFactory(listSelected)}
        </div>
    );
};

export default ListSelectedPage;
