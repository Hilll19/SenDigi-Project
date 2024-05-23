import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled, { keyframes } from "styled-components";
import Chart from "chart.js/auto";
import "tailwindcss/tailwind.css";

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
  const [appList, setAppList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ShowChartOfDeviceUsage();
    const interval = setInterval(ShowChartOfDeviceUsage, 60000);
    return () => clearInterval(interval);
  }, []);

  const ShowChartOfDeviceUsage = () => {
    fetch(process.env.REACT_APP_API_APPS, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          const apps = data.data.map((app) => ({
            name: app.Name,
            dailyHour: Math.floor(app.TimeUsage / 60),
            dailyMinute: app.TimeUsage % 60,
            icon: app.Icon,
          }));

          apps.sort((a, b) => b.dailyHour - a.dailyHour);

          setAppList(apps);
        } else {
          setAppList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching app data:", error);
        setAppList([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!appList) return;

    const dailyCtx = document.getElementById("dailyChart").getContext("2d");
    const dailyChart = new Chart(dailyCtx, {
      type: "bar",
      data: {
        labels: appList.map((app) => app.name),
        datasets: [
          {
            label: "Daily Usage (hours)",
            data: appList.map((app) => app.dailyHour + app.dailyMinute / 60),
            backgroundColor: "#00df9a",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#fff",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#fff",
            },
            grid: {
              color: "#444",
            },
          },
          x: {
            ticks: {
              color: "#fff",
            },
            grid: {
              color: "#444",
            },
          },
        },
      },
    });

    return () => {
      dailyChart.destroy();
    };
  }, [appList]);

  const renderUsageStatistics = () => {
    if (loading) {
      return <div>Loading data...</div>;
    }

    if (!appList || appList.length === 0) {
      return <div>No app usage data available.</div>;
    }

    return appList.map((app, index) => (
      <AnimatedDiv
        key={index}
        className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 text-white"
      >
        <div className="flex items-center mb-2">
          <div className="mr-2">
            <img src={app.icon} alt={app.name} width="35" />
          </div>
          <h2 className="text-lg font-semibold">{app.name}</h2>
        </div>
        <p>Daily Time: {app.dailyHour} Hour {app.dailyMinute} Minute</p>
      </AnimatedDiv>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-[#00df9a]">
          Application Usage Statistics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">Analyze Data</h2>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-[#00df9a]">Time</h2>
              <div className="mt-4">
                <canvas id="dailyChart"></canvas>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: "500px" }}>
            <h2 className="text-lg font-semibold mb-2 text-white">App Usage</h2>
            {renderUsageStatistics()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeUsage;
