import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaEnvelope, FaWhatsapp, FaTelegram } from "react-icons/fa";

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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setShowAnimation(true);
    fetchNotificationSettings();
  }, []);

  function fetchNotificationSettings() {
    fetch(process.env.REACT_APP_API_APPS_NOTIFICATION, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
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

  useEffect(() => {
    fetch(process.env.REACT_APP_GET_PICTURE_URL, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.ID);
      })
      .catch((error) => console.error("Error fetching user ID:", error));
  }, []);

  const handleTelegramLinkClick = async () => {
    const command = `/save ${userId}`;
    try {
      await navigator.clipboard.writeText(command);
      console.log("Command copied to clipboard:", command);
    } catch (err) {
      console.error("Failed to copy command to clipboard:", err);
    }
  };

  const handleUnlinkTelegram = () => {
    const updatedSettings = { ...notificationSettings, Telegram: "" };

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

  const renderNotificationSettings = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-black">
          Notification Settings
        </h2>
        <div className="my-4">
          <label className="flex items-center mb-2 font-bold">
            <FaEnvelope className="text-gray-500 mr-2" />
            {`Send over Email (${notificationSettings.EmailStatus ? 'ON' : 'OFF'})`}
          </label>
          <input
            type="email"
            value={notificationSettings.Email}
            disabled
            className="w-full p-2 rounded-md bg-gray-200 text-black cursor-not-allowed"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-black">
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
          <label className="flex items-center mb-2 font-bold">
            <FaWhatsapp className="text-green-500 mr-2" />
            {`Send over WhatsApp (${notificationSettings.WhatsappStatus ? 'ON' : 'OFF'})`}
          </label>
          <input
            type="text"
            value={whatsappInput}
            onChange={(e) => setWhatsappInput(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-200 text-black"
            placeholder="Enter your WhatsApp number"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              className="px-3 py-1 rounded-md bg-[#00df9a] hover:bg-[#50cba4] text-black transition-colors duration-300"
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
          <label className="flex items-center mb-2 font-bold">
            <FaTelegram className="text-blue-500 mr-2" />
            {`Send over Telegram  (${notificationSettings.TelegramStatus ? 'ON' : 'OFF'})`}
          </label>
          <div className="bg-gray-200 p-4 rounded-md">
            {notificationSettings.Telegram ? (
              <a
                href="javascript:void(0);"
                className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleUnlinkTelegram();
                }}
              >
                [Connected] Unlink telegram from SenDigi
              </a>
            ) : (
              <a
                href="https://t.me/SenDigi_bot"
                className="bg-[#00df9a] hover:bg-[#50cba4] text-black px-4 py-2 rounded-md mt-4"
                onClick={handleTelegramLinkClick}
              >
                Click here to copy command & set up Telegram
              </a>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-black">
              You need to set up Telegram using a designated number before we
              are able to send notifications to you.
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleTelegram"
                id="toggleTelegram"
                className="toggle-checkbox absolute hidden w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={notificationSettings.TelegramStatus}
                onChange={() =>
                  updateNotificationSettings(
                    "WhatsappStatus",
                    !notificationSettings.TelegramStatus
                  )
                }
              />
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="toggleTelegram"
                  id="toggleTelegram"
                  checked={notificationSettings.TelegramStatus}
                  onChange={() =>
                    updateNotificationSettings(
                      "TelegramStatus",
                      !notificationSettings.TelegramStatus
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
          <label className="block text-black mb-1 font-bold">Notification Strategy</label>
          <div className="bg-gray-200 p-4 rounded-md">
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
              <label htmlFor="locked-only" className="ml-2 text-black">
                Locked Only
              </label>
            </div>
            <p className="text-black mb-2">
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
              <label htmlFor="all-activity" className="ml-2 text-black">
                All Activity
              </label>
            </div>
            <p className="text-black mb-2">
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
              <label htmlFor="off" className="ml-2 text-black">
                Off
              </label>
            </div>
            <p className="text-black">
              You can also disable notifications entirely while still tracking
              activity history.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-white rounded-lg shadow-lg">
            {showAnimation && renderNotificationSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
