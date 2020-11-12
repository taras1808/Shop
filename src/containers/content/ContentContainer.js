import './ContentContainer.css'
import ProductsContainer from '../products/ProductsContainer.js'
import NavBar from '../../components/navbar/NavBar'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import ProductContainer from '../product/ProductContainer.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CategoriesContainer from '../categories/CategoriesContainer'
import AdminContainer from '../admin/AdminContainer'
import { useState } from 'react';


export default function ContentContainer ({ search }) {

	const [producers, setProducers] = useState([])
	const [priceRange, setPriceRange] = useState([])
	const [orderBy, setOrderBy] = useState(0)

	return (
		<div className="container">
			<Router >
				<Switch>
					<Route path="/admin"></Route>
					<Route path="/:categoryId">
						<NavBar />
					</Route>
				</Switch>
				<Switch>
					<Route path="/admin">
						<AdminContainer />
					</Route>
					<Route path="/:categoryId/:productId">
						<ProductContainer />
					</Route>
					<Route path="/:categoryId">
						<SortContainer orderBy={orderBy} setOrderBy={setOrderBy}/>
						<div className="flex">
							<FiltersContainer 
								items={{
									selectedProducers : {
										value: producers,
										setProducers: (e) => setProducers(e), 
									}, 
									selectedPriceRange: {
										value: priceRange,
										setPriceRange: (e) => setPriceRange(e)
									}
								}}
							/>
							<ProductsContainer 
								producers={producers}
								priceRange={priceRange}
								orderBy={orderBy}
							/>
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
