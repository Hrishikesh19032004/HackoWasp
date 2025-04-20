import React, { useEffect, useState } from "react";
import "./leaderboard.css";

export const Leaderboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the donors data from the backend API
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donors/sorted");
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Sort the donors by points in descending order
  const sortedDonors = donors.sort((a, b) => b.points - a.points);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="webcrumbs">
      <div className="w-screen h-screen bg-white shadow-lg rounded-lg p-6">
        <h1 className="font-title text-2xl text-neutral-950 mb-4 text-center">
          Leaderboard - Top Donors
        </h1>
        <div className="flex flex-col gap-4">
          {sortedDonors.map((donor, index) => (
            <div
              className="flex items-center justify-between bg-[#98FB98] p-4 rounded-md"
              key={index}
            >
              <div className="flex items-center gap-3">
                {/* <img
                  src={donor.avatar}
                  alt="Avatar"
                  className="w-[50px] h-[50px] rounded-full object-contain"
                /> */}
                <div>
                  <p className="text-neutral-950 font-medium">{donor.name}</p>
                  <p className="text-neutral-700 text-sm">
                    Current Points: {donor.points}
                  </p>
                </div>
              </div>
              <p className="text-neutral-950 font-bold">#{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
