import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'

function Nav() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 mb-8 bg-white/70 rounded-2xl shadow-sm backdrop-blur-md border border-orange-200">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        
        <h1 className="text-2xl font-bold tracking-wide text-orange-800">
          FlavorVerse
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-lg">
        <NavLink to="/">
          <Button bname="Home" />
        </NavLink>
        <NavLink to="/about">
          <Button bname="About" />
        </NavLink>
        <NavLink to="/recipe">
          <Button bname="Recipe" />
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav