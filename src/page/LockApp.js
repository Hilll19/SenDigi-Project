import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import styled, { keyframes } from "styled-components"; 

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

const lockedAndUnlockedApps = [
  { name: "Facebook", locked: true },
  { name: "Instagram", locked: false },
  { name: "Twitter", locked: true },
  { name: "LinkedIn", locked: false },
  // Add more app data as needed
];

function LockApp() {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
      setShowAnimation(true);
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

    const renderUsageStatistics = () => {
      return lockedAndUnlockedApps.map((app, index) => (
        <AnimatedDiv
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="mr-2">{selectIcon(app.name)}</div>
            <h2 className="text-lg font-semibold">{app.name}</h2>
          </div>
          <p>Status: {app.locked ? "Locked" : "Unlocked"}</p>
        </AnimatedDiv>
      ));
    };

    return (
      <div>
        <Navbar />
        <div className="container mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Monitor Lock App System
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Analyze Data</h2>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <h2 className="text-lg font-semibold mb-2">App Lock</h2>
              {showAnimation && renderUsageStatistics()}
            </div>
          </div>
        </div>
      </div>
    );
}

export default LockApp;
