import React from 'react';
import { Link } from 'react-router-dom';

function SerDets() {
  return (
    <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-amber-900/20">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Service Details</h2>
      <p className="text-gray-600 mb-6">Here is some more detailed information about the services we offer.</p>
      <Link to="/service/details" className="inline-block px-6 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition duration-200">
        More Details
      </Link>
    </div>
  );
}

export default SerDets;