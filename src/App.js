import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProfileDetail from './page/ProfileDetail';
import TimeUsage from './page/TimeUsage';
import LockApp from './page/LockApp';
import LoginPage from './page/LoginPage';
import Dashboard from './page/Dashboard/Dashboard';
import SchedulingByTime from './page/SchedulingByTime';
import Scheduling from './page/Scheduling';
import SchedulingByDates from './page/SchedulingByDates';
import DetailUsage from './page/DetailUsage';
import DetailLock from './page/DetailLock';
import DetailScheduling from './page/DetailScheduling';
import ProfileDevice from './page/Dashboard/ProfileDevice';
import ActivityStatus from './page/Dashboard/ActivityStatus';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard'); // Default to Dashboard

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile-Detail" element={<ProfileDetail />} />
        <Route path="/ProfileDevice" element={<ProfileDevice />} />
        <Route path="/DetailUsage" element={<DetailUsage />} />
        <Route path="/Time-Usage" element={<TimeUsage />} />
        <Route path="/DetailLock" element={<DetailLock />} />
        <Route path="/Lock-App" element={<LockApp />} />
        <Route path="/DetailScheduling" element={<DetailScheduling />} />
        <Route path="/Scheduling" element={<Scheduling />} />
        <Route path="/SchedulingByDates" element={<SchedulingByDates />} />
        <Route path="/SchedulingByTime" element={<SchedulingByTime />} />
        <Route path="/ActivityStatus" element={<ActivityStatus />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route
          path="/Dashboard"
          element={<Dashboard selectedComponent={selectedComponent} handleComponentChange={handleComponentChange} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
