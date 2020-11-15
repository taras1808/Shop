import { React, useState } from 'react';
import './App.css';
import ContentContainer from './containers/content/ContentContainer.js';
import Header from './containers/header/Header.js';
import { BrowserRouter as Router} from "react-router-dom"


function App() {

	return (
		<Router >
			<Header />
			<ContentContainer />
		</Router>
	)
	
}

export default App;
