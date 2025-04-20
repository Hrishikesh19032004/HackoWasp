import React from 'react';

const ImpactDetails = ({ city }) => {
  return (
    <div>
      <h2>Environmental Impact in {city}</h2>
      <p>Details about how food wastage affects the environment in {city}.</p>
      {/* Add environmental impact content */}
    </div>
  );
};

export default ImpactDetails;