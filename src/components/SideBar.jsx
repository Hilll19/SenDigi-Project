// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUser, FaLock, FaSignInAlt, FaHome } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="bg-gray-900 h-screen w-64 flex flex-col">
            <div className="py-8 px-4 bg-gray-800">
                <h2 className="text-white text-2xl font-bold">Navigation</h2>
            </div>
            <ul className="flex-1">
                <SidebarItem icon={<FaChartLine />} text="Dashboard" to="/dashboard" />
                <SidebarItem icon={<FaUser />} text="Profile Detail" to="/profile-detail" />
                <SidebarItem icon={<FaChartLine />} text="Time Usage" to="/time-usage" />
                <SidebarItem icon={<FaLock />} text="Lock App" to="/lock-app" />
                <SidebarItem icon={<FaSignInAlt />} text="Login Page" to="/login-page" />
                <SidebarItem icon={<FaHome />} text="Home" to="/" />
            </ul>
        </div>
    );
};

const SidebarItem = ({ icon, text, to }) => {
    return (
        <li className="py-2">
            <Link to={to} className="text-white flex items-center px-4 py-2 hover:bg-gray-800 transition duration-300">
                {icon}
                <span className="ml-2">{text}</span>
            </Link>
        </li>
    );
};

export default Sidebar;
