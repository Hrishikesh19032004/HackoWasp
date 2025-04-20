import React, { useState } from "react";
import { MyPlugin as Card } from "./card.jsx"; // Card Component
import { MyPlugin as Certificate } from "./certificate.jsx"; // Certificate Component
import Navbar from "../components/Navbar.jsx";

export const ParentComponent = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [visibleOrganizations, setVisibleOrganizations] = useState([
    { name: "ORGANIZATION A", location: "New York" },
    { name: "ORGANIZATION B", location: "Los Angeles" },
    { name: "ORGANIZATION C", location: "San Francisco" },
    { name: "ORGANIZATION C", location: "San Francisco" },
    { name: "ORGANIZATION D", location: "Chicago" },
    { name: "ORGANIZATION E", location: "Miami" },
    { name: "ORGANIZATION F", location: "Houston" },
  ]);

  // Filter out duplicate organizations based on their name
  const uniqueOrganizations = visibleOrganizations.filter(
    (value, index, self) =>
      index === self.findIndex((org) => org.name === value.name)
  );

  const handleDonateClick = (orgName) => {
    setOrganizationName(orgName); // Set the organization name for the certificate
    setShowCertificate(true); // Show the certificate
    // Remove the organization from the visibleOrganizations list
    setVisibleOrganizations((prevOrganizations) => {
      const updatedOrganizations = prevOrganizations.filter((org) => org.name !== orgName);
      console.log(updatedOrganizations); // Log to check the updated list
      return updatedOrganizations;
    });
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false); // Close the certificate
    setOrganizationName(""); // Clear the organization name
  };

  return (
    <div>
  
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {uniqueOrganizations.map((org, index) => (
          <div key={index} style={{ margin: "16px" }}>
            <Card
              organization={org.name}
              location={org.location}
              onDonate={() => handleDonateClick(org.name)} // Pass the orgName on donate click
            />
          </div>
        ))}
      </div>

      {showCertificate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseCertificate}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "white", padding: "16px", borderRadius: "8px" }}
          >
            <Certificate organizationName={organizationName} />
            <button
              style={{
                marginTop: "16px",
                backgroundColor: "#4caf50",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleCloseCertificate}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
