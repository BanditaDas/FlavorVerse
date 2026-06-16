import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Product from './components/Product'
import Service from './components/Service'
import About from './components/About'

export default function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}
