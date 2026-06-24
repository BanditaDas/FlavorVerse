import React, { useState, useEffect } from "react";
import Recipecard from "../components/Recipecard";
import { toast } from "react-toastify";

function Recipe({ searchQuery }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Fetch all recipes initially to have a list to fall back to
        const allRecipesResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const allRecipesData = await allRecipesResponse.json();
        
        const formatMeal = (meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          imageUrl: meal.strMealThumb,
          description: meal.strInstructions ? meal.strInstructions.substring(0, 100) + "..." : "",
          ingredients: [meal.strIngredient1, meal.strIngredient2].filter(Boolean),
          price: Math.floor(Math.random() * 10) + 8,
          calories: Math.floor(Math.random() * 300) + 200,
          time: Math.floor(Math.random() * 20) + 10,
          deliveryDate: "Today",
        });

        if (allRecipesData.meals) {
          const formatted = allRecipesData.meals.map(formatMeal);
          setAllRecipes(formatted);
          setDisplayedRecipes(formatted);
        }
      } catch (error) {
        console.error("Error fetching initial recipes:", error);
        toast.error("Could not load recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery) {
        setDisplayedRecipes(allRecipes);
        return;
      }

      setLoading(true);
      try {
        const searchByNameUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        const searchByIngredientUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;

        const [nameResponse, ingredientResponse] = await Promise.all([
          fetch(searchByNameUrl),
          fetch(searchByIngredientUrl),
        ]);

        const nameData = await nameResponse.json();
        const ingredientData = await ingredientResponse.json();

        const combinedMeals = new Map();

        const formatMeal = (meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          imageUrl: meal.strMealThumb,
          description: meal.strInstructions ? meal.strInstructions.substring(0, 100) + "..." : "",
          ingredients: [meal.strIngredient1, meal.strIngredient2].filter(Boolean),
          price: Math.floor(Math.random() * 10) + 8,
          calories: Math.floor(Math.random() * 300) + 200,
          time: Math.floor(Math.random() * 20) + 10,
          deliveryDate: "Today",
        });

        if (nameData.meals) {
          nameData.meals.forEach(meal => combinedMeals.set(meal.idMeal, formatMeal(meal)));
        }

        if (ingredientData.meals) {
          for (const partialMeal of ingredientData.meals) {
            if (!combinedMeals.has(partialMeal.idMeal)) {
              const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${partialMeal.idMeal}`);
              const detailData = await detailResponse.json();
              if (detailData.meals) {
                combinedMeals.set(detailData.meals[0].idMeal, formatMeal(detailData.meals[0]));
              }
            }
          }
        }

        const searchResults = Array.from(combinedMeals.values());
        if (searchResults.length === 0) {
          toast.info("No recipes found. Showing all recipes.");
          setDisplayedRecipes(allRecipes);
        } else {
          setDisplayedRecipes(searchResults);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error("An error occurred during search.");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchQuery, allRecipes]);

  if (loading) {
    return <div className="p-6 text-center">Loading recipes...</div>;
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-orange-800 tracking-wide">Our Recipes</h1>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
          <Recipecard key={recipe.id} recipe={recipe} />
        ))
        ) : (
          !loading && <p className="text-center text-xl text-gray-500 mt-10">No recipes found. Try a different search!</p>
        )}
      </div>
    </>
  );
}

export default Recipe;