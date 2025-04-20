import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStoreAlt } from 'react-icons/fa';

function FraudDetection() {
    const [foodbankId, setFoodbankId] = useState('');
    const [foodbankName, setFoodbankName] = useState('');
    const [location, setLocation] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [fraudChecked, setFraudChecked] = useState(false);
    const [foodbanks, setFoodbanks] = useState([]);

    useEffect(() => {
        const fetchFoodbanks = async () => {
            try {
                // Fetch foodbank data from backend or use a static method
                const response = await axios.get('http://127.0.0.1:5001/get_foodbanks'); // assuming a GET route that returns foodbanks
                setFoodbanks(response.data);
            } catch (error) {
                console.error("Error fetching foodbank data:", error);
            }
        };

        fetchFoodbanks();
    }, []);

    const handleSubmitFraud = async (e) => {
        e.preventDefault();

        const searchData = {
            foodbank_id: foodbankId,
            foodbank_name: foodbankName,
            location: location,
        };

        try {
            // Make a request to the Flask backend to check the fraud status
            const response = await axios.post('http://127.0.0.1:5001/detect_fraud', searchData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.fraud === 'Yes') {
                setPrediction('Yes, this foodbank is flagged for fraud.');
                setFraudChecked(true);
            } else {
                setPrediction('No, this foodbank is not flagged for fraud.');
                setFraudChecked(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://source.unsplash.com/1600x900/?foodbank,fraud')`,
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
                    Fraud Detection
                </h2>
                <form onSubmit={handleSubmitFraud} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="foodbankId">
                            Foodbank ID
                        </label>
                        <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
                            <FaStoreAlt className="text-gray-500 mr-3" />
                            <select
                                id="foodbankId"
                                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                                value={foodbankId}
                                onChange={(e) => setFoodbankId(e.target.value)}
                                required
                            >
                                <option value="">Select Foodbank ID</option>
                                {foodbanks.map((foodbank, index) => (
                                    <option key={index} value={foodbank.foodbank_id}>
                                        {foodbank.foodbank_id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="foodbankName">
                            Foodbank Name
                        </label>
                        <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
                            <FaStoreAlt className="text-gray-500 mr-3" />
                            <select
                                id="foodbankName"
                                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                                value={foodbankName}
                                onChange={(e) => setFoodbankName(e.target.value)}
                                required
                            >
                                <option value="">Select Foodbank Name</option>
                                {foodbanks.map((foodbank, index) => (
                                    <option key={index} value={foodbank.foodbank_name}>
                                        {foodbank.foodbank_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                            Location
                        </label>
                        <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-green-500">
                            <FaStoreAlt className="text-gray-500 mr-3" />
                            <select
                                id="location"
                                className="w-full py-2 border-none focus:outline-none focus:ring-0"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            >
                                <option value="">Select Location</option>
                                {foodbanks.map((foodbank, index) => (
                                    <option key={index} value={foodbank.location}>
                                        {foodbank.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Check Fraud
                    </button>
                </form>

                {prediction && (
                    <div className="mt-4 text-lg font-semibold text-gray-800">
                        {prediction}
                    </div>
                )}
                {fraudChecked && (
                    <div className="mt-4 text-lg font-semibold text-red-600">
                        Fraud Detected!
                    </div>
                )}
            </div>
        </div>
    );
}

export default FraudDetection;
