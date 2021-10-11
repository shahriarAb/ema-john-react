import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './SignIn.css';

const SignIn = () => {
    const { signInUsingGoogle, signInExistingUser, setEmail, setPassword, error, setError } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';

    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirect_uri);
            });
    }

    const handleExistingUserLogin = e => {
        e.preventDefault();
        signInExistingUser()
            .then(() => history.push(redirect_uri))
            .catch(error => setError(error.message));
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    return (
        <div className="signin-form">
            <div className="signin-border">
                <h2>Sign-In</h2>
                <form onSubmit={handleExistingUserLogin}>
                    <label htmlFor="email">Email: </label>
                    <input onBlur={handleEmailChange} id="email" type="email" placeholder="Your email here" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input onBlur={handlePasswordChange} id="password" type="password" placeholder="Your password here" />
                    <br />
                    <span className="error">{error}</span>
                    <div className="signin-btn">
                        <input id="signin-btn" type="submit" value="Sign In" />
                    </div>
                </form>
                <div className="sign-in-with-google">
                    <p>New to ema-john? <Link to="/signup">Create an account</Link></p>
                    <p>-----or-----</p>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleGoogleLogin}
                    >Sign in with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;