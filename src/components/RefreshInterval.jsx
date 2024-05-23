import React, { useState } from 'react';

const RefreshInterval = () => {
  const [interval, setInterval] = useState(10); // Default interval adalah 10 detik

  const handleIntervalChange = (e) => {
    setInterval(parseInt(e.target.value));
  };

  return (
    <div className="mb-4 ml-8 mt-4">
      <div className="flex items-center">
        <select
          value={interval}
          onChange={handleIntervalChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={1} disabled>Refresh Time</option>
          <option value={1}>1 Second</option>
          <option value={5}>5 Seconds</option>
          <option value={10}>10 Seconds</option>
          <option value={30}>30 Seconds</option>
          <option value={60}>1 Minute</option>
          <option value={300}>5 Minutes</option>
        </select>
      </div>
    </div>
  );
};

export default RefreshInterval;