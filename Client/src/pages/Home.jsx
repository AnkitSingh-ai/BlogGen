import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import BlogList from '../component/BlogList'
import NewLetter from '../component/NewLetter'
import Footer from '../component/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <Header/>
      <BlogList />
      <NewLetter />
      <Footer />

    </div>
  )
}

export default Home
