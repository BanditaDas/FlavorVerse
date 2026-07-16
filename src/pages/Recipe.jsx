import React, { useState, useEffect, useRef } from "react";
import Recipecard from "../components/Recipecard";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";

function Recipe({ searchQuery }) {
  const [searchParams] = useSearchParams();
  const [allRecipes, setAllRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef(0);

  const formatMeal = (meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    imageUrl: meal.strMealThumb,
    category: meal.strCategory,
    description: meal.strInstructions ? meal.strInstructions.substring(0, 100) + "..." : "",
    ingredients: [meal.strIngredient1, meal.strIngredient2].filter(Boolean),
    price: Math.floor(Math.random() * 10) + 8,
    calories: Math.floor(Math.random() * 300) + 200,
    time: Math.floor(Math.random() * 20) + 10,
    deliveryDate: "Today",
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
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
    const queryFromUrl = searchParams.get("q") || searchQuery;

    const performSearch = async (thisRequestId) => {
      if (!searchQuery || searchQuery.trim() === "") {
        if (thisRequestId === requestIdRef.current) setDisplayedRecipes(allRecipes);
        return;
      }

      setLoading(true);
      try {
        const query = searchQuery.trim();
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (thisRequestId !== requestIdRef.current) return;

        const searchResults = data.meals ? data.meals.map(formatMeal) : [];
        if (searchResults.length === 0) {
          toast.error("Not found! Try a different recipe or ingredient.");
          setDisplayedRecipes([]);
        } else {
          setDisplayedRecipes(searchResults);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        if (thisRequestId === requestIdRef.current) toast.error("An error occurred during search.");
      } finally {
        if (thisRequestId === requestIdRef.current) setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (allRecipes.length > 0 || queryFromUrl) {
        const thisRequestId = ++requestIdRef.current;
        performSearch(thisRequestId);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allRecipes, searchParams]);

  if (loading) {
    return <Loader message="Finding your recipes..." />;
  }

  return (
    <div className="min-h-screen bg-[#F3ECDD] rounded-2xl border border-[#22291F]/10 pt-10 md:pt-20 pb-20 px-4 sm:px-6 md:px-12">
      <h1 className="text-center font-['Fraunces'] text-4xl md:text-5xl font-semibold text-[#22291F] tracking-wide mb-10">
        Our Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => <Recipecard key={recipe.id} recipe={recipe} />)
        ) : (
          !loading && <p className="text-center text-xl text-gray-500 mt-10">No recipes match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Recipe;