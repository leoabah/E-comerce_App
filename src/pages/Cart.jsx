import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { FaMinus, FaPlus } from "react-icons/fa";
import "@/styles/cart.scss"

export default function Cart(){
    
     const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
        clearCart
     } = useContext(CartContext);

     return(
        <div className="main-cartshop">
            
            <br />
            <br />

            {cart.length === 0 ? (
                <p style={{"fontSize":"40px","textAlign":"center"}}>
                    <strong>
                        <em>carrito esta </em> vacio
                    </strong>
                </p>
            ) : (
                <>
                {cart.map(item => (
                    <div key={item.id}
                    className="cart-item"
                    >
                        <h3>{item.title}</h3>

                        <p>
                            Cantidad:{item.quantity}
                        </p>

                        <p>
                            Precio: ${item.price}
                        </p>
                        <div className="quantity-controls">
                            <button onClick={() =>
                                decreaseQuantity(item.id)
                            }className="btn-count"
                            >
                            <FaMinus />
                            </button>
                            <span>
                                {item.quantity}
                            </span>

                            <button
                             onClick={()=> 
                                increaseQuantity(item.id)
                             }className="btn-count"
                            >
                            <FaPlus />
                            </button>
                        </div>
                        <button 
                        onClick={() =>
                            removeFromCart(item.id)
                        } 
                        className="btncart"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}

                <h2>Total: ${totalPrice}</h2>
                <button onClick={clearCart} className="btn-cart">
                    Vaciar carrito
                </button>
                </>
            )}
        </div>
     )
}