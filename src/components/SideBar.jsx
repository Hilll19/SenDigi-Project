// Sidebar.jsx

import React from 'react';
import { FaChartLine, FaUser, FaLock, FaHome } from 'react-icons/fa';

const Sidebar = ({ handleMenuClick }) => {
  return (
    <div className="bg-gray-900 md:h-screen w-64 flex flex-col">
      <div className="py-8 px-4 bg-gray-800">
        <h2 className="text-[#00df9a] text-2xl font-bold ml-10">Dashboard</h2>
      </div>
      <ul>
        <SidebarItem
          icon={<FaHome />}
          text="Dashboard"
          onClick={() => handleMenuClick('Dashboard')}
        />
        <SidebarItem
          icon={<FaUser />}
          text="Profile Device"
          onClick={() => handleMenuClick('ProfileDevice')}
        />
        <SidebarItem
          icon={<FaChartLine />}
          text="Time Usage"
          onClick={() => handleMenuClick('TimeUsage')}
        />
        <SidebarItem
          icon={<FaLock />}
          text="Lock App"
          onClick={() => handleMenuClick('LockApp')}
        />
        <SidebarItem
          icon={<FaChartLine />}
          text="Scheduling"
          onClick={() => handleMenuClick('Scheduling')}
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => {
  return (
    <li className="py-2">
      <button onClick={onClick} className="text-white flex items-center px-4 py-2 hover:bg-gray-800 transition duration-300">
        {icon}
        <span className="ml-2">{text}</span>
      </button>
    </li>
  );
};

export default Sidebar;
