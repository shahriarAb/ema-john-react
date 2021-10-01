import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <NavLink activeStyle={activeStyle} to="/shop">Shop</NavLink>
                <NavLink activeStyle={activeStyle} to="/review">Order Review</NavLink>
                <NavLink activeStyle={activeStyle} to="/inventory">Manage Inverntory</NavLink>
            </nav>
        </div>
    );
};

export default Header;