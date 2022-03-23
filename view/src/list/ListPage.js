import ListItem from "./ListItem.js";
import "./ListPage.css";

import { useState } from "react";
import { mobileStepperClasses } from "@mui/material";
const ListPage = () => {

  // fetch(
  //   GET
  // )  

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

  return (
    <div className="list-page-root">
      {listItemFactory(data)}
    </div>
  );
};

export default ListPage;
