import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import styled, { keyframes } from "styled-components"; // Tambahkan import ini
import Chart from "chart.js/auto"; 

// Animasi fadeInUp
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

const usageStatistics = [
  { name: "Facebook", dailyHour: 2.5 },
  { name: "Instagram", dailyHour: 1.8 },
  { name: "Twitter", dailyHour: 3.2 },
  { name: "Twitter", dailyHour: 3.2 },
  { name: "Twitter", dailyHour: 3.2 },
  // Add more app data as needed
];

function TimeUsage() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);

    // Initialize daily chart
    const dailyCtx = document.getElementById("dailyChart").getContext("2d");
    const dailyChart = new Chart(dailyCtx, {
      type: "bar",
      data: {
        labels: usageStatistics.map((app) => app.name),
        datasets: [
          {
            label: "Daily Usage (hours)",
            data: usageStatistics.map((app) => app.dailyHour),
            backgroundColor: ["red", "blue", "green"], // Add colors as needed
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
  }, []);

  const selectIcon = (appName) => {
    switch (appName) {
      case "Facebook":
        return <FaFacebookSquare size={35} />;
      case "Instagram":
        return <FaInstagram size={35} />;
      case "Twitter":
        return <FaTwitterSquare size={35} />;
      default:
        return null;
    }
  };

  const calculateDailySummary = (usageData) => {
    const totalDailyHours = usageData.reduce(
      (acc, curr) => acc + curr.dailyHour,
      0
    );
    return totalDailyHours.toFixed(2);
  };

  const calculateWeeklySummary = (usageData) => {
    const totalWeeklyHours = calculateDailySummary(usageData) * 7;
    return totalWeeklyHours.toFixed(2);
  };

  const calculateMonthlySummary = (usageData) => {
    const totalMonthlyHours = calculateDailySummary(usageData) * 30;
    return totalMonthlyHours.toFixed(2);
  };

  const renderUsageStatistics = () => {
    return usageStatistics.map((app, index) => (
      <AnimatedDiv
        key={index}
        className="bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <div className="flex items-center mb-2">
          <div className="mr-2">{selectIcon(app.name)}</div>
          <h2 className="text-lg font-semibold">{app.name}</h2>
        </div>
        <p>Daily Hour: {app.dailyHour}</p>
      </AnimatedDiv>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-white">
        Application Usage Statistics
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Analyze Data</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Time</h2>
              {/* Tampilkan summary analisis time usage */}
              <p>Daily Summary: {calculateDailySummary(usageStatistics)}</p>
              <p>Weekly Summary: {calculateWeeklySummary(usageStatistics)}</p>
              <p>Monthly Summary: {calculateMonthlySummary(usageStatistics)}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <canvas id="dailyChart"></canvas>
                {/* Add canvas for weekly chart */}
                <canvas id="weeklyChart"></canvas>
                {/* Add canvas for monthly chart */}
                <canvas id="monthlyChart"></canvas>
              </div>
            </div>
          </div>
          <div
            className="bg-white p-4 rounded-lg shadow-md"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <h2 className="text-lg font-semibold mb-2">App Usage</h2>
            {showAnimation && renderUsageStatistics()}
          </div>
        </div>
        {/* Add canvas elements for weekly and monthly charts */}
      </div>
    </div>
  );
}

export default TimeUsage;
