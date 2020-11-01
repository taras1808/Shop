import React from 'react';
import './Header.css';

class Header extends React.Component {

    
    render() {

        let value = ""

        return (
            <header id="header">
                <div id="header-panel">
                    <input id="search-field" type="text" placeholder="I`m looking for..." onChange={ event => value = event.target.value}/>
                    <button id="search-button" onClick={ () => this.props.setSearch(value) }>Search</button>
                </div>
            </header>
        );
    }
}

export default Header;
