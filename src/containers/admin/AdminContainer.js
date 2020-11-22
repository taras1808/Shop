import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import AddProductForm from '../../components/admin/forms/AddProductForm';
import EditProductForm from '../../components/admin/forms/EditProductForm';
import DeleteProductForm from '../../components/admin/forms/DeleteProductForm';

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
			</Switch>
		</div>
	)
}
