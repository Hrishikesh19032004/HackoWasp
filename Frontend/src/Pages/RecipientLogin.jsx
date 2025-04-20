import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const RecipientLogin = () => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const response = await fetch('http://localhost:5000/api/receivers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data);
        navigate('/homer');
        // Handle successful login (e.g., save token to localStorage, redirect, etc.)
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?community,login')`,
      }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Recipient Login
        </h2>
        {error && (
          <div className="text-red-600 text-center mb-4 font-medium">
            {error}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="registrationNumber"
            >
              Registration Number
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                placeholder="Enter your registration number"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/Recipient/RecipientSignUp"
            className="text-green-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecipientLogin;
