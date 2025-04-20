import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MlComponent = () => {
    const [institutes, setInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const fetchInstitutes = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/institutes');
            setInstitutes(response.data);
        } catch (error) {
            console.error('Error fetching institutes:', error);
        }
    };

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const handleInstituteChange = (event) => {
        setSelectedInstitute(event.target.value);
    };

    const handleGetRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/get-recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    institute_id: selectedInstitute
                })
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setRecommendations(data);
            } else {
                console.error("Received non-array data:", data);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    return (
        <div className="ml-component max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shop Recommendations</h1>

            <div className="mb-6">
                <label htmlFor="institute-select" className="block text-lg font-medium text-gray-700 mb-2">Select an Institute:</label>
                <select
                    id="institute-select"
                    onChange={handleInstituteChange}
                    value={selectedInstitute}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select an institute</option>
                    {institutes.map(institute => (
                        <option key={institute['Institute ID']} value={institute['Institute ID']}>
                            {institute.Name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleGetRecommendations}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
                Get Recommendations
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {Array.isArray(recommendations) && recommendations.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Top 5 Shops:</h2>
                    <ul className="space-y-4">
                        {recommendations.map(shop => (
                            <li key={shop['Shop ID']} className="p-4 bg-white shadow-md rounded-md border border-gray-200">
                                <p className="text-lg font-medium">{shop.Name}</p>
                                <p className="text-gray-600">{shop.City}, {shop.State} (Distance: {shop.Distance.toFixed(2)} km)</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MlComponent;
