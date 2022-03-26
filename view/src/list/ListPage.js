import ListItem from "./ListItem.js";
import ListSelectedPage from "./ListSelectedPage.js";
import NewListPage from "./NewListPage.js";
import "./styles/ListPage.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

import { useState } from "react";
const ListPage = () => {

  const [listSelected, setListSelected] = useState(null);
  const [newListOpen, setNewListOpen] = useState(false);

  const data = {
    listItem: [
      {
        title: "The Title",
        user: "username123",
        summary: "This is the summary of the movie list I realkdjkfiwen jhdf sdfos fhf shfsi ksjfh zsfgo oofa  lis ls  fi kshf sw sgwyiud iush js iu iuh ku  h v  f  uhu sd i i  sdfishfieh fiu esdoie",
        numMovies: 2,
        numLikes: 5,
        numComments: 1,
        imagePaths: [
          "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", 
          "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        ]
      },
      {
        title: "Another Title",
        user: "username456",
        summary: "This is the other summary of the movie list I realkdjkfiwen jhdf sdfos fhf shfsi ksjfh zsfgo oofa  lis ls  fi kshf sw sgwyiud iush js iu iuh ku  h v  f  uhu sd i i  sdfishfieh fiu esdoie",
        numMovies: 5,
        numLikes: 1,
        numComments: 1,
        imagePaths: [
          "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", 
          "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
          "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_FMjpg_UX1000_.jpg",
          "https://m.media-amazon.com/images/M/MV5BMTQ0MTE3OTUwMl5BMl5BanBnXkFtZTcwODg5NjgwNw@@._V1_.jpg",
          "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg"
        ]
      },
      {
        title: "The Title 2",
        user: "username123",
        summary: "This is the summary of the movie list I realkdjkfiwen jhdf sdfos fhf shfsi ksjfh zsfgo oofa  lis ls  fi kshf sw sgwyiud iush js iu iuh ku  h v  f  uhu sd i i  sdfishfieh fiu esdoie",
        numMovies: 2,
        numLikes: 5,
        numComments: 1,
        imagePaths: [
          "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", 
          "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        ]
      },
      {
        title: "Another Title 2",
        user: "username456",
        summary: "This is the other summary of the movie list I realkdjkfiwen jhdf sdfos fhf shfsi ksjfh zsfgo oofa  lis ls  fi kshf sw sgwyiud iush js iu iuh ku  h v  f  uhu sd i i  sdfishfieh fiu esdoie",
        numMovies: 5,
        numLikes: 1,
        numComments: 1,
        imagePaths: [
          "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", 
          "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
          "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_FMjpg_UX1000_.jpg",
          "https://m.media-amazon.com/images/M/MV5BMTQ0MTE3OTUwMl5BMl5BanBnXkFtZTcwODg5NjgwNw@@._V1_.jpg",
          "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg"
        ]
      },
    ],
  };

  const listItemFactory = (data) => {
    var listItemContents = [];
    listItemContents.push(<hr className="divider"></hr>);
    for (var i = 0; i < data.listItem.length; i++) {
      var listData = data.listItem[i];
      listItemContents.push(<ListItem {...{listData}}/>);
      listItemContents.push(<hr className="divider"></hr>);
    }
    return <div className="list-item-components-container">{listItemContents}</div>;
  };

  const openNewList = () => {
    setNewListOpen(true);
  }

  return (
    <div className="list-page-root">
      {listSelected != null ? (
        <div>
          <ListSelectedPage {...{ listSelected, setListSelected }} />
        </div>
      ) : (
        <div>
        {newListOpen ? (
          <div>
            <NewListPage {...{ newListOpen, setNewListOpen }} />
          </div>
        ) : (
          <div className="list-page-home">
            <div
              className="add-list-button"
              onClick={openNewList}
            >
              <AddCircleIcon /> Add List
            </ div>
            <div>{listItemFactory(data)}</div>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default ListPage;
