import React from 'react'
import styles from'./Footer.module.css'
import Image1 from '../../assets/images/cod-en.png'
import Image2 from "../../assets/images/card-visa.png";
import Image3 from "../../assets/images/card-amex.png";
import Image4 from "../../assets/images/card-mastercard.png";




export default function Footer() {

  return (
   <footer className='   text-center  p-5 mt-5  bg-light'>
  
        <h2>Get The FreshCart App</h2>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='images my-2'>
              <img src={Image1} className='w-40 mx-2' alt=""/>
              <img src={Image2} className='w-40 mx-2' alt=""/>
              <img src={Image3} className='w-40 mx-2' alt=""/>
              <img src={Image4} className='w-20 mx-2' alt=""/>
        
  
           </div>        
       </div>
        <p className="text-muted">
          we will send you a link , open it in your phone to download the app
        </p>
      
        <div className="">
          <input
            type="email"
            name="email"
            id="email"
            className=" w-75 mb-2 py-2 px-2 me-5"
            placeholder="Email..."
          />
          <button className="btn bg-main py-2  text-white">
            Share App Link
          </button>
        </div>

   </footer>
  )
}
