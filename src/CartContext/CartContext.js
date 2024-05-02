import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export  let CartContext =  createContext()
let headers = {
    token : localStorage.getItem('userToken')
}
function addToCart(id) {
 return   axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId : id,
    },
{
  headers
}).then((res) => res).catch((err)=>err) 
}
function getCart() {
    return   axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
          
     headers
   }).then((res) => res).catch((err)=>err) 
   
   }
function deleteCart(id) {
    return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          
     headers
   }).then((res) => res).catch((err)=>err) 
   }
   function updateProductQuantity(id,count) {
    return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
count },{
     headers
   }).then((res) => res).catch((err)=>err) 
   }
      
   function clearCart() {
    return   axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
          
     headers
   })
   }
  
export default function CartContextProvider(props)

{
  const [cartId, setCartId] = useState(null)
   const [numOfCartItems, setNumOfCartItems] = useState(0)
   function onlinePayment(shippingAddress) {
    {
      return   axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000
      `,{
        shippingAddress },{
       headers
     }).then((res) => res).catch((err)=>err) 
    
   };
  }
   async function getInitialCart() {
    let {data} = await getCart()
    setNumOfCartItems(data?.numOfCartItems)
    setCartId(data?.data?._id)
   }
  useEffect(() => {
    
getInitialCart()

  }, [])
  

    return <CartContext.Provider value={{addToCart,getCart , deleteCart , updateProductQuantity,clearCart , onlinePayment , cartId , setCartId , numOfCartItems , setNumOfCartItems}}>

        {props.children}
    </CartContext.Provider>

    
}