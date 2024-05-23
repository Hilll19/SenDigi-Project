import React from 'react';
import { FaChartLine, FaUser, FaLock, FaHome, FaUniversalAccess, FaBell, FaDownload } from 'react-icons/fa';

const Sidebar = ({ handleMenuClick }) => {
  return (
    <div className="bg-gray-900 w-64 flex flex-col">
      <div className="py-8 px-4 bg-gray-800">
        <h2 className="text-[#00df9a] text-2xl font-bold">Dashboard</h2>
      </div>
      <nav>
        <ul className="mt-4">
          <SidebarItem icon={<FaHome />} text="Dashboard" onClick={() => handleMenuClick('Dashboard')} />
          <SidebarItem icon={<FaUser />} text="Device Information" onClick={() => handleMenuClick('ProfileDevice')} />
          <SidebarItem icon={<FaChartLine />} text="Time Usage" onClick={() => handleMenuClick('TimeUsage')} />
          <SidebarItem icon={<FaLock />} text="Lock Application" onClick={() => handleMenuClick('LockApp')} />
          <SidebarItem icon={<FaChartLine />} text="Schedule Application" onClick={() => handleMenuClick('Scheduling')} />
          <SidebarItem icon={<FaUniversalAccess />} text="Device Activity History" onClick={() => handleMenuClick('ActivityStatus')} />
          <SidebarItem icon={<FaDownload />} text="Download Release" onClick={() => handleMenuClick('DownloadPage')} />
          <SidebarItem icon={<FaBell />} text="Notifications" onClick={() => handleMenuClick('Notification')} />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => {
  return (
    <li className="py-2 hover:bg-gray-800 cursor-pointer">
      <button onClick={onClick} className="text-white flex items-center w-full px-4 py-2">
        {icon}
        <span className="ml-2">{text}</span>
      </button>
    </li>
  );
};

export default Sidebar;
