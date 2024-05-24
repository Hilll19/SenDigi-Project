import React from 'react';

const RefreshInterval = ({refreshInterval, setRefreshInterval}) => {
  const handleIntervalChange = (e) => {
    setRefreshInterval(parseInt(e.target.value));
  };

  return (
    <div className="px-2">
      <div className="flex items-center">
        <select
          value={refreshInterval}
          onChange={handleIntervalChange}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          <option disabled>Refresh Time</option>
          <option value={1 * 1000}>1 Second</option>
          <option value={5 * 1000}>5 Seconds</option>
          <option value={10 * 1000}>10 Seconds</option>
          <option value={30 * 1000}>30 Seconds</option>
          <option value={60 * 1000}>1 Minute</option>
          <option value={5 * 60 * 1000}>5 Minutes</option>
        </select>
      </div>
    </div>
  );
};

export default RefreshInterval;