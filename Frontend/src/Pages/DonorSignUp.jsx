
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLandmark, FaLocationArrow, FaLock, FaPhone, FaUser } from 'react-icons/fa';
import axios from 'axios';

const DonorSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/donors/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        number: formData.phone,
        location: formData.location,
      });

      setMessage(response.data.message); // Success message
      navigate('Donor/DonorLogin');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong'); // Error message
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?donor,signup')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Donor Signup
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
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
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaPhone className="text-gray-500 mr-3" />
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your number"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
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
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-2 border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Signup
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/Donor/DonorLogin" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DonorSignUp;
