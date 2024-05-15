import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function LockApp() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    setShowAnimation(true);
    showListOfInstalledApplication();
    const interval = setInterval(showListOfInstalledApplication, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function showListOfInstalledApplication() {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const apps = data.data.map((app) => ({
          name: app.Name,
          locked: app.LockStatus,
          icon: app.Icon,
          timeUsage: app.TimeUsage,
          packageName: app.PackageName,
        }));

        setAppList(apps);
      })
      .catch((error) => console.error("Error fetching app data:", error));
  }

  const handleLockToggle = (packageName, newLockStatus) => {
    const updatedAppList = appList.map((app) =>
      app.packageName === packageName ? { ...app, locked: newLockStatus } : app
    );
    setAppList(updatedAppList);
  
    const appToUpdate = appList.find((app) => app.packageName === packageName);
  
    if (!appToUpdate) {
      console.error(`App with packageName ${packageName} not found.`);
      return;
    }
  
    const updatedAppData = {
      ...appToUpdate,
      lockStatus: newLockStatus,
    };
  
    fetch(`http://localhost:8888/api/apps/update`, {
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
  

      })
      .catch((error) => {
        console.error("Error updating lock status:", error.message);
  
        const revertedAppList = appList.map((app) =>
          app.packageName === packageName ? { ...app, locked: !newLockStatus } : app
        );
        setAppList(revertedAppList);
      });
  };
  
  const renderUsageStatistics = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto max-h-80">
        <ul>
          {appList.map((app, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-700"
            >
              <div className="flex items-center">
                {app.icon && (
                  <img
                    src={`data:image/png;base64, ${app.icon}`}
                    alt={app.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <span className="text-white">{app.name}</span>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  app.locked ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderAppList = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto max-h-80">
        <ul>
          {appList.map((app, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-700"
            >
              <div className="flex items-center">
                {app.icon && (
                  <img
                    src={`data:image/png;base64, ${app.icon}`}
                    alt={app.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <span className="text-white">{app.name}</span>
              </div>
              <button
                className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                  app.locked
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                onClick={() => handleLockToggle(app.packageName, !app.locked)}
              >
                {app.locked ? "Unlock" : "Lock"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Monitor Lock App System
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">Lock App</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              {showAnimation && renderAppList()}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">
              App Status
            </h2>
            {showAnimation && renderUsageStatistics()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockApp;
