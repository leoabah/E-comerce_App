import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { connectDB} from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js";



dotenv.config();

const app = express();
 const allowedOrigins =[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://leoabah.github.io",
    "https://e-comerce-app-swart.vercel.app",
    "https://e-comerce-8hbbdvt8b-leoabahs-projects.vercel.app" 
 ];



app.get("/ping",(req,res)=>{
    res.status(200).send("pong");
});
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

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "APP_USR-4628819761549408-090913-df222a78b1952bc595ab32d71a60c599-1608625904" });
app.use(express.json());

//route de peticiones de mercadopago

app.post("/create-preference", async (req, res) => {
   const preference = new Preference(client);


   preference.create({
         body: {
         items: [
           {
              title: '',
              quantity: 1,
               unit_price: 2000
            }
        ],
     }
    })

    .then((data) => { 
       {console.log(data);
        // Enviar la respuesta al cliente con la información de la preferencia
        res.status(200).json({
           preference_Id: data.id,
           preference_url: data.init_point,   
       })
       })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
});



connectDB();

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});