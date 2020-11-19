import { useEffect, useState } from 'react';
import './Header.css';
import { Link, useRouteMatch, useHistory } from "react-router-dom"

export default function Header() {

    const history = useHistory();

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

    useEffect(() => {
        if (historySearch !== value || !match)
            setValue(historySearch)
    }, [match ? match.params.parameters : null])

    const onSubmit = (e) => {
        e.preventDefault()
        if (value)
            history.push(`/search/q=${value.trim()}/`)
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
