import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SchedulingByTime = () => {
  const [appList, setAppList] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedAppId, setSelectedAppId] = useState('');
  const [scheduledApps, setScheduledApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const apps = data.data.map((app) => ({
            id: app.ID,
            name: app.Name,
            icon: app.Icon,
            packageName: app.PackageName,
            timeStartLocked: app.TimeStartLocked.String,
            timeEndLocked: app.TimeEndLocked.String,
          }));
          setAppList(apps);
          setScheduledApps(apps.filter(app => app.timeStartLocked && app.timeEndLocked));
        }
      })
      .catch((error) => console.error("Error fetching app data:", error))
      .finally(() => setLoading(false));
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

  const SaveState = () => {
    const selectedApp = appList.find((app) => app.id === selectedAppId);

    if (selectedApp && startTime && endTime) {
      const updatedAppData = {
        ...selectedApp,
        lockStatus: true,
        timeStartLocked: startTime,
        timeEndLocked: endTime,
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
          setScheduledApps([...scheduledApps, {
            ...selectedApp,
            timeStartLocked: startTime,
            timeEndLocked: endTime,
          }]);
          setSelectedAppId('');
          setStartTime('');
          setEndTime('');
        })
        .catch((error) => {
          console.error('Error updating lock status:', error.message);
        });
    }
  };

  const deleteScheduledApp = (appId) => {
    const appToDelete = scheduledApps.find((app) => app.id === appId);
    if (appToDelete) {
      const updatedAppData = {
        ...appToDelete,
        lockStatus: false,
        timeStartLocked: '',
        timeEndLocked: '',
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
          setScheduledApps(scheduledApps.filter((app) => app.id !== appId));
        })
        .catch((error) => {
          console.error('Error deleting lock status:', error.message);
        });
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

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
            <label htmlFor="start-time" className="block text-base font-medium text-gray-700 mb-2"style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time:</label>
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
          onClick={SaveState}
          className="bg-[#0197b2] text-white px-6 py-3 rounded-md hover:bg-[#0197b2] transition-colors font-semibold"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Save Schedule
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>History Scheduling</h2>
        <div className="bg-white shadow p-4 rounded-md max-h-96 overflow-y-auto">
          <ul className="list-disc list-inside text-black">
          {scheduledApps.map((scheduledApp, index) => (
              <li key={index} className="mb-4 flex items-center">
                <img
                  src={scheduledApp.icon}
                  alt={scheduledApp.name}
                  className="w-8 h-8 mr-3"
                />
                <div className="flex-grow">
                  <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>App:</span> {scheduledApp.name}
                  <br />
                  <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Time:</span> {scheduledApp.timeStartLocked}
                  <br />
                  <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>End Time:</span> {scheduledApp.timeEndLocked}
                </div>
                <button
                  onClick={() => deleteScheduledApp(scheduledApp.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchedulingByTime;
