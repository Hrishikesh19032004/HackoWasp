import React, { useState } from "react";
import { MyPlugin as Card } from "./donationCard.jsx"; // Card Component

export const AvailableDonations = () => {
  const [visibleOrganizations, setVisibleOrganizations] = useState([
    { foodName: "Apple", quantity: 5, location: "New York" },
    { foodName: "Banana", quantity: 3, location: "Los Angeles" },
    { foodName: "Orange", quantity: 10, location: "San Francisco" },
    { foodName: "Grapes", quantity: 7, location: "Chicago" },
    { foodName: "Mango", quantity: 8, location: "Miami" },
  ]);

  const handleDonateClick = (foodName) => {
    setVisibleOrganizations((prev) =>
      prev.filter((item) => item.foodName !== foodName) // Remove the donated food item card
    );
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {visibleOrganizations.map((org, index) => (
          <div key={index} style={{ margin: "16px" }}>
            <Card
              foodName={org.foodName}
              quantity={org.quantity}
              location={org.location}
              onDonate={() => handleDonateClick(org.foodName)} // Pass the food name on donate click
            />
          </div>
        ))}
      </div>
    </div>
  );
};
