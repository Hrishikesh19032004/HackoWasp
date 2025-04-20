import React, { useState } from 'react';
import axios from 'axios';

const PurchaseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/shop/purchase', // Backend URL
        { amount, description, city }, // Payload
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store token in localStorage
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Purchase failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make a Purchase from Shops</h2>
      
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* City Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Make Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
