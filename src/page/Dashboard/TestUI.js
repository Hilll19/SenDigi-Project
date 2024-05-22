import React, { useState, useEffect } from "react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const TestUI = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [appInfo, setAppInfo] = useState([]);
  const [activityInfo, setActivityInfo] = useState([]);
  const [totalTimeUsage, setTotalTimeUsage] = useState(0);
  const [totalLockedApps, setTotalLockedApps] = useState([]);
  const [totalScheduledApps, setTotalScheduledApps] = useState([]);
  const [totalOpenedLockApplication, setTotalOpenedLockApplication] = useState(
    []
  );
  const [mostOpenedLockedApp, setMostOpenedLockedApp] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const deviceResponse = await fetch(process.env.REACT_APP_API_DEVICES, {
        credentials: "include",
      });
      const deviceData = await deviceResponse.json();
      setDeviceInfo(deviceData.data[0]);

      const appsResponse = await fetch(process.env.REACT_APP_API_APPS, {
        credentials: "include",
      });
      const appsData = await appsResponse.json();
      setAppInfo(appsData.data);

      const activitiesResponse = await fetch(
        process.env.REACT_APP_API_APPS_ACTIVITY_STATUS,
        {
          credentials: "include",
        }
      );
      const activitiesData = await activitiesResponse.json();
      setActivityInfo(activitiesData.data);

      calculateTotalTimeUsage(appsData.data);
      calculateLockedAndScheduledApps(appsData.data);
      calculateOpenedLockApplication(activitiesData.data, appsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const calculateOpenedLockApplication = (activities, apps) => {
    const openedLockActivities = activities.filter((activity) =>
      activity.Description.String.startsWith("[Warning]")
    );
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
    const mostOpenedLockedApp = apps.find(
      (app) => app.PackageName === mostOpenedLockedPackageName
    );

    setTotalOpenedLockApplication(openedLockActivities);
    setMostOpenedLockedApp(mostOpenedLockedApp);
  };

  const convertToHourMinute = (time) => {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    return [hour, minute];
  };

  const renderBatteryIcon = () => {
    if (!deviceInfo) return null;

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
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-4 grid md:grid-cols-3 gap-3">
          <Card href="/device" title="Device Name">
            {deviceInfo ? deviceInfo.DeviceName : "Loading Data..."}
          </Card>
          <Card href="/usage" title="Total Installed Applications">
            {appInfo.length} Applications
          </Card>
          <Card href="/usage" title="Total Time Usage">
            {convertToHourMinute(totalTimeUsage)[0]} Hours{" "}
            {convertToHourMinute(totalTimeUsage)[1]} Minutes
          </Card>
          <Card
            href="/TimeUsage"
            title="Top Most Used Applications"
            className="md:col-span-2"
          >
            <div className="flex flex-wrap gap-4">
              {appInfo.slice(0, 4).map((app) => (
                <div key={app.PackageName} className="flex items-center gap-2">
                  <img src={app.Icon} alt="icon" width="20" />
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
          </Card>

          <Card href="/device" title="Device Battery Level">
            {renderBatteryIcon()}
          </Card>
          <Card href="/usage" title="Total Locked Applications">
            {totalLockedApps.length} Locked Applications
          </Card>
          <Card
            href="/lock"
            title="Locked Applications"
            className="md:row-span-2"
          >
            {totalLockedApps.length ? (
              <div className="overflow-y-auto max-h-40">
                {totalLockedApps.map((app) => (
                  <div
                    key={app.PackageName}
                    className="flex items-center gap-2"
                  >
                    <img src={app.Icon} alt="icon" width="40" />
                    <p className="text-lg font-semibold">{app.Name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You don't have any locked applications</p>
            )}
          </Card>
          <Card
            href="/schedule"
            title="Scheduled Applications"
            className="md:row-span-2"
          >
            {totalScheduledApps.length ? (
              <div className="overflow-y-auto max-h-40">
                {totalScheduledApps.map((app) => (
                  <div key={app.PackageName} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <img src={app.Icon} alt="icon" width="20" />
                      <p className="font-bold">{app.Name}</p>
                    </div>
                    <div>
                      {app.DateLocked.String && (
                        <Badge color="red">{app.DateLocked.String}</Badge>
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
              <p>You don't have any scheduled applications</p>
            )}
          </Card>
          <Card href="/schedule" title="Total Scheduled Applications">
            {totalScheduledApps.length} Scheduled Applications
          </Card>
          <Card
            href="/activity"
            title="Last Device Activity"
            className="md:col-span-2 md:row-span-2"
          >
            <div className="overflow-y-auto max-h-80">
              {" "}
              {/* Tambahkan className dengan overflow-y-auto dan max-h */}
              {activityInfo.slice(0, 4).map((activity) => (
                <div
                  key={activity.ID}
                  className="flex flex-col border-b border-gray-100 py-4"
                >
                  <p className="font-bold">{activity.Description.String}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={activity.Icon} alt={activity.Name} width="20" />
                    <p className="font-semibold">{activity.Name}</p>
                  </div>
                  <p>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "full",
                      timeStyle: "long",
                    }).format(new Date(activity.CreatedAt))}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card href="/activity" title="Total Opened Locked Application">
            {totalOpenedLockApplication.length} Times
          </Card>
          <Card href="/activity" title="Most Opened Locked Application">
            {mostOpenedLockedApp && (
              <div className="flex items-center gap-2">
                <img src={mostOpenedLockedApp.Icon} alt="icon" width="40" />
                <p className="text-lg font-bold">{mostOpenedLockedApp.Name}</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

const Card = ({ href, title, children, className = "" }) => (
  <a
    href={href}
    className={`bg-gray-800 p-4 rounded-lg shadow-md ${className}`}
  >
    <p className="text-sm text-gray-400">{title}</p>
    <h5 className="mt-2 text-2xl font-bold text-white">{children}</h5>
  </a>
);

const Badge = ({ color, children }) => (
  <span
    className={`inline-block bg-${color}-200 text-${color}-800 text-xs px-2 rounded-full`}
  >
    {children}
  </span>
);

export default TestUI;
