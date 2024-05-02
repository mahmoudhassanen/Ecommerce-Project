import React, { useContext } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import {useQuery} from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../CartContext/CartContext'
import  toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function Products() {
  let {numOfCartItems , setNumOfCartItems} = useContext(CartContext)
 function getData() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
}
  let {isLoading , data } =  useQuery('FeatureProduct',getData)

let {addToCart} = useContext(CartContext)
console.log();
async function addCart(id) {
  let res = await addToCart(id);
  setNumOfCartItems(res?.data?.numOfCartItems)
  if (res.data.status == 'success') {
    toast.success('product added successfully.', {
      position: "bottom-center"
    });
 
  }else
  {
    toast.error('product added successfully.', {
      position: "bottom-center"
    });
  }

}

  return (
    <>
    <Helmet>
<title>Products   Page</title>
</Helmet>
    <div className='container py-5 mb-5'>
      {isLoading ? 
      
      <div className='d-flex justify-content-center align-items-center mt-5'>
      <Triangle
  visible={true}
  height="60%"
  width="60%"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  
  
      </div>

     : 
     
     <div className="row">
             <h2 className="text-main fw-bolder pb-3">All Products</h2>
        {/* <button className='btn bg-main w-100 text-white ' onClick={refetch}>Refetch</button> */}
  {data?.data?.data.map((product )=> <div key={product.id} className="col-xl-2 col-md-4 ">
<div className='product px-2 py-3'>
  <Link to={`/details/${product.id}`}> 
  <img src={product.imageCover} alt="" className="w-100" />
<p className='text-main'>{product.category.name}</p>
<h3 className='title'> {product.title.split(' ').slice(0,3).join(' ')}</h3>

<div className="d-flex justify-content-between">
<p>123 egp</p>
<p>
 <i className='fa fa-star rating-color'>{product.ratingsAverage}</i>
</p>
</div>

  </Link>

<button onClick={()=>addCart(product.id)} className='btn bg-main text-white w-100'> Add To Cart</button>
</div>

</div>

)}
  
 </div>}

    </div>
    </>
  )
}
