import React, { useState } from 'react';
// import Navbar from '../components/Navbar';

const SchedulingByTime = () => {
  // Dummy data untuk daftar aplikasi
  const [appList] = useState([
    { id: 1, name: 'WhatsApp' },
    { id: 2, name: 'Instagram' },
    { id: 3, name: 'Facebook' },
    // Tambahkan data aplikasi lainnya sesuai kebutuhan
  ]);

  // State untuk menyimpan waktu mulai dan selesai
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  // State untuk menyimpan id aplikasi yang dipilih
  const [selectedAppId, setSelectedAppId] = useState('');
  // State untuk menyimpan daftar aplikasi yang telah dijadwalkan beserta jadwalnya
  const [scheduledApps, setScheduledApps] = useState([]);

  // Fungsi untuk menyimpan waktu mulai yang diinput oleh pengguna
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Fungsi untuk menyimpan waktu selesai yang diinput oleh pengguna
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Fungsi untuk menyimpan id aplikasi yang dipilih
  const handleAppChange = (event) => {
    setSelectedAppId(event.target.value);
  };

  // Fungsi untuk menyimpan pengaturan waktu dan aplikasi yang dipilih
  const saveSchedule = () => {
    // Lakukan sesuatu dengan waktu mulai, waktu selesai, dan id aplikasi yang dipilih, seperti menyimpan data ke backend
    console.log('Selected App Id:', selectedAppId);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    // Temukan aplikasi yang dipilih berdasarkan id
    const selectedApp = appList.find((app) => app.id === parseInt(selectedAppId));
    if (selectedApp) {
      // Tambahkan aplikasi yang dijadwalkan beserta jadwalnya ke dalam daftar scheduledApps
      setScheduledApps([...scheduledApps, { app: selectedApp.name, startTime, endTime }]);
      // Reset nilai input setelah disimpan
      setStartTime('');
      setEndTime('');
      setSelectedAppId('');
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-white">Lock App Scheduling</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Lock App by Time</h2>
            <div className="mb-4">
              <label htmlFor="app-select" className="block text-sm font-medium text-gray-700">Select App:</label>
              <select
                id="app-select"
                name="app-select"
                value={selectedAppId}
                onChange={handleAppChange}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="">Select App</option>
                {appList.map((app) => (
                  <option key={app.id} value={app.id}>{app.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time:</label>
              <input
                type="time"
                id="start-time"
                name="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time:</label>
              <input
                type="time"
                id="end-time"
                name="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <button
              onClick={saveSchedule}
              className="bg-[#00df9a] text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Save Schedule
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-2">Scheduled Apps</h2>
            <ul>
              {scheduledApps.map((scheduledApp, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">App:</span> {scheduledApp.app}, <span className="font-semibold">Start Time:</span> {scheduledApp.startTime}, <span className="font-semibold">End Time:</span> {scheduledApp.endTime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingByTime;