import React, { useState, useEffect } from 'react';

const SchedulingByTime = () => {
  const [appList, setAppList] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedAppId, setSelectedAppId] = useState('');
  const [scheduledApps, setScheduledApps] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk indikator loading

  useEffect(() => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          const apps = data.data.map((app) => ({
            id: app.ID,
            name: app.Name,
            packageName: app.PackageName,
            timeStartLocked: app.TimeStartLocked.String,
            timeEndLocked: app.TimeEndLocked.String,
          }));
          setAppList(apps);
          setScheduledApps(apps.filter(app => app.timeStartLocked && app.timeEndLocked));
        } else {
          throw new Error('Data is null');
        }
      })
      .catch((error) => {
        console.error("Error fetching app data:", error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      });
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
          // Handle success by adding the app to the scheduledApps list
          setScheduledApps([...scheduledApps, {
            name: selectedApp.name,
            timeStartLocked: startTime,
            timeEndLocked: endTime,
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

  // Jika loading, tampilkan pesan loading
  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Lock App by Time</h2>
        {/* Sisipkan kode render lain di sini */}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>History Scheduling</h2>
        {/* Sisipkan kode render lain di sini */}
      </div>
    </div>
  );
};

export default SchedulingByTime;
