import React from 'react';

const CitySelector = ({ selectedCity, onCityChange }) => {
  return (
    <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Kolkata">Kolkata</option>
    </select>
  );
};

export default CitySelector;