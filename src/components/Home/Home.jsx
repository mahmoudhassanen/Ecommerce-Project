import React from 'react'
import style from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <> <Helmet>
      <title>Home Page</title>
    </Helmet>
    <MainSlider />
      <CategoriesSlider />
      <FeatureProduct />
   </>
  )
}
