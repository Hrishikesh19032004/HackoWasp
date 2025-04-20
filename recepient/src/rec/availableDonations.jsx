// import React, { useState, useEffect } from "react";
// import { MyPlugin as Card } from "./donationCard.jsx"; // Card Component
// import axios from "axios"; // Use axios for HTTP requests

// export const AvailableDonations = () => {
//   const [visibleOrganizations, setVisibleOrganizations] = useState([]); // Array of food posts
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track error state

//   // Fetch food posts from the backend when the component mounts
//   useEffect(() => {
//     const fetchFoodPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/food-posts/all");
        
//         // Remove duplicate posts based on foodName
//         const uniquePosts = response.data.filter(
//           (item, index, self) =>
//             index === self.findIndex((post) => post.foodName === item.foodName)
//         );

//         setVisibleOrganizations(uniquePosts); // Set the filtered food posts
//       } catch (err) {
//         setError("Error fetching food posts"); // Set error if request fails
//       } finally {
//         setLoading(false); // Stop loading indicator
//       }
//     };

//     fetchFoodPosts();
//   }, []); // Empty array means this effect runs once when the component mounts

//   const handleDonateClick = (foodName, foodId) => {
//     alert(`You have requested a donation for ${foodName} (ID: ${foodId}).`);
//   };

//   // Render loading or error message if needed
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
//       {visibleOrganizations.map((org) => (
//         <div key={org._id} style={{ margin: "16px" }}>
//           <Card
//             foodName={org.foodName}
//             quantity={org.quantity}
//             location={org.location}
//             imageUrl={
//               org.photo
//                 ? `http://localhost:5000/${org.photo}`
//                 : "https://tools-api.webcrumbs.org/image-placeholder/200/150/office/1"
//             }
//             onDonate={() => handleDonateClick(org.foodName, org._id)} // Pass food post ID
//           />
//         </div>
//       ))}
//     </div>
//   );
import React, { useState, useEffect } from "react";
import { MyPlugin as Card } from "./donationCard.jsx"; // Card Component
import axios from "axios"; // Use axios for HTTP requests

export const AvailableDonations = () => {
  const [visibleOrganizations, setVisibleOrganizations] = useState([]); // Array of food posts
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch food posts from the backend when the component mounts
  useEffect(() => {
    const fetchFoodPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/food-posts/all");
        
        // Remove duplicate posts based on foodName
        const uniquePosts = response.data.filter(
          (item, index, self) =>
            index === self.findIndex((post) => post.foodName === item.foodName)
        );

        setVisibleOrganizations(uniquePosts); // Set the filtered food posts
      } catch (err) {
        setError("Error fetching food posts"); // Set error if request fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchFoodPosts();
  }, []); // Empty array means this effect runs once when the component mounts

  // Handle donation button click (just show request sent)
  const handleDonateClick = (foodName) => {
    alert(`Request sent for ${foodName}.`); // Show request sent message
  };

  // Render loading or error message if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
      {visibleOrganizations.map((org) => (
        <div key={org._id} style={{ margin: "16px" }}>
          <Card
            foodName={org.foodName}
            quantity={org.quantity}
            location={org.pickupLocation}
            imageUrl={
              org.photo
                ? `http://localhost:5000/${org.photo}`
                : "https://tools-api.webcrumbs.org/image-placeholder/200/150/office/1"
            }
            onDonate={() => handleDonateClick(org.foodName)} // Pass foodName for alert
          />
        </div>
      ))}
    </div>
  );
};
