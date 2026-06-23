import React, { useState, useEffect } from "react";
import Recipecard from "../components/Recipecard";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes from TheMealDB API
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          // Map API properties to match your Recipecard expectations
          const formattedRecipes = data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            description: meal.strInstructions ? meal.strInstructions.substring(0, 100) + "..." : "",
            ingredients: [meal.strIngredient1, meal.strIngredient2].filter(Boolean), // Grab first few ingredients
            // The API doesn't have price, calories, or time, so we add defaults or random placeholders
            price: Math.floor(Math.random() * 10) + 8, 
            calories: Math.floor(Math.random() * 300) + 200,
            time: Math.floor(Math.random() * 20) + 10,
            deliveryDate: "Today"
          }));
          
          setRecipes(formattedRecipes);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading recipes...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-x-hidden">
      {recipes.map((recipe) => (
        <Recipecard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default Recipe;