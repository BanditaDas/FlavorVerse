import React from 'react'
import Recipecard from '../components/Recipecard';

function Recipe() {
  const recipe = {
    name: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  };

  return (
    <div>
      <Recipecard recipe={recipe} />
    </div>
  )
}

export default Recipe