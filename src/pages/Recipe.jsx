import React from 'react'
import Recipecard from '../components/Recipecard';

function Recipe() {
  const recipe = {
    name: "Blueberry Smoothie",
    imageUrl:
      "https://images.unsplash.com/photo-1588929473475-d16ffd5d068c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZWJlcnJ5JTIwc21vb3RoaWV8ZW58MHx8MHx8fDA%3D",
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