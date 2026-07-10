import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegClock, FaChevronLeft, FaChevronRight, FaCheck, FaBookOpen, FaListUl } from "react-icons/fa";
import { SlFire } from "react-icons/sl";
import Loader from "../components/Loader";


export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [cookMode, setCookMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
                `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`.trim()
              );
            }
          }

          // Format steps
          const steps = meal.strInstructions
            .split("\r\n")
            .map((step) => step.replace(/^\s*(?:step\s*\d+|\d+\.)\s*/i, "").trim())
            .filter((step) => step && !/^\d+$/.test(step));

          const formattedRecipe = {
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            ingredients,
            calories: Math.floor(Math.random() * 300) + 200,
            time: Math.floor(Math.random() * 20) + 10,
            steps,
          };
          setRecipe(formattedRecipe);
          setChecked(Array(formattedRecipe.ingredients.length).fill(false));
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

  const gathered = checked.filter(Boolean).length;
  const total = recipe?.ingredients.length ?? 0;
  const pct = total ? Math.round((gathered / total) * 100) : 0;
  const cookPct = recipe ? Math.round(((activeStep + 1) / recipe.steps.length) * 100) : 0;

  const toggleIngredient = (i) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  if (loading) {
    return <Loader message="Turning the page..." />;
  }

  if (!recipe) {
    return (
      <div className="journal-root p-10 text-center text-[#22291F]/60 font-mono">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="journal-root max-w-6xl mx-auto p-6 md:p-12">
      <style>{`
        .journal-root {
          --paper: #F3ECDD;
          --paper-dark: #E7DCC2;
          --ink: #22291F;
          --mustard: #D9A441;
          --coral: #E1573C;
          --sage: #7C8B6F;
          background: var(--paper);
          color: var(--ink);
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          border-radius: 28px;
          box-shadow: 0 20px 60px -20px rgba(34,41,31,0.25);
          position: relative;
          overflow: hidden;
        }
        .journal-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(34,41,31,0.05) 1px, transparent 0);
          background-size: 18px 18px;
          pointer-events: none;
        }
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slidePage {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .rise { animation: riseIn 0.55s cubic-bezier(.2,.7,.3,1) both; }
        .page-in { animation: slidePage 0.35s ease both; }
        .pop { animation: pop 0.3s ease; }

        @media (prefers-reduced-motion: reduce) {
          .rise, .page-in, .pop { animation: none !important; }
        }

        .ingredient-row {
          transition: background 0.25s ease, transform 0.15s ease;
        }
        .ingredient-row:hover { transform: translateX(2px); }

        .checkbox {
          width: 20px; height: 20px; border-radius: 6px;
          border: 2px solid var(--sage);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s ease, border-color 0.2s ease;
          flex-shrink: 0;
        }
        .checkbox.checked {
          background: var(--sage);
          border-color: var(--sage);
        }

        .photo-frame {
          transform: rotate(-2.5deg);
          transition: transform 0.4s cubic-bezier(.2,.7,.3,1);
        }
        .photo-frame:hover { transform: rotate(0deg) scale(1.02); }

        .tape {
          position: absolute;
          top: -14px; left: 50%;
          width: 90px; height: 28px;
          background: rgba(217,164,65,0.75);
          transform: translateX(-50%) rotate(-3deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .ribbon-track {
          height: 6px; border-radius: 999px;
          background: var(--paper-dark);
          overflow: hidden;
        }
        .ribbon-fill {
          height: 100%; border-radius: 999px;
          background: linear-gradient(90deg, var(--sage), var(--mustard));
          transition: width 0.5s cubic-bezier(.2,.7,.3,1);
        }

        .pill {
          display: flex; align-items: center; gap: 6px;
          background: var(--paper-dark);
          border-radius: 12px;
          padding: 10px 12px;
        }

        .step-btn {
          transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
        }
        .step-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .step-btn:disabled { opacity: 0.35; cursor: not-allowed; }
      `}</style>

      <button
        onClick={() => navigate(-1)}
        className="rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-6 text-[#7C8B6F] hover:text-[#22291F] transition-colors"
      >
        <FaChevronLeft className="w-3 h-3" /> Back 
      </button>

      {/* Header */}
      <header className="mb-10 rise" style={{ animationDelay: "0s" }}>
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#7C8B6F] mb-2">
          Recipe Type — {recipe.category}{recipe.area ? ` / ${recipe.area}` : ""}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-[#22291F]">
          {recipe.name}
        </h1>
        
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
        {/* Left column */}
        <div className="md:col-span-2 space-y-12">
          {/* Ingredients */}
          <section className="rise" style={{ animationDelay: "0.08s" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
                <FaListUl className="w-5 h-5 text-[#7C8B6F]" />
                Ingredients
              </h2>
              <span className="font-mono text-xs text-[#7C8B6F]">
                {gathered} of {total} gathered
              </span>
            </div>
            <div className="ribbon-track mb-5">
              <div className="ribbon-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className="ingredient-row flex items-center gap-3 text-left rounded-xl px-3 py-2.5 bg-(--paper-dark)/60 hover:bg-(--paper-dark)"
                >
                  <span className={`checkbox ${checked[i] ? "checked pop" : ""}`}>
                    {checked[i] && <FaCheck className="w-3.5 h-3.5 text-(--paper)" />}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      textDecoration: checked[i] ? "line-through" : "none",
                      opacity: checked[i] ? 0.45 : 1,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="rise" style={{ animationDelay: "0.16s" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-semibold">Instructions</h2>
              <button
                onClick={() => {
                  setCookMode((v) => !v);
                  setActiveStep(0);
                }}
                className="font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-lg bg-(--ink) text-(--paper) hover:opacity-90 transition"
              >
                {cookMode ? "Show all steps" : "Cook mode"}
              </button>
            </div>

            {!cookMode ? (
              <div className="space-y-5">
                {recipe.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rise"
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-(--paper-dark) font-mono text-sm font-medium text-(--ink)">
                      {index + 1}
                    </div>
                    <p className="text-[#22291F]/85 leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="ribbon-track mb-6">
                  <div className="ribbon-fill" style={{ width: `${cookPct}%` }} />
                </div>
                <div key={activeStep} className="page-in bg-(--paper-dark)/50 rounded-2xl p-8 min-h-45 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7C8B6F] mb-3">
                      Step {activeStep + 1} of {recipe.steps.length}
                    </p>
                    <p className="font-display text-xl leading-snug text-[#22291F]">
                      {recipe.steps[activeStep]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button
                      className="step-btn flex items-center gap-1 font-mono text-xs uppercase px-3 py-2 rounded-lg bg-(--paper)"
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    > 
                      <FaChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <button
                      className="step-btn flex items-center gap-1 font-mono text-xs uppercase px-3 py-2 rounded-lg bg-(--ink) text-(--paper)"
                      disabled={activeStep === recipe.steps.length - 1}
                      onClick={() => setActiveStep((s) => Math.min(recipe.steps.length - 1, s + 1))}
                    >
                      Next <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="md:col-span-1 rise" style={{ animationDelay: "0.1s" }}>
          <div className="relative photo-frame mb-6 hidden md:block">
            <div className="tape" />
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-[42vh] object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="pill">
              <SlFire className="w-4 h-4 text-(--coral)" />
              <span className="text-sm font-medium">{recipe.calories} cal</span>
            </div>
            <div className="pill">
              <FaRegClock className="w-4 h-4 text-(--coral)" />
              <span className="text-sm font-medium">{recipe.time} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}