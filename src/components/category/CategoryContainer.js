import { useState, useEffect } from 'react';
import './CategoryContainer.css'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { categoriesService } from '../../_services/categories.service'
import NavBar, { NavType } from '../navbar/NavBar'


export default function CategoryContainer () {

	const { categoryId } = useParams()

    const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [item, setItem] = useState(null);

    useEffect(() => {
		setIsLoaded(false)
		categoriesService.getCategory(categoryId)
			.then(
				(result) => {
					setItem(result);
					setIsLoaded(true);
					setError();
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
    }, [categoryId])

    let content

	if (error) {
		content = (<div>Error: {error.message}</div>);
	} else if (!isLoaded) {
		content = [1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="category-block" style={{backgroundColor: "#eee"}}>

            </div>
        ))
	} else {
		content = item.childrens.map((item, index) => (
			(item.childrens ? item.childrens.length > 0 : false) ? (
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
		<>
			<NavBar item={item} type={NavType.CATEGORY}/>
			<div className="categories">
				{ content }
			</div>
		</>
	)
}
