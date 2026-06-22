import axios from "axios";

 const orderApi = axios.create({
    baseURL:"http://localhost:3000/api/orders"
 });
  export default orderApi;