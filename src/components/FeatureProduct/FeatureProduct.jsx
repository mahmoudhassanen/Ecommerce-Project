import React, { useContext} from 'react'
import style from './FeatureProduct.module.css'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import {useQuery} from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../CartContext/CartContext'
import  toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function FeatureProduct() {
let { setNumOfCartItems} = useContext(CartContext)
 function getData() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
}
let {isLoading , data } =  useQuery('FeatureProduct',getData)
console.log(data?.data?.data)  
// let x = useQuery('products' , getData)

//   const [products, setProducts] = useState([])
//   const [isLoading , setIsLoading] = useState(true)
// async function getProduct() {
//   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//   console.log(data);
//   setProducts(data.data)
//   setIsLoading(false)
// }
// useEffect(() => {
//   getProduct();
// }, [])
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
      <title>My Feature Products</title>
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
      <h2 className='categories-title' >  Products: </h2>
        {/* <button className='btn bg-main w-100 text-white ' onClick={refetch}>Refetch</button> */}
  {data?.data?.data.slice(0, 12).map((product )=> <div key={product.id} className="col-xl-2 col-md-4 ">
<div className='product px-2 py-3'>
  <Link to={'details/'+product.id}> 
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
 <div className='d-flex justify-content-center align-items-center mt-5'>
<Link  to='/products' className='btn bg-main text-white align-items-center
'> View More</Link>     
      </div>
    </div>
    </>
  )
}
