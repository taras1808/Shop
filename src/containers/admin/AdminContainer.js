import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import ProductForm from '../../components/admin/forms/product/ProductForm';
import ProducentForm from '../../components/admin/forms/producent/ProducentForm';

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
						<Link to={`${match.path}/product`}>
							<div className="admin-panel-control">
								<h2>New product</h2>
							</div>
						</Link>
						<Link to={`${match.path}/producent`}>
							<div className="admin-panel-control">
								<h2>New producent</h2>
							</div>
						</Link>
					</div>
				</Route>
				<Route path={`${match.path}/product`}>
					<ProductForm />
				</Route>
				<Route path={`${match.path}/producent`}>
					<ProducentForm />
				</Route>
			</Switch>
		</div>
	)
}
