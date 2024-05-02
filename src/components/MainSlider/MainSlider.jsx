import React from 'react'
import style from './MainSlider.module.css'
import Image1 from '../../assets/images/slider-image-1.jpeg'
import Image2 from '../../assets/images/slider-image-2.jpeg'
import Image3 from '../../assets/images/slider-image-3.jpeg'

import Image4 from '../../assets/images/pexels-markus-spiske-3806753.jpg'
import Image5 from '../../assets/images/pexels-edgars-kisuro-1488463.jpg'
import Image6 from '../../assets/images/pexels-ksenia-chernaya-3965545.jpg'
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  
    autoplay: true,
    speed: 1000,
    cssEase: "linear",
    arrows : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div className='container my-5'>
      <div className="row gx-0">
        <div className="col-md-9 mb-5">
          
          <Slider  {...settings}>
            <img height={400} className='w-100' src={Image4} alt="" />
            <img height={400} className='w-100' src={Image5} alt="" />
            <img height={400} className='w-100' src={Image6} alt="" />

          </Slider>
        </div>
        <div className="col-md-3 secondMain">
        <img height={200} className='w-100' src={Image3} alt="" />
            <img height={200} className='w-100' src={Image2} alt="" />
          </div>
      </div>
      
    </div>
  )
}
