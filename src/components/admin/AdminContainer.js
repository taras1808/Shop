import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import AddProductForm from './forms/product/AddProductForm'
import EditProductForm from './forms/product/EditProductForm'

import AddFilterForm from './forms/filter/AddFilterForm'
import EditFilterForm from './forms/filter/EditFilterForm'
import EditFiltersForm from './forms/filter/EditFiltersForm'

import AddOptionForm from './forms/filter/option/AddOptionForm'
import EditOptionForm from './forms/filter/option/EditOptionForm'

import AddCategoryForm from './forms/category/AddCategoryForm'
import EditCategoriesForm from './forms/category/EditCategoriesForm'
import EditCategoryForm from './forms/category/EditCategoryForm'


export default function AdminContainer () {
	let match = useRouteMatch();
	return (
		<div className="admin-panel">
			<Switch>
				<Route exact path={match.path}></Route>
				<Route strict path={`${match.path}categories/*/`}>
					<Link className="admin-panel-back" to="/admin/categories/">Back</Link>
				</Route>
				<Route strict path={`${match.path}filters/*/options/*/`}>
					<Link className="admin-panel-back" to="../../">Back</Link>
				</Route>
				<Route strict path={`${match.path}filters/*/options/`}>
					<Link className="admin-panel-back" to="../">Back</Link>
				</Route>
				<Route strict path={`${match.path}filters/*/`}>
					<Link className="admin-panel-back" to="/admin/filters/">Back</Link>
				</Route>
				<Route path={match.path}>
					<Link className="admin-panel-back" to={match.path}>Back</Link>
				</Route>
			</Switch>
			<Switch>
				<Route exact path={match.path}>
					<div className="admin-panel-controls">
						<Link to={`${match.path}product/`}>
							<div className="admin-panel-control">
								<h2>New product</h2>
							</div>
						</Link>
						<Link to={`${match.path}products/`}>
							<div className="admin-panel-control">
								<h2>Edit products</h2>
							</div>
						</Link>
					</div>

					<div className="admin-panel-controls">
						<Link to={`${match.path}filter/`}>
							<div className="admin-panel-control">
								<h2>New filter</h2>
							</div>
						</Link>
						<Link to={`${match.path}filters/`}>
							<div className="admin-panel-control">
								<h2>Edit filters</h2>
							</div>
						</Link>
					</div>

					<div className="admin-panel-controls">
						<Link to={`${match.path}category/`}>
							<div className="admin-panel-control">
								<h2>New category</h2>
							</div>
						</Link>
						<Link to={`${match.path}categories/`}>
							<div className="admin-panel-control">
								<h2>Edit categories</h2>
							</div>
						</Link>
					</div>
				</Route>


				<Route strict path={`${match.path}products/:params?/`}>
					<EditProductForm />
				</Route>
				<Route strict path={`${match.path}product/`}>
					<AddProductForm />
				</Route>
				

				<Route strict path={`${match.path}filters/:filterId/options/:optionId/`}>
					<EditOptionForm />
				</Route>
				<Route strict path={`${match.path}filters/:filterId/options/`}>
					<AddOptionForm />
				</Route>
				<Route strict path={`${match.path}filters/:filterId/`}>
					<EditFilterForm />
				</Route>
				<Route strict path={`${match.path}filters/`}>
					<EditFiltersForm />
				</Route>
				<Route strict path={`${match.path}filter/`}>
					<AddFilterForm />
				</Route>


				<Route strict path={`${match.path}categories/:categoryId/`}>
					<EditCategoryForm />
				</Route>
				<Route strict path={`${match.path}categories/`}>
					<EditCategoriesForm />
				</Route>
				<Route strict path={`${match.path}category/`}>
					<AddCategoryForm />
				</Route>
			</Switch>
		</div>
	)
}
