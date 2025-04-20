import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyFood = () => {
  const { foodId } = useParams(); // Get the foodId from the URL
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/food-posts/${foodId}`);
        setFoodDetails(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [foodId]); // Re-fetch if the foodId changes

  if (!foodDetails) return <div>Loading food details...</div>;

  return (
    <div>
      <h1>{foodDetails.foodName}</h1>
      <p>Quantity: {foodDetails.quantity}</p>
      <p>Location: {foodDetails.location}</p>
      {/* You can add more details here */}
    </div>
  );
};

export default ApplyFood;
