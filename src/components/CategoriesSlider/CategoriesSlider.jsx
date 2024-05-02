import React from 'react'
import style from './CategoriesSlider.module.css'
import  axios  from 'axios'
import {useQuery} from 'react-query'
import Slider from "react-slick";
export default function CategoriesSlider() {
  function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data} = useQuery('categories' , getCategory)
  console.log(data)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerPadding: "60px",
    className: "center",
    autoplay: true,
    speed: 2000,
  

    
    
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='container slider-container mt-5'>
      <h2 className='mb-4 categories-title'> Shop Popular Categories:</h2>
 
    <Slider {...settings}>
     {data?.data?.data.map((ele)=> <>
     <div key={ele.id}>

     
     <img height={300} className='w-100' 
      style={{ margin: '0 10px' }}
     src={ele.image} alt=""/>
      <p className='text-center'>{ele.name}</p>
      </div>
     </>
     )}
     
    </Slider>
    </div>
  )
}
