import { useEffect, useState } from "react";
import productsApi from "../api/productsApi";
import { Link } from "react-router-dom";
import "../styles/adminDashboard.scss";




export default function AdminDashboard() {

 

 const handleDelete = async(id) =>{

    const confirmar = window.confirm(
        "Eliminar producto?"
    );

    if(confirmar) return;

    try{
await productsApi.delete(`/${id}`);
   
    setProducts(
        products.filter(
            product => 
            product._id !== id
        )
    );
    } catch(error){
        console.error(error);
    }

 };

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

     const totalProducts = products.length;

    const totalStock = products.reduce((acc, product)=> acc + product.stock,
    0
);

    
    const totalValue = products.reduce(
        (acc, product) => acc +(product.price * product.stock),
        0
    );

return (
    <div className="admin-dashboard">

        <h1 className="admin-title">
            Dashboard Admin
        </h1>
        <div
         className=
         "admin-cards"
         >
            <div
            className=
            "admin-card"
            >
                <h3>Productos</h3>
                <span>{totalProducts}</span>
            </div>

            <div
            className=
            "admin-card"
            >
                <h3>Stock Total</h3>
                <span>{totalStock}</span>
            </div>

            <div
            className=
            "admin-card"
            >
                <h3>Valor Inventario</h3>
                <span>{totalValue}</span>
            </div>

            <div
            className=
            "admin-card"
            >
                <h3>Pedidos</h3>
                <span>0</span>
            </div>

        </div>
        <div
        className="products-section">
            <h2>Productos</h2>
            <div className="table-container">
            <table
            className=" products-table">
             <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>stock</th>
                    <th>Acciones</th>
                </tr>
             </thead>

            <tbody>

            {products.map(product =>(
                <tr
                key={product._id}>
                    <td>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="table-image"
                          />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>

                    <td className="actions">

                    <Link to={`/edit/${product._id}`}>

                       <button className="btn-edit">
                        ✏ Editar
                       </button>
                    </Link>

                    <button
                    className="btn-delete"
                    onClick={() =>
                        handleDelete(product._id)
                    }
                    >
                        🗑 Eliminar
                    </button>

                </td>

              </tr>  

))}

            </tbody>

        </table>
    </div> 

    </div>

    </div>
);
}