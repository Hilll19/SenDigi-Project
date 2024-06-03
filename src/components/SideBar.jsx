import { FaChartLine, FaUser, FaLock, FaHome, FaUniversalAccess, FaBell, FaDownload, FaCommentAlt } from 'react-icons/fa';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import RefreshInterval from './RefreshInterval';
import logoSendigi from "../assets/logoSendigi.png";
import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleMenuClick, activeItem, setSelectedComponent, refreshInterval, setRefreshInterval }) => {
  const handleItemClick = (item) => {
    setSelectedComponent(item);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  //const location = useLocation(); // Hook to get current location

  useEffect(() => {
    checkLoginStatus();
    fetchProfilePicture();
  }, []);

  const checkLoginStatus = () => {
    fetch(process.env.REACT_APP_AUTH_CHECK_URL, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      });
  };

  const fetchProfilePicture = () => {
    fetch(process.env.REACT_APP_GET_PICTURE_URL, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch profile picture");
      })
      .then((data) => {
        if (data.PictureURL) {
          setProfilePicture(data.PictureURL);
        } else {
          throw new Error("Profile picture URL not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  };

  const handleLogout = () => {
    fetch(process.env.REACT_APP_LOGOUT_USER, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="bg-gray-900 w-64 flex flex-col min-h-screen">
      <div className="flex items-center gap-1 py-6 px-4 bg-gray-800">
        <img className="w-[50px]" src={logoSendigi} alt="SenDigi" />
        <h2 className="text-[#0197b2] text-2xl font-bold">SenDigi</h2>
      </div>
      <nav className="flex-grow">
        <ul className="mt-4">
          <SidebarItem
            icon={<FaHome />}
            text="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={() => handleItemClick("Dashboard")}
          />
          <SidebarItem
            icon={<FaUser />}
            text="Device Information"
            active={activeItem === "ProfileDevice"}
            onClick={() => handleItemClick("ProfileDevice")}
          />
          <SidebarItem
            icon={<FaChartLine />}
            text="Time Usage"
            active={activeItem === "TimeUsage"}
            onClick={() => handleItemClick("TimeUsage")}
          />
          <SidebarItem
            icon={<FaLock />}
            text="Lock Application"
            active={activeItem === "LockApp"}
            onClick={() => handleItemClick("LockApp")}
          />
          <SidebarItem
            icon={<FaChartLine />}
            text="Schedule Application"
            active={activeItem === "Scheduling"}
            onClick={() => handleItemClick("Scheduling")}
          />
          <SidebarItem
            icon={<FaUniversalAccess />}
            text="Device Activity History"
            active={activeItem === "ActivityStatus"}
            onClick={() => handleItemClick("ActivityStatus")}
          />
          <SidebarItem
            icon={<FaCommentAlt />}
            text="Child Request"
            active={activeItem === "ChildRequest"}
            onClick={() => handleItemClick("ChildRequest")}
          />
          <SidebarItem
            icon={<FaDownload />}
            text="Download Release"
            active={activeItem === "DownloadPage"}
            onClick={() => handleItemClick("DownloadPage")}
          />
          <SidebarItem
            icon={<FaBell />}
            text="Notifications"
            active={activeItem === "Notification"}
            onClick={() => handleItemClick("Notification")}
          />
          <SidebarItem
            icon={<FaArrowRightFromBracket />}
            text="Logout"
            onClick={handleLogout}
          />
        </ul>
      </nav>
      <div className="py-4 px-4">
        <RefreshInterval refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => {
  return (
    <li
      className={`py-2 cursor-pointer ${
        active ? "bg-gray-700" : "hover:bg-gray-800"
      }`}
    >
      <button
        onClick={onClick}
        className="text-white flex items-center w-full px-4 py-2"
      >
        {icon}
        <span className="ml-2">{text}</span>
      </button>
    </li>
  );
};

export default Sidebar;