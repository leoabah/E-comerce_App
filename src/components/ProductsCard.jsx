import { Link } from "react-router-dom"


export default  function ProductsCard({products}){
    return(
        <div className ="product-card">
            <img src={products.image} alt={products.name} />
            <h3>{products.name}</h3>
            <p>{products.price}</p>
            <Link to={`/products/${products.id}`}>
                Ver detalles
            </Link>
        </div>
    );
}