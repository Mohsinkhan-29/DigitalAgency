import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Layout from './Layout'

import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Project from './pages/Project'
import Contact from './pages/Contact'


import ScrollToTop from "./components/Static/ScrollToTop/ScrollToTop";






function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      once: false,     // animate repeat
      offset: 200,    // trigger point
    });
  }, []);

  return (
    <Router>
       <ScrollToTop />
      <Routes>

        <Route element={<Layout />}>

          <Route path='/' element={<Home />} />
          <Route path='/Services' element={<Services />} />
          <Route path='/About' element={<About />} />
          <Route path='/Project' element={<Project />} />
          <Route path='/Contact' element={<Contact />} />

        </Route>

      </Routes>
    </Router>
  )
}

export default App
