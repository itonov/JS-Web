import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to="/" className="logo">Interactive IMDB</NavLink>
                <div className="header-right">
                    <NavLink exact to="/">Home</NavLink>
                    <span>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </span>
                </div>
            </header>
        );
    }
}

export default Header;