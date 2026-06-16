import React from 'react'
import Navbar from './components/Navbar'
import Mainroutes from './Routes/Mainroutes'

export default function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <Mainroutes />
    </div>
  )
}
