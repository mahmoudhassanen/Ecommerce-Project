import React, { useState  } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Helmet } from "react-helmet";

export default function Register() {
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState('');

let navigate = useNavigate();
  // validation form 
  let validateScheme = Yup.object({
     name : Yup.string().max(15,'name should be less than 15').required('name is required'),
     email : Yup.string().email('email not valid').required('email is required'),
     password : Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,'password should start with capital').required('password is required'),
     rePassword :  Yup.string().oneOf([Yup.ref('password')],'repassword should match with password').required('password is required'),
     phone :  Yup.string().matches(/^01[0125][0-9]{8}$/,'Phone is invalid').required('phone is required'),
  })
  // sign up api 
   async function register(values) {
    setApiError('')
    setIsLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    ).catch( (err)  => {
      setIsLoading(false);
      setApiError(err.response.data.message)
    })
    if (data.message == 'success') {
      setIsLoading(false);
      navigate('/login')
      
    }
    console.log(data);
  }
  // use formik on change , onsubmit , blur , touched
  let formik = useFormik(
    {
      initialValues:{
        name : '',
        email : '',
        password : '',
        rePassword : '',
        phone : '' 

      }, validationSchema: validateScheme,
      onSubmit:(values)=> register(values),
    }
  )

  return (
    <> 
    <Helmet>
      <title>Register Page</title>
    </Helmet>
    <div className='container my-5'>
      <h2 className='mb-3'> Register Now : </h2>
      {apiError ? <div className='alert alert-danger'>
        {apiError}
      </div> : ''}
      <form action="" className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <div className="form-groub mb-2">
          <label htmlFor="name" className='mb-2' > Name.</label>
          <input type="text" className="form-control"  id='name' name='name' value={formik.values.name}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : '' }

        <div className="form-groub mb-2">
          <label htmlFor="uEmail" className='mb-2' >Email.</label>
          <input type="email" className="form-control"  id='uEmail' name='email' value={formik.values.email}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : '' }

        <div className="form-groub mb-2">
          <label htmlFor="password" className='mb-2' > Password.</label>
          <input type="password" className="form-control"  id='password' name='password' value={formik.values.password}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : '' }

        <div className="form-groub mb-2">
          <label htmlFor="rePassword" className='mb-2' > RePassword.</label>
          <input type="password" className="form-control"  id='rePassword' name='rePassword' value={formik.values.rePassword}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
  
        {formik.errors.rePassword  && formik.touched.rePassword? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : '' }

        <div className="form-groub mb-2">
          <label htmlFor="phone" className='mb-2' > Phone.</label>
          <input type="tel" className="form-control"  id='phone' name='phone' value={formik.values.phone}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : '' }
          {isLoading ?         <button className='btn bg-main d-block ms-auto text-white mt-3'><i className='fa fa-spin fa-spinner'></i></button>
                      :         <button 
                      disabled={!(formik.isValid && formik.dirty)}
                      className='btn bg-main d-block ms-auto text-white mt-3'> Register</button>
                    }
      </form>
      
    </div>
    </>
  )
}
