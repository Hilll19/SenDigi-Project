import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          packageName: item.PackageName,
          status: null, // Add a status field to track the request's status
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
    try {
      const response = await fetch(
        process.env.REACT_APP_API_REQUEST_MESSAGE_SEND,
        {
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
        }
      );

      if (response.ok) {
        toast.success("Response sent successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRequestList((prevList) =>
          prevList.map((req) =>
            req.id === selectedRequest.id ? { ...req, status: "success" } : req
          )
        );
        setSelectedRequest(null);
        setResponseMessage("");
      } else {
        toast.error("Failed to send response", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRequestList((prevList) =>
          prevList.map((req) =>
            req.id === selectedRequest.id ? { ...req, status: "failed" } : req
          )
        );
      }
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Error sending response", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRequestList((prevList) =>
        prevList.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: "failed" } : req
        )
      );
    }
  };

  const handleLockToggle = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_REQUEST_MESSAGE_SEND,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageName: selectedRequest.packageName,
            lockStatus: !selectedRequest.locked,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Lock status updated successfully");
        setSelectedRequest({
          ...selectedRequest,
          locked: !selectedRequest.locked,
        });
        fetchRequestData(); // Fetch the updated data to ensure the LockApp gets the updated status
      } else {
        console.error("Failed to update lock status");
      }
    } catch (error) {
      console.error("Error updating lock status:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen py-6">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Request Messages
        </h1>
        <p className="text-gray-600 mb-8">
          This page lists requests to unlock applications from the mobile app.
          Pay attention here, your child might send you a message requesting to
          unlock certain apps. You can respond to them by message or directly
          unlock the app.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Requests
            </h2>
            <div className="overflow-auto max-h-96">
              <ul className="divide-y divide-gray-200">
                {requestList.map((request) => (
                  <li
                    key={request.id}
                    className={`flex items-center py-4 cursor-pointer ${
                      request.status === "success"
                        ? "bg-green-100"
                        : request.status === "failed"
                        ? "bg-red-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleRequestClick(request)}
                  >
                    <div className="flex items-center flex-grow">
                      {request.appIcon && (
                        <img
                          src={request.appIcon}
                          alt={request.appName}
                          className="w-12 h-12 mr-4 rounded-lg"
                        />
                      )}
                      <div>
                        <span className="block font-semibold text-gray-800">
                          {request.appName} Request Unlock
                        </span>
                        <span className="block text-sm text-gray-500">
                          {request.timestamp}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRequest && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Messages
              </h2>
              <div
                className="mb-6"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <p className="text-gray-700 mb-4">{selectedRequest.message}</p>
                <p className="text-gray-500 text-sm mb-6">
                  {selectedRequest.timestamp}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Respond Back
                </h3>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChildRequest;
