import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { user, signOutAccount } = useAuth();

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <div>
                    <NavLink activeStyle={activeStyle} to="/shop">Shop</NavLink>
                    <NavLink activeStyle={activeStyle} to="/review">Order Review</NavLink>
                    <NavLink activeStyle={activeStyle} to="/inventory">Manage Inverntory</NavLink>
                </div>
                <div>
                    {user.email ?
                        <div>
                            <span style={{ color: 'white', marginRight: '10px' }}>Hey, {user.displayName}</span>
                            <button style={{ marginRight: '25px' }} onClick={signOutAccount}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <NavLink activeStyle={activeStyle} to="/signin">Sign in</NavLink>
                            <NavLink activeStyle={activeStyle} to="/signup">Sign up</NavLink>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;