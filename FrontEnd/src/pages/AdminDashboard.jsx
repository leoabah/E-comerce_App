import { useEffect, useState } from "react";
import productsApi from "../api/productsApi"


export default function AdminDashboard() {
 const [ products, setProducts]= useState([]);
  useEffect(() =>{
    const getProducts = async() => {
        try{
            const response = 
            await productsApi.get("/");

            setProducts(
                response.data
            );
        } catch  (error){
            console.error(error);
        }
    };
    getProducts();
  }, []);

return (
    <div>
        <h1>
            Dashboard Admin
        </h1>

        {
            products.map(product => (
                <div
                key={product._id}>
                    <br/>
                    <hr />

                    <h3>
                        {product.title}
                    </h3>

                    <p>
                        ${product.price}
                    </p>

                    <button>
                        eliminar
                    </button>

                </div>
            ))
        }
    </div>
);

}