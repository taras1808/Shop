import React from 'react';
import './Header.css';
import { Link } from "react-router-dom"

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: "" }
    }

    
    render() {

        return (
            <header id="header">
                <div id="header-panel">

                    <Link to="/" 
                        id="logo"
                        onClick={ () => this.props.setSearch(this.state.value) }
                    >Tankuj.pl</Link>

                    <div id="header-search-panel">
                        <input id="search-field" 
                            type="text" 
                            value={this.state.value} 
                            placeholder="I`m looking for..." 
                            onChange={ event => this.setState({value: event.target.value}) }
                        />
                        <Link to="/search" 
                            id="search-button" 
                            onClick={ () => this.props.setSearch(this.state.value) }
                        >Search</Link>
                    </div>

                    <Link to="/admin" 
                        id="admin"
                        onClick={ () => this.props.setSearch(this.state.value) }
                    >Admin</Link>
                </div>
            </header>
        );
    }
}

export default Header;
