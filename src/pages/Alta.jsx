import React from 'react'
import imgALtas from "@/assets/imgALtas.png";

export const Alta = () => {
  return (
      <section className='alta-container'>
       <div>
          <img 
           src={imgALtas}
           alt='banner de formulario'
           />
       </div>
       <div alta-form-container>
        <h1>
          Altas de Productos
        </h1>
        <form className="alta-form">
          <div className='form-group'>
            <label>
              Nombre completo:
            </label>
            <input 
             type='text'
             placeholder='Nombre del prodcuto'
            />
          </div>
          <div className='form-group'>
            <label>
              Precio:
            </label>
            <input 
            type="number"
            placeholder="Edad recomendada"
            />
          </div>
          <div className='form-group'>
            <label>
              Precio:
            </label>
            <input 
            type="number"
            placeholder="$"
            />
          </div>
          <div className='form-group'>
            <label>
              Edad:
            </label>
            <input 
            type="number"
            placeholder="Edad recomendada"
            />
          </div>
          <div className='form-group'>
            <label>
              Descripcion cortas:
            </label>
            <textarea
            type="number"
            placeholder="Descripcion corta.."
            />
          </div>
          <div className='form-group'>
            <label>
              Descripcion larga:
            </label>
            <textarea 
            type="number"
            placeholder="Descripcion corta.."
            />
          </div>
          <div className='form-group'>
            <label>
              cantidad:
            </label>
            <input
            type="number"
            placeholder="Stock disponible"
            />
          </div>
          <div className='form-group'>
            <label>
              Imagen:
            </label>
            <input
            type="file"
            />
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
  );
}
