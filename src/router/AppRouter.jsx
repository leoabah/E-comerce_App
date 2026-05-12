import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import { Alta } from '../pages/Alta'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/alta" element={<Alta />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart/>} />
    </Routes>
  )
}

export default AppRouter