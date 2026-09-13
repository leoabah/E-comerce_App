import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "./cartContext.js";

export const CartProvider = ({children}) => {
    const { user } = useContext(AuthContext);

    const cartStorageKey = user ? `cart_${user._id || user.email}` : "cart_guest";

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem(cartStorageKey);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    }, [cart, cartStorageKey]);

    const addToCart = (product)=>{
        const exists =cart.find(
           item => item._id === product._id 
        );
        if (exists) {
            const updateCart = cart.map(item => item._id === product._id
                ?{
                    ...item,
                    quantity: item.quantity + 1
                }
                :item
            );
            setCart(updateCart);
        }else{
            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    const increaseQuantity = (_id) => {
        const updatedCart = cart.map(
            item => 
                item._id === _id 
            ?{
               ...item,
            quantity: item.quantity + 1
        }
        : item );
        setCart(updatedCart);
    };
    
    const decreaseQuantity = (_id) => {
        const updatedCart = cart.map(item =>
            item._id === _id
            ? {
                ...item,
                quantity: 
                item.quantity - 1
            }
            :item
        )
        .filter(
            item => item.quantity > 0
        );
        setCart(updatedCart)
    }

    const removeFromCart = (_id) =>{
        setCart(
            cart.filter(item => item._id !== _id)
        );
    };

    const clearCart = ( )=> {
       setCart([]);
    localStorage.removeItem(cartStorageKey);//opcional: eliminar el carrito del localStorage al limpiar el carrito
    };

    const totalPrice = cart.reduce(
        (acc,item) => acc + item.price * item.quantity,0);

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantity,0);

    return(
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,
            totalPrice,
            totalItems,
        }}
        >{children}
        </CartContext.Provider>
    );
}