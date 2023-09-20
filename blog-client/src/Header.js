import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    let jk = false;
    let lm = 'hello';
    return (
        <header>
            <h1>Node - React Blog site</h1>
            <Link to="/">Home</Link> | <Link to="/addPosts">Add posts</Link>
            <div></div>
            <Link to="/login">LogIn</Link> | <Link to="/logout">Log Out</Link> 
        </header>
    );
};

export default Header;