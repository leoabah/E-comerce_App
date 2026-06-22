import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB} from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js";



dotenv.config();

const app = express();

app.use(cors({
    origin: [ "http://localhost:5173",
        "https://leoabah.github.io"]
}));

app.use(express.json());


connectDB();

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});