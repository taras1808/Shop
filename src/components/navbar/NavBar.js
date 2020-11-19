import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useRouteMatch, useParams } from 'react-router-dom'

function NavBar () {

    const match = useRouteMatch('/(search|catalog|product)/:itemId?/')

    const parameters = match.params.itemId ? new Map(match.params.itemId.split(';').map(e => e.split('='))) : new Map()

    const [item, setItem] = useState([])

    let url = ''

    useEffect(() => {

        if (!match.params.itemId || match.params[0] === 'search') {
            setItem([])
            return
        }
        
        if (match.params[0] === 'catalog') {
            fetch("http://192.168.0.108:7777/api/categories/" +  match.params.itemId)
                .then(res => res.json())
                .then(
                    (result) => { setItem([result]) },
                    (error) => { setItem([]) }
                )
        } else {
            fetch("http://192.168.0.108:7777/api/products/" +  match.params.itemId)
                .then(res => res.json())
                .then(
                    (result) => { setItem([result.category, result]) },
                    (error) => { setItem([]) }
                )
        }

    }, [match.params[0], match.params.itemId])

    

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    item.map((e, index) => {
                        if (!e) return null

                        url += `${e.id}/`

                        let content = e.name

                        if (index != item.length - 1) {
                            content = <Link to={`/catalog/${url}`}>{content}</Link>
                        } else {
                            return null
                        }

                        return (<li key={index}>{content}</li>)
                    })
                }
            </ul>
            {
                match.params[0] === 'catalog' ? (
                    <h1> { item.length > 0 ? item[item.length - 1].name : null } </h1>
                ) : null
            }

            {
                match.params[0] === 'search' ? (
                    <h1> { '«' + parameters.get('q') + '»' } </h1>
                ) : null
            }
        </div>
    );
}

export default NavBar;
