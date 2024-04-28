import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUser, FaLock, FaHome } from 'react-icons/fa';

const SideBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="bg-gray-900 md:h-screen w-90 flex flex-col">
            <div className="py-8 px-4 bg-gray-800 ">
                <h2 className="text-[#00df9a] text-2xl font-bold">SenDigi</h2>
            </div>
            <ul className={`${showMenu ? 'block' : 'hidden'} md:flex-1 md:block`}>
                <SidebarItem icon={<FaUser />} text="Profile Device" to="/ProfileDevice" />
                <SidebarItem icon={<FaChartLine />} text="Time Usage" to="/time-usage" />
                <SidebarItem icon={<FaLock />} text="Lock App" to="/lock-app" />
                <SidebarItem icon={<FaChartLine />} text="Scheduling" to="/Scheduling" />
                <SidebarItem icon={<FaHome />} text="Home" to="/" />
            </ul>
            <div className="md:hidden">
                <button onClick={handleMenuToggle} className="text-white flex items-center px-4 py-2 mt-auto bg-gray-800 hover:bg-gray-700 focus:outline-none">
                    {showMenu ? 'Hide Menu' : 'Show Menu'}
                </button>
            </div>
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

export default SideBar;
