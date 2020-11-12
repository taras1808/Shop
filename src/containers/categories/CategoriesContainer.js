import { useState, useEffect } from 'react';
import './CategoriesContainer.css'
import { Link } from "react-router-dom"

function CategoriesContainer (props) {

    const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

    useEffect(() => {
		setIsLoaded(false)
		fetch("http://192.168.0.108:7777/api/categories")
			.then(res => res.json())
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
			<div key={index} className="category-block">
				<Link className="category-link" to={`/${item.id}`}>
					<div className="block-image">
							<img src={item.image} alt="" />
					</div>
				</Link>
				<Link className="category-link" to={`/${item.id}`}>
					<h3>{item.name}</h3>
				</Link>
			</div>
        ))
	}
    
	return (
		<div className="categories">
            { content }
        </div>
	)
}

export default CategoriesContainer;
