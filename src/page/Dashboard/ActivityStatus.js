import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

function ActivityStatus() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [activityStatusList, setActivityStatusList] = useState([]);

  useEffect(() => {
    setShowAnimation(true);
    showActivityStatus();
    const interval = setInterval(() => {
      showActivityStatus();
    }, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  

  function showActivityStatus() {
    fetch(process.env.REACT_APP_API_APPS_ACTIVITY_STATUS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const activities = data.data.map((activity) => ({
          id: activity.ID,
          name: activity.Name,
          icon: activity.Icon,
          description: activity.Description.String,
          packageName: activity.PackageName,
          deviceId: activity.DeviceID,
          createdAt: activity.CreatedAt,
        }));

        setActivityStatusList(activities);
      })
      .catch((error) => console.error("Error fetching activity status data:", error));
  }
  // const activities = data.data.map((activity) => ({
  //   name: "YouTube",
  //   description: `[Warning] Attempt to open locked application`,
  //   createdAt: activity.CreatedAt,
  // }));

  const renderActivityStatus = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto max-h-80">
        <ul>
          {activityStatusList.map((activity, index) => (
            <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center">
                <img src="/youtube-icon.png" alt="YouTube" className="h-8 w-8 mr-2 rounded-full" />
                <div className="text-white">
                  <p>{activity.name}</p>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  <p className="text-sm text-gray-400">{new Date(activity.createdAt).toLocaleString()}</p>
                </div>
              </div>
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
          Device Activity Status
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-2">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Activity Status
            </h2>
            {showAnimation && renderActivityStatus()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityStatus;
