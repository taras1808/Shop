import './ContentContainer.css'
import ProductsContainer from '../products/ProductsContainer.js'
import NavBar from '../../components/navbar/NavBar'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import ProductContainer from '../product/ProductContainer.js'
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
						<ProductContainer />
					</Route>
					<Route path="/:categoryId">
						<SortContainer />
						<div className="flex">
							<FiltersContainer />
							<ProductsContainer />
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
