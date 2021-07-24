import { useEffect, useState, useRef } from 'react';
import './Header.css';
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import { authenticationService } from '../../_services/authentication.service'
import { Role } from '../../_utils/role'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'


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

    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)

    const handleToggle = () => {
        setOpen(!open)
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return
        setOpen(false)
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
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
        const query = value.trim().replace(/[%/#=;]/g, '')
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


                <div id="profile-block">

                    {
                        currentUser ? <>
                            {
                                currentUser.role === Role.Admin ?
                                    <Link to="/admin/" className="profile-controls" style={{ backgroundImage: 'url("/settings.svg")' }}></Link>
                                : 
                                    <Link to="/favourite/" className="profile-controls" style={{ backgroundImage: 'url("/favourite.svg")' }}></Link>
                            }

                            <span ref={anchorRef} onClick={handleToggle} className="profile-controls"> { `${currentUser.first_name} ${currentUser.last_name}` } </span>

                            <Popper placement={'bottom-end'} open={open} anchorEl={anchorRef.current} role={undefined} transition>
                                {({ TransitionProps, placement }) => (
                                    <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={() => {
                                                        authenticationService.logout()
                                                        history.push('/')
                                                    }}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>

                        </> : <>
                            <p ref={anchorRef} onClick={handleToggle} className="profile-controls" style={{ backgroundImage: 'url("/profile.png")' }}></p>

                            <Popper placement={'bottom-end'} open={open} anchorEl={anchorRef.current} role={undefined} transition>
                                {({ TransitionProps, placement }) => (
                                    <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                                                    <Link className="menu-link" to="/authentication/">
                                                        <MenuItem>Sign in</MenuItem>
                                                    </Link>
                                                    <Link className="menu-link" to="/registration/">
                                                        <MenuItem>Create account</MenuItem>
                                                    </Link>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </> 

                    }
                </div>

            </div>
        </header>
    )
}
