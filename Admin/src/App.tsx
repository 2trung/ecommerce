import { Routes, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
// import { Drawer } from './components/Drawer'

// import { Movie, Schedule, Order, User, People } from './pages'
import AddProduct from './pages/product/AddProduct'
import AllColor from './pages/color/AllColor'
import AllProduct from './pages/product/AllProduct'
import EditProduct from './pages/product/EditProduct'
import MainContent from './components/MainContent'

function App() {
  return (
    <div className=''>
      <Navbar />
      <MainContent
        child={
          <Routes>
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/color' element={<AllColor />} />
            <Route path='/all-product' element={<AllProduct />} />
            <Route path='/edit-product/:id' element={<EditProduct />} />
          </Routes>
        }
      />
      {/* <AddProduct /> */}
    </div>
  )
}

export default App
