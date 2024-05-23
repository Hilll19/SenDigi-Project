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

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
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
            dailyHour: convertToHourMinute(app.TimeUsage)[0].toFixed(0),
            dailyMinute: convertToHourMinute(app.TimeUsage)[1],
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
            label: "Daily Usage (minutes)",
            data: appList.map((app) => convertToMinutes(app.dailyHour, app.dailyMinute)),
            backgroundColor: "#0197b2",
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
              color: "#000",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#F3F4F6",
            },
          },
          x: {
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#F3F4F6",
            },
          },
        },
      },
      plugins: [
        {
          id: "draw-icon",
          afterDraw: (chart) => {
            const {
              ctx,
              scales: { x },
            } = chart;

            ctx.save();

            const apps = appList.sort((a, b) => b.dailyHour - a.dailyHour);
            apps.map((app, index) => {
              const label = new Image();
              label.src = app.icon;
              const width = 30;

              ctx.drawImage(
                label,
                x.getPixelForValue(index) - width / 2,
                x.top - width / 2,
                width,
                width
              );
            });
          },
        },
      ],
    });

    return () => {
      dailyChart.destroy();
    };
  }, [appList]);

  function convertToHourMinute(time) {
    const hour = time / 60;
    const minute = time % 60;
    return [hour, minute];
  }

  function convertToMinutes(hours, minutes) {
    return (hours * 60 + minutes).toString();
  }

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
        className="bg-white p-4 rounded-lg shadow-lg mb-4 text-black"
      >
        <div className="flex items-center mb-2">
          <div className="mr-2">
            <img src={app.icon} alt={app.name} width="40" />
          </div>
          <h2 className="text-lg font-semibold">{app.name}</h2>
        </div>
        <p>
          Daily Time: {app.dailyHour} Hour {app.dailyMinute} Minute
        </p>
      </AnimatedDiv>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto mt-6 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Application Usage Statistics
        </h1>

        <div className="w-full flex-col flex gap-8">
          {/* Bagian chart */}
          <div className="px-4 py-6 rounded-lg shadow-lg">
            <h3 className="text-base font-bold mb-2 text-[#0197b2]">
              Time (Minutes)
            </h3>
            <div className="mt-4">
              <canvas id="dailyChart"></canvas>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-black">App Usage</h2>
            <ScrollContainer>{renderUsageStatistics()}</ScrollContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeUsage;
