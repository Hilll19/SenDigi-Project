import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SchedulingPic from "../assets/schedulePic.jpg";
import schedulePic1 from "../assets/schedulingPic1.png";
import schedulePic2 from "../assets/schedulingPic2.png";
import dashboardPic from "../assets/dashboardPic.png";

function DetailScheduling() {
  return (
    <div>
      <Navbar />
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-[#00df9a] font-bold text-center text-4xl mb-8">
            Scheduling Lock App feature
          </h1>
          <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
              <img
                className="w-[500PX] mx-auto my-4"
                src={SchedulingPic}
                alt="/"
              />
              <div className="flex flex-col justify-center">
                <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
                  Scheduling Lock App in SenDigi
                </p>
                <p>
                  The Scheduling Lock App feature in SenDigi empowers parents
                  with the ability to remotely schedule locking and unlocking of
                  specific applications on their children's devices. This
                  feature provides parents with enhanced control over their
                  children's digital activities, allowing them to regulate
                  access to certain apps at predetermined times. By scheduling
                  app locks, parents can promote a healthier balance between
                  screen time and other activities, ensuring a safer and more
                  productive digital experience for their children with SenDigi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-[1240px] mx-auto">
          <h1 className="text-[#00df9a] font-bold text-center text-4xl mb-8">
            Benefit
          </h1>
          <div className="w-full bg-white py-16 px-4 rounded-lg">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
              <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 pt-8">
                Scheduling Lock <br />
                App Benefit
              </p>
              <ol className="list-decimal pt-8">
                <li>
                  <strong>Comprehensive Parental Monitoring:</strong> Empower
                  parents with robust tools for real-time monitoring and control
                  of children's online activities.
                </li>
                <li>
                  <strong>Flexibility:</strong> Easily manage children's gadget
                  usage across multiple devices for a seamless experience.
                </li>
                <li>
                  <strong>Real-Time Monitoring and Control:</strong> Promptly
                  respond to concerns or inappropriate activities, fostering a
                  safer digital environment.
                </li>
                <li>
                  <strong>Customized Access Control:</strong> Tailor access
                  restrictions to match each child's individual needs and
                  developmental stages.
                </li>
                <li>
                  <strong>Insightful Usage Reports:</strong> Access
                  comprehensive reports on children's online activities for
                  informed decision-making.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-[10rem] px-4 bg-white">
        <h1 className="text-[#00df9a] font-bold text-center text-4xl mb-20">
          Main Feature
        </h1>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-30 h-80 mx-auto mt-[-3rem] bg-white"
              src={dashboardPic}
              alt="#"
            />
            <h2 className="text-3xl font-bold text-center py-6">
              Option Dashboard
            </h2>
            <div className="text-center font-medium">
              <p className="mx-8 mt-8">
                1. Provides dashboard options that can be used
              </p>
              <p className="mx-8">2. Monitoring car data via the dashboard</p>
              <p className="mx-8">
                3. The dashboard also provides a menu of other features in the
                sidebarr
              </p>
            </div>
          </div>
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-30 h-80 mx-auto mt-[-3rem] bg-white"
              src={schedulePic1}
              alt="#"
            />
            <h2 className="text-3xl font-bold text-center py-6">
              Scheduling Lock App
            </h2>
            <div className="text-center font-medium">
              <p className="mx-8 mt-8">
                1. Provides the option to lock by dates or times later 
              </p>
              <p className="mx-8">2. Provides the option to lock applications from the existing application list</p>
              <p className="mx-8">3. Can set the locking time as we wish</p>
            </div>
          </div>
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-30 h-80 mx-auto mt-[-3rem] bg-white"
              src={schedulePic2}
              alt="#"
            />
            <h2 className="text-3xl font-bold text-center py-6">
              List App Scheduling
            </h2>
            <div className="text-center font-medium">
              <p className="mx-8 mt-8">
                1. Provides existing application data
              </p>
              <p className="mx-8">
                2. Provides application data that is currently locked via scheduling
              </p>
              <p className="mx-8">
                3. soon.....
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Profil/> */}
      {/* <Features /> */}
      <Footer />
    </div>
  );
}

export default DetailScheduling;
