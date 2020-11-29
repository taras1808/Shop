import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useRouteMatch } from 'react-router-dom'

function NavBar () {

    const match = useRouteMatch('/(search|category|catalog|product)/:itemId?/')

    const parameters = match.params.itemId ? new Map(match.params.itemId.split(';').map(e => e.split('='))) : new Map()

    const [item, setItem] = useState([])

    useEffect(() => {

        if (!match.params.itemId || match.params[0] === 'search') {
            setItem([])
            return
        }
        
        if (match.params[0] !== 'product') {
            fetch("http://192.168.0.108:7777/api/categories/" +  match.params.itemId)
                .then(res => res.json())
                .then(
                    (result) => { 
                        const arr = []
                        const getParent = (node) => {
                            arr.push(node)
                            if (node.parent) {
                                getParent(node.parent)
                            }
                        }
                        getParent(result)
                        setItem(arr.reverse()) 
                    },
                    (error) => { setItem([]) }
                )
        } else {
            fetch("http://192.168.0.108:7777/api/products/" +  match.params.itemId)
                .then(res => res.json())
                .then(
                    (result) => { 
                        const arr = [result]
                        const getParent = (node) => {
                            arr.push(node)
                            if (node.parent) {
                                getParent(node.parent)
                            }
                        }
                        getParent(result.category)
                        setItem(arr.reverse()) 
                    },
                    (error) => { setItem([]) }
                )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params[0], match.params.itemId])

    

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    item.map((e, index) => {
                        if (!e) return null

                        let url = `${e.id}/`

                        let content = e.name

                        if (index !== item.length - 1) {

                            if (index === item.length - 2 && match.params[0] !== 'catalog')
                                content = <Link to={`/catalog/${url}`}>{content}</Link>
                            else
                                content = <Link to={`/category/${url}`}>{content}</Link>

                        } else {
                            return null
                        }

                        return (
                            <li key={index}>
                                <div className="arrow-block">
                                    <span className="arrow"></span>
                                </div>
                                
                                {content}
                            </li>
                        )
                    })
                }
            </ul>

            {
                match.params[0] !== 'search' ? (
                    <h1> { item.length > 0 ? item[item.length - 1].name : null } </h1>
                ) : (
                    <h1> { '«' + parameters.get('q') + '»' } </h1>
                )
            }

        </div>
    );
}

export default NavBar;
