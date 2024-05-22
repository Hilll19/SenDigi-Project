import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

function Notification() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    ID: null,
    Email: "",
    EmailStatus: false,
    Whatsapp: "",
    WhatsappStatus: false,
    Telegram: "",
    TelegramStatus: false,
    Strategy: "",
  });
  const [whatsappInput, setWhatsappInput] = useState("");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    setShowAnimation(true);
    fetchDeviceId();
    fetchNotificationSettings();
  }, []);

  function fetchNotificationSettings() {
    fetch(process.env.REACT_APP_API_APPS_NOTIFICATION, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setNotificationSettings({
          ...data.data,
          Whatsapp: data.data.Whatsapp.String,
          Telegram: data.data.Telegram.String,
        });
        setWhatsappInput(data.data.Whatsapp.String);
      })
      .catch((error) =>
        console.error("Error fetching notification settings:", error)
      );
  }

  const updateNotificationSettings = (field, value) => {
    const updatedSettings = { ...notificationSettings, [field]: value };

    if (field === "Whatsapp") {
      updatedSettings.Whatsapp = value;
    }

    fetch(process.env.REACT_APP_API_APPS_NOTIFICATION_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSettings),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setNotificationSettings(updatedSettings);
      })
      .catch((error) => {
        console.error("Error updating notification settings:", error.message);
      });
  };

  const fetchDeviceId = () => {
    fetch(process.env.REACT_APP_API_DEVICES, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setDeviceId(data.data[0].ID);
        }
      })
      .catch((error) => console.error("Error fetching device ID:", error));
  };

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const renderNotificationSettings = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Notification Settings
        </h2>
        <div className="mb-4">
          <label className="block text-white mb-1">Send over Email</label>
          <input
            type="email"
            value={notificationSettings.Email}
            disabled
            className="w-full p-2 rounded-md bg-gray-700 text-white cursor-not-allowed"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-white">
              This is the email address for notifications, but changing it is
              currently unavailable.
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleEmail"
                id="toggleEmail"
                className="toggle-checkbox absolute w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer hidden"
                checked={notificationSettings.EmailStatus}
                onChange={() =>
                  updateNotificationSettings(
                    "EmailStatus",
                    !notificationSettings.EmailStatus
                  )
                }
              />
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="toggleEmail"
                  id="toggleEmail"
                  checked={notificationSettings.EmailStatus}
                  onChange={() =>
                    updateNotificationSettings(
                      "EmailStatus",
                      !notificationSettings.EmailStatus
                    )
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Send over Whatsapp</label>
          <input
            type="text"
            value={whatsappInput}
            onChange={(e) => setWhatsappInput(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter your WhatsApp number"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
              onClick={() =>
                updateNotificationSettings("Whatsapp", whatsappInput)
              }
            >
              Save WhatsApp Number
            </button>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleWhatsapp"
                id="toggleWhatsapp"
                className="toggle-checkbox absolute hidden w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={notificationSettings.WhatsappStatus}
                onChange={() =>
                  updateNotificationSettings(
                    "WhatsappStatus",
                    !notificationSettings.WhatsappStatus
                  )
                }
              />
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="toggleWhatsapp"
                  id="toggleWhatsapp"
                  checked={notificationSettings.WhatsappStatus}
                  onChange={() =>
                    updateNotificationSettings(
                      "WhatsappStatus",
                      !notificationSettings.WhatsappStatus
                    )
                  }
                  className="sr-only"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Send over Telegram</label>
          <div className="bg-gray-700 p-4 rounded-md">
          <a
            href="https://t.me/SenDigi_bot"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => copyTextToClipboard(`/save ${deviceId}`)}
          >
            Click here to copy command & set up Telegram
          </a>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white">
              You need to set up Telegram using a designated number before we
              are able to send notifications to you.
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleTelegram"
                id="toggleTelegram"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                disabled
              />
              <label
                htmlFor="toggleTelegram"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Notification Strategy</label>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="locked-only"
                name="strategy"
                value="LOCKED"
                checked={notificationSettings.Strategy === "LOCKED"}
                onChange={() =>
                  updateNotificationSettings("Strategy", "LOCKED")
                }
                className="form-radio h-5 w-5 text-orange-500"
              />
              <label htmlFor="locked-only" className="ml-2 text-white">
                Locked Only
              </label>
            </div>
            <p className="text-gray-400 mb-2">
              The notification will only be sent when the child opens a locked
              application (Recommended).
            </p>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="all-activity"
                name="strategy"
                value="ALL"
                checked={notificationSettings.Strategy === "ALL"}
                onChange={() => updateNotificationSettings("Strategy", "ALL")}
                className="form-radio h-5 w-5 text-orange-500"
              />
              <label htmlFor="all-activity" className="ml-2 text-white">
                All Activity
              </label>
            </div>
            <p className="text-gray-400 mb-2">
              You can opt to receive notifications for any app activity, but be
              aware this may result in spam notifications.
            </p>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="off"
                name="strategy"
                value="OFF"
                checked={notificationSettings.Strategy === "OFF"}
                onChange={() => updateNotificationSettings("Strategy", "OFF")}
                className="form-radio h-5 w-5 text-orange-500"
              />
              <label htmlFor="off" className="ml-2 text-white">
                Off
              </label>
            </div>
            <p className="text-gray-400">
              You can also disable notifications entirely while still tracking
              activity history.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Notification Settings
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-800 p-4 rounded-lg shadow-md">
            {showAnimation && renderNotificationSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
