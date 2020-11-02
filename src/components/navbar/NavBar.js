import React from 'react'
import './NavBar.css'
import { Link, useRouteMatch, useLocation } from "react-router-dom"

function NavBar () {

    let match = useRouteMatch("/:categoryId?/:productId?")
    let { pathname } = useLocation()

    let url = ""

    console.log(match)

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    match ? Object.keys(match.params).map((key, index) => {
                        if (!match.params[key]) return

                        url += "/" + match.params[key]

                        let content = match.params[key]
                        if (pathname != url) {
                            content = <Link to={url}>{content}</Link>
                        }

                        return (<li key={index}>{content}</li>)
                    }) : null
                }
            </ul>
        </div>
    );
}

export default NavBar;
