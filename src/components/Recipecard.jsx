import React from "react";
import { Link } from "react-router-dom";
import { TbLeaf } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import { SlFire } from "react-icons/sl";
import { LuUtensils } from "react-icons/lu";

function Recipecard({ recipe }) {
  const truncateText = (text, charLimit) => {
    if (!text) return "";
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="group w-full bg-[#F3ECDD] rounded-3xl p-3 flex flex-col gap-1 shadow-lg border border-gray-100 transition-all duration-300 no-underline">
      
      {/* Image */}
      <div className="relative h-full overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-5">
        <img  
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Name */}
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#21291F]">
          {truncateText(recipe.name, 20)}
        </h2> 
      </div>

      {/* Tags */}
      <div className="grid grid-cols-4 gap-2 mt-5">
        <div className="flex flex-col items-center bg-[#ECE2CD] rounded-xl p-2">
          <TbLeaf className="text-[#7C8B6E]" />
          <span className="text-[11px] mt-1">{truncateText(recipe.ingredients?.[0], 5)}</span>
        </div>

        <div className="flex flex-col items-center bg-[#ECE2CD] rounded-xl p-2">
          <LuUtensils className="text-[#7C8B6E]" />
          <span className="text-[11px] mt-1">{truncateText(recipe.ingredients?.[1], 5)}</span>
        </div>

        <div className="flex flex-col items-center bg-[#ECE2CD] rounded-xl p-2">
          <SlFire className="text-[#7C8B6E]" />
          <span className="text-[11px] mt-1">
            {recipe.calories} Cal
          </span>
        </div>

        <div className="flex flex-col items-center bg-[#ECE2CD] rounded-xl p-2">
          <FaRegClock className="text-[#7C8B6E]" />
          <span className="text-[11px] mt-1">
            {recipe.time} min
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Recipecard;
