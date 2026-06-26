import { useEffect, useState } from "react";
import productsApi from "../api/productsApi";
import { Link } from "react-router-dom";
import "../styles/adminDashboard.scss";
import {
    FaBook,
    FaBoxes,
    FaDollarSign,
    FaShoppingCart,
    FaPlus,
    FaPen,
    FaTrash
} from "react-icons/fa"



export default function AdminDashboard() {

 

 const handleDelete = async(id) =>{

    const confirmar = window.confirm(
        "Eliminar producto?"
    );

    if(!confirmar) return;

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
            className="admin-card">

                <div className="card-icon products">
                    <FaBook />
                </div>

                <h3>Productos</h3>

                <span>{totalProducts}</span>

                <small>Total de productos</small>

            </div>

            <div
            className="admin-card">
                <div className="card-icon stock">
                    <FaBoxes />
                </div>

                <h3>Stock Total</h3>
                <span>{totalStock}</span>

                <small>Unidades disponibles</small>
            </div>

            <div
            className=
            "admin-card"
            >
                <div className="card-icon money">
                    <FaDollarSign />
                </div>

                <h3>Valor Inventario</h3>
                <span>
                    ${totalValue.toLocaleString("es-Ar")}
                </span>

                <small>Valor total</small>

                </div>

            <div
            className=
            "admin-card"
            >
                <div className="card-icon orders">
                    <FaShoppingCart />
                </div>

                <h3>Pedidos</h3>
                <span>0</span>
                <small>Total realizados</small>
            </div>

        </div>
        <div
        className="products-section">
            <div className="product-hearder">

            <h2>Productos</h2>
            <br />
            <Link to="/alta"
            className="btn-add">
            
            <FaPlus />
            Añadir Producto

            </Link>

            </div>

            <div className="table-container">

            <table
            className=" product-table">
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

            {products.map(product =>{

               return(
                <tr
                key={product._id}>
                    <td>
                        <img
                          src={product.image[0]}
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
                        <FaPen />
                        Editar
                       </button>
                    </Link>

                    <button
                    className="btn-delete"
                    onClick={() =>
                        handleDelete(product._id)
                    }
                    >
                        <FaTrash />
                        Eliminar
                    </button>

                </td>

              </tr>  
               );
})}

            </tbody>

        </table>
    </div> 

    </div>

    </div>
);
}