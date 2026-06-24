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
        <div className="profile-page">

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

            </div>

        </div>
    );
}
