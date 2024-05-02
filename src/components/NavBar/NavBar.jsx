import React, { useContext, useState } from 'react'
import styles from './NavBar.module.css'
import {Link} from 'react-router-dom'
import logo from '../../../src/assets/images/freshcart-logo.png'
import { tokenContext } from '../../Context/TokenContext'
import {useNavigate} from 'react-router-dom'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { CartContext } from '../../CartContext/CartContext'
export default function NavBar() {
  let {token , setToken } = useContext(tokenContext)
  let {numOfCartItems} = useContext(CartContext)
  const [userName, setUserName] = useState(localStorage.getItem('userEmail'))
  let navigate = useNavigate();
  function logOut() {
    try {
      localStorage.removeItem('userToken');
      setToken(null);
      navigate('/login');
    } catch (error) {
      console.error('Error navigating to login:', error);
    }
  }
  return (
  <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/'}>
        <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/products'>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/brand'>Brand</Link>
        </li>
    
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Category</Link>
        </li>
       
        
      </ul> : '' }
    
{/* 
        social media and login  */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
        <i className='fab fa-facebook mx-2'></i>
        <i className='fab fa-twitter mx-2'></i>
        <i className='fab fa-instagram mx-2'></i>
         <i className='fab fa-youtube mx-2'></i>

        </li>
        {token ? 
        <> 
        <li className="nav-item">
          <button className="nav-link active" onClick={logOut} >Logout</button>
        </li> 
        <li className="nav-item">
          <Link className="nav-link " to='/cart'>
          <Stack spacing={2} direction="row">
     
      <Badge badgeContent={numOfCartItems} color="success">
        <ShoppingCartCheckoutIcon  className='text-success'/>
      </Badge>
    </Stack>
          </Link>
        </li>
         <li className="nav-item mt-1 ">
        <button className="nav-link active icons text-main" > <i className="fa-solid fa-user fs-6 text-main"></i> {userName}</button>
      </li> 
        
       

      </>
        : <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/login'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/register'>Register</Link>
        </li>
       
        </> }
     
      
       
        
      </ul>
     
     
    </div>
  </div>
</nav>

  </>
  )
}
