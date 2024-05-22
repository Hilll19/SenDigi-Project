import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "../../components/Navbar";
// import DatePicker from "react-multi-date-picker";

const DetailDashboard = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [appList, setAppList] = useState([]);
  const [scheduledApps, setScheduledApps] = useState([]);
  const [scheduledTime, setScheduledTime] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setShowAnimation(true);
    showListOfInstalledApplication();
    fetchScheduledApps();
    const interval = setInterval(showListOfInstalledApplication, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const showListOfInstalledApplication = () => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data === null) {
          setAppList([]);
          setChartData({
            labels: [],
            datasets: [],
          });
          return;
        }
  
        const apps = data.data.map((app) => ({
          name: app.Name,
          locked: app.LockStatus,
          icon: app.Icon,
          timeUsage: app.TimeUsage,
        }));

        apps.sort((a, b) => b.timeUsage - a.timeUsage);

        setAppList(apps);

        const convertedData = apps.map((app) => ({
          icon: app.icon,
          hour: Math.floor(app.timeUsage / 60),
          minute: app.timeUsage % 60,
        }));

        const chartLabels = convertedData.map((app) => ({
          icon: app.icon,
          label: `${app.hour}h ${app.minute}m`,
        }));

        setChartData({
          labels: chartLabels.map((item) => item.label),
          datasets: [
            {
              label: "Time Usage",
              data: chartLabels.map((item) => item.hour),
              fill: false,
              borderColor: "#00df9a",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching app data:", error));
  };

  const fetchScheduledApps = () => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data === null) {
          setScheduledApps([]);
          setScheduledTime([]);
          return;
        }
  
        const apps = data.data.map((app) => ({
          id: app.ID,
          icon: app.Icon,
          name: app.Name,
          packageName: app.PackageName,
          dateLocked: app.DateLocked.String,
          timeStartLocked: app.TimeStartLocked.String,
          timeEndLocked: app.TimeEndLocked.String,
        }));
        setScheduledApps(apps.filter((app) => app.dateLocked));
        setScheduledTime(apps.filter((app) => app.timeStartLocked && app.timeEndLocked));
      })
      .catch((error) => console.error("Error fetching scheduled apps data:", error));
  };

  const renderScheduling = () => {
    if (scheduledApps.length === 0 && scheduledTime.length === 0) {
      return <div className="text-white">Loading data...</div>;
    }
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-64">
        <ul className="list-disc list-inside text-white">
          {scheduledApps.map((scheduledApp, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-800 p-4 rounded-md">
              {scheduledApp.icon && (
                  <img
                    src={scheduledApp.icon}
                    alt={scheduledApp.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <br/>
                <span className="font-semibold text-gray-400">App:</span> {scheduledApp.name}
                <br />
                {scheduledApp.dateLocked && (
                  <>
                    <span className="font-semibold text-gray-400">Dates:</span> {scheduledApp.dateLocked}
                  </>
                )}
                <br />
              </div>
            </li>
          ))}
          {scheduledTime.map((scheduledTime, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-800 p-4 rounded-md">
              {scheduledTime.icon && (
                  <img
                    src={scheduledTime.icon}
                    alt={scheduledTime.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <br/>
                <span className="font-semibold text-gray-400">App:</span> {scheduledTime.name}
                <br />
                {scheduledTime.timeStartLocked && (
                  <>
                    <span className="font-semibold text-gray-400">Start Time:</span> {scheduledTime.timeStartLocked}
                  </>
                )}
                <br />
                {scheduledTime.timeEndLocked && (
                  <>
                    <span className="font-semibold text-gray-400">End Time:</span> {scheduledTime.timeEndLocked}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderLockApp = () => {
    if (appList.length === 0) {
      return <div className="text-white">Loading data...</div>;
    }
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-64">
        <ul className="list-disc list-inside text-white">
          {appList.map((app, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-800 p-4 rounded-md">
                {app.icon && (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <br/>
                <span className="font-semibold text-gray-400">App:</span> {app.name}
                <br />
                <span className="font-semibold text-gray-400">Locked:</span>{" "}
                {app.locked ? "Yes" : "No"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const renderListApp = () => {
    if (appList.length === 0) {
      return <div className="text-white">Loading data...</div>;
    }
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-72">
        <ul className="list-disc list-inside text-white">
          {appList.map((app, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-800 p-4 rounded-md">
                {app.icon && (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-8 w-8 mr-2 rounded-full"
                  />
                )}
                <br/>
                <span className="font-semibold text-gray-400">App:</span> {app.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col flex-grow bg-gray-900 px-6 py-4 md:px-10 md:py-8">
          <div
            className={`grid ${
              window.innerWidth > 768 ? "grid-cols-3" : "grid-cols-1"
            } gap-6`}
          >
            <div className="bg-gray-800 p-6 rounded-lg shadow-md h-68">
              <h2 className="text-xl font-bold mb-4 text-white">Time Usage</h2>
              <Line data={chartData} />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md h-68">
              <h2 className="text-xl font-bold mb-4 text-white">Scheduling</h2>
              {showAnimation && renderScheduling()}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-h-68">
              <h2 className="text-xl font-bold mb-4 text-white">Lock App</h2>
              {showAnimation && renderLockApp()}
            </div>
          </div>
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md max-h-102">
            <h2 className="text-xl font-bold mb-4 text-white">App List</h2>
            {showAnimation && renderListApp()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDashboard;
