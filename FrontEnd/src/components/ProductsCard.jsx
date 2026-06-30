import { Link } from "react-router-dom"
import { useContext } from "react"
import { toast } from "react-hot-toast"
import { CartContext } from "../context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";



export default  function ProductsCard({
    product,
    deleteProduct
})  {
     
    const {
           cart,
           addToCart,
           increaseQuantity,
           decreaseQuantity
        } = useContext(CartContext); 

        const cartItem = cart.find(
            item => item._id === product._id
        );

        const isAdmin = false;
         

          const imageUrl = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

           console.log("BASE_URL:", import.meta.env.BASE_URL);
           console.log("IMAGE:",imageUrl)

           const finalImage =
           imageUrl
           ? import.meta.env.BASE_URL + imageUrl.replace("/", "")
           : import.meta.env.BASE_URL + "placeholder.jpg";

           console.log("FINAL:", finalImage);
    return (

        <div className ="product-card">

            <img 
            src={
            imageUrl
            ? import.meta.env.BASE_URL + imageUrl.replace("/", "")
            : import.meta.env.BASE_URL + "placeholder.jpg"
        }
            alt={product.title} 
            />

            <h3>{product.title}</h3>

            <p> ${product.price} ars</p>

            {!cartItem ? (

            <button 
              className="btn-card"
                                onClick={()=>{
                                addToCart(product);
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
                        decreaseQuantity(product._id)
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
                                increaseQuantity(product._id)
                     }
             >
               <FaPlus/>
             </button>

        </div>

      )}  
            
            <Link 
            to={`/products/${product._id}`} 
            className="cart-detail"
            >
                Ver detalles
            </Link> 

            {isAdmin && (
                <>

                <button 
                className="btn-delete"
                onClick={()=>
                    deleteProduct(product._id)
                }
                >
                   Eliminar 
                </button>

                <Link
                to={`/edit/${product._id}`}
                className="btn-edit"
                >
                    Editar
            </Link>
            
            </>

         )}
         
        </div>
    );
}