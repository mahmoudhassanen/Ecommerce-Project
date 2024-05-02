import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast';

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />

      <Toaster
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#0aad0a',
          fontWeight: '500'
       
        },
        error: {
          style: {
    
            color: 'red',
           
          },
        }
        }}
      />
      <Footer />
    </div>
  )
}
