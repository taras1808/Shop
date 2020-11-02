import './ContentContainer.css'
import ProductsContainer from '../products/ProductsContainer.js'
import NavBar from '../../components/navbar/NavBar'
import FiltersContainer from '../filters/FiltersContainer.js'
import ParamsContainer from '../params/ParamsContainer.js'
import ProductContentContainer from '../product/ProductContentContainer.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


function ContentContainer (props) {
	return (
		<div className="container">
			<Router >
				<Switch>
					<NavBar />
				</Switch>
				<Switch>
					<Route path="/:productId">
						<ProductContentContainer />
					</Route>
					<Route path="/">
						<ParamsContainer />
						<div className="flex">
							<FiltersContainer />
							<ProductsContainer search={props.search} />
						</div>
					</Route>
        		</Switch>
			</Router>
		</div>
	)
}

export default ContentContainer;
