import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io';
import { LuChefHat } from "react-icons/lu";
import Button from './Button';

function Nav({ isVisible, searchQuery, setSearchQuery }) {
  return (
    <nav className={`fixed top-10 left-1/2 -translate-x-1/2 w-[calc(100%-5rem)] z-50 flex items-center justify-between px-8 py-5 mb-8 bg-white/70 rounded-2xl shadow-sm backdrop-blur-md border border-orange-200 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-[-150%]'
    }`}
    style={{ maxWidth: '1600px' }}
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <LuChefHat className="text-3xl text-orange-800" />
        <h1 className="text-2xl font-bold tracking-wide text-orange-800">
          FlavorVerse
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <IoIosSearch className="absolute left-4 text-xl text-orange-800" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="pl-12 pr-4 py-2 w-80 bg-transparent border border-orange-200 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-lg">
        <NavLink to="/">
          {({ isActive }) => <Button bname="Home" isActive={isActive} />}
        </NavLink>
        <NavLink to="/about">
          {({ isActive }) => <Button bname="About" isActive={isActive} />}
        </NavLink>
        <NavLink to="/recipe">
          {({ isActive }) => <Button bname="Recipe" isActive={isActive} />}
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav