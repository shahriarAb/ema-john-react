import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './SignIn.css';

const SignIn = () => {
    const { signInUsingGoogle } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';

    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirect_uri);
            });
    }

    return (
        <div className="signin-form">
            <div className="signin-border">
                <h2>Sign-In</h2>
                <form onSubmit="">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" placeholder="Your email here" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" placeholder="Your password here" />
                    <br />
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