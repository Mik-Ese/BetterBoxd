import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './LoginPage.css';
import { baseURL } from '../consts/consts.js';

const LoginPage = ({ setLoggedIn, setLoggingIn, setUser }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [didFail, setDidFail] = useState(false);
    const onPasswordChange = (props) => {
        setPassword(props.target.value);
    };
    const onUsernameChange = (props) => {
        setUsername(props.target.value);
    };
    const logIn = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(
            `${baseURL}/login?username=${username}&password=${password}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'good') {
                    setLoggedIn(true);
                    setLoggingIn(false);
                    setUser(data.user);
                } else {
                    setDidFail(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const stopLogginIn = () => {
        setLoggingIn(false);
    };

    return (
        <>
            <div className="login-page-back-button-container">
                <CancelIcon
                    onClick={stopLogginIn}
                    className="login-page-back-button"
                    fontSize="medium"
                />
            </div>
            <div className="login-page-title">BetterBoxd</div>
            <div className="login-details-wrapper">
                <div className="login-details">
                    <div className="username-input-wrapper">
                        <TextField
                            className="username-input"
                            id="standard-basic-username-password"
                            label="Username"
                            variant="standard"
                            onChange={onUsernameChange}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <TextField
                            className="password-input"
                            id="standard-basic-login-password"
                            type="password"
                            label="Password"
                            variant="standard"
                            onChange={onPasswordChange}
                        />
                    </div>

                    {didFail ? (
                        <div
                            style={{
                                marginTop: '0rem',
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
                        onClick={logIn}
                    >
                        Sign-In
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
