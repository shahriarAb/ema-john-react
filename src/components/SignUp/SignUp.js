import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './SignUp.css';

const SignUp = () => {
    const { signInUsingGoogle } = useAuth();
    return (
        <div className="signin-form">
            <div className="signin-border">
                <h2>Create account</h2>
                <form onSubmit="">
                    <label htmlFor="name">Your Name: </label>
                    <input id="name" type="text" placeholder="Your full name here" />
                    <br />
                    <label htmlFor="cr-email">Email: </label>
                    <input id="cr-email" type="email" placeholder="Your email here" />
                    <br />
                    <label htmlFor="cr-password">Password: </label>
                    <input id="cr-password" type="password" placeholder="At least 6 character" />
                    <br />
                    <label htmlFor="password">Re-enter password: </label>
                    <input id="password" type="password" placeholder="Re-enter your password" />
                    <div className="signin-btn">
                        <input id="signup-btn" type="submit" value="Sign Up" />
                    </div>
                </form>
                <div className="sign-in-with-google">
                    <p>Already have an account? <Link to="/signin">Sign-In</Link></p>
                    <p>-----or-----</p>
                    <button
                        className="add-to-cart-btn"
                        onClick={signInUsingGoogle}
                    >Sign in with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;