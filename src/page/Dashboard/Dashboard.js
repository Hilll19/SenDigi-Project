import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import ProfileDevice from './ProfileDevice';
import TimeUsage from '../TimeUsage';
import LockApp from '../LockApp';
import Scheduling from '../Scheduling';
import DetailDashboard from './DetailDashboard';
import ActivityStatus from './ActivityStatus';
import Notification from './Notification';
import DownloadPage from './DownloadPage';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar activeItem={selectedComponent} setSelectedComponent={setSelectedComponent} />
      <div className="flex flex-col flex-1 bg-white px-6 py-4 md:px-10 md:py-8">
        {selectedComponent === 'Dashboard' && <DetailDashboard setSelectedComponent={setSelectedComponent} />}
        {selectedComponent === 'ProfileDevice' && <ProfileDevice />}
        {selectedComponent === 'TimeUsage' && <TimeUsage />}
        {selectedComponent === 'LockApp' && <LockApp />}
        {selectedComponent === 'Scheduling' && <Scheduling />}
        {selectedComponent === 'ActivityStatus' && <ActivityStatus />}
        {selectedComponent === 'DownloadPage' && <DownloadPage />}
        {selectedComponent === 'Notification' && <Notification />}
      </div>
    </div>
  );
};

export default Dashboard;
