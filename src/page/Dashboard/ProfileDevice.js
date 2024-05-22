import React, { useState, useEffect } from "react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty, FaAndroid, FaBriefcase, FaCode } from "react-icons/fa";
import Navbar from "../../components/Navbar";

function BatteryInfo({ deviceData }) {
  if (!deviceData) {
    return <div>Loading...</div>;
  }

  const { BatteryLevel, IsCharging } = deviceData;

  let batteryIcon;
  let batteryColor;

  if (IsCharging || BatteryLevel >= 50) {
    batteryIcon = <FaBatteryFull className="text-green-500 text-4xl" />;
    batteryColor = "green";
  } else if (BatteryLevel >= 20) {
    batteryIcon = <FaBatteryHalf className="text-orange-500 text-4xl" />;
    batteryColor = "orange";
  } else {
    batteryIcon = <FaBatteryEmpty className="text-red-500 text-4xl" />;
    batteryColor = "red";
  }

  return (
    <div className={`mb-4 mt-6 text-blueGray-600 flex items-center justify-center`}>
      {batteryIcon}
      <span className="ml-2 text-lg font-bold">Battery Level:</span>
      <span className={`ml-2 text-${batteryColor}-500 text-lg font-bold`}>
        {BatteryLevel}%
      </span>
    </div>
  );
}

function ProfileDevice() {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    showDeviceInformation();
    fetchProfilePicture();
    const interval = setInterval(showDeviceInformation, 60000); // Set interval to 1 minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function showDeviceInformation() {
    fetch(process.env.REACT_APP_API_DEVICES, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDeviceData(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto mt-16 px-4 flex justify-center items-center">
        <div className="bg-white rounded-3xl border-4 border-t-8 border-gray-900 px-4 py-6 shadow-2xl max-w-sm">
          <div className="text-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="rounded-full h-auto align-middle border-none mx-auto mb-4 max-w-150-px"
            />
            <p className="pt-2 text-lg font-medium text-black">@{deviceData ? deviceData.DeviceName : "Unknown"}</p>
            <p className="text-sm font-extrabold text-gray-900">
              {deviceData ? `${deviceData.Manufacturer}, ${deviceData.AndroidVersion}` : "Unknown"}
            </p>
          </div>
          <div className="my-3 grid grid-cols-4 items-center gap-4 px-4">
            {/* Add your social media icons here */}
          </div>
          <div className="mb-2 text-blueGray-600 flex items-center justify-center">
            <FaBriefcase className="mr-2 text-lg text-blueGray-400" />
            {deviceData ? `${deviceData.DeviceBrand} - ${deviceData.ProductName}` : "Unknown"}
          </div>
          <div className="mb-2 text-blueGray-600 flex items-center justify-center">
            <FaCode className="mr-2 text-lg text-blueGray-400" />
            API Level: {deviceData ? deviceData.APILevel : "Unknown"}
          </div>
          <div className="mb-2 text-blueGray-600 flex items-center justify-center">
            <BatteryInfo deviceData={deviceData} />
          </div>
          <div className="text-center font-extrabold text-black">&copy; Your Company Name</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDevice;
