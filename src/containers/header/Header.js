import { useEffect, useState } from 'react';
import './Header.css';
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import { authenticationService } from '../../_services/authentication.service';
import { Role } from '../../_utils/role';


export default function Header() {

    const currentUser = authenticationService.currentUserValue;

    const history = useHistory()

    const match = useRouteMatch('/search/:parameters?/')

    let historySearch = ''

    if (match) {
        const parameters = match.params.parameters ? 
            new Map(match.params.parameters.split(';').map(e => e.split('=')))
            : new Map()

        historySearch = parameters.get('q')

        if (!historySearch) history.push(`/`)
    }

    const [value, setValue] = useState(historySearch)

    const state = match ? match.params.parameters : null

    useEffect(() => {
        if (historySearch !== value || !match)
            setValue(historySearch)
            
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!value) return
        const query = value.trim().replace(/[%/#=]/g, '')
        if (query !== '')
            history.push(`/search/q=${query}/`)
    }

    return (
        <header id="header">
            <div id="header-panel">

                <Link to="/" id="logo">Tankuj.pl</Link>

                <form id="header-search-panel" onSubmit={onSubmit}>
                    <input id="search-field" 
                        type="text" 
                        value={value} 
                        placeholder="I`m looking for..." 
                        onChange={ event => setValue(event.target.value) }/>
                    <button id="search-button">Search</button>
                </form>

                {
                    currentUser ? <>
                        {
                            currentUser.role === Role.Admin ?
                                <Link to="/admin/" id="login">Admin panel</Link>
                            : null
                        }
                        <p id="login" 
                            onClick={() => {
                                authenticationService.logout()
                                history.push('/')
                            }} >Logout</p> 
                    </> : <Link to="/login" id="login">Login</Link>
                }
                
                
            </div>
        </header>
    )
}
