import { useState, useEffect, useRef } from 'react'
import './ProductContainer.css'
import { useParams } from 'react-router-dom'

function ProductContainer () {

    let { productId } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        if (!productId) {
            setProduct({})
            return
        }

        const abortCtrl = new AbortController();
        const opts = { signal: abortCtrl.signal };

        fetch("http://192.168.0.108:7777/api/products/" +  productId, opts)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setProduct(result)},
                (error) => { if (error.name !== 'AbortError') setProduct({}) }
            )

        return () => abortCtrl.abort();
    }, [productId])

	return (
		<div id="product-content-block">

            <h1>{ product.name }</h1>

            <div className="product-content-block">

                <div className="block">
                    <div className="image-block">

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
                    Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych.
                    </p>
                </div>
            </div>

        </div>
	)
}

export default ProductContainer;
