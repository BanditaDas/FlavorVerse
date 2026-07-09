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
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        
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

        if (data.meals) {
          const formatted = data.meals.map(formatMeal);
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
      // If search is cleared, show all recipes again
      if (!searchQuery || searchQuery.trim() === "") {
        setDisplayedRecipes(allRecipes);
        return;
      }

      setLoading(true);
      try {
        const query = searchQuery.trim();
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

        const response = await fetch(searchUrl);
        const data = await response.json();

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
        
        const searchResults = data.meals ? data.meals.map(formatMeal) : [];
        
        // Handle "Not Found" State
        if (searchResults.length === 0) {
          toast.error("Not found! Try a different recipe or ingredient.");
          setDisplayedRecipes([]); 
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


    const delayDebounceFn = setTimeout(() => {

      if (allRecipes.length > 0 || searchQuery) {
        performSearch();
      }
    }, 500);


    return () => clearTimeout(delayDebounceFn);


  }, [searchQuery]); 

  if (loading) {
    return <div className="p-6 text-center text-orange-800 text-xl font-semibold mt-10">Loading recipes...</div>;
  }

  return (
    <div className="pb-20">
      <h1 className="text-center font-['Fraunces'] text-5xl font-semibold text-[#22291F] tracking-wide mt-10">
        Our Recipes
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <Recipecard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          !loading && <p className="text-center text-xl text-gray-500 mt-10">No recipes match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Recipe;