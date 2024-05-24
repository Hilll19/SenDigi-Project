import React, { useState } from 'react';
import SchedulingByDates from './SchedulingByDates';
import SchedulingByTime from './SchedulingByTime';

function Scheduling() {
  const [selectedOption, setSelectedOption] = useState('ByDates');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto py-10">
        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">
            Lock App Scheduling
          </h1>
          <p className="text-sm mt-1">
            This page allows you to make a schedule on when to lock the
            application.
          </p>
        </div>
        <div className="mb-6 ml-3">
          <label
            htmlFor="scheduling-type"
            className="block text-lg font-medium mb-2"
          >
            Select Scheduling Type:
          </label>
          <select
            id="scheduling-type"
            name="scheduling-type"
            value={selectedOption}
            onChange={handleOptionChange}
            className="block w-[400px] p-3 border border-gray-300 rounded-md bg-white text-black"
          >
            <option value="ByDates">By Dates</option>
            <option value="ByTime">By Time</option>
          </select>
        </div>
        {selectedOption === "ByDates" ? (
          <SchedulingByDates />
        ) : (
          <SchedulingByTime />
        )}
      </div>
    </div>
  );
}

export default Scheduling;
