import React, { useState } from 'react';
import { FaEnvelope, FaLocationArrow, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    registrationNumber: '',
    location: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/receivers/signup', formData);
      setSuccess(response.data.message || 'Signup successful!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      setSuccess('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?community,help')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 hover:shadow-2xl hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Recipient Signup
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 text-gray-500">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-r-md"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="registrationNumber">
              Registration Number
            </label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 text-gray-500">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                placeholder="Enter your Registration number"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-r-md"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaPhone className="text-gray-500 mr-3" />
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter your number"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="location">
              Location
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaLocationArrow className="text-gray-500 mr-3" />
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your city"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 text-gray-500">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-r-md"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md hover:opacity-90 transition duration-200 font-semibold"
          >
            Signup
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link
            to="/Recipient/RecipientLogin"
            className="text-green-300 font-semibold hover:underline ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecipientSignUp;
