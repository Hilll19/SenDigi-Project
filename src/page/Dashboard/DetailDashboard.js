import React, { useState, useEffect, useCallback } from "react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const DetailDashboard = ({ setSelectedComponent }) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [appInfo, setAppInfo] = useState(null);
  const [activityInfo, setActivityInfo] = useState(null);
  const [totalTimeUsage, setTotalTimeUsage] = useState(0);
  const [totalLockedApps, setTotalLockedApps] = useState([]);
  const [totalScheduledApps, setTotalScheduledApps] = useState([]);
  const [totalOpenedLockApplication, setTotalOpenedLockApplication] = useState(
    []
  );
  const [mostOpenedLockedApp, setMostOpenedLockedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalWarningActivities, setTotalWarningActivities] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [deviceCheck, appCheck, activityCheck] = await Promise.allSettled([
        fetch(process.env.REACT_APP_API_DEVICES, { credentials: "include" }),
        fetch(process.env.REACT_APP_API_APPS, { credentials: "include" }),
        fetch(process.env.REACT_APP_API_APPS_ACTIVITY_STATUS, {
          credentials: "include",
        }),
      ]);

      if (deviceCheck.status === "fulfilled" && deviceCheck.value.ok) {
        const deviceData = await deviceCheck.value.json();
        setDeviceInfo(deviceData.data[0]);
      } else {
        console.error(
          "Device check failed:",
          deviceCheck.reason || "Unknown error"
        );
      }

      if (appCheck.status === "fulfilled" && appCheck.value.ok) {
        const appsData = await appCheck.value.json();
        setAppInfo(appsData.data);
        calculateTotalTimeUsage(appsData.data);
        calculateLockedAndScheduledApps(appsData.data);
      } else {
        console.error("App check failed:", appCheck.reason || "Unknown error");
      }

      if (activityCheck.status === "fulfilled" && activityCheck.value.ok) {
        const activitiesData = await activityCheck.value.json();
        setActivityInfo(activitiesData.data);
        calculateOpenedLockApplication(activitiesData.data);
      } else {
        console.error(
          "Activity check failed:",
          activityCheck.reason || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const calculateTotalTimeUsage = (apps) => {
    const totalTime = apps.reduce((acc, app) => acc + app.TimeUsage, 0);
    setTotalTimeUsage(totalTime);
  };

  const calculateLockedAndScheduledApps = (apps) => {
    const lockedApps = apps.filter((app) => app.LockStatus);
    const scheduledApps = apps.filter(
      (app) =>
        app.DateLocked.String ||
        app.TimeStartLocked.String ||
        app.TimeEndLocked.String
    );
    setTotalLockedApps(lockedApps);
    setTotalScheduledApps(scheduledApps);
  };

  const calculateOpenedLockApplication = (activities) => {
    const openedLockActivities = activities.filter((activity) =>
      activity.Description.String.startsWith("[Warning]")
    );

    setTotalWarningActivities(openedLockActivities.length);

    const occurrences = new Map();

    openedLockActivities.forEach((activity) => {
      occurrences.set(
        activity.PackageName,
        (occurrences.get(activity.PackageName) || 0) + 1
      );
    });

    const mostOpenedLockedPackageName = Array.from(
      occurrences.entries()
    ).reduce(
      (max, current) => (current[1] > max[1] ? current : max),
      [null, 0]
    )[0];

    const mostOpenedLockedApp = appInfo.find(
      (app) => app.PackageName === mostOpenedLockedPackageName
    );
    setMostOpenedLockedApp(mostOpenedLockedApp);
    setTotalOpenedLockApplication(openedLockActivities);
  };

  const convertToHourMinute = (time) => {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    return [hour, minute];
  };

  const renderBatteryIcon = () => {
    if (!deviceInfo || !deviceInfo.BatteryLevel) {
      return <p>Loading data...</p>;
    }

    const { BatteryLevel, IsCharging } = deviceInfo;

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
      <div className="mb-4 mt-6 text-blueGray-600 flex items-center justify-center">
        {batteryIcon}
        <span className="ml-2 text-lg font-bold">Battery Level:</span>
        <span className={`ml-2 text-${batteryColor}-500 text-lg font-bold`}>
          {BatteryLevel}%
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-12">
      <div className="flex">
        <main className="flex-1 p-4 grid md:grid-cols-3 gap-3">
          <Card
            onClick={() => setSelectedComponent("ProfileDevice")}
            title="Device Name"
          >
            <h5 class="mt-4 mb-2 text-lg font-bold">
              {deviceInfo ? deviceInfo.DeviceName : "No Device Info"}
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("LockApp")}
            title="Total Installed Applications"
          >
            <h5 class="mt-4 mb-2 text-lg font-bold">
              {appInfo ? `${appInfo.length} Applications` : "0 Application"}
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("TimeUsage")}
            title="Total Time Usage"
          >
            <h5 class="mt-4 mb-2 text-lg font-bold">
              {convertToHourMinute(totalTimeUsage)[0]} Hours{" "}
              {convertToHourMinute(totalTimeUsage)[1]} Minutes
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("TimeUsage")}
            title="Top Most Used Applications"
            className="md:col-span-2"
          >
            {appInfo ? (
              <div className="flex flex-wrap gap-4 mt-6 items-center justify-center">
                {appInfo.slice(0, 4).map((app) => (
                  <div
                    key={app.PackageName}
                    className="flex items-center gap-2"
                  >
                    <img src={app.Icon} alt="icon" width="40" />
                    <div>
                      <p className="text-sm font-semibold">{app.Name}</p>
                      <p className="text-xs">
                        {convertToHourMinute(app.TimeUsage)[0]} Hours{" "}
                        {convertToHourMinute(app.TimeUsage)[1]} Minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "Loading data..."
            )}
          </Card>
          <Card
            onClick={() => setSelectedComponent("ProfileDevice")}
            title="Device Battery Level"
          >
            {renderBatteryIcon()}
          </Card>
          <Card
            onClick={() => setSelectedComponent("LockApp")}
            title="Total Locked Applications"
          >
            <h5 class="mt-4 mb-2 text-lg font-bold">
              {appInfo
                ? `${totalLockedApps.length} Locked Applications`
                : " 0 Locked Application"}
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("LockApp")}
            title="Locked Applications"
            className="md:row-span-2"
          >
            {totalLockedApps.length ? (
              <div className="overflow-y-auto max-h-40 mt-4">
                {totalLockedApps.map((app) => (
                  <div
                    key={app.PackageName}
                    className="flex items-center gap-2"
                  >
                    <img src={app.Icon} alt="icon" width="32" />
                    <p className="text-lg font-semibold">{app.Name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You don't have any locked applications</p>
            )}
          </Card>
          <Card
            onClick={() => setSelectedComponent("Scheduling")}
            title="Scheduled Applications"
            className="md:row-span-2"
          >
            {totalScheduledApps.length ? (
              <div className="overflow-y-auto max-h-40">
                {totalScheduledApps.map((app) => (
                  <div key={app.PackageName} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <img src={app.Icon} alt="icon" width="32" />
                      <p className="font-bold">{app.Name}</p>
                    </div>
                    <div>
                      {app.DateLocked.String && (
                        <Badge color="red">
                          Dates: {app.DateLocked.String}
                        </Badge>
                      )}
                      {app.TimeStartLocked.String && (
                        <Badge color="blue">
                          Start Time: {app.TimeStartLocked.String}
                        </Badge>
                      )}
                      {app.TimeEndLocked.String && (
                        <Badge color="blue">
                          End Time: {app.TimeEndLocked.String}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm font-semibold">
                  You don't have any scheduled applications
                </p>
              </div>
            )}
          </Card>
          <Card
            onClick={() => setSelectedComponent("Scheduling")}
            title="Total Scheduled Applications"
          >
            <h5 class="mt-4 mb-2 text-lg font-bold">
              {appInfo
                ? `${totalScheduledApps.length} Scheduled Applications`
                : " 0 Scheduled Applications"}
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("ActivityStatus")}
            title="Last Device Activity"
            className="md:col-span-2 md:row-span-2"
          >
            {activityInfo ? (
              <div className="overflow-y-auto max-h-40 shadow">
                {activityInfo.slice(0, 4).map((activity) => (
                  <div
                    key={activity.ID}
                    className="flex flex-col border-b border-gray-100 py-4"
                  >
                    <p className="ml-2 text-sm font-bold">
                      {activity.Description.String}
                    </p>
                    <div className=" ml-2 mt-2 flex items-center gap-2 mb-2">
                      <img src={activity.Icon} alt={activity.Name} width="20" />
                      <p className="text-sm font-semibold">{activity.Name}</p>
                    </div>
                    <p className="ml-2 text-sm">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                        timeStyle: "long",
                      }).format(new Date(activity.CreatedAt))}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              "No activities found."
            )}
          </Card>

          <Card
            onClick={() => setSelectedComponent("ActivityStatus")}
            title="Total Opened Locked Application"
          >
            <h5 className="mt-4 mb-2 text-lg font-bold">
              {totalWarningActivities} Times
            </h5>
          </Card>
          <Card
            onClick={() => setSelectedComponent("ActivityStatus")}
            title="Most Opened Locked Application"
          >
            {mostOpenedLockedApp ? (
              <div className="flex items-center gap-2">
                <img src={mostOpenedLockedApp.Icon} alt="icon" width="40" />
                <p className="text-lg font-bold">{mostOpenedLockedApp.Name}</p>
              </div>
            ) : (
              "Loading data..."
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

const Card = ({ onClick, title, children, className = "" }) => (
  <div
    onClick={onClick}
    className={`bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer ${className}`}
  >
    <p className="text-sm text-gray-600">{title}</p>
    <div className="mt-2 h-full text-gray-800">{children}</div>
  </div>
);

const Badge = ({ color, children }) => (
  <span
    className={`inline-block bg-${color}-200 text-${color}-800 text-sm px-2 rounded-full`}
  >
    {children}
  </span>
);

export default DetailDashboard;
