import React from 'react'

import AboutStory from '../components/About/AboutStory/AboutStory'
import AboutFlipCard from '../components/About/AboutFlipCard/AboutFlipCard'
import AboutTeam from '../components/About/AboutTeam/AboutTeam'
import AboutStats from '../components/About/AboutStats/AboutStats'
import AboutExpertise from '../components/About/AboutExpertise/AboutExpertise'
import AboutCarousel from '../components/About/AboutCarousel/AboutCarousel'
import AboutNext from '../components/About/AboutNext/AboutNext'

const About = () => {
  return (
    <>
      <AboutStory />
      <AboutFlipCard />
      <AboutTeam />
      <AboutStats />
      <AboutExpertise />
      <AboutCarousel />
      <AboutNext />
    </>
  )
}

export default About