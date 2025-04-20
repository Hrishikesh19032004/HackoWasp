import React from "react";
import "./donationCard.css";
export const MyPlugin = ({ foodName, quantity, location, imageUrl, onDonate }) => {
	return (
	  <div id="webcrumbs"> 
		<div className="w-[300px] bg-green-500 text-white rounded-lg shadow p-4 flex flex-col items-center gap-2">
		  {imageUrl && (
			<img
			  src={imageUrl}
			  alt="Food Dish"
			  className="w-[200px] h-[150px] object-cover rounded-md"
			/>
		  )}
		  {!imageUrl && (
			<p className="text-sm text-red-500">No image available</p> // Optionally, show a message when no image is provided
		  )}
		  <h2 className="text-lg font-bold font-title">{foodName}</h2>
		  <span className="text-sm font-medium mt-[-4px]">Quantity : {quantity}</span>
		  <div className="flex items-center gap-1 text-sm">
			<span className="material-symbols-outlined text-white">location_on</span>
			<span>{location}</span>
		  </div>
		  <button
			onClick={onDonate}
			className="bg-white text-green-500 py-2 px-4 rounded-md font-medium transition hover:bg-green-100"
		  >
			Apply
		  </button>
		</div> 
	  </div>
	);
  };
  