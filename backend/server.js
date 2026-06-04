import express from "express";
import dotenv from "dotenv";
import { connectDB} from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
    
connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});