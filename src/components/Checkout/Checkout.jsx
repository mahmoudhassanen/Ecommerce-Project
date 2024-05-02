import React, { useContext } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { CartContext } from '../../CartContext/CartContext';
import { Helmet } from "react-helmet";

export default function Checkout() {
let {onlinePayment} =useContext(CartContext)
 async function payment(values) {
    // 
    let {data} = await onlinePayment(values)
    console.log(data)
  window.location.href=data?.session.url
  }
  let validateScheme = Yup.object({
    details : Yup.string().max(15,'name should be less than 15').required('name is required'),
     phone :  Yup.string().matches(/^01[0125][0-9]{8}$/,'Phone is invalid').required('phone is required'),
      city :Yup.string()
      .required('City is required')
      .matches(/^[a-zA-Z\s]+$/,)  ,
    })
 
 let formik = useFormik({
  initialValues : {
    "details": "",
    "phone": "",
    "city": ""
  },validationSchema: validateScheme,
  onSubmit : (values)=> payment(values),
 })
  return (
    <>
    <Helmet>
      <title>
        Check Out Page
      </title>
    </Helmet>
    <div className="container">
      <div className="mx-auto bg-main-light p-5 mt-5">
        <h2 className='mb-5'> Shipping Address </h2>
        <form onSubmit={formik.handleSubmit}>

          {formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : ''}  
       <div className="form-group mb-3">
      <label className='py-1' htmlFor="details">Details: </label>
      <input type="text" 
      className='form-control my-1' 
      name="details" 
      id='details' 
      value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}/>
          </div>
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}  

          <div className="form-group mb-3"> 

       <label className='py-1' htmlFor="phone">Phone </label>
      <input type="text" 
      className='form-control my-1' 
      name="phone" 
      id='phone' 
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}/>
      </div>
      {formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : ''}  

      <div className="form-group mb-3"> 
       <label className='py-1' htmlFor="city">City </label>
      <input  type="text" 
      className='form-control my-1' 
      name="city" 
      id='city' 
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}/>
   </div>
       <div className='d-flex -align-items-center justify-content-center'>
        <button  className='btn bg-main 
        text-white w-40 px-5 my-4'> Pay Now</button>
       
        </div>
         </form>
      </div>
    </div>
    </>
  )
}
