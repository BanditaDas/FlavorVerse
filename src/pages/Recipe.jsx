import React from 'react'
import Recipecard from '../components/Recipecard';

function Recipe() {
  const recipe = {
    name: "Blueberry Smoothie",
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
    price: 10,
    deliveryDate: "16/06/2026",
    description:
      "A refreshing blueberry smoothie packed with antioxidants and natural sweetness.",
    ingredients: ["Blueberry", "Banana"],
    calories: 250,
    time: 10,
  };

  return (
    <div>
      <Recipecard recipe={recipe} />
    </div>
  )
}

export default Recipe