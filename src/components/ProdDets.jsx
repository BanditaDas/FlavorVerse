import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProdDets({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product that matches the ID in the URL
  const product = products?.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md border border-amber-900/20 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition duration-200">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md border border-amber-900/20">
      <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 px-4 py-2 font-medium text-amber-800 border border-amber-800 rounded-lg hover:bg-amber-800 hover:text-white transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Products</span>
      </button>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
      <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
    </div>
  );
}

export default ProdDets;