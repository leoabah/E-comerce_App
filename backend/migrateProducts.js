import  axios from "axios";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const migrateProducts = async () => {

    try{
        await connectDB();
        console.log("MongoDB conectado");
        
        const response = await axios.get(
            "https://69e7123a68208c1debe845f5.mockapi.io/products"
        );
        const products = response.data;
        console.log (
            `${products.length} productos encontrados`
        );
        
        for (const  product of products) {

            await Product.create({
                title: product.name,
                description: product.description,
                price: product.price,
                image: product.image[0],
                category: product.category,
                stock:0
            });
            console.log(
                `Migrado: ${product.name}`
            );
        }
            console.log("Migración completada");

            process.exit();

    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

migrateProducts();