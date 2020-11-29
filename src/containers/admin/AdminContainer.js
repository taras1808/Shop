import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import AddProductForm from '../../components/admin/forms/product/AddProductForm'
import EditProductForm from '../../components/admin/forms/product/EditProductForm'
import DeleteProductForm from '../../components/admin/forms/product/DeleteProductForm'
import AddFilterForm from '../../components/admin/forms/filter/AddFilterForm'
import EditFilterForm from '../../components/admin/forms/filter/EditFilterForm'
import DeleteFilterForm from '../../components/admin/forms/filter/DeleteFilterForm'
import AddOptionForm from '../../components/admin/forms/option/AddOptionForm'
import EditOptionForm from '../../components/admin/forms/option/EditOptionForm'
import DeleteOptionForm from '../../components/admin/forms/option/DeleteOptionForm'
import AddCategoryForm from '../../components/admin/forms/category/AddCategoryForm'
import EditCategoryForm from '../../components/admin/forms/category/EditCategoryForm'
import DeleteCategoryForm from '../../components/admin/forms/category/DeleteCategoryForm'


export default function AdminContainer () {
	let match = useRouteMatch();
	return (
		<div className="admin-panel">
			<Switch>
				<Route exact path={match.path}></Route>
				<Route path={match.path}>
					<Link className="admin-panel-back" to={match.path}>Back</Link>
				</Route>
			</Switch>
			<Switch>
				<Route exact path={match.path}>
					<div className="admin-panel-controls">
						<Link to={`${match.path}product/add`}>
							<div className="admin-panel-control">
								<h2>New product</h2>
							</div>
						</Link>
						<Link to={`${match.path}product/edit`}>
							<div className="admin-panel-control">
								<h2>Edit product</h2>
							</div>
						</Link>
						<Link to={`${match.path}product/delete`}>
							<div className="admin-panel-control">
								<h2>Delete product</h2>
							</div>
						</Link>
						
					</div>

					<div className="admin-panel-controls">
						<Link to={`${match.path}filter/add`}>
							<div className="admin-panel-control">
								<h2>New filter</h2>
							</div>
						</Link>
						<Link to={`${match.path}filter/edit`}>
							<div className="admin-panel-control">
								<h2>Edit filter</h2>
							</div>
						</Link>
						<Link to={`${match.path}filter/delete`}>
							<div className="admin-panel-control">
								<h2>Delete filter</h2>
							</div>
						</Link>
					</div>

					<div className="admin-panel-controls">
						<Link to={`${match.path}option/add`}>
							<div className="admin-panel-control">
								<h2>New option</h2>
							</div>
						</Link>
						<Link to={`${match.path}option/edit`}>
							<div className="admin-panel-control">
								<h2>Edit option</h2>
							</div>
						</Link>
						<Link to={`${match.path}option/delete`}>
							<div className="admin-panel-control">
								<h2>Delete option</h2>
							</div>
						</Link>
					</div>

					<div className="admin-panel-controls">
						<Link to={`${match.path}category/add`}>
							<div className="admin-panel-control">
								<h2>New category</h2>
							</div>
						</Link>
						<Link to={`${match.path}category/edit`}>
							<div className="admin-panel-control">
								<h2>Edit category</h2>
							</div>
						</Link>
						<Link to={`${match.path}category/delete`}>
							<div className="admin-panel-control">
								<h2>Delete category</h2>
							</div>
						</Link>
					</div>
				</Route>



				<Route path={`${match.path}product/delete`}>
					<DeleteProductForm />
				</Route>
				<Route path={`${match.path}product/edit`}>
					<EditProductForm />
				</Route>
				<Route path={`${match.path}product/add`}>
					<AddProductForm />
				</Route>

				<Route path={`${match.path}filter/delete`}>
					<DeleteFilterForm />
				</Route>
				<Route path={`${match.path}filter/edit`}>
					<EditFilterForm />
				</Route>
				<Route path={`${match.path}filter/add`}>
					<AddFilterForm />
				</Route>

				<Route path={`${match.path}option/delete`}>
					<DeleteOptionForm />
				</Route>
				<Route path={`${match.path}option/edit`}>
					<EditOptionForm />
				</Route>
				<Route path={`${match.path}option/add`}>
					<AddOptionForm />
				</Route>


				<Route path={`${match.path}category/delete`}>
					<DeleteCategoryForm />
				</Route>
				<Route path={`${match.path}category/edit`}>
					<EditCategoryForm />
				</Route>
				<Route path={`${match.path}category/add`}>
					<AddCategoryForm />
				</Route>
			</Switch>
		</div>
	)
}
