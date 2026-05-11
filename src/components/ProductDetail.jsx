
export default function ProductDetail(){
    const {id} = iseParams();

    const product = Products.find(
        p => p.id === Number(id)
    );

    return(
        <div>
            <h1>{product.title}</h1>

            <img
              src={product.image}
              alt={product.title}
              width="300"
            />

            <p>Precio: ${product.price}</p>
        </div>
    );
}