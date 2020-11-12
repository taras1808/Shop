import { React, useState } from 'react';
import './App.css';
import ContentContainer from './containers/content/ContentContainer.js';
import Header from './containers/header/Header.js';
import { BrowserRouter as Router} from "react-router-dom"


function App() {

	const [search, setSearch] = useState("");
	
	return (
		<Router >
			<Header setSearch={setSearch}/>
			<ContentContainer search={search} />
		</Router>
	)
	
}

export default App;
