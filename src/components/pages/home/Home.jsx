import React from 'react'
import Header from '../../partials/Header'

import Services from './services/Services'
import About from './about/About'
import Testimonials from './testimonials/Testimonials'
import Contact from '../../partials/Contact'
import Footer from '../../partials/Footer'
import Banner from './banner/Banner'

const Home = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <Services/>
    <About/>
    <Testimonials/>
    <Contact/>
    <Footer/>
    
    </>
  )
}

export default Home
