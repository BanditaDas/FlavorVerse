import React from 'react'
import Mainroutes from './Routes/Mainroutes'
import Nav from "./components/Nav";

function App() {
  return (
    <div className="h-screen w-full py-10 px-10 text-gray-800 font-semibold bg-orange-50 overflow-y-auto overflow-x-hidden no-scrollbar">
      <Nav />
      <Mainroutes />
    </div>
  )
}

export default App