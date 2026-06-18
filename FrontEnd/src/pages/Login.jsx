import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthContext } from "@/context/AuthContext";
import authApi from "../api/authApi";
import { validations } from "../utils/formValidations";
import "../styles/login.scss";
import { Value } from "sass";
 

export default function Login(){

    const {login}= useContext(AuthContext);

    const navigate = useNavigate();

    const [formData, setFormData]= useState({
        email:"",
        password:""
    });

    const [errors, setErrors]= useState({});

    const validateField = (name, Value) => {
        let error = "";

        switch(name){

            case "email":
                if (
                    !validations.email.pattern.test(Value)
                ){
                    error = validations.email.message;
                }

                break;

            case "password":

                if (
                    !validations.password.pattern.test(Value)
                ){
                    error = validations.password.message;
                }

                break;

                default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]:error
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        validateField(name, value);
    };

    const validationsFrom = () => {

        validateField("email", formData.email);
        validateField("password", formData.password);

        if(
            !validations.password.pattern.test(
                formData.password
            )
        ){
            return false;
        }

        if (
            !validations.password.pattern.test(
                formData.password
            )
        ){
            return false;
        }
        return true;
    
    };

    const handleSubmit = async (e) => {

        e.preventDefaul();

        if (!validationsFrom()) {
                toast.errror(
                    "Corrige los errores del formulario"
            );
            return;

        }
        try { 
            const response = await authApi.post(
                "/login",
                formsdata
            );

            login(
                response.data.user,
                response.data.token
            );

            toast.success(
                response.data.message
            );

            navigate("/");

        } catch(error) {

            toast.error(
                error.response?.data?.message || "Error al iniciar sesion"
            );
        }
    };

    return (

        <div className="login-page"
             onSubmit={handleSubmit}
           >
            <div
            className="login-container"
            >
                <h1 className="login-title"
                >
                    Iniciar Sesion
                </h1>
        <form 
         className="login-form"
         onSubmit={handleSubmit}
         >

         <label>Email</label>

         <input
         type="email"
         name="email"
         placeholder="Ingresar tu email"
         value={formData.email}
         onChange={handleChange}
         />
         {errors.email && (
            <span className="error">
                {errors.email}
            </span>
         )}

         <label>Contraseña</label>

         <input
           type="password"
           name="password"
           placeholder="Ingresa tu contraseña"
           value={formData.password}
           onChange={handleChange}
           />
           {errors.password && (
            <span
            className="error">
                {errors.password}
            </span>
           )}

           <button type="submit">
            Ingresar
           </button>
    </form>

    <p 
    className="register-link">
        ¿No tienes cuenta?{" "}
        <Link to="/register">
          Registrate
        </Link>
    </p>

    </div>

    </div>
    );

}