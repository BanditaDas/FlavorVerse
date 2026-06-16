import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Service() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-orange-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Services</h1>
      <p className="text-gray-600 text-lg mb-6">Explore the comprehensive services we offer to help you succeed.</p>
      <Link to="/service/details" className="inline-block mb-4 px-6 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition duration-200">
        More Details
      </Link>
      <Outlet />
    </div>
  );
}