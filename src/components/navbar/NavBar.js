import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
    render() {

        return (
            <div id="navbar">
                <ul id="navbar-list">
                    <li><a href="/">Home page</a></li>
                    <li><a href="/">Oils</a></li>
                    <li><a href="/">Engine oils</a></li>
                    <li>Engine oils OW30</li>
                </ul>
            </div>
        );
    }
}

export default NavBar;
