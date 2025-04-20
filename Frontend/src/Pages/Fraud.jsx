import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; 
import sentimentCSV from './sentiment.csv'; 

function FraudDetection() {
    const [requirement, setRequirement] = useState('');
    const [currentReceived, setCurrentReceived] = useState('');
    const [demand, setDemand] = useState('');
    const [numberOfResidents, setNumberOfResidents] = useState('');
    const [residents3DaysBefore, setResidents3DaysBefore] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [sentimentOverview, setSentimentOverview] = useState({});
    const [instituteID, setInstituteID] = useState('');
    const [sentimentData, setSentimentData] = useState([]); 

    useEffect(() => {
        
        Papa.parse(sentimentCSV, {
            download: true,
            header: true,
            complete: (result) => {
                setSentimentData(result.data);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            }
        });
    }, []);

    const handleSubmitFraud = async (e) => {
        e.preventDefault();

        const newData = {
            requirement: Number(requirement),
            current_received: Number(currentReceived),
            demand: Number(demand),
            number_of_residents: Number(numberOfResidents),
            residents_3days_before: Number(residents3DaysBefore),
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/detect_fraud', newData, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            setPrediction(response.data.fraud ? 'Yes, it is a fraud.' : 'No, it is not a fraud.');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSentimentAnalysis = () => {
        const sentiments = sentimentData.filter(item => item.institute_id === instituteID);

        const sentimentCount = {
            good: 0,
            bad: 0,
            neutral: 0,
        };

        sentiments.forEach(item => {
            const sentiment = item.sentiment.toLowerCase();
            if (sentiment.includes('well-maintained') || sentiment.includes('clean') || sentiment.includes('excellent') || sentiment.includes('good')) {
                sentimentCount.good++;
            } else if (sentiment.includes('poor') || sentiment.includes('unhygienic') || sentiment.includes('bad')) {
                sentimentCount.bad++;
            } else {
                sentimentCount.neutral++;
            }
        });

        setSentimentOverview(sentimentCount);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Fraud Detection & Sentiment Analysis</h1>
                <form onSubmit={handleSubmitFraud} className="space-y-6">
                    <div>
                        <label htmlFor="instituteID" className="block text-sm font-medium text-gray-700">Institute ID</label>
                        <input
                            type="text"
                            id="instituteID"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute ID"
                            value={instituteID}
                            onChange={(e) => setInstituteID(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="requirement" className="block text-sm font-medium text-gray-700">Requirement</label>
                        <input
                            type="number"
                            id="requirement"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Requirement"
                            value={requirement}
                            onChange={(e) => setRequirement(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="currentReceived" className="block text-sm font-medium text-gray-700">Current Received</label>
                        <input
                            type="number"
                            id="currentReceived"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Current Received"
                            value={currentReceived}
                            onChange={(e) => setCurrentReceived(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="demand" className="block text-sm font-medium text-gray-700">Demand</label>
                        <input
                            type="number"
                            id="demand"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Demand"
                            value={demand}
                            onChange={(e) => setDemand(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="numberOfResidents" className="block text-sm font-medium text-gray-700">Number of Residents</label>
                        <input
                            type="number"
                            id="numberOfResidents"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Number of Residents"
                            value={numberOfResidents}
                            onChange={(e) => setNumberOfResidents(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="residents3DaysBefore" className="block text-sm font-medium text-gray-700">Residents 3 Days Before</label>
                        <input
                            type="number"
                            id="residents3DaysBefore"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Residents 3 Days Before"
                            value={residents3DaysBefore}
                            onChange={(e) => setResidents3DaysBefore(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Detect Fraud
                    </button>
                </form>

                {prediction && <div className="mt-4 text-lg font-semibold text-gray-800">{prediction}</div>}

                <button 
                    type="button" 
                    onClick={handleSentimentAnalysis}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6"
                >
                    Analyze Sentiments
                </button>

                {sentimentOverview && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-700">Sentiment Analysis Overview:</h3>
                        <p className="text-sm">Good Sentiments: {sentimentOverview.good}</p>
                        <p className="text-sm">Neutral Sentiments: {sentimentOverview.neutral}</p>
                        <p className="text-sm">Bad Sentiments: {sentimentOverview.bad}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FraudDetection;
