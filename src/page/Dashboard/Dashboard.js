import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// import Navbar from '../../components/Navbar';
import Sidebar from "../../components/SideBar";

const Dashboard = () => {
  const [appList, setAppList] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    showListOfInstalledApplication();
    const interval = setInterval(showListOfInstalledApplication, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function showListOfInstalledApplication() {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include", // If needed
    })
      .then((response) => response.json())
      .then((data) => {
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
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow px-10 py-4 md:px-20 md:py-10 bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
        <div className={`grid ${window.innerWidth > 768 ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Time Usage</h2>
            <Line data={chartData} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Scheduling</h2>
            {/* Konten untuk Scheduling */}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-96">
            <h2 className="text-xl font-bold mb-4 text-white">Lock App</h2>
            <ul>
              {appList.map((app, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-700"
                >
                  <div className="flex items-center">
                    {app.icon && (
                      <img
                        src={app.icon}
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
        </div>
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-96">
          <h2 className="text-xl font-bold mb-4 text-white">App List</h2>
          <ul>
            {appList.map((app, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div className="flex items-center">
                  {app.icon && (
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="h-8 w-8 mr-2 rounded-full"
                    />
                  )}
                  <span className="text-white">{app.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
