import { useContext, useState } from 'react'

import './App.css'
import NavBar from './components/NavBar/NavBar'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Brands from './components/Brands/Brands'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { tokenContext } from './Context/TokenContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Checkout from './components/Checkout/Checkout.jsx';
import AllOrders from './components/AllOrders/AllOrders.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx'

let routers = createBrowserRouter([
  {
    path:'/',element: <Layout /> , children:[
      {index : true , element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      {path:'products' , element: <ProtectedRoute>  <Products /> </ProtectedRoute>},
      {path:'cart' , element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      {path:'categories' , element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      {path:'register' , element: <Register />},
      {path:'login' , element: <Login />},
      {path : '*' , element : <NotFound />},
      {path :'brand' , element: <ProtectedRoute><Brands /> </ProtectedRoute> },
      {path :'details/:id' , element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
      {path :'checkout' , element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },
      {path :'allorders' , element: <ProtectedRoute>  <AllOrders /> </ProtectedRoute> },

      


    ]
  }
])

function App() {
  let {setToken} = useContext(tokenContext)
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'))
   };
  }, [])
  


  return (
  <RouterProvider router={routers}></RouterProvider>
  )
}

export default App
