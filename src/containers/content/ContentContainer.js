import './ContentContainer.css'
import NavBar from '../../components/navbar/NavBar'
import ProductContainer from '../product/ProductContainer.js'
import { Switch, Route } from 'react-router-dom'
import CategoriesContainer from '../categories/CategoriesContainer'
import AdminContainer from '../admin/AdminContainer'
import SearchContainer from '../search/SearchContainer'
import CatalogContainer from '../catalog/CatalogContainer'


export default function ContentContainer ({ search }) {
	return (
		<div className="container">
			<Switch>
				<Route path="/admin"></Route>
				<Route path="/search">
					<NavBar />
				</Route>
				{/* <Route path="/:categoryId">
					<NavBar />
				</Route> */}
			</Switch>
			<Switch>
				<Route path="/admin">
					<AdminContainer />
				</Route>
				<Route path="/search">
					<SearchContainer search={search}/>
				</Route>
				{/* <Route path="/:categoryId/:productId">
					<ProductContainer />
				</Route> */}
				<Route path="/:categoryId/">
					<CatalogContainer />
				</Route>
				<Route path="/">
					<CategoriesContainer />
				</Route>
			</Switch>
		</div>
	)
}
