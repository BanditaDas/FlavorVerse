import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { SlFire } from "react-icons/sl";
import { toast } from "react-toastify";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];

          // Format ingredients
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
              );
            }
          }

          // Format steps
          const steps = meal.strInstructions
            .split("\r\n")
            // Remove any leading numbering like "1. " or "STEP 1" from the instruction text.
            .map((step) => step.replace(/^\s*(?:step\s*\d+|\d+\.)\s*/i, "").trim())
            .filter((step) => step && !/^\d+$/.test(step));

          setRecipe({
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            ingredients,
            calories: Math.floor(Math.random() * 300) + 200,
            time: Math.floor(Math.random() * 20) + 10,
            steps,
          });
        } else {
          toast.error("Recipe not found.");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        toast.error("Could not load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-orange-800 text-xl font-semibold mt-10">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="p-6 text-center text-gray-500 text-xl mt-10">Recipe not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-[#FFFCF9] rounded-3xl shadow-lg p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        {/* Left Column: Title, Image, and Steps */}
        <div className="md:col-span-2">
          {/* Header */}
          <header className="mb-8 flex items-end gap-5">
            <h1 className="text-4xl md:text-5xl font-bold text-[#9F2D00]">
              {recipe.name}
            </h1>
            <p className="text-sm font-semibold text-[#9F2D00] uppercase tracking-widest ">
              {recipe.category} | {recipe.area}
            </p>
            
          </header>

          {/* Ingredients */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#9F2D00] mb-6">Ingredients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recipe.ingredients.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#faeedf] rounded-xl p-3 text-sm text-orange-900 text-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-3xl font-bold text-[#9F2D00] mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#faeedf] text-[#9F2D00] font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-orange-900/90 leading-relaxed pt-1.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Image and Ingredients */}
        <div className="md:col-span-1">
          <div className=" space-y-8">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-[50vh] object-cover rounded-2xl shadow-lg hidden md:block"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center bg-[#faeedf] rounded-xl p-3">
                <SlFire className="text-[#9F2D00] text-xl" />
                <span className="text-sm mt-2 font-semibold text-orange-900">
                  {recipe.calories} Cal
                </span>
              </div>

              <div className="flex flex-col items-center bg-[#faeedf] rounded-xl p-3">
                <FaRegClock className="text-[#9F2D00] text-xl" />
                <span className="text-sm mt-2 font-semibold text-orange-900">
                  {recipe.time} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;