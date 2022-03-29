import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './SignupPage.css';
import { baseURL } from '../consts/consts.js';
const LoginPage = ({ setSigningUp, setUser, setLoggedIn }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
    const [didFail, setDidFail] = useState(false);

    const onPasswordChange = (props) => {
        if (props.target.value === confirmPassword) {
            setDoPasswordsMatch(true);
        } else {
            if (confirmPassword !== '') {
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
            if (props.target.value !== '') {
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
        if (doPasswordsMatch) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email_address: email,
                    password: password
                })
            };
            fetch(`${baseURL}/register-user`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'good') {
                        setSigningUp(false);
                        setUser(data.user);
                        setLoggedIn(true);
                    } else {
                        setDidFail(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                            id="standard-basic-signup-email"
                            label="Email Address"
                            variant="standard"
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="username-input-wrapper">
                        <TextField
                            className="username-input"
                            id="standard-basic-signup-username"
                            label="Username"
                            variant="standard"
                            onChange={onUsernameChange}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <TextField
                            className="password-input"
                            id="standard-basic-signup-password"
                            type="password"
                            label="Password"
                            variant="standard"
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="confirm-password-input-wrapper">
                        <TextField
                            className="password-input"
                            id="standard-basic-signup-password-confirm"
                            type="password"
                            label="Confirm Password"
                            error={!doPasswordsMatch}
                            variant="standard"
                            helperText={
                                doPasswordsMatch
                                    ? null
                                    : "Passwords don't match."
                            }
                            onChange={onConfirmPasswordChange}
                        />
                    </div>

                    {didFail ? (
                        <div
                            style={{
                                marginTop: '-.8rem',
                                marginBottom: '1rem',
                                fontSize: '1.2rem',
                                fontWeight: 500,
                                color: 'red'
                            }}
                        >
                            Please try again
                        </div>
                    ) : (
                        <></>
                    )}
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
