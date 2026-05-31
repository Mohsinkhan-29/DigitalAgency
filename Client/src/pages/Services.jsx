import React from 'react'

import ServiceMain from '../components/Service/ServiceMain/ServiceMain'
import ServiceProcess from '../components/Service/ServiceProcess/ServiceProcess'
import ServiceChoose from '../components/Service/ServiceChoose/ServiceChoose'
import ServicePrice from '../components/Service/ServicePrice/ServicePrice'
import ServiceNext from '../components/Service/ServiceNext/ServiceNext'

const Services = () => {
  return (
    <>
      <ServiceMain />
      <ServiceProcess />
      <ServiceChoose />
      <ServicePrice />
      <ServiceNext />
    </>
  )
}

export default Services