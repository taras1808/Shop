import { useState, useEffect } from 'react'
import './CategoriesContainer.css'
import { Link } from 'react-router-dom'
import { categoriesService } from '../../_services/categories.service'


export default function CategoriesContainer() {

    const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

    useEffect(() => {
		setIsLoaded(false)
		categoriesService.getRoots()
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
					setError();
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
    }, [])

    let content

	if (error) {
		content = (<div>Error: {error.message}</div>);
	} else if (!isLoaded) {
		content = [1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="category-block" style={{backgroundColor: "#eee"}}>

            </div>
        ))
	} else {
		content = items.map((item, index) => (

			item.childrens.length > 0 ? (
				<div key={index} className="category-block">
					<Link className="category-link" to={`/category/${item.id}/`}>
						<div className="block-image">
							<img src={item.image} alt="" />
						</div>
					</Link>
					<Link className="category-link" to={`/category/${item.id}/`}>
						<h3>{item.name}</h3>
					</Link>
				</div>
			) : (
				<div key={index} className="category-block">	
					<Link className="category-link" to={`/catalog/${item.id}/`}>
						<div className="block-image">
							<img src={item.image} alt="" />
						</div>
					</Link>
					<Link className="category-link" to={`/catalog/${item.id}/`}>
						<h3>{item.name}</h3>
					</Link>
				</div>
			)
        ))
	}
    
	return (
		<div className="categories">
            { content }
        </div>
	)
}
