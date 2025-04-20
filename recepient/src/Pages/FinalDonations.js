import React, { useEffect, useState } from 'react';

const Donations = () => {
    const [donationSummary, setDonationSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonationSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }
                const response = await fetch('http://localhost:5000/api/donations/donation-summary', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch donation summary');
                }

                const data = await response.json();
                setDonationSummary(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonationSummary();
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="bg-blue-600 w-full py-4 text-white text-center text-xl font-bold">
                Donation Summary
            </header>
            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4">Total Donations by Institute</h2>
                <div className="grid gap-6"> {/* Added grid and gap for spacing */}
                    {donationSummary.map(({ instituteId, instituteName, totalAmount, totalCount }) => (
                        <div key={instituteId} className="bg-white rounded-lg shadow-md p-6 border">
                            <h3 className="text-xl font-bold">{instituteName}</h3>
                            <p>Total Amount: <span className="font-medium">{totalAmount} Rs</span></p>
                            <p>Total Count: <span className="font-medium">{totalCount}</span></p>
                        </div>
                    ))}
                </div>
            </main>
            {/* <footer className="bg-blue-600 w-full py-4 text-white text-center">
                © {new Date().getFullYear()} Your Organization Name
            </footer> */}
        </div>
    );
};

export default Donations;
