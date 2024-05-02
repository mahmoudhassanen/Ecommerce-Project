import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../CartContext/CartContext'
import { Helmet } from "react-helmet";

import  toast  from 'react-hot-toast';
import { Link } from 'react-router-dom';
export default function Cart() {
  const [cartItems, setCartItems] = useState({ data: null })
  const [prev, setPrev] = useState(true)
  // const [isLoading, setIsLoading] = useState(false);
  let {getCart , deleteCart ,updateProductQuantity , clearCart , numOfCartItems , setNumOfCartItems } = useContext(CartContext)
  async function getCartDetails() {
    // setIsLoading(true);
    let {data} = await getCart();
    console.log(data)
    setCartItems(data);
    setNumOfCartItems(data?.numOfCartItems)
    // setIsLoading(false)
  }

  async function deleteCartDetails(id) {
    let {data} = await deleteCart(id);
    console.log(data)
    
    toast.success('product deleted successfully.', {
      position: "bottom-center"
    });
    setCartItems(data)
    setNumOfCartItems(data?.numOfCartItems)
   if (data?.numOfCartItems === 0) {
    setPrev(false)
    
   }
  }
  async function updateProductQuantityItem(id,count) {
    
    let {data} = await updateProductQuantity(id,count);
    console.log(data)
    setCartItems(data);
    toast.success('product updated successfully.', {
      position: "bottom-center"
    });
    if (count === 0) {
      deleteCartDetails(id)
      
    }
  }
  // async function clearAll() {
  //   let res  = await clearCart();
  //   console.log(res)
  //   // setCartItems()
  // // if (res.message == "success") {
    
  // //   toast.success('Your cart is cleared successfully.', {
  // //     position: "bottom-center"
  // //   });
  // // }
    
  // }
  async function clear() {
    let {data} = await clearCart();
    
  //  getCartDetails()
    console.log(data)
    if (data?.message == "success") {
      setCartItems([])
      setNumOfCartItems(0)
      toast.success("Your cart is cleared successfully", {
        theme: "light",
        position: "top-center",
      });

      // await getCartDetails();
    } else {
      toast.error("failed", {
        theme: "light",
        position: "top-center",
      });
    }
  }

  useEffect(() => {
  getCartDetails()
 
  }, [])
  
 


  return (
    <>
    <Helmet>
      <title>
        My Cart Page
      </title>
    </Helmet>
    {cartItems?.data  && prev  ?  <div className='container my-5' >
      <div className="mx-auto bg-main-light p-5">
            <h1 className='mb-3'> Cart Shop</h1>
            <div className="d-flex justify-content-between aligns-item-center">
              <h3 className='h5 Cart-price'>Total Price : <span className='text-main'>{cartItems.data.totalCartPrice}</span></h3>
              <h3 className='h5 Cart-items' >Total Cart Item : <span className='text-main'> {cartItems.numOfCartItems}</span></h3>
            </div>
      </div>
     
      {cartItems?.data?.products.map((ele)=><div className="row py-5 border-bottom" key={ele.product._id}>
        <div className="col-md-1">
           <img src={ele.product.imageCover} className='w-100' alt=""/>
        </div>
        <div className="col-md-11">
          <div className='d-flex justify-content-between  aligns-item-center'>
            <div className="left-side">
              <h4 className='cart-title fs-6'>{ele.product.title}           </h4>
              <p className=' cart-category' > Category : <span className='text-main'> {ele.product.category
.name} </span>  . </p>
              <p className='price'> Price : <span className='text-main Egp'> {ele.price}Egp </span> </p>
            </div>
            <div className="right-side">
              <button 
              onClick={()=>updateProductQuantityItem(ele.product.id , ele.count-1)}
              className='btn btn-main bg-main text-white mb-2'>-</button>
              <span className='mx-2'> {ele.count} </span>
              <button 
               onClick={()=>updateProductQuantityItem(ele.product.id , ele.count+1) } className='btn btn-main  bg-main text-white mb-2'>+</button>
            </div>
          </div>
          <button onClick={()=> deleteCartDetails(ele.product._id)} className='btn p-0 text-danger '> <i className='fa fa-trash-can'></i> Remove </button>
        </div>
      </div>
    
    )}
    {cartItems?.numOfCartItems === 0    ?  '' :  
    <> 
    <div className='Clear All  mt-5 mb-5 d-flex align-items-center justify-content-end'>
        <button 

onClick={clear}
        className='btn btn-danger '> <i className='fa fa-trash-can'></i> Clear Cart </button>
      
      </div> 
      
      <div className='checkOut d-flex justify-content-center align-items-center'>
      <Link className='btn bg-main w-30 px-5  text-white my-5' to={ '/checkout' }>
        Check Out
      </Link> 
        
      </div>
      </>
      }
      
    
    </div> : 
     <div className="container">
      <h2
        className="text-center  text-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        NO Item IN your Cart{" "}
      </h2>
         
     
        {/* <div className="spinner d-flex justify-content-center align-items-center">
          <Triangle
            visible={true}
            height="60%"
            width="60%"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
          />
        </div> */}
      </div>
    }
    
    </>
    
  )

}