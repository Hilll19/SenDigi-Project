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
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mt-12">
              <img
                src={profilePicture}
                alt="Profile"
                className="shadow-xl rounded-full h-auto align-middle border-none mx-auto mb-4 max-w-150-px"
              />
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                {deviceData ? deviceData.DeviceName : "Unknown"}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase flex items-center justify-center">
                <FaAndroid className="mr-2 text-lg text-blueGray-400" />
                {deviceData ? `${deviceData.Manufacturer}, ${deviceData.AndroidVersion}` : "Unknown"}
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
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2>Device Connected</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDevice;