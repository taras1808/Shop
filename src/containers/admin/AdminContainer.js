import './AdminContainer.css'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import ProductForm from '../../components/admin/forms/product/ProductForm';
import ProducerForm from '../../components/admin/forms/producer/ProducerForm';
import UpdateProducerForm from '../../components/admin/forms/update-producer/UpdateProducerForm';
import UpdateProductForm from '../../components/admin/forms/update-product/UpdateProductForm';

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
						<Link to={`${match.path}/product/update`}>
							<div className="admin-panel-control">
								<h2>Update product</h2>
							</div>
						</Link>
						<Link to={`${match.path}/producer`}>
							<div className="admin-panel-control">
								<h2>New producer</h2>
							</div>
						</Link>
						<Link to={`${match.path}/producer/update`}>
							<div className="admin-panel-control">
								<h2>Update producer</h2>
							</div>
						</Link>
					</div>
				</Route>
				<Route path={`${match.path}/product/update`}>
					<UpdateProductForm />
				</Route>
				<Route path={`${match.path}/product`}>
					<ProductForm />
				</Route>
				<Route path={`${match.path}/producer/update`}>
					<UpdateProducerForm />
				</Route>
				<Route path={`${match.path}/producer`}>
					<ProducerForm />
				</Route>
			</Switch>
		</div>
	)
}
