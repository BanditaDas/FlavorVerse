import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRandom, FaRegClock, FaArrowRight } from "react-icons/fa";
import { SlFire } from "react-icons/sl";
import Recipecard from "../components/Recipecard";
import Loader from "../components/Loader";

const BASE = "https://www.themealdb.com/api/json/v1/1";

function mapFullMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strMeasure${i}`] || ""} ${meal[`strIngredient${i}`]}`.trim());
    }
  }
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    imageUrl: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
    calories: Math.floor(Math.random() * 300) + 200,
    time: Math.floor(Math.random() * 20) + 10,
  };
}

function mapSlimMeal(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    imageUrl: meal.strMealThumb,
    ingredients: [],
    calories: Math.floor(Math.random() * 300) + 200,
    time: Math.floor(Math.random() * 20) + 10,
  };
}

const PAGE_SIZE = 12;

export default function Home({ searchQuery = "" }) {
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [heroLoading, setHeroLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [meals, setMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/recipe?q=${encodeURIComponent(q)}`);
    }
  }, [searchQuery, navigate]);

  const fetchHero = useCallback(async () => {
    setHeroLoading(true);
    try {
      const res = await fetch(`${BASE}/random.php`);
      const data = await res.json();
      setHero(mapFullMeal(data.meals[0]));
    } catch (e) {
      console.error("Failed to load today's pick:", e);
    } finally {
      setHeroLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${BASE}/categories.php`);
        const data = await res.json();
        setCategories(data.categories || []);
        if (data.categories?.length) setActiveCategory(data.categories[0].strCategory);
      } catch (e) {
        console.error("Failed to load categories:", e);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    const thisRequestId = ++requestIdRef.current;

    const load = async () => {
      setMealsLoading(true);
      setDisplayedCount(PAGE_SIZE);
      try {
        const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(activeCategory)}`);
        const data = await res.json();

        const slimMeals = data.meals || [];

        // Fetch full details for each slim meal to get ingredients
        const fullMeals = await Promise.all(
          slimMeals.map(async (slimMeal) => {
            const detailRes = await fetch(`${BASE}/lookup.php?i=${slimMeal.idMeal}`);
            const detailData = await detailRes.json();
            return mapFullMeal(detailData.meals[0]);
          })
        );

        if (thisRequestId !== requestIdRef.current) return;

        setMeals(fullMeals);
      } catch (e) {
        console.error("Failed to load meals:", e);
        if (thisRequestId === requestIdRef.current) setMeals([]);
      } finally {
        if (thisRequestId === requestIdRef.current) setMealsLoading(false);
      }
    };

    load();
  }, [activeCategory]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F3ECDD] rounded-2xl border border-[#22291F]/10 pt-36 pb-20 px-6 md:px-12">
      {/* ── Hero: Today's Pick ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto mb-16">
        {heroLoading || !hero ? (
          <div className="rounded-3xl bg-[#E7DCC2] h-95 flex items-center justify-center"><Loader message="Picking today's recipe..." /></div>
        ) : (
          <div className="rounded-3xl bg-white/50 border border-[#22291F]/10 shadow-[0_20px_50px_-24px_rgba(34,41,31,0.35)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.25em] uppercase text-[#7C8B6F] mb-3">
                Today's Pick — {hero.category}{hero.area ? ` / ${hero.area}` : ""}
              </p>
              <h1 className="font-['Fraunces'] text-3xl md:text-5xl font-semibold leading-[1.05] text-[#22291F] mb-4">
                {hero.name}
              </h1>
              <p className="text-[#22291F]/60 text-sm leading-relaxed mb-6 line-clamp-3">
                {hero.instructions}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-[#E7DCC2] rounded-xl px-3 py-2">
                  <SlFire className="w-4 h-4 text-[#E1573C]" />
                  <span className="text-sm font-medium">{hero.calories} cal</span>
                </div>
                <div className="flex items-center gap-2 bg-[#E7DCC2] rounded-xl px-3 py-2">
                  <FaRegClock className="w-4 h-4 text-[#E1573C]" />
                  <span className="text-sm font-medium">{hero.time} min</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to={`/recipe/${hero.id}`}
                  className="group inline-flex items-center gap-2 bg-[#22291F] text-[#F3ECDD] rounded-full px-5 py-3 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Cook this today
                  <FaArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={fetchHero}
                  className="inline-flex items-center gap-2 text-[#22291F]/60 hover:text-[#22291F] font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-colors"
                >
                  <FaRandom className="w-4 h-4" />
                  Shuffle
                </button>
              </div>
            </div>

            <div className="relative h-64 md:h-auto">
              <img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-[#22291F]/20 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </section>

      {/* ── Category chips ─────────────────────────────────────────── */}
      {!isSearching && (
        <section className="max-w-6xl mx-auto mb-10 px-6 md:mx-auto md:px-0">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const active = activeCategory === cat.strCategory;
              return (
                <button
                  key={cat.idCategory}
                  onClick={() => setActiveCategory(cat.strCategory)}
                  className={`flex items-center gap-2 shrink-0 rounded-full px-4 py-2 border transition-all duration-200
                    font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider
                    ${
                      active
                        ? "bg-[#22291F] text-[#F3ECDD] border-[#22291F]"
                        : "bg-white/40 text-[#22291F]/60 border-[#22291F]/10 hover:border-[#7C8B6F]/50 hover:text-[#22291F]"
                    }`}
                >
                  <img src={cat.strCategoryThumb} alt="" className="w-5 h-5 rounded-full object-cover" />
                  {cat.strCategory}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.25em] uppercase text-[#7C8B6F] mb-1">
            {isSearching ? "Search results" : "Browse dishes"}
          </p>
          <h2 className="font-['Fraunces'] text-2xl md:text-3xl font-semibold text-[#22291F]">
            {isSearching ? `Results for "${searchQuery}"` : activeCategory || "Recipes"}
          </h2>
        </div>

        {mealsLoading ? (
          <Loader message="Fetching recipes..." />
        ) : meals.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-['Fraunces'] text-xl text-[#22291F]/70 mb-1">Nothing here yet.</p>
            <p className="text-sm text-[#22291F]/50">
              {isSearching
                ? `No recipes matched "${searchQuery}". Try another dish or ingredient.`
                : "Try a different category."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {meals.slice(0, displayedCount).map((meal, i) => (
                <Recipecard key={meal.id} recipe={meal} index={i} />
              ))}
            </div>
            {displayedCount < meals.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setDisplayedCount((c) => c + PAGE_SIZE)}
                  className="bg-[#22291F] text-[#F3ECDD] rounded-full px-6 py-3 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Show More Recipes
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}