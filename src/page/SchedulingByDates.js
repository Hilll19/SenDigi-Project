import React, { useState, useEffect } from 'react';
import DatePicker from "react-multi-date-picker";

const SchedulingByDates = () => {
  // State untuk menyimpan daftar aplikasi
  const [appList, setAppList] = useState([]);
  // State untuk menyimpan id aplikasi yang dipilih
  const [selectedAppId, setSelectedAppId] = useState('');
  // State untuk menyimpan daftar aplikasi yang telah dijadwalkan beserta jadwalnya
  const [scheduledApps, setScheduledApps] = useState([]);
  // State untuk menyimpan tanggal yang dipilih
  const [dates, setDates] = useState([]);

  // Fetch data aplikasi dari endpoint
  useEffect(() => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const apps = data.data.map((app) => ({
          id: app.ID,
          name: app.Name,
          packageName: app.PackageName,
        }));
        setAppList(apps);
      })
      .catch((error) => console.error("Error fetching app data:", error));
  }, []);

  // Fungsi untuk menyimpan id aplikasi yang dipilih
  const handleAppChange = (event) => {
    setSelectedAppId(event.target.value);
  };

  // Fungsi untuk menyimpan pengaturan waktu dan aplikasi yang dipilih
  const saveScheduleByDates = () => {
    const selectedApp = appList.find((app) => app.id === selectedAppId);

    if (selectedApp && dates.length > 0) {
      const selectedDates = dates.join(", ");

      const updatedAppData = {
        ...selectedApp,
        lockStatus: true,
        dateLocked: selectedDates,
      };

      fetch(process.env.REACT_APP_API_APPS_UPDATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppData),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success by adding the app to the scheduledApps list
          setScheduledApps([...scheduledApps, {
            app: selectedApp.name,
            dates: selectedDates,
          }]);
          // Clear the selection
          setSelectedAppId('');
          setDates([]);
        })
        .catch((error) => {
          console.error('Error updating lock status:', error.message);
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Lock App by Dates</h2>
        <div className="mb-6">
          <label htmlFor="app-select" className="block text-base font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Select App:</label>
          <select
            id="app-select"
            name="app-select"
            value={selectedAppId}
            onChange={handleAppChange}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#4b5563' }}
          >
            <option value="" style={{ color: '#4b5563' }}>Select App</option>
            {appList.map((app, index) => (
              <option key={index} value={app.id} style={{ color: '#4b5563' }}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="dates" className="block text-base font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Select Dates:</label>
          <DatePicker
            multiple
            format="YYYY-MM-DD"
            value={dates}
            onChange={setDates}
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#4b5563' }}
          />
        </div>
        <button
          onClick={saveScheduleByDates}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Save Schedule
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>History Scheduling</h2>
        <ul className="list-disc list-inside">
          {scheduledApps.map((scheduledApp, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>App:</span> {scheduledApp.app}
                <br />
                <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Dates:</span> {scheduledApp.dates}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SchedulingByDates;
