import React, { useEffect, useState } from 'react';

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in again.');
        }

        const response = await fetch('http://localhost:5000/api/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Total Users</h1>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              <span className="text-lg text-gray-700 font-medium">{user.name}</span>
              <span className="text-sm text-gray-500">ID: {user._id}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-lg text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default TotalUsers;
