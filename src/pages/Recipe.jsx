import React from "react";
import Recipecard from "../components/Recipecard";

function Recipe() {
  const recipes = [
    {
      id: 1,
      name: "Blueberry Smoothie",
      imageUrl:
        "https://images.unsplash.com/photo-1588929473475-d16ffd5d068c?w=600&auto=format&fit=crop&q=60",
      price: 10,
      deliveryDate: "16/06/2026",
      description:
        "A refreshing blueberry smoothie packed with antioxidants and natural sweetness.",
      ingredients: ["Blueberry", "Banana"],
      calories: 250,
      time: 10,
    },
    {
      id: 2,
      name: "Avocado Toast",
      imageUrl:
        "https://images.unsplash.com/photo-1628556820645-63ba5f90e6a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QXZvY2FkbyUyMFRvYXN0fGVufDB8fDB8fHww",
      price: 12,
      deliveryDate: "16/06/2026",
      description:
        "Crispy toast topped with creamy avocado and fresh herbs.",
      ingredients: ["Avocado", "Bread"],
      calories: 320,
      time: 15,
    },
    {
      id: 3,
      name: "Pancakes",
      imageUrl:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600",
      price: 8,
      deliveryDate: "16/06/2026",
      description:
        "Fluffy pancakes served with maple syrup and berries.",
      ingredients: ["Flour", "Milk"],
      calories: 400,
      time: 20,
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {recipes.map((recipe) => (
        <Recipecard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default Recipe;