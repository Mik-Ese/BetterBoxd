import { TextField, Button } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./SignupPage.css";

const LoginPage = ({ setSigningUp }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const onPasswordChange = (props) => {
    if (props.target.value === confirmPassword) {
      setDoPasswordsMatch(true);
    } else {
      if (confirmPassword !== "") {
        setDoPasswordsMatch(false);
      } else {
        setDoPasswordsMatch(true);
      }
    }
    setPassword(props.target.value);
  };
  const onUsernameChange = (props) => {
    setUsername(props.target.value);
  };
  const onConfirmPasswordChange = (props) => {
    if (props.target.value === password) {
      setDoPasswordsMatch(true);
    } else {
      if (props.target.value !== "") {
        setDoPasswordsMatch(false);
      } else {
        setDoPasswordsMatch(true);
      }
    }
    setConfirmPassword(props.target.value);
  };
  const onEmailChange = (props) => {
    setEmail(props.target.value);
  };

  const signUp = () => {
    setSigningUp(false);
  };
  const stopSigningUp = () => {
    setSigningUp(false);
  };

  return (
    <>
      <div className="login-page-back-button-container">
        <CancelIcon
          onClick={stopSigningUp}
          className="login-page-back-button"
          fontSize="medium"
        />
      </div>
      <div className="login-page-title">BetterBoxd</div>
      <div className="login-details-wrapper">
        <div className="login-details">
          <div className="email-input-wrapper">
            <TextField
              className="password-input"
              id="standard-basic"
              label="Email Address"
              variant="standard"
              onChange={onEmailChange}
            />
          </div>
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
          <div className="confirm-password-input-wrapper">
            <TextField
              className="password-input"
              id="standard-basic"
              type="password"
              label="Confirm Password"
              error={!doPasswordsMatch}
              variant="standard"
              helperText={doPasswordsMatch ? null : "Passwords don't match."}
              onChange={onConfirmPasswordChange}
            />
          </div>
          <Button
            variant="contained"
            className="sign-in-button"
            onClick={signUp}
          >
            Sign-Up
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
