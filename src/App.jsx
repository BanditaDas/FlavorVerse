import React, { useState, useEffect, useRef } from 'react'
import Mainroutes from './Routes/Mainroutes'
import { useLocation } from 'react-router-dom';
import Nav from "./components/Nav";

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const lastScrollTop = useRef(0);
  const location = useLocation();

  const isRecipeDetail = location.pathname.startsWith('/recipe/');

  const handleScroll = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop.current) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="scroll-container" className="h-screen w-full py-10 px-10 pt-35 text-gray-800 font-semibold bg-orange-50 overflow-y-auto overflow-x-hidden no-scrollbar">
      <Nav isVisible={isNavVisible} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Mainroutes searchQuery={searchQuery} />
    </div>
  )
}

export default App