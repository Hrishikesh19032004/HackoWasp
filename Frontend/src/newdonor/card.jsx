import React, { useEffect, useState } from "react";
import "./card.css";

export const MyPlugin = ({ onDonate }) => {
  const [foodPosts, setFoodPosts] = useState([]);

  useEffect(() => {
    // Fetch food posts from the backend API
    const fetchFoodPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-posts/all");
        const data = await response.json();

        // Filter out duplicate food posts based on foodName
        const uniquePosts = data.filter(
          (value, index, self) => index === self.findIndex((food) => food.foodName === value.foodName)
        );
        setFoodPosts(uniquePosts);
      } catch (error) {
        console.error("Error fetching food posts:", error);
      }
    };

    fetchFoodPosts();
  }, []);

  return (
    <div id="webcrumbs">
      {foodPosts.length === 0 ? (
        <p>Loading food posts...</p>
      ) : (
        foodPosts.map((post) => (
          <div
            key={post._id}
            style={{
              width: "400px",
              backgroundColor: "#4caf50",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "20px",
                fontWeight: "600",
                color: "#f3f4f6",
                marginBottom: "8px",
              }}
            >
              {post.foodName}
            </h1>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e5e7eb",
                marginBottom: "16px",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  marginRight: "4px",
                  fontSize: "18px",
                  color: "#ffffff",
                }}
              >
                location_on
              </span>
              {post.pickupLocation}
            </p>
            <div
              style={{
                width: "120px",
                height: "80px",
                backgroundColor: "#f3f4f6",
                borderRadius: "12px",
                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  post.photo
                    ? `http://localhost:5000/${post.photo}`
                    : "https://tools-api.webcrumbs.org/image-placeholder/120/80/office/1"
                }
                alt="Food Post"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <p
              style={{
                color: "#f3f4f6",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              Quantity: {post.quantity} {post.category} <br />
              Expiration Date: {new Date(post.expirationDate).toLocaleDateString()} <br />
              Contact: {post.contactDetails}
            </p>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#4caf50",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#4caf50";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.color = "#4caf50";
              }}
              onClick={onDonate}
            >
              Donate Here
            </button>
          </div>
        ))
      )}
    </div>
  );
};
