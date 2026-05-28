import products from "@/data/products";
import ProductsCard from "@/components/ProductsCard";
import React, { useState , useEffect} from "react";
import Carrusel from "@/components/Carrusel";
import productsApi from "../api/productsApi";
import "@/styles/product-card.scss"
import "@/styles/home.scss"
import "@/styles/Carrusel.scss"

import banner1 from "@/assets/Banner1.png"
import banner2 from "@/assets/Banner2.png"
import banner3 from "@/assets/Banner3.png"


export default function home() {
     const images =[banner1,banner2,banner3];
     const [products ,setProducts]= useState([]);
     const [loading , setLoading]= useState (true);
     const [error , setError]= useState(false);
     
     useEffect(() =>{
      const getProducts = async() =>{
         try{
            const response = await productsApi.get("/products");
            // Ajustar rutas de imagen devueltas por la API para respetar BASE_URL
            const mapped = response.data.map(p => ({
               ...p,
               image: import.meta.env.BASE_URL + String(p.image).replace(/^\//, "")
            }));
            setProducts(mapped);

         } catch(error)
         {console.log(error);
             setError(true);
         }finally {
            setLoading(false);
         }
      };
      getProducts();
     }, []);
     
     if (loading) {
      return (
      <h2>Cargando...</h2>
   );
     }
     
     if (error) {
      return(
         <h2>
            Error al cargar  productos
         </h2>
      );
     }

    return(
       <div>
         <header className="home-page">
            <Carrusel images={images} />
         </header>
         <main className="home">
          <h1 className="home-title">Bienvenido en la Libreria Cosmica</h1>
          <p><em>En nuestra libreria cosmica, te invitamos a explorar un universo de conocimiento y aventura a través de nuestras colecciones de libros, cómics y manga. Sumérgete en historias fascinantes, descubre nuevos mundos y amplía tus horizontes literarios con nosotros. ¡Tu próxima gran lectura te espera en la Libreria Cosmica!</em></p>
          <br />
          <br />
          <div className = "products-grid">
            {
            products.map(product =>(
                  <ProductsCard
                     key={product.id}
                     products={product}
                     />
            ) )
            }            
          </div>
       </main>
      </div>
    );
}