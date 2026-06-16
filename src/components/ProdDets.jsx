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
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>
      <button onClick={() => navigate(-1)} className="px-6 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition duration-200">
        &larr; Back to Products
      </button>
    </div>
  );
}

export default ProdDets;