import React, { useState } from 'react'
import { validations } from '../utils/formValidations';
import imgALtas from "@/assets/imgALtas.png";
import "@/styles/alta.scss"
export const Alta = () => {

  const [form,setform]= useState(
    {
      name:"",
      price:"",
      age:"",
      shrotDescription:"",
      longDescription:"",
      stock:""
    }
  );
  const [errors ,setErrors]= useState({});
  const handelChange =(e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
    const validate = ()=> {

      let newErrors  = {};

      Object.keys(validations)
      .forEach(field =>{

        const rule = 
        validations[field];

        const value =
        form[field];

        if (
          rule.required && 
          !value.trim()
        ){
          newErrors[field]=
          "Campo obligatorio";

          return;
      
        }
        if (
          !rule.pattern.test(value)
        ){
          newErrors[field]= rule.message;
        }
      });
      setErrors(newErrors);

      return Object.keys(newErrors)
       .length === 0;
    };

    const handleSubmit = (e) =>{

      e.preventDefault();

      if(validate()){
        console.log("formulario valido");
      } else{
        console.log("Errores");
      }
    };
  
  return (
     <div className='alta-contain'>
      <section className='alta-container'>
       <div>
          <img 
           src={imgALtas}
           alt='banner de formulario'
           />
       </div>
       <div alta-form-container>
        <h1 style={{"marginBottom":25}}
        className='alta-form-title'
        >
          Altas de Productos
        </h1>
        <form
            className="alta-form"
            onSubmit={handleSubmit}
>
          <div className='form-group'>
            <label>
              Nombre completo:
            </label>
            <input 
             type='text'
             placeholder='Nombre del prodcuto'
             value={form.name}
             onChange={handelChange}
            />
          </div>
          <div className='form-group'>
            <label>
              Precio:
            </label>
            <input 
            type="number"
            placeholder="Solo numero"
            value={form.price}
             onChange={handelChange}
            />
          </div>
          
          <div className='form-group'>
            <label>
              Edad:
            </label>
            <input 
            type="number"
            placeholder="Edad recomendada"
            value={form.age}
             onChange={handelChange}
            />
          </div>
          <div className='form-group'>
            <label>
              Descripcion cortas:
            </label>
            <textarea
            type="number"
            placeholder="Descripcion corta.."
            value={form.shrotDescription}
             onChange={handelChange}
            />
          </div>
          <div className='form-group'>
            <label>
              Descripcion larga:
            </label>
            <textarea 
            type="number"
            placeholder="Descripcion larga.."
            value={form.longDescription}
             onChange={handelChange}
            />
          </div>
          <div className='form-group'>
            <label>
              cantidad:
            </label>
            <input
            type="number"
            name='stock'
            placeholder="Stock disponible"
            value={form.stock}
            onChange={handelChange}
            />
            { 
              errors.stock && (
                <p className='error'>
                  {errors.stock}
                </p>
              )
            }
          </div>
          <div className='checkbox-group'>

            <label>
              <input type="checkbox" />
              amistad
              
            </label>
            <label>
              <input type="checkbox"/>
              shonen
            </label>
            <label>
              <input type="checkbox" />
              demonios
            </label>
          </div>
          <button
          type='submit'
          className='btn-submit'
          >
            Enviar
          </button>
        </form>
       </div>
      </section>
    </div>
  );
}
