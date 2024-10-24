import React from 'react'
import { Outlet } from 'react-router'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({ products, carts, setToken, role }) {
  return (
    <div>
      <Header />
      <Navbar  products={products} carts={carts} setToken={setToken} role={role} />
      <Outlet />
      <Footer />
    </div>
  )
}
