import React, { useEffect, useState ,useContext } from 'react'
import style from './ProductDetails.module.css'
import  axios from 'axios'
import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../CartContext/CartContext'
import  toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  let {numOfCartItems , setNumOfCartItems} = useContext(CartContext)

  let params = useParams()
const [details, setDetails] = useState({})
const [isLoading, setIsLoading] = useState(true)
  async function getProductDetails(id) {
    let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data?.data)
    console.log(data?.data)
    setIsLoading(false)
  }
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
  // let {data , isLoading} = useQuery('ProductDetails' ,() => getProductDetails(params.id))
  // console.log(data);
  useEffect(() => {
   getProductDetails(params.id)
  }, [])
  

  const settings = {
    
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    speed: 2000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
  };
  return (
   <>
<Helmet>
<title>Products Details  Page</title>
</Helmet>
   <div className="container py-5">
  {isLoading ? 
  
  <div className='d-flex justify-content-center align-items-center me-auto py-5 mt-5 triangle'>
      <Triangle
  visible={true}
  height="40%"
  width="40%"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
  }}
  wrapperClass=""
  />
  
   </div>
  :

  
  <div className="row align-items-center">
  <div className="col-md-4 mb-5">

  <Slider {...settings}>
     {details.images.map((ele , index) =>  <img key={index} className='w-100' src={ele} alt=""/>)}
    </Slider>
   
  </div>
  <div className="col-md-8 ">
    <h2>{details.title}</h2>
    <p>{details.category.name}</p>
    <p>{details.description}</p>
    <div className="d-flex justify-content-between">
             <h5>{details.price}</h5>
             <h5><i className='fa fa-star rating-color'> {details.ratingsAverage}</i></h5>
    </div>
    <button onClick={()=>addCart(details.id)} className='btn bg-main w-100 text-white mt-5'> Add To Cart</button>
  </div>
</div>
  }
   
   </div>
   </>
  )
}
