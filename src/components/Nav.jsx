import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { LuChefHat } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/recipe", label: "Recipe" },
];

function Nav({ isVisible = true, searchQuery = "", setSearchQuery = () => {} }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevQueryRef = useRef("");

  useEffect(() => {
    const q = searchQuery.trim();
    const prevQ = prevQueryRef.current;
    if (q && !prevQ) {
      navigate("/recipe");
    }
    prevQueryRef.current = q;
  }, [searchQuery, navigate]);

  return (
    <nav
      className={`fixed top-4 md:top-10 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] z-50
        bg-[#F3ECDD]/75 backdrop-blur-md border border-[#22291F]/10 shadow-[0_12px_34px_-18px_rgba(34,41,31,0.35)]
        transition-transform duration-300 ease-in-out rounded-2xl
        ${isVisible ? "translate-y-0" : "translate-y-[-150%]"}`}
      style={{ maxWidth: "1600px" }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Brand / Logo */}
        <Link to="/" className="group flex items-center gap-3 cursor-pointer no-underline">
          <LuChefHat className="w-7 h-7 text-[#7C8B6F] transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
          <h1 className="font-['Fraunces'] text-2xl font-semibold tracking-wide text-[#22291F]">
            FlavorVerse
          </h1>
        </Link>

        {/* Desktop Search & Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <IoIosSearch className="absolute left-4 text-lg text-[#7C8B6F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes…"
              className="pl-11 pr-4 py-2 w-72 md:w-80 rounded-full text-sm text-[#22291F] bg-white/40
                border border-[#22291F]/15 placeholder-[#22291F]/40
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-1 focus:ring-[#7C8B6F]/20"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative py-1.5 font-['IBM_Plex_Mono'] text-[13px] uppercase tracking-wider no-underline
                    transition-colors duration-200
                    ${isActive ? "text-[#404839]" : "text-[#22291F]/55 hover:text-[#22291F]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#7C8B6F] origin-left
                      transition-transform duration-300 ease-out
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-[#22291F]">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <div className="relative flex items-center">
            <IoIosSearch className="absolute left-4 text-lg text-[#7C8B6F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes…"
              className="pl-11 pr-4 py-2 w-full rounded-full text-sm text-[#22291F] bg-white/40
                border border-[#22291F]/15 placeholder-[#22291F]/40
                focus:outline-none focus:ring-1 focus:ring-[#7C8B6F]/20"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 font-['IBM_Plex_Mono'] text-sm uppercase tracking-wider no-underline
                    ${isActive ? "text-[#404839] font-semibold" : "text-[#22291F]/60"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;