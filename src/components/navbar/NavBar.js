import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'

function NavBar () {

    let match = useRouteMatch('/:categoryId?/:productId?')
    let { pathname } = useLocation()

    const [category, setCategory] = useState(null)
    const [product, setProduct] = useState(null)

    let arr = [category, product]

    useEffect(() => {

        if (!match.params.categoryId || match.params.categoryId === 'search') {
            setCategory(null)
            return
        }
        
        fetch("http://192.168.0.108:7777/api/categories/" +  match.params.categoryId)
            .then(res => res.json())
            .then(
                (result) => { setCategory(result) },
                (error) => { setCategory(null) }
            )

    }, [match.params.categoryId])

    useEffect(() => {
        if (!match.params.productId) {
            setProduct(null)
            return
        }

        fetch("http://192.168.0.108:7777/api/products/" +  match.params.productId)
            .then(res => res.json())
            .then(
                (result) => { setProduct(result) },
                (error) => { setProduct(null) }
            )

    }, [match.params.productId])
    
    let url = ""

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    arr.map((item, index) => {
                        if (!item) return null

                        url += "/" + item.id

                        let content = item.name
                        if (pathname !== url) {
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
