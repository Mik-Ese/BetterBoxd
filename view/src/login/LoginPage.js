import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ loggedIn, setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [didFail, setDidFail] = useState(false);
  const onPasswordChange = (props) => {
    setPassword(props.target.value);
  };
  const onUsernameChange = (props) => {
    setUsername(props.target.value);
  };
  
  const logIn = () => {
    if (username === "max") {
      if (password === "password") {
        setLoggedIn(true);
      }
    }
  };

  return (
    <>
      <div className = "login-page-title">BetterBoxd</div>
      <div className="login-details-wrapper">
        <div className="login-details">
          <div className="username-input-wrapper">
            <TextField
              className="username-input"
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={onUsernameChange}
            />
          </div>
          <div className="password-input-wrapper">
            <TextField
              className="password-input"
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
              onChange={onPasswordChange}
            />
          </div>
          <Button
            variant="contained"
            className="sign-in-button"
            onClick={logIn}
          >
            Sign-In
          </Button>
        </div>
      </div>
      {didFail ? (
        <div style={{ marginTop: ".7rem", fontSize: "1.2rem" }}>
          Please try again
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginPage;
