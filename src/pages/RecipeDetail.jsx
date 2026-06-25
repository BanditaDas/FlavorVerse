import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegClock } from "react-icons/fa6";
import { SlFire } from "react-icons/sl";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals && data.meals[0]) {
          const meal = data.meals[0];
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
              );
            } else {
              break;
            }
          }

          setRecipe({
            id: meal.idMeal,
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            instructions: meal.strInstructions,
            category: meal.strCategory,
            area: meal.strArea,
            ingredients: ingredients,
            calories: Math.floor(Math.random() * 300) + 200, // Mock data
            time: Math.floor(Math.random() * 20) + 10, // Mock data
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

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-orange-800 text-xl font-semibold mt-10">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="p-6 text-center text-red-500 text-xl font-semibold mt-10">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-orange-200">
        <h1 className="text-4xl font-bold text-orange-800 mb-4">{recipe.name}</h1>
        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-96 object-cover rounded-lg mb-6"/>
        <div className="flex justify-between text-lg text-orange-700 mb-6">
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Area:</strong> {recipe.area}</p>
        </div>
        <h2 className="text-2xl font-semibold text-orange-800 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
        </ul>
        <h2 className="text-2xl font-semibold text-orange-800 mb-2">Instructions</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;