import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Recipe from '../pages/Recipe'

function Mainroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipe" element={<Recipe />} />
    </Routes>
  )
}

export default Mainroutes