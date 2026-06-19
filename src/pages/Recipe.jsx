import React from 'react'
import Recipecard from '../components/Recipecard';

function Recipe() {
  const recipe = {
    name: 'Spaghetti Carbonara',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326b20f5413?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  return (
    <div>
      <Recipecard recipe={recipe} />
    </div>
  )
}

export default Recipe