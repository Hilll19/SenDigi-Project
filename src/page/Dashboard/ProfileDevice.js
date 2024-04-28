// ProfileDevice.js

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from 'react-icons/fa'; // Import icon dari react-icons

function ProfileDevice() {
  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    // Ambil data device saat komponen di-mount
    fetchDeviceData();
  }, []);

  const fetchDeviceData = () => {
    // Ambil data device dari endpoint dengan menyertakan credential dan metode GET
    fetch('http://localhost:8888/api/devices', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        // Set data device ke dalam state
        setDeviceData(data.data[0]); // Kita hanya mengambil data pertama karena hanya ada satu perangkat
      })
      .catch(error => console.error('Error fetching device data:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-white">User Device Profile</h1>
        {deviceData ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Device Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">Device ID:</span> {deviceData.ID}</p>
                <p><span className="font-semibold">Device Name:</span> {deviceData.DeviceName}</p>
                <p><span className="font-semibold">Device Brand:</span> {deviceData.DeviceBrand}</p>
                <p><span className="font-semibold">API Level:</span> {deviceData.APILevel}</p>
              </div>
              <div>
                <p><span className="font-semibold">Android Version:</span> {deviceData.AndroidVersion}</p>
                <p><span className="font-semibold">Manufacturer:</span> {deviceData.Manufacturer}</p>
                <p><span className="font-semibold">Product Name:</span> {deviceData.ProductName}</p>
                {/* Menggunakan ikon untuk menampilkan level baterai */}
                <p><span className="font-semibold">Battery Level:</span> {deviceData.BatteryLevel}% 
                  {deviceData.IsCharging ? <FaBatteryFull style={{ color: 'green' }} /> : 
                    deviceData.BatteryLevel >= 50 ? <FaBatteryFull style={{ color: 'green' }} /> :
                      deviceData.BatteryLevel >= 20 ? <FaBatteryHalf style={{ color: 'orange' }} /> :
                        <FaBatteryEmpty style={{ color: 'red' }} />}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Loading device data...</p>
        )}
      </div>
    </div>
  );
}

export default ProfileDevice;
