import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

function ActivityStatus() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [activityStatusList, setActivityStatusList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowAnimation(true);
    showActivityStatus();
    const interval = setInterval(() => {
      showActivityStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="bg-gray-200 p-4 rounded-lg shadow-md overflow-y-auto max-h-96">
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
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-10 text-center text-[#00df9a]">
          Device Activity Status
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {showAnimation && renderActivityStatus()}
        </div>
      </div>
    </div>
  );
}

export default ActivityStatus;
