import './ContentContainer.css'
import NavBar from '../../components/navbar/NavBar'
import ProductContainer from '../product/ProductContainer.js'
import { Switch, Route } from 'react-router-dom'
import CategoriesContainer from '../categories/CategoriesContainer'
import AdminContainer from '../admin/AdminContainer'
import SearchContainer from '../search/SearchContainer'
import CatalogContainer from '../catalog/CatalogContainer'
import CategoryContainer from '../category/CategoryContainer'


export default function ContentContainer () {
	return (
		<div className="container">
			<Switch>
				<Route path="/admin/"></Route>
				<Route path="/(catalog|category|search|product)/">
					<NavBar />
				</Route>
			</Switch>
			<Switch>
				<Route path="/admin/">
					<AdminContainer />
				</Route>
				<Route path="/search/:params?/">
					<SearchContainer/>
				</Route>
				<Route path="/product/:productId">
					<ProductContainer />
				</Route>
				<Route path="/catalog/:categoryId/:params?/">
					<CatalogContainer />
				</Route>
				<Route path="/category/:categoryId/">
					<CategoryContainer />
				</Route>
				<Route path="/">
					<CategoriesContainer />
				</Route>
			</Switch>
		</div>
	)
}
