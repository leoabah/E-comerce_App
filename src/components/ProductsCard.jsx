import { Link } from "react-router-dom"
import { useContext } from "react"

import { CartContext } from "../context/CartContext";

export default  function ProductsCard({products}){
     
    const {addToCart} = useContext(CartContext); 

    return(
        <div className ="product-card">

            <img 
            src={products.image} 
            alt={products.name} 
            />

            <h3>{products.name}</h3>

            <p> ${products.price} ars</p>

            <button 
              className="btn-card"
              onClick={()=>addToCart(products)}
            >
               Comprar
            </button>
            <Link to={`/products/${products.id}`}>
                Ver detalles
            </Link>
        </div>
    );
}