import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled, { keyframes } from "styled-components";
import Chart from "chart.js/auto";

const fadeInUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div`
  animation: 1s ${fadeInUpAnimation};
`;

function TimeUsage() {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    ShowChartOfDeviceUsage();
    const interval = setInterval(ShowChartOfDeviceUsage, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const ShowChartOfDeviceUsage = () => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const apps = data.data.map((app) => ({
          name: app.Name,
          dailyHour: app.TimeUsage / 60,
          icon: app.Icon,
        }));

        apps.sort((a, b) => b.dailyHour - a.dailyHour);

        setAppList(apps);
      })
      .catch((error) => console.error("Error fetching app data:", error));
  };

  useEffect(() => {
    // Initialize daily chart
    const dailyCtx = document.getElementById("dailyChart").getContext("2d");
    const dailyChart = new Chart(dailyCtx, {
      type: "bar",
      data: {
        labels: appList.map((app) => app.name),
        datasets: [
          {
            label: "Daily Usage (hours)",
            data: appList.map((app) => app.dailyHour.toFixed(2)),
            backgroundColor: "blue",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Return a cleanup function to destroy the chart when the component unmounts
    return () => {
      dailyChart.destroy();
    };
  }, [appList]);

  const renderUsageStatistics = () => {
    return appList.map((app, index) => (
      <AnimatedDiv
        key={index}
        className="bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <div className="flex items-center mb-2">
          <div className="mr-2">
            <img src={app.icon} alt={app.name} width="35" />
          </div>
          <h2 className="text-lg font-semibold">{app.name}</h2>
        </div>
        <p>Daily Hour: {app.dailyHour.toFixed(2)}</p>
      </AnimatedDiv>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Application Usage Statistics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Analyze Data
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Time</h2>
              <div className="mt-4">
                <canvas id="dailyChart"></canvas>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto max-h-96">
            <h2 className="text-lg font-semibold mb-2 text-white">App Usage</h2>
            {renderUsageStatistics()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeUsage;
