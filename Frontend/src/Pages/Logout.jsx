import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home or desired route after logout
  };

  return (
    <button onClick={handleLogout} className="hover:bg-button-primary px-4 py-1 rounded-xl text-lg font-medium text-black">
      Logout
    </button>
  );
};

export default Logout;
