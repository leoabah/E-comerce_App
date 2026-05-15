import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaUserCircle , FaBars, FaTimes} from 'react-icons/fa'
import { useContext } from "react"
import { CartContext } from  "@/context/CartContext"
import logoHeader from "@/assets/logo.png"
import MiniCart from './MiniCart'

export default function Header() {

  const  { totalItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen]= 
  useState(false);
  
  const user = null; 
  return (
    <header className='header'>
        <nav className='nav-bar'>
            <div className='logo'>
                <img className='logo-img' src={logoHeader} alt="logo del comercio"/>
                <h3 className='logo-title' >Libreria<br/>Cosmica</h3>
            </div>
            <button
             className='menu-btn'
             onClick={()=>
              setMenuOpen(!menuOpen)
             }
            >
              {menuOpen
                ?<FaTimes />
                :<FaBars />
              }
            </button>
            <br/>
            <div className={
              menuOpen
              ?'div-links active'
              :'div-links'}
              >
                 <Link to="/" className='link-nav' >Home</Link>
                 <Link to="/alta" className='link-nav' >Alta</Link>
                 <Link to="/contacto" className='link-nav' >Contacto</Link>
                 <Link to="/nosotros" className='link-nav' >Nosotros</Link>
            
            <div className='search'>
              <input className='inpHead'  type='text' placeholder='buscar producto...'/>
              <button className='searchBtn'><FaSearch/></button>
            </div>
          </div>

            <div className='cartWrapper'>
              <Link to="/cart"
              className='cart-link'
              > 

              <FaShoppingCart 
              style={{
                width:30,
                height:30 
              }}
              />

              {totalItems > 0 &&(
                <span className="cart-badge">
                {totalItems}
                </span>
              )}
              
              </Link>
              <MiniCart/>
            </div>

              {user ? (
                <div className='auth-links'>
                  <Link to="/perfil" className='perfil-btn' style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <FaUserCircle size={24} />
                    {firstName}
                  </Link>
                  <button onClick={handleLogout} className='registrarse-btn'>
                    Cerrar
                  </button>
                </div>
              ) : (
                <div className='auth-links'>
                  <Link to="/iniciar" className='iniciar-btn'>Iniciar</Link>
                  <Link to="/registrase" className='registrarse-btn'>
                    Registrarse
                  </Link>
                </div>
              )}
        </nav>
    </header>
  )
}

