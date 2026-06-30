import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB} from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
 const allowedOrigins =[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://leoabah.github.io",
    "https://e-comerce-app-swart.vercel.app",
    "https://e-comerce-8hbbdvt8b-leoabahs-projects.vercel.app" 
 ];

app.use(cors({
    origin: function(origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        } else{
            callback(new Error(
                "No permitido por CORS")
            );
        }
    }
}));

app.use(express.json());


connectDB();

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

// Ruta catch-all para React Router (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
});

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

