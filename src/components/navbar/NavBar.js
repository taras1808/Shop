import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useRouteMatch } from 'react-router-dom'
import { authenticationService } from '../../_services/authentication.service'
import { Role } from '../../_utils/role'
import { categoriesService } from '../../_services/categories.service'
import { productsService } from '../../_services/products.service'
import { accountService } from '../../_services/account.service'
import { authHeader } from '../../_utils/auth-header'


export default function NavBar () {

    const currentUser = authenticationService.currentUserValue

    const match = useRouteMatch('/(search|category|catalog|product)/:itemId?/')

    const parameters = match.params.itemId ? new Map(match.params.itemId.split(';').map(e => e.split('='))) : new Map()

    const [item, setItem] = useState([])

    useEffect(() => {

        if (!match.params.itemId || match.params[0] === 'search') {
            setItem([])
            return
        }
        
        if (match.params[0] !== 'product') {
            categoriesService.getCategory(match.params.itemId)
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
            productsService.getProduct(match.params.itemId, { headers: authHeader() })
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

                            if (index === item.length - 2 && match.params[0] === 'product')
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

            <div id="title-block">
                <h1>
                    { 
                        match.params[0] !== 'search' ? 
                            item.length > 0 && item[item.length - 1].name 
                            : `«${ parameters.get('q') }»` 
                    }
                </h1>

                {
                    currentUser && currentUser.role === Role.Admin &&
                    match.params[0] === 'product' && item.length > 0 &&  
                    <Link className="admin-control" to={`/admin/products/category=${item[item.length - 1].category_id};product=${item[item.length - 1].id}/`}>Edit</Link>
                }

                {
                    currentUser && currentUser.role === Role.User &&
                    match.params[0] === 'product' && item.length > 0 &&  
                    <div className="profile-controls" style={{ backgroundImage: item[item.length - 1].favourite ? 'url("/favourite.svg")' : 'url("/not-favourite.svg")'}} onClick={_ => {

                        if (!item[item.length - 1].favourite) {
                            accountService.addFavourite(currentUser, item)
                                .then(
                                    result => {
                                        item[item.length - 1].favourite = true
                                        setItem([...item])
                                    },
                                    error => alert(error)
                                )
                        } else {
                            accountService.removeFavourite(currentUser, item)
                                .then(
                                    result => {
                                        item[item.length - 1].favourite = false
                                        setItem([...item])
                                    },
                                    error => alert(error)
                                )
                        }
                        

                    }}></div>
                }

                { 
                    currentUser && currentUser.role === Role.Admin &&
                    (match.params[0] === 'category' || match.params[0] === 'catalog' ) &&  item.length > 0 &&  
                    <Link className="admin-control" to={`/admin/categories/${item[item.length - 1].id}/`}>Edit</Link>
                }

            </div>
        </div>
    );
}
