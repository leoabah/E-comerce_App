import "@voaii/proxima-nova"
import "@fontsource/montserrat"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./styles/main.scss"
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <CartProvider>
       < App />
       <Toaster
       position="top-right"
       toastOptions={{
        className:"toast-success",
         success:{
          className: "toast-sucess"
         },
      error:{
        className:"taost-error"
      }
      }}
       />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
