// Dashboard.jsx

import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import ProfileDevice from './ProfileDevice';
import TimeUsage from '../TimeUsage';
import LockApp from '../LockApp';
import Scheduling from '../Scheduling';
import DetailDasboard from './DetailDashboard';
import ActivityStatus from './ActivityStatus';
import Notification from './Notification';
import TestUI from './TestUI';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar handleMenuClick={setSelectedComponent} />
      <div className="flex flex-col flex-1 bg-gray-900 px-6 py-4 md:px-10 md:py-8 min-h-screen">
        {selectedComponent === 'Dashboard' && <DetailDasboard />}
        {selectedComponent === 'ProfileDevice' && <ProfileDevice />}
        {selectedComponent === 'TimeUsage' && <TimeUsage />}
        {selectedComponent === 'LockApp' && <LockApp />}
        {selectedComponent === 'Scheduling' && <Scheduling />}
        {selectedComponent === 'ActivityStatus' && <ActivityStatus />}
        {selectedComponent === 'Notification' && <Notification />}
        {selectedComponent === 'TestUI' && <TestUI />}
      </div>
    </div>
  );
};

export default Dashboard;
