import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Recipe from "../pages/Recipe";
import RecipeDetail from "../pages/RecipeDetail";

function Mainroutes({ searchQuery }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipe" element={<Recipe searchQuery={searchQuery} />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export default Mainroutes;