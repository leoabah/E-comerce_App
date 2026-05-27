import { Link } from "react-router-dom"
import { useContext } from "react"
import { toast } from "react-hot-toast"
import { CartContext } from "../context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";

export default  function ProductsCard({
    products
})  {
     
    const {
           cart,
           addToCart,
           increaseQuantity,
           decreaseQuantity
        } = useContext(CartContext); 

        const cartItem = cart.find(
            item => item.id === products.id
        );

    return (
        <div className ="product-card">

            <img 
            src={products.image} 
            alt={products.name} 
            />

            <h3>{products.name}</h3>

            <p> ${products.price} ars</p>

            {!cartItem ? (

            <button 
              className="btn-card"
              onClick={()=>{
                addToCart(products);
                toast.success(
                    "Producto agregado"
                );
              }}
            >
               Comprar
            </button>
            ) : (

                < div className="quantity-controls">

                 <button 
                    className="btn-count"
                    onClick={() =>
                        decreaseQuantity(products.id)
                    }
                >
               <FaMinus/>
             </button> 

            <span>
                {cartItem.quantity}
            </span>  

             <button 
                     className="btn-count"
                     onClick={()=>
                        increaseQuantity(products.id)
                }
             >
               <FaPlus/>
             </button>

        </div>

      )}  
            
            <Link to={`/products/${products.id}`} 
            className="cart-detail"
            >
                Ver detalles
            </Link>
        </div>
    );
}