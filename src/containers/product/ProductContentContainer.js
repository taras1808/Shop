import './ProductContentContainer.css';
import { useParams } from "react-router-dom";

function ProductContentContainer () {

    let { productId } = useParams();

	return (
		<div id="product-content-block">

    <h1>Castrol EDGE OIL { productId }</h1>


            <div className="flex">
                <div>
                    <div className="image-block">
                        <img className="image" src="/product.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <p className="old-price-label"><s>69.99 $</s></p>
                    <p className="price-label">49.99 $</p>

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

export default ProductContentContainer;
