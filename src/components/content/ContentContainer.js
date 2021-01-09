import './ContentContainer.css'
import ProductContainer from '../product/ProductContainer.js'
import { Switch, Route } from 'react-router-dom'
import CategoriesContainer from '../categories/CategoriesContainer'
import AdminContainer from '../admin/AdminContainer'
import SearchContainer from '../search/SearchContainer'
import CatalogContainer from '../catalog/CatalogContainer'
import CategoryContainer from '../category/CategoryContainer'
import AuthenticationContainer from '../account/authentication/AuthenticationContainer'
import { PrivateRoute } from '../private-route/PrivateRoute'
import { Role } from '../../_utils/role'
import FavouriteContainer from '../favourite/FavouriteContainer'
import RegistrationContainer from '../account/registration/RegistrationContainer'

export default function ContentContainer () {
	return (
		<div className="container">
			<Switch>
				<PrivateRoute strict path="/admin/" roles={[Role.Admin]} component={AdminContainer} />
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
				<PrivateRoute strict path="/favourite/:params?/" roles={[Role.User]} component={FavouriteContainer} />
				<Route strict path="/authentication/" component={AuthenticationContainer} />
				<Route strict path="/registration/" component={RegistrationContainer} />
				<Route path="/">
					<CategoriesContainer />
				</Route>
			</Switch>
		</div>
	)
}
