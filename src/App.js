import { React } from 'react';
import './App.css';
import ContentContainer from './components/content/ContentContainer.js';
import Header from './components/header/Header.js';
import { BrowserRouter as Router} from "react-router-dom"


export default function App() {

	return (
		<Router >
			<Header />
			<ContentContainer />
		</Router>
	)
	
}
