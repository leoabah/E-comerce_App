import axios from "axios";


const productsApi = axios.create({
    baseURL:
   "https://69e7123a68208c1debe845f5.mockapi.io"
});
export default productsApi;