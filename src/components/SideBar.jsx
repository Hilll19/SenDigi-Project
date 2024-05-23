import { FaChartLine, FaUser, FaLock, FaHome, FaUniversalAccess, FaBell, FaDownload } from 'react-icons/fa';
import RefreshInterval from './RefreshInterval';

const Sidebar = ({ handleMenuClick, activeItem, setSelectedComponent }) => {
  const handleItemClick = (item) => {
    setSelectedComponent(item);
  };

  return (
    <div className="bg-gray-900 w-64 flex flex-col min-h-screen">
      <div className="py-8 px-4 bg-gray-800">
        <h2 className="text-[#00df9a] text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="flex-grow">
        <ul className="mt-4">
          <SidebarItem 
            icon={<FaHome />} 
            text="Dashboard" 
            active={activeItem === 'Dashboard'} 
            onClick={() => handleItemClick('Dashboard')} 
          />
          <SidebarItem 
            icon={<FaUser />} 
            text="Device Information" 
            active={activeItem === 'ProfileDevice'} 
            onClick={() => handleItemClick('ProfileDevice')} 
          />
          <SidebarItem 
            icon={<FaChartLine />} 
            text="Time Usage" 
            active={activeItem === 'TimeUsage'} 
            onClick={() => handleItemClick('TimeUsage')} 
          />
          <SidebarItem 
            icon={<FaLock />} 
            text="Lock Application" 
            active={activeItem === 'LockApp'} 
            onClick={() => handleItemClick('LockApp')} 
          />
          <SidebarItem 
            icon={<FaChartLine />} 
            text="Schedule Application" 
            active={activeItem === 'Scheduling'} 
            onClick={() => handleItemClick('Scheduling')} 
          />
          <SidebarItem 
            icon={<FaUniversalAccess />} 
            text="Device Activity History" 
            active={activeItem === 'ActivityStatus'} 
            onClick={() => handleItemClick('ActivityStatus')} 
          />
          <SidebarItem 
            icon={<FaDownload />} 
            text="Download Release" 
            active={activeItem === 'DownloadPage'} 
            onClick={() => handleItemClick('DownloadPage')} 
          />
          <SidebarItem 
            icon={<FaBell />} 
            text="Notifications" 
            active={activeItem === 'Notification'} 
            onClick={() => handleItemClick('Notification')} 
          />
        </ul>
      </nav>
      <div className="py-4 px-4">
        <RefreshInterval />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => {
  return (
    <li className={`py-2 cursor-pointer ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
      <button onClick={onClick} className="text-white flex items-center w-full px-4 py-2">
        {icon}
        <span className="ml-2">{text}</span>
      </button>
    </li>
  );
};

export default Sidebar;