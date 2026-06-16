import { useState } from "react";
import { toast } from "react-hot-toast"
import authApi from "../api/authApi";

export  default function Login(){

    const [formData , setFormData]= useState({
        email:"",
        password:""
    });

    const handleChange= (e) => {

        setFormData({ 
        ... formData,
        [e.target.name]: e.target.value
      });
    };
    const handleSubmit  = async (e) => {
        e.preventDefault ();
        
        try{
            const response = await authApi.post( 
            "/login",
            formData
        );
        console.log(response.data);
        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
        toast.success(
            response.data.message
        );
        } catch (error){
            toast.error(
                error.response?.data?.message ||
                "Error al inciar sesion"
            );
        }
      
    };

    return(

        <div className="login-page">

            <h1>Iniciar Sesion</h1>

            <form onSubmit={handleSubmit}>

                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                />

                <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                />
                
            <button type="submit">
                Ingresar
            </button>

            </form>

        </div>
    );
}