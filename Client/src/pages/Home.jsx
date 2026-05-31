import React from 'react'

import Marque from '../components/Home/Marque/Marque'
import HomeService from '../components/Home/HomeService/HomeService'
import HomeAbout from '../components/Home/HomeAbout/HomeAbout'
import Laptop from '../components/Home/Laptop/Laptop'
import ProcessSteps from '../components/Home/ProcessStep/ProcessStep'
import Stats from '../components/Home/Stats/Stats'
import FeaturedProject from '../components/Home/FeaturedProject/FeaturedProject'
import Testimonial from '../components/Home/Testimonial/Testimonial'
import HomeWhy from '../components/Home/HomeWhy/HomeWhy'
import HomeNext from '../components/Home/HomeNext/HomeNext'

const Home = () => {
  return (
    <>
      <HomeService />
      <Marque />
      <HomeAbout />
      <Laptop />
      <ProcessSteps />
      <Stats />
      <FeaturedProject />
      <Testimonial />
      <HomeWhy />
      <HomeNext />
    </>
  )
}

export default Home