import React from "react";
import { Card, Button, Badge } from "flowbite-react";

const DownloadPage = () => {
  return (
    <div className="bg-white min-h-screen mt-14 mb-24 flex justify-center">
      <div className="w-full p-4">
        <Card className="w-full">
          <div className="p-4">
            <h1 className="font-bold text-2xl mb-4">Download Release</h1>
            <p className="text-gray-700">
              Temporarily while the state of the app is in beta, we provide
              download section here to accommodate faster delivery in beta
              state. When the application is available in the store, this page
              will be removed.
            </p>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl">v1.1-beta</h1>
              <Badge color="purple">Latest Release</Badge>
            </div>
            <div className="mt-2">
              <p className="font-semibold">What's Changed?</p>
              <ul className="list-disc list-inside pl-4">
                <li>Refactor Lock UI by @nathanpasca in #13</li>
                <li>Refactor English by @nathanpasca in #15 Full</li>
              </ul>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                href="https://github.com/resqiar/sendigi-app/releases/tag/v1.1-beta"
                size="sm"
                color="alternative"
              >
                See Full Release
              </Button>
              <Button
                href="https://github.com/resqiar/sendigi-app/releases/download/v1.1-beta/sendigi-release.apk"
                size="sm"
              >
                Download Release
              </Button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 mt-4">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl">v1.0-beta</h1>
            </div>
            <div className="mt-2">
              <p className="font-semibold">What's Changed?</p>
              <ul className="list-disc list-inside pl-4">
                <li>Lock scheduler by @nathanpasca in #1</li>
                <li>Add a basic locking feature by @resqiar in #2</li>
                <li>Add logo and change app theme in LockScreen by @Hilll19 in #3</li>
                <li>Feat/refactor-ui by @nathanpasca in #4</li>
                <li>Authentication Integrations by @resqiar in #5</li>
                <li>Refactor login UI by @nathanpasca in #6</li>
                <li>Ability to send application usage to server by @resqiar in #7</li>
                <li>Refactor code to match design document by @resqiar in #8</li>
                <li>Add Scheduler by @resqiar in #9</li>
                <li>Implement Listening to Message Queue by @resqiar in #10</li>
                <li>Refactor UI by @nathanpasca in #11</li>
                <li>Change Name, Detail, Logo and release to a new proper brand (SenDigi) by @resqiar in #12</li>
              </ul>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                href="https://github.com/resqiar/sendigi-app/releases/tag/v1.0-beta"
                size="sm"
                color="alternative"
              >
                See Full Release
              </Button>
              <Button
                href="https://github.com/resqiar/sendigi-app/releases/download/v1.0-beta/sendigi-release.apk"
                size="sm"
                color="light"
              >
                Download Release
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DownloadPage;
