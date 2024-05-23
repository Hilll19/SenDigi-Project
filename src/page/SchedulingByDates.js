import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";

const SchedulingByDates = () => {
  const [appList, setAppList] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [scheduledApps, setScheduledApps] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
            dateLocked: app.DateLocked.String,
          }));
          setAppList(apps);
          setScheduledApps(apps.filter((app) => app.dateLocked));
        }
      })
      .catch((error) => console.error("Error fetching app data:", error))
      .finally(() => setLoading(false)); // Set loading to false after fetching data
  }, []);

  const handleAppChange = (event) => {
    setSelectedAppId(event.target.value);
  };

  const SaveState = () => {
    const selectedApp = appList.find((app) => app.id === selectedAppId);
    if (selectedApp && dates.length > 0) {
      const selectedDates = dates.join(", ");
      const updatedAppData = {
        ...selectedApp,
        lockStatus: true,
        dateLocked: selectedDates,
      };
      fetch(process.env.REACT_APP_API_APPS_UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppData),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setScheduledApps([
            ...scheduledApps,
            {
              ...selectedApp,
              dateLocked: selectedDates,
            },
          ]);
          setSelectedAppId("");
          setDates([]);
        })
        .catch((error) =>
          console.error("Error updating lock status:", error.message)
        );
    }
  };

  if (loading) {
    return <div>Loading data...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Lock App by Dates
        </h2>
        <div className="mb-6">
          <label
            htmlFor="app-select"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Select App:
          </label>
          <select
            id="app-select"
            name="app-select"
            value={selectedAppId}
            onChange={handleAppChange}
            className="mt-1 p-3 border rounded-md w-full text-black"
          >
            <option value="">Select App</option>
            {appList.map((app, index) => (
              <option key={index} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6 text-black">
          <label
            htmlFor="dates"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Select Dates:
          </label>
          <DatePicker
            multiple
            format="YYYY-MM-DD"
            value={dates}
            onChange={setDates}
            className="mt-1 p-3 border rounded-md w-full text-black"
          />
        </div>
        <button
          onClick={SaveState}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
        >
          Save Schedule
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          History Scheduling
        </h2>
        <div className="bg-white shadow p-4 rounded-md max-h-96 overflow-y-auto">
          <ul className=" text-black">
            {scheduledApps.map((scheduledApp, index) => (
              <li key={index} className="mb-4">
                <div className="bg-white p-4 rounded-md flex items-center">
                  <img
                    src={scheduledApp.icon}
                    alt={scheduledApp.name}
                    className="w-8 h-8 mr-3"
                  />{" "}
                  {/* Add icon */}
                  <div>
                    <span className="font-semibold text-gray-700">App:</span>{" "}
                    {scheduledApp.name}
                    <br />
                    {scheduledApp.dateLocked && (
                      <>
                        <span className="font-semibold text-gray-700">
                          Dates:
                        </span>{" "}
                        {scheduledApp.dateLocked}
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchedulingByDates;
