import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
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
  { name: "Facebook", locked: false, unlockCount: 0, lockCount: 0 },
  { name: "Instagram", locked: false, unlockCount: 0, lockCount: 0 },
  { name: "Twitter", locked: false, unlockCount: 0, lockCount: 0 },
  { name: "LinkedIn", locked: false, unlockCount: 0, lockCount: 0 },
  // Add more app data as needed
];

function LockApp() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [appStatus, setAppStatus] = useState([...lockedAndUnlockedApps]);
  const [totalUnlockCount, setTotalUnlockCount] = useState(0);
  const [totalLockCount, setTotalLockCount] = useState(0);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    // Calculate total unlock and lock count when appStatus changes
    let unlockCount = 0;
    let lockCount = 0;
    appStatus.forEach((app) => {
      unlockCount += app.unlockCount;
      lockCount += app.lockCount;
    });
    setTotalUnlockCount(unlockCount);
    setTotalLockCount(lockCount);
  }, [appStatus]);

  const toggleAppLock = (appName) => {
    const updatedStatus = appStatus.map((app) => {
      if (app.name === appName) {
        if (app.locked) {
          app.lockCount++;
        } else {
          app.unlockCount++;
        }
        return { ...app, locked: !app.locked };
      }
      return app;
    });
    setAppStatus(updatedStatus);
  };

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
    const appStats = appStatus.map((app, index) => (
      <AnimatedDiv
        key={index}
        className="bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="mr-2">{selectIcon(app.name)}</div>
            <h2 className="text-lg font-semibold">{app.name}</h2>
          </div>
          <div>
            {app.locked ? (
              <FaLock
                size={20}
                onClick={() => toggleAppLock(app.name)}
                className="cursor-pointer text-red-500 mr-2"
              />
            ) : (
              <FaUnlock
                size={20}
                onClick={() => toggleAppLock(app.name)}
                className="cursor-pointer text-green-500 mr-2"
              />
            )}
          </div>
        </div>
        <p>Status: {app.locked ? "Locked" : "Unlocked"}</p>
        <p>Unlock count: {app.unlockCount}</p>
        <p>Lock count: {app.lockCount}</p>
      </AnimatedDiv>
    ));

    return (
      <>
        {appStats}
        {/* <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Total Usage Statistics</h2>
          <p>Total Unlock count: {totalUnlockCount}</p>
          <p>Total Lock count: {totalLockCount}</p>
        </div> */}
      </>
    );
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
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold">Total Usage Statistics</h2>
              <p>Total Unlock count: {totalUnlockCount}</p>
              <p>Total Lock count: {totalLockCount}</p>
            </div>
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
