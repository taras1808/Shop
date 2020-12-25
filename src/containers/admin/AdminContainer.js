import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import AddProductForm from '../../components/admin/forms/product/AddProductForm'
import EditProductForm from '../../components/admin/forms/product/EditProductForm'

import AddFilterForm from '../../components/admin/forms/filter/AddFilterForm'
import EditFilterForm from '../../components/admin/forms/filter/EditFilterForm'
import EditFiltersForm from '../../components/admin/forms/filter/EditFiltersForm'

import AddOptionForm from '../../components/admin/forms/filter/option/AddOptionForm'
import EditOptionForm from '../../components/admin/forms/filter/option/EditOptionForm'

import AddCategoryForm from '../../components/admin/forms/category/AddCategoryForm'
import EditCategoriesForm from '../../components/admin/forms/category/EditCategoriesForm'
import EditCategoryForm from '../../components/admin/forms/category/EditCategoryForm'


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


				<Route path={`${match.path}products/`}>
					<EditProductForm />
				</Route>
				<Route path={`${match.path}product/`}>
					<AddProductForm />
				</Route>
				

				<Route path={`${match.path}filters/:filterId/options/:optionId/`}>
					<EditOptionForm />
				</Route>
				<Route path={`${match.path}filters/:filterId/options/`}>
					<AddOptionForm />
				</Route>
				<Route path={`${match.path}filters/:filterId/`}>
					<EditFilterForm />
				</Route>
				<Route path={`${match.path}filters/`}>
					<EditFiltersForm />
				</Route>
				<Route path={`${match.path}filter/`}>
					<AddFilterForm />
				</Route>


				<Route path={`${match.path}categories/:categoryId/`}>
					<EditCategoryForm />
				</Route>
				<Route path={`${match.path}categories/`}>
					<EditCategoriesForm />
				</Route>
				<Route path={`${match.path}category/`}>
					<AddCategoryForm />
				</Route>
			</Switch>
		</div>
	)
}
