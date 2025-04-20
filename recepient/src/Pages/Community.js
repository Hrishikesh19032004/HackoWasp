import React, { useEffect } from 'react';

const Community = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3002';
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div></div>
  );
}

export default Community;
