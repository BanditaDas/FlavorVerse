import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Product, { products } from '../components/Product'
import Service from '../components/Service'
import About from '../components/About'
import ProdDets from '../components/ProdDets'

function Mainroutes() {
    return (
        <main className="container mx-auto px-4 py-8">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<ProdDets products={products} />} />
                <Route path="/service" element={<Service />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </main>
    )
}

export default Mainroutes