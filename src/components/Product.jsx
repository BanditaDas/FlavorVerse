import React from 'react';
import { NavLink } from 'react-router-dom';

export const products = [
  { id: 1, name: 'Product A', description: 'Detailed description for Product A goes here. It is an amazing product that you will absolutely love.' },
  { id: 2, name: 'Product B', description: 'Detailed description for Product B goes here. High quality and built to last.' },
  { id: 3, name: 'Product C', description: 'Detailed description for Product C goes here. The perfect solution for your everyday needs.' },
];

export default function Product() {

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col p-6 bg-white rounded-2xl shadow-md border border-amber-900/20 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-6 grow">{product.description}</p>
            <NavLink to={`/product/${product.id}`} className="text-center px-4 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition duration-200">
              View Details
            </NavLink>
          </div>
        ))}
      </div>  
    </div>
  );
}