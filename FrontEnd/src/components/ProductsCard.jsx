import { Link } from "react-router-dom"
import { useContext } from "react"
import { toast } from "react-hot-toast"
import { CartContext } from "../context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";



export default  function ProductsCard({
    products,
    deleteProduct
})  {
     
    const {
           cart,
           addToCart,
           increaseQuantity,
           decreaseQuantity
        } = useContext(CartContext); 

        const cartItem = cart.find(
            item => item.id === products._id
           
        );

        const isAdmin = false;
         

        const imageUrl = Array.isArray(products.image)
           ? products.image[0]
           : products.image;

           console.log("BASE_URL:", import.meta.env.BASE_URL);
           console.log("IMAGE:",imageUrl)

           const finalImage =
           imageUrl
           ? import.meta.env.BASE_URL
           + imageUrl.replace("/", "")
           : import.meta.env.BASE_URL 
           + "placeholder.jpg"

           console.log("FINAL:", finalImage);
    return (

        <div className ="product-card">

            <img 
            src={
            imageUrl
            ? import.meta.env.BASE_URL
             + imageUrl.replace("/","")
            : import.meta.env.BASE_URL
             + "placerholder.jpg"  
        }
            alt={products.title} 
            />

            <h3>{products.title}</h3>

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
                        decreaseQuantity(products._id)
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
                        increaseQuantity(products._id)
                }
             >
               <FaPlus/>
             </button>

        </div>

      )}  
            
            <Link 
            to={`/products/${products._id}`} 
            className="cart-detail"
            >
                Ver detalles
            </Link> 

            {isAdmin && (
                <>

                <button 
                className="btn-delete"
                onClick={()=>
                    deleteProduct(products._id)
                }
                >
                   Eliminar 
                </button>

                <Link
                to={`/edit/${products._id}`}
                className="btn-edit"
                >
                    Editar
            </Link>
            
            </>

         )}
         
        </div>
    );
}