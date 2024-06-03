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
      const response = await fetch(process.env.REACT_APP_API_REQUEST_MESSAGE, {
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
          packageName: item.PackageName, // Added packageName for toggle function
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

  const handleSendResponse = async () => {
    if (selectedRequest && responseMessage) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_REQUEST_MESSAGE}/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: responseMessage,
            packageName: selectedRequest.packageName,
            lockStatus: selectedRequest.locked,
          }),
          credentials: "include",
        });

        if (response.ok) {
          console.log("Response sent successfully");
          setSelectedRequest(null);
          setResponseMessage("");
          fetchRequestData(); // Refresh the request list after sending the response
        } else {
          console.error("Error sending response:", response.status);
        }
      } catch (error) {
        console.error("Error sending response:", error);
      }
    }
  };

  const SaveState = (packageName, newLockStatus) => {
    const updatedRequestList = requestList.map((request) =>
      request.packageName === packageName ? { ...request, locked: newLockStatus } : request
    );
    setRequestList(updatedRequestList);

    const requestToUpdate = requestList.find((request) => request.packageName === packageName);

    if (!requestToUpdate) {
      console.error(`Request with packageName ${packageName} not found.`);
      return;
    }

    const updatedRequestData = {
      ...requestToUpdate,
      lockStatus: newLockStatus,
    };

    fetch(process.env.REACT_APP_API_APPS_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRequestData),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error updating lock status:", error.message);

        const revertedRequestList = requestList.map((request) =>
          request.packageName === packageName ? { ...request, locked: !newLockStatus } : request
        );
        setRequestList(revertedRequestList);
      });
  };

  const handleLockToggle = (packageName) => {
    const request = requestList.find((request) => request.packageName === packageName);
    if (request) {
      SaveState(packageName, !request.locked);
    }
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
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  rows="4"
                  placeholder="Leave a message"
                  value={responseMessage}
                  onChange={handleResponseChange}
                ></textarea>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
                  onClick={handleSendResponse}
                >
                  Send Message
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800">{selectedRequest.appName} Lock Status</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={selectedRequest.locked}
                    onChange={() => handleLockToggle(selectedRequest.packageName)}
                    className="sr-only"
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={() => handleLockToggle(selectedRequest.packageName)}
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
