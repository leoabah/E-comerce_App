
import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import productsApi from "../api/productsApi";
import { img } from "framer-motion/client";


export default function ProductDetail(){
    const {id} = useParams();

    const [product,setProduct]=useState(null);
    const [mainImage, setMainImage]= useState("")

    useEffect(() => {

        const getProduct = async()=> { 

        try{
            const response = 

               await productsApi.get(

                `/products/${id}`

               );

               setProduct(response.data);
               setMainImage(response.data.image[0]);

        } catch(error) {
            console.log(error);
        }
    };
    
    getProduct();
},[id]);

if (!product){
    return<h2>Cargando Producto...</h2>
}



    return(
        <div className="product-detail">

            <div className="detail-gallery">

                <img
                className="main-image"
                    src={
                           import.meta.env.BASE_URL +
                            mainImage.replace("/", "")
                        }
                    alt={product.name}
                />
                <div className="thumbnails">
                    {product.image.map((img, index) => (
                        <img
                        key={index}
                       src={
                            import.meta.env.BASE_URL +
                             img.replace("/", "")
                            }
                            alt = "thumbnails"
                            onClick= {() =>
                                setMainImage(img)
                            }

                        />
        
                    ))}

                </div>

            </div>

            <div className="detail-info">

                <h1>{product.name}</h1>

                <h2>{product.price} ars</h2>

                <p className="category">

                    Categoria:{product.category}

                </p>

                <p className="description">

                    {product.description}

                </p>

                <button className="btn-buy">
                    Comprar ahora
                </button>

            </div>

        </div>
    );
}