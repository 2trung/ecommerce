import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/loading/loading.tsx'
import Navbar from './components/navbar/navbar.tsx'
import Footer from './components/footer/footer.tsx'
import Home from './pages/home/home.tsx'
import Login from './pages/auth/login.tsx'
import Register from './pages/auth/register.tsx'
import Product from './pages/product/product.tsx'
import Category from './pages/product/category.tsx'
import NotFound from './pages/not-found/notFound.tsx'
import Cart from './pages/product/cart.tsx'
import Address from './pages/checkout/address.tsx'
import Payment from './pages/checkout/payment.tsx'
import VnPayReturn from './pages/vnpay-return/return.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Loading />
    <Navbar />
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='auth'>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='/:category' element={<Category />}></Route>
      <Route path='/:category/:product' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout/address' element={<Address />} />
      <Route path='/checkout/payment' element={<Payment />} />
      <Route path='/vnpay-return' element={<VnPayReturn />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  // </React.StrictMode>
)
