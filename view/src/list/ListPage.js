import ListItem from './ListItem.js';
import ListSelectedPage from './ListSelectedPage.js';
import NewListPage from './NewListPage.js';
import './styles/ListPage.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { baseURL } from '../consts/consts.js';
import './styles/ListPage.css';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
const ListPage = ({ user, loggedIn }) => {
  
  const [listSelected, setListSelected] = useState(null);
  const [newListOpen, setNewListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // change to true when you actually do it prop

  const data = {
    listItem: [
      {
        listTitle: "The Title",
        user: "username123",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus quis varius quam quisque id. Sit amet justo donec enim diam vulputate ut. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Nam libero justo laoreet sit amet cursus sit. Ullamcorper velit sed ullamcorper morbi. Ullamcorper eget nulla facilisi etiam dignissim diam. Sed ullamcorper morbi tincidunt ornare massa eget. Tincidunt ornare massa eget egestas purus viverra accumsan. Cras ornare arcu dui vivamus. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Sit amet porttitor eget dolor morbi non. Metus aliquam eleifend mi in nulla. Amet mauris commodo quis imperdiet massa tincidunt.",
        movies: [
          {
            movieTitle: "Shrek",
            url: "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            movieID: "",
          },
          {
            movieTitle: "Shrek 2",
            url: "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            movieID: "",
          },
        ]
      },
      {
        listTitle: "Another Title",
        user: "username456",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus quis varius quam quisque id. Sit amet justo donec enim diam vulputate ut. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Nam libero justo laoreet sit amet cursus sit. Ullamcorper velit sed ullamcorper morbi. Ullamcorper eget nulla facilisi etiam dignissim diam. Sed ullamcorper morbi tincidunt ornare massa eget. Tincidunt ornare massa eget egestas purus viverra accumsan. Cras ornare arcu dui vivamus. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Sit amet porttitor eget dolor morbi non. Metus aliquam eleifend mi in nulla. Amet mauris commodo quis imperdiet massa tincidunt.",
        movies: [
          {
            movieTitle: "Pulp Fiction",
            url: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            movieID: "",
          },
          {
            movieTitle: "The Batman",
            url: "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            movieID: "",
          },
          {
            movieTitle: "Avatar",
            url: "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_FMjpg_UX1000_.jpg",
            movieID: "",
          },
          {
            movieTitle: "We Bought a Zoo",
            url: "https://m.media-amazon.com/images/M/MV5BMTQ0MTE3OTUwMl5BMl5BanBnXkFtZTcwODg5NjgwNw@@._V1_.jpg",
            movieID: "",
          },
          {
            movieTitle: "Zootopia",
            url: "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg",
            movieID: "",
          },
        ]
      }
    ]
  };
  
  const [listEntries, setListEntries] = useState([]);

    //call this function somewhere so it gets executed once when the page loads
    //likely using useEffect()
    const getListEntries = () => {
        console.log(user);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${baseURL}/get-all-movie-lists`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //map 'data' to your list entries here.
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const listItemFactory = (data) => {
        var listItemContents = [];
        listItemContents.push(<hr className="divider" />);
        for (var i = 0; i < data.listItem.length; i++) {
            var listData = data.listItem[i];
            listItemContents.push(
                <ListItem {...{ listData, setListSelected }} />
            );
            listItemContents.push(<hr className="divider" />);
        }
        return (
            <div className="list-item-components-container">
                {listItemContents}
            </div>
        );
    };

    const makeQueries = () => {
      if (listEntries.length == 0) {
        getListEntries();
      }
    }

    const openNewList = () => {
        setNewListOpen(true);
    };

    return (
      <div className="list-page-root">
        {isLoading ? (
          <>
            <CircularProgress
              fontSize="large"
              style={{ marginTop: '25%', marginLeft: '48%' }}
            />
            {makeQueries()}
          </>
        ) : (
          <>
            {listSelected != null ? (
              <div>
                <ListSelectedPage {...{ listSelected, setListSelected }} />
              </div>
            ) : (
                <div>
                  {newListOpen ? (
                    <div>
                      <NewListPage
                        {...{ newListOpen, setNewListOpen, user }}
                      />
                    </div>
                  ) : (
                    <div className="list-page-home">
                      {!loggedIn ? (
                        <></>
                      ) : (
                        <div
                          className="add-list-button"
                          onClick={openNewList}
                        >
                          <AddCircleIcon /> Add List
                        </div>
                      )}
                      <div>{listItemFactory(data)}</div>
                    </div>
                  )}
              </div>
            )}
          </>
        )}
    </div>
    );
};

export default ListPage;
