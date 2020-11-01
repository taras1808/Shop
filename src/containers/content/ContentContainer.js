import './ContentContainer.css';
import ProductsContainer from '../products/ProductsContainer.js';
import NavBar from '../../components/navbar/NavBar';
import FiltersContainer from '../filters/FiltersContainer.js';


function ContentContainer (props) {
	return (
		<div className="container">
      		<NavBar />
			<div className="flex">
				<FiltersContainer />
				<ProductsContainer search={props.search} />
			</div>
		</div>
	)
}

export default ContentContainer;
