import React from 'react';
import './Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: "" }
    }

    
    render() {

        return (
            <header id="header">
                <div id="header-panel">
                    <input id="search-field" type="text" value={this.state.value} placeholder="I`m looking for..." onChange={ event => this.setState({value: event.target.value}) }/>
                    <button id="search-button" onClick={ () => this.props.setSearch(this.state.value) }>Search</button>
                </div>
            </header>
        );
    }
}

export default Header;
