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
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8888/api/apps", {
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

        // Sort the apps based on timeUsage in descending order
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

  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-col flex-1 md:flex-row">
        <Sidebar />
        <div className="flex-grow p-4 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Time Usage</h2>
              <Line data={chartData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Scheduling</h2>
              {/* <Line data={chartData} /> */}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto max-h-60">
              <h2 className="text-xl font-bold mb-4">Lock App</h2>
              <ul>
                {appList.map((app, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      {app.icon && (
                        <img
                          src={`data:image/png;base64, ${app.icon}`}
                          alt={app.name}
                          className="h-8 w-8 mr-2"
                        />
                      )}
                      <span>{app.name}</span>
                    </div>
                    <div>
                      {app.locked ? (
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">App List</h2>
            <div className="overflow-y-auto max-h-96 overflow-x-hidden">
              <ul>
                {appList.map((app, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      {app.icon && (
                        <img
                          src={`data:image/png;base64, ${app.icon}`}
                          alt={app.name}
                          className="h-8 w-8 mr-2"
                        />
                      )}
                      <span>{app.name}</span>
                    </div>
                    <div>
                      <div
                        className={`w-3 h-3 rounded-full bg-white transform transition-transform duration-300 ease-in-out ${
                          app.locked ? "" : "translate-x-full"
                        }`}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
