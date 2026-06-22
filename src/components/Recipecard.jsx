import React from "react";
import { FaLeaf, FaClock, FaFire, FaUtensils } from "react-icons/fa";

function Recipecard({ recipe }) {
  return (
    <div className="w-70 bg-white rounded-3xl p-3 shadow-lg border border-gray-100 hover:scale-105 transition-all duration-300">
      
      {/* Image */}
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-56 object-cover rounded-2xl"
        />

        {/* Price */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl font-semibold text-purple-700 shadow">
          ₹{recipe.price}
        </div>
      </div>

      {/* Delivery Banner */}
      <div className="mt-3 bg-purple-600 text-white text-xs py-2 px-3 rounded-xl flex items-center gap-2">
        🚚 Free Delivery Until {recipe.deliveryDate}
      </div>

      {/* Recipe Name */}
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {recipe.name}
        </h2>

        <button className="text-purple-600 font-semibold text-sm hover:text-purple-800">
          View →
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
        {recipe.description}
      </p>

      {/* Tags */}
      <div className="grid grid-cols-4 gap-2 mt-5">
        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-2">
          <FaLeaf className="text-purple-600" />
          <span className="text-[11px] mt-1">{recipe.ingredients?.[0]}</span>
        </div>

        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-2">
          <FaUtensils className="text-purple-600" />
          <span className="text-[11px] mt-1">{recipe.ingredients?.[1]}</span>
        </div>

        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-2">
          <FaFire className="text-purple-600" />
          <span className="text-[11px] mt-1">
            {recipe.calories} Cal
          </span>
        </div>

        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-2">
          <FaClock className="text-purple-600" />
          <span className="text-[11px] mt-1">
            {recipe.time} min
          </span>
        </div>
      </div>
    </div>
  );
}

export default Recipecard;