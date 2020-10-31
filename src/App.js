import { React, useState } from 'react';
import './App.css';
import Header from './containers/header/Header.js';
import ProductsContainer from './containers/products/ProductsContainer.js';

function App() {

	const [search, setSearch] = useState("");
	

	return (
		<>
			<Header setSearch={setSearch}/>
			<ProductsContainer search={search}/>
		</>
	)
	
}

export default App;
