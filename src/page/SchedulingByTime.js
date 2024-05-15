import React, { useState, useEffect } from 'react';

const SchedulingByTime = () => {
  const [appList, setAppList] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedAppId, setSelectedAppId] = useState('');
  const [scheduledApps, setScheduledApps] = useState([]);

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

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  
  const handleAppChange = (event) => {
    setSelectedAppId(event.target.value);
  };

  const saveScheduleByTime = () => {
    const selectedApp = appList.find((app) => app.id === selectedAppId);

    if (selectedApp && startTime && endTime) {
      const updatedAppData = {
        ...selectedApp,
        lockStatus: true,
        TimeStartLocked: {
          String: startTime,
          Valid: true,
        },
        TimeEndLocked: {
          String: endTime,
          Valid: true,
        },

      };
      console.log(updatedAppData)

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
            startTime,
            endTime,
          }]);
          // Clear the selection
          setSelectedAppId('');
          setStartTime('');
          setEndTime('');
        })
        .catch((error) => {
          console.error('Error updating lock status:', error.message);
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Lock App by Time</h2>
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
            {appList.map((app) => (
              <option key={app.id} value={app.id} style={{ color: '#4b5563' }}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-6">
            <label htmlFor="start-time" className="block text-base font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time:</label>
            <input
              type="time"
              id="start-time"
              name="start-time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ fontFamily: 'Roboto, sans-serif', color: '#4b5563' }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="end-time" className="block text-base font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>End Time:</label>
            <input
              type="time"
              id="end-time"
              name="end-time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ fontFamily: 'Roboto, sans-serif', color: '#4b5563' }}
            />
          </div>
        </div>
        <button
          onClick={saveScheduleByTime}
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
                <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time:</span> {scheduledApp.startTime}
                <br />
                <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>End Time:</span> {scheduledApp.endTime}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SchedulingByTime;