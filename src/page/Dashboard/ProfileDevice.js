import React, { useState, useEffect } from "react";
import {
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryEmpty,
  FaAndroid,
  FaBriefcase,
  FaCode,
} from "react-icons/fa";
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
    <div
      className={`mb-4 mt-6 text-blueGray-600 flex items-center justify-center`}
    >
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
    <>
      <Navbar profilePicture={profilePicture} />
      <main className="profile-page flex justify-center items-center min-h-screen">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${deviceData.profileImageUrl})` }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
              <div className="px-6 ">
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
                    {deviceData
                      ? `${deviceData.Manufacturer}, ${deviceData.AndroidVersion}`
                      : "Unknown"}
                  </div>
                  <div className="mb-2 text-blueGray-600 flex items-center justify-center">
                    <FaBriefcase className="mr-2 text-lg text-blueGray-400" />
                    {deviceData
                      ? `${deviceData.DeviceBrand} - ${deviceData.ProductName}`
                      : "Unknown"}
                  </div>
                  <div className="mb-2 text-blueGray-600 flex items-center justify-center">
                    <FaCode className="mr-2 text-lg text-blueGray-400" />
                    API Level: {deviceData ? deviceData.APILevel : "Unknown"}
                  </div>
                  <BatteryInfo deviceData={deviceData} />
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        A versatile device capable of meeting a variety of
                        needs, the [DeviceName] is a sophisticated tool for
                        modern living. With its [AndroidVersion] operating
                        system and [APILevel] API level, it offers a seamless
                        user experience. Manufactured by [Manufacturer] and part
                        of the [DeviceBrand] series, it combines functionality
                        with style, making it an essential companion for both
                        work and leisure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfileDevice;
