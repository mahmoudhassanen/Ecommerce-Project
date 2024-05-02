import React from 'react'
import style from './NotFound.module.css'
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <> 
    <Helmet>
      <title>
        Not Found Page
      </title>
    </Helmet>
    <div className='d-flex justify-content-center align-items-center '>
      <h2 className='text-center text-success fw-bold'>NOT FOUND</h2>
      
    </div>
    </>
  )
}
