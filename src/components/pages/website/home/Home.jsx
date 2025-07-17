import React from 'react'
import Services from '././services/Services'
import About from '././about/About'
import Testimonials from '././testimonials/Testimonials'
import Banner from '././banner/Banner'
import Header from '../../../partials/Header'
import Contact from '../../../partials/Contact'
import Footer from '../../../partials/Footer'

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
