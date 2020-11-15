import { useState } from 'react';
import './Header.css';
import { Link, useRouteMatch, useHistory } from "react-router-dom"

export default function Header() {

    const history = useHistory();

    const match = useRouteMatch('/search/:parameters')

    let historySearch = ''

    if (match) {

        const parameters = match.params.parameters ? 
		new Map(match.params.parameters.split(';').map(e => e.split('=')))
		: new Map()

        historySearch = parameters.get('q')
    }

    const [value, setValue] = useState(historySearch)

    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/search/q=${value}/`)
    }

    return (
        <header id="header">
            <div id="header-panel">

                <Link to="/" 
                    id="logo">Tankuj.pl</Link>

                <form id="header-search-panel" onSubmit={onSubmit}>
                    <input id="search-field" 
                        type="text" 
                        value={value} 
                        placeholder="I`m looking for..." 
                        onChange={ event => setValue(event.target.value) }/>
                    <button id="search-button">Search</button>
                </form>

                <Link to="/admin/" 
                    id="admin">Admin</Link>
            </div>
        </header>
    )
}
