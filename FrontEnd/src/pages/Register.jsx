import { useState } from "react";
import { toast } from "react-hot-toast"
import { validations } from "../utils/formValidations";
import authApi from "../api/authApi";

export default function Register(){

    const [formData, setFormData]= useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e) =>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const  validationsFrom = () => {
        if (
            !validations.name.pattern.test(
                formData.name
            )

        ){
            toast.error(
                validations.name.message
            );
            return false;
        }
        if(
            !validations.email.pattern.test(
                formData.email)
            ){
               toast.error(
            validations.email.message
        );
          return false;
        }

        if(
            !validations.password.pattern.test(
                formData.password
            )
        ){toast.error(
            validations.password.message
        );
        return false;
      }
      return true;

    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!validationsForm()) return;

        try{
            const response =
            await authApi.post(
                "/register",
                formData
            );
            toast.success(
                response.data.message
            );

            setFormData({
                name:"",
                email:"",
                password:""
            });

        } catch(error){

            toast.error(
                error.response?.data?.msg ||
                "Error al registrar usuario"
            );
        }
    };

    return(

        <div
          className="register-page"
        >
            <h1>Crear Cuenta</h1>

            <form onSubmit={handleSubmit}>
                <input
                type= "text"
                name= "name"
                placeholder = "Nombre"
                value= {formData.name}
                onChange={handleChange}
                />

                <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={formData.email}
                 onChange={handleChange}
                />

                <input
                 type= "password"
                 name = "password"
                 placeholder =  "contrasena"
                 value={formData.password}
                 onChange={handleChange}
                 />


                 <button 
                 
                 type = "submit"
                 >
                    Registrarse
                 </button>   

            </form>
        </div>
    );
}