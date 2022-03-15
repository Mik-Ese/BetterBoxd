import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./login/LoginPage.js";
import RootPage from "./base/RootPage.js";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  
  return (
    <div className="App">
      {loggedIn ? (
        <RootPage {...{setLoggedIn}}/>
      ) : (
        <LoginPage {...{ loggedIn, setLoggedIn }} />
      )}
    </div>
  );
}

export default App;
