import { createContext, useEffect, useState } from "react";
export const CartContext =  createContext();
export function CartProvider({children}){

    const [cart,setCart] = useState(() =>{
        const savedCart = localStorage.getItem("cart");
        return savedCart
        ? JSON.parse(savedCart)
        :[];
    });

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart)
    );
    }, [cart]);

    const addToCart = (product)=>{
        const exists =cart.find(
           item => item.id === product.id 
        );
        if (exists) {
            const updateCart = cart.map(item => item.id === product.id
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

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(
            item => 
                item.id ===id 
            ?{
               ...item,
            quantity: item.quantity + 1
        }
        : item );
        setCart(updatedCart);
    };
    
    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id
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

    const removeFromCart = (id) =>{
        setCart(
            cart.filter(item => item.id !== id)
        );
    };

    const clearCart = ( )=> {
       setCart([]);
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