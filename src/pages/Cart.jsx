import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function Cart(){
     const {
        cart,
        removeFormCart,
        totalPrice,
        clearCart
     } = useContext(CartContext);

     return(
        <div>
            <h1>carrito</h1>

            {cart.length === 0 ? (
                <p>el carrito esta vacio</p>
            ) : (
                <>
                {cart.map(item => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>

                        <p>
                            Cantidad:{item.quantity}
                        </p>

                        <p>
                            Precio:${item.price}
                        </p>
                        <button 
                        onClick={() => removeFormCart(item.id)} className="btn-cart">
                            Eliminar
                        </button>
                    </div>
                ))}

                <h2>Total: ${totalPrice}</h2>
                <button onclick={cleanCart} className="btn-cart">
                    Eliminar
                </button>
                </>
            )}
        </div>
     )
}