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
import ChildRequest from './page/Dashboard/ChildRequest';


function App() {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<ProfileDetail />} />
        <Route path="/device" element={<ProfileDevice />} />
        <Route path="/usage" element={<DetailUsage />} />
        <Route path="/Time-Usage" element={<TimeUsage />} />
        <Route path="/DetailLock" element={<DetailLock />} />
        <Route path="/Lock-App" element={<LockApp />} />
        <Route path="/DetailScheduling" element={<DetailScheduling />} />
        <Route path="/Scheduling" element={<Scheduling />} />
        <Route path="/SchedulingByDates" element={<SchedulingByDates />} />
        <Route path="/SchedulingByTime" element={<SchedulingByTime />} />
        <Route path="/ActivityStatus" element={<ActivityStatus />} />
        <Route path="/ChildRequest" element={<ChildRequest />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard selectedComponent={selectedComponent} handleComponentChange={handleComponentChange} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
