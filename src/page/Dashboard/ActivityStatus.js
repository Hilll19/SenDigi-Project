import React, { useState, useEffect } from "react";

function ActivityStatus({ refreshInterval }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [activityStatusList, setActivityStatusList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowAnimation(true);
    showActivityStatus();
    const interval = setInterval(() => {
      showActivityStatus();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  function showActivityStatus() {
    fetch(process.env.REACT_APP_API_APPS_ACTIVITY_STATUS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
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
        } else {
          setActivityStatusList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching activity status data:", error);
        setLoading(false);
      });
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZone: 'Asia/Jakarta' 
    };
    const formattedDate = date.toLocaleDateString('id-ID', options);
    const time = date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZone: 'Asia/Jakarta' 
    });
    return `${formattedDate} pukul ${time} WIB`;
  };

  const renderActivityStatus = () => {
    if (loading) {
      return <p>Loading data...</p>;
    }

    if (activityStatusList.length === 0) {
      return <p>No activities found.</p>;
    }

    return (
      <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-[36rem]">
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
                {formatDateTime(activity.createdAt)}
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
    <div className="bg-white min-h-screen">
      <div className="container mx-auto mt-10 px-4">
        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center">
            Device Activity History
          </h1>
          <p className="mt-1 text-center max-w-4xl">
            This page shows logs of your device's app activity for 24 hours,
            allowing you to analyze your child's usage before the data is
            automatically deleted to maintain privacy.
          </p>
        </div>

          {showAnimation && renderActivityStatus()}
      </div>
    </div>
  );
}

export default ActivityStatus;
