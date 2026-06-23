import React from 'react'
import Mainroutes from './Routes/Mainroutes'
import Nav from "./components/Nav";

function App() {
  return (
    <div className="min-h-screen w-full p-10 text-gray-800 font-semibold bg-orange-50 overflow-x-hidden">
      <Nav />
      <Mainroutes />
    </div>
  )
}

export default App