import { useState, useEffect } from 'react'
import './ProductContainer.css'
import { useParams } from 'react-router-dom'
import ImagesGallery from '../gallery/ImagesGallery'
import Product from './Product'
import { productsService } from '../../_services/products.service'


export default function ProductContainer () {

    let { productId } = useParams();
    
    const [product, setProduct] = useState({})

    useEffect(() => {

        window.scrollTo({ top: 0 })

        if (!productId) {
            setProduct({})
            return
        }

        const abortCtrl = new AbortController();
        const opts = { signal: abortCtrl.signal };

        productsService.getProduct(productId, opts)
            .then(
                (result) => setProduct(result),
                (error) => { if (error.name !== 'AbortError') setProduct({}) }
            )

        return () => abortCtrl.abort();
    }, [productId])

	return (
		<div id="product-content-block">

            <div className="product-content-block">

                <div className="block">
                    <div className="images-block">

                        <ImagesGallery images={product.images} />

                    </div>
                </div>
                <div className="block">

                    <div className="buy-block">

                        <div className="price-block">
                            <p className="old-price-label"><s>{ product.old_price ? `${product.old_price} $` : '' }</s></p>
                            <p className={ product.old_price ? 'old price-label' : 'price-label'}>{ product.price } $</p>
                        </div>

                        <div className="buy-button">
                            Buy Now
                        </div>

                    </div>

                    <p>
                        { product.info }
                    </p>
                </div>
            </div>


            <h2>Parametry <span>{ product.name }</span></h2>

            {   
                product.options &&
                    <ul className="product-params-block">
                        {
                            product.options.map((e, index) => (
                                <li key={index}>
                                    <div><span>{ e.name }</span></div>
                                    <div><span>{ e.value }</span></div>
                                </li>
                            ))
                        }
                    </ul>
            }

            <h2>Produkty z kategorii <span>{ product.category && product.category.name }</span></h2>

            <div className="products">
                {
                    product.items && product.items.map((item, index) => 
                        (<Product key={index} item={item} />)
                    )
                }
            </div>


        </div>
	)
}
