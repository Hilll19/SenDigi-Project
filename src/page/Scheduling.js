import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SchedulingByDates from './SchedulingByDates';
import SchedulingByTime from './SchedulingByTime';

function Scheduling() {
  // State untuk menyimpan pilihan pengguna antara SchedulingByDates atau SchedulingByTime
  const [selectedOption, setSelectedOption] = useState('ByDates');

  // Fungsi untuk mengubah pilihan pengguna
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-white">Lock App Scheduling</h1>
        {/* Dropdown untuk memilih jenis fitur */}
        <div className="mb-4">
          <label htmlFor="scheduling-type" className="block text-sm font-medium text-gray-700">
            Select Scheduling Type:
          </label>
          <select
            id="scheduling-type"
            name="scheduling-type"
            value={selectedOption}
            onChange={handleOptionChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="ByDates">By Dates</option>
            <option value="ByTime">By Time</option>
          </select>
        </div>
        {/* Menampilkan komponen yang dipilih berdasarkan pilihan pengguna */}
        {selectedOption === 'ByDates' ? <SchedulingByDates /> : <SchedulingByTime />}
      </div>
    </div>
  );
}

export default Scheduling;
