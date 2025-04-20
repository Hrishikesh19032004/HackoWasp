import React, { useEffect, useState } from 'react';

const DonationList = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }
                const response = await fetch('http://localhost:5000/api/institutes/admin/donations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch donations');
                }

                const data = await response.json();
                setDonations(data); // Assuming the response structure matches your needs
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Total Donations</h2>
            <div className="space-y-4">
                {donations.map(donation => (
                    <div key={donation._id} className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-lg font-semibold">Amount: <span className="font-normal">Rs.{donation.amount}</span></p>
                        <p className="text-lg font-semibold">Institute: <span className="font-normal">{donation.instituteId.name}</span></p>
                        <p className="text-lg font-semibold">Description: <span className="font-normal">{donation.description}</span></p>
                        <p className="text-sm text-gray-500">Date: <span className="font-normal">{new Date(donation.createdAt).toLocaleString()}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationList;
