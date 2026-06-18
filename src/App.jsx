import React from 'react'
import Mainroutes from './Routes/Mainroutes'
import Nav from "./components/Nav";

function App() {
  return (
    <div className="min-h-screen w-screen p-10 text-gray-800 font-semibold bg-orange-50">
      <Nav />
      <Mainroutes />
    </div>
  )
}

export default App