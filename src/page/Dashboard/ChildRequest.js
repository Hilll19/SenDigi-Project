import React, { useState, useEffect } from "react";

function ChildRequest() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    fetchRequestData();
  }, []);

  const fetchRequestData = async () => {
    try {
      const response = await fetch("https://server.sendigi.id/api/message", {
        credentials: "include",
      });
      const data = await response.json();
      if (data && data.data) {
        const formattedData = data.data.map((item) => ({
          id: item.ID,
          appName: item.Name,
          appIcon: item.Icon,
          message: item.Message,
          timestamp: new Date(item.CreatedAt).toLocaleString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          locked: item.LockStatus,
        }));
        setRequestList(formattedData);
      }
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleResponseChange = (event) => {
    setResponseMessage(event.target.value);
  };

  const handleSendResponse = () => {
    console.log("Sending response:", responseMessage);
    setSelectedRequest(null);
    setResponseMessage("");
  };

  const handleLockToggle = () => {
    console.log("Toggle lock for:", selectedRequest.appName);
    setSelectedRequest({ ...selectedRequest, locked: !selectedRequest.locked });
  };

  return (
    <div className="bg-white min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Request Messages</h1>
        <p className="text-gray-600 mb-8">
          This page lists requests to unlock applications from the mobile app. Pay attention here, your child might send you a message requesting to unlock certain apps. You can respond to them by message or directly unlock the app.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests</h2>
            <div style={{ maxHeight: "550px", overflowY: "auto" }}>
              <ul className="space-y-4">
                {requestList.map((request) => (
                  <li
                    key={request.id}
                    className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRequestClick(request)}
                  >
                    <div className="flex items-center">
                      {request.appIcon && (
                        <img
                          src={request.appIcon}
                          alt={request.appName}
                          className="w-10 h-10 mr-3 rounded-full"
                        />
                      )}
                      <span className="text-gray-700">{request.appName} Unlock Request</span>
                    </div>
                    <span className="text-gray-500 text-sm">{request.timestamp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRequest && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h2>
              <div className="mb-6" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <p className="text-gray-700 mb-4">{selectedRequest.message}</p>
                <p className="text-gray-500 text-sm mb-6">{selectedRequest.timestamp}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Respond Back</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Leave a message"
                  value={responseMessage}
                  onChange={handleResponseChange}
                ></textarea>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                  onClick={handleSendResponse}
                >
                  Send Message
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800">{selectedRequest.appName} Lock Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedRequest.locked}
                    onChange={handleLockToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"></div>
                  <div className="w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-full peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                </label>
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleLockToggle}
              >
                Toggle Lock
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChildRequest;
