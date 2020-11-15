import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'

function NavBar () {

    let match = useRouteMatch('/(search|catalog|product)/:itemId?/')

    const [item, setItem] = useState(null)

    useEffect(() => {

        if (!match.params.itemId || match) {
            setItem(null)
            return
        }
        
        fetch("http://192.168.0.108:7777/api/categories/" +  match.params.itemId)
            .then(res => res.json())
            .then(
                (result) => { setItem(result) },
                (error) => { setItem(null) }
            )

    }, [match.params.itemId])
    
    let url = `/${match.params[0]}/`

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    [item].map((item, index) => {
                        if (!item) return null

                        url += `${item.id}/`

                        let content = item.name

                        if (!url.includes(match.url)) {
                            content = <Link to={url}>{content}</Link>
                        }

                        return (<li key={index}>{content}</li>)
                    })
                }
            </ul>
        </div>
    );
}

export default NavBar;
