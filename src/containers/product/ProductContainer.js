import { useState, useEffect } from 'react'
import './ProductContainer.css';
import { useParams } from "react-router-dom";

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

        fetch("http://192.168.0.108:7777/api/product/" +  productId, opts)
            .then(res => res.json())
            .then(
                (result) => setProduct(result),
                (error) => { if (error.name !== 'AbortError') setProduct({}) }
            )

        return () => abortCtrl.abort();
    }, [productId])

	return (
		<div id="product-content-block">

            <h1>{ product.name }</h1>


            <div className="flex">
                <div>
                    <div className="image-block">
                        <img className="image" src={ product.image } alt="" />
                    </div>
                </div>
                <div>
                    <p className="old-price-label"><s>99999 $</s></p>
                    <p className="price-label">{ product.price } $</p>

                    <div className="buy-button">
                        Buy Now
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
