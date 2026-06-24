import { useContext, useState , useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import orderApi from "../api/orderApi";


export default function Profile() {

    const { user } = useContext(AuthContext);
    const [orders, setOrders]= useState([]);

    useEffect(() =>{
        const getOrders = async () => {
            try{
                const token = 
                localStorage.getItem("token");
                const response = 
                await orderApi.get(
                    "/my-orders",
                    {
                        headers:{
                            Authorization :
                            `Bearer ${token}`
                        }
                    }
                );
             setOrders(response.data);
            } catch (error){
                console.error(error);
            }
        };
        getOrders();

    }, []);

    return(

        <div 
          className="profile-page">
            

            <h1>Perfil</h1>

            <div className="profile-card">

                <p>
                    <strong>Nombre:</strong>
                    {" "}
                    {user?.name}
                </p>
                <p>
                    <strong>Email:</strong>
                    {" "}
                    {user?.email}
                </p>
                <p>
                    <strong>Rol:</strong>
                    {" "}
                    {user?.role}
                </p>

            <h2>Mis Compras</h2>

            <div 
            className="orders-container">

            {orders.length === 0 ? (
                <p>No posees compras todavia.</p>
            ) : (
                orders.map((order) => (
                    <div
                    key={order._id}
                    className="order-card"
                    >
                        <p>
                            <strong>Fecha:</strong>{" "}
                            { order.createAt
                            ? new Date(order.createAt).    toLocaleTimeString("es-AR")
                            : "Sin fecha"}
                        </p>

                        <ul>
                            {order.products.map((item) => (
                                <li
                                key={item._id}>
                                    {item.productoId?.title || item.productId || "Producto eliminado"}
                                    {"  | cantidad: "}
                                    {item.quantity}
                                </li>
                            ))}
                        </ul>

                        <p className="order-total">
                            Total: ${order.total}
                        </p>
                    </div>
                ))
            )}

          </div> 
          </div> 

        </div>
    )
}
