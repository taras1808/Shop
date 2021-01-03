import { React, useState, useEffect } from 'react'
import './NavBar.css'
import { Link, useParams } from 'react-router-dom'
import { authenticationService } from '../../_services/authentication.service'
import { Role } from '../../_utils/role'
import { accountService } from '../../_services/account.service'


export const NavType = {
    SEARCH: 0,
    PRODUCT: 1,
    CATALOG: 2,
    CATEGORY: 3,
    FAVOURITE: 4
}

export default function NavBar({ item, type }) {

    const currentUser = authenticationService.currentUserValue

    const { params  } = useParams()

    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

    const [items, setItems] = useState([])

    let title = null
    let controls = null

    switch (type) {
        case NavType.FAVOURITE:
            title = 'Favourite things'
            break
        case NavType.SEARCH:
            title = `«${ parameters.get('q') }»`
            break
        default:
            title = items.length > 0 && items[items.length - 1].name
            break
    }

    const toggleFavourite = () => {
        if (!items[items.length - 1].favourite) {
            accountService.addFavourite(currentUser, items)
                .then(
                    result => {
                        items[items.length - 1].favourite = true
                        setItems([...items])
                    },
                    error => alert(error)
                )
        } else {
            accountService.removeFavourite(currentUser, items)
                .then(
                    result => {
                        items[items.length - 1].favourite = false
                        setItems([...items])
                    },
                    error => alert(error)
                )
        }
    } 

    if (currentUser && items.length > 0) {
        switch (type) {
            case NavType.PRODUCT:
                if (currentUser.role === Role.User) {
                    controls = (
                        <div className="profile-controls" 
                            style={{ 
                                backgroundImage: items[items.length - 1].favourite ? 
                                    'url("/favourite.svg")' : 'url("/not-favourite.svg")'
                            }} 
                            onClick={toggleFavourite}></div>
                    )
                } else if (currentUser.role === Role.Admin) {
                    const item = items[items.length - 1]
                    const url = `/admin/products/category=${item.category_id};product=${item.id}/`
                    controls = (
                        <Link className="admin-control" to={url}>Edit</Link>
                    )
                }
                break
            case NavType.CATEGORY:
            case NavType.CATALOG:
                if (currentUser.role === Role.Admin) {
                    controls = (
                        <Link className="admin-control" to={`/admin/categories/${items[items.length - 1].id}/`}>Edit</Link>
                    )
                }
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (!item) return
        const arr = []
        const getParent = (node) => {
            arr.push(node)
            if (node.parent) {
                getParent(node.parent)
            }
        }
        switch (type) {
            case NavType.PRODUCT:
                arr.push(item)
                getParent(item.category)
                setItems(arr.reverse()) 
                break
            case NavType.CATALOG:
            case NavType.CATEGORY:
                getParent(item)
                setItems(arr.reverse()) 
                break
            default:
                break
        }
    }, [item, type])

    return (
        <div id="navbar">
            <ul id="navbar-list">
                <li><Link to="/">Home page</Link></li>
                {
                    items.map((e, index) => {
                        if (!e) return null

                        let url = `${e.id}/`

                        let content = e.name

                        if (index !== items.length - 1) {

                            if (index === items.length - 2 && type === NavType.PRODUCT)
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
                                
                                { content }
                            </li>
                        )
                    })
                }
            </ul>

            <div id="title-block">
                <h1> { title } </h1>

                { controls }

            </div>
        </div>
    );
}
