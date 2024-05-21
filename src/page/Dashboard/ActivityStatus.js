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

  const renderActivityStatus = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto max-h-80">
        <ul>
          {activityStatusList.map((activity, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-md mb-4 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                {activity.description}
              </h2>
              <div className="flex items-center">
                {activity.icon && (
                  <img
                    src={activity.icon}
                    alt={activity.name}
                    className="h-8 w-8 mr-2"
                  />
                )}
                <span>{activity.name}</span>
              </div>
              <p className="mt-2">
                {new Date(activity.createdAt).toLocaleDateString()}{" "}
                {new Date(activity.createdAt).toLocaleTimeString()}
              </p>
              <p className="mt-2 bg-yellow-200 p-2 rounded-md font-semibold">
                Device ID: {activity.deviceId}
              </p>
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
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {showAnimation && renderActivityStatus()}
        </div>
      </div>
    </div>
  );
}

export default ActivityStatus;
