import axios from "axios";

const orderApi = axios.create({
  baseURL: "https://libreria-cosmica-backend.onrender.com/api/orders"
});

orderApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default orderApi;