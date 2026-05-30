//import "@voaii/proxima-nova"
import "@fontsource/montserrat"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./styles/main.scss"
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from "react-toastify"
import  "react-toastify/dist/ReactToastify.css"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter 
      basename= {
        import.meta.env.BASE_URL
        }>
     <CartProvider>
       < App />
       <ToastContainer
       position="top-right"
       autoClose={2500} 
       />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
