import React  , { useContext, useState  } from 'react'
import style from './Login.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext';
import  toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState('');

let {setToken} = useContext(tokenContext);

let navigate = useNavigate();
  // validation form 
  let validateScheme = Yup.object({
     email : Yup.string().email('email not valid').required('email is required'),
     password : Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,'password should start with capital').required('password is required'),
  })
  async function login(values) {
    setApiError('')
    setIsLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    ).catch( (err)  => {
      setIsLoading(false);
      
      setApiError(err.response.data.message)

      
    })
    if (data.message == 'success') {
      
      setIsLoading(false);
      localStorage.setItem('userToken' , data.token)
      setToken(data.token)
      navigate('/')
      toast.success('Welcome' + ' ' + data.user.name , {
        position: "bottom-center"
      });
      localStorage.setItem('userEmail' , data.user.email)
    }
   
    
    console.log(data);
  }
  let formik = useFormik(
    {
      initialValues:{
      
        email : '',
        password : '',
       

      }, validationSchema: validateScheme,
      onSubmit:(values)=> login(values),
    }
  )
  return (
    <> 
    <Helmet>
      <title>Login Page</title>
    </Helmet>
    <div className='container my-5'>
    <h2 className='mb-3'> Register Now : </h2>
    {apiError ? <div className='alert alert-danger'>
      {apiError}
    </div> : ''}
    <form action="" className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
    
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
     
    
      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : '' }
        {isLoading ?         <button className='btn bg-main d-block ms-auto text-white mt-3'><i className='fa fa-spin fa-spinner'></i></button>
                    :         <button className='btn bg-main d-block ms-auto text-white mt-3'
                    disabled={!(formik.isValid && formik.dirty)}
                    > Login</button>
                  }
    </form>
    
  </div>
  </>
  )
}
