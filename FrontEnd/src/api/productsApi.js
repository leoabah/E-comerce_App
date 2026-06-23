import axios from "axios";


const productsApi = axios.create({
    baseURL:
   "https://libreria-cosmica-backend.onrender.com/api"
});
export default productsApi;