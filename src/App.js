import { React, useState } from 'react';
import './App.css';
import ContentContainer from './containers/content/ContentContainer.js';
import Header from './containers/header/Header.js';


function App() {

	const [search, setSearch] = useState("");
	
	return (
		<>
			<Header setSearch={setSearch}/>
			<ContentContainer search={search} />
		</>
	)
	
}

export default App;
