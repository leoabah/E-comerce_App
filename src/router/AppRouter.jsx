import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import { Alta } from '../pages/Alta'
import Cart from '../pages/Cart'
import EditProduct from "@/pages/EditProduct"
import ProductDetail from "@/pages/ProductDetail"
import Contact from '../pages/Contact'


const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/alta" element={<Alta />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart/>} />

    </Routes>
  )
}

export default AppRouter