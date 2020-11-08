import './ContentContainer.css'
import ProductsContainer from '../products/ProductsContainer.js'
import NavBar from '../../components/navbar/NavBar'
import FiltersContainer from '../filters/FiltersContainer.js'
import ParamsContainer from '../params/ParamsContainer.js'
import ProductContentContainer from '../product/ProductContentContainer.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CategoriesContainer from '../categories/CategoriesContainer'


function ContentContainer ({ search }) {
	return (
		<div className="container">
			<Router >
				<Switch>
					<Route path="/:categoryId">
						<NavBar />
					</Route>
				</Switch>
				<Switch>
					<Route path="/:categoryId/:productId">
						<ProductContentContainer />
					</Route>
					<Route path="/:categoryId">
						<ParamsContainer />
						<div className="flex">
							<FiltersContainer />
							<ProductsContainer search={search} />
						</div>
					</Route>
					<Route path="/">
						<CategoriesContainer />
					</Route>
        		</Switch>
			</Router>
		</div>
	)
}

export default ContentContainer;
