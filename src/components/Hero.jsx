// Hero.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    fetch(process.env.REACT_APP_AUTH_CHECK_URL, {
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      });
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className='text-black bg-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#0197b2] font-bold p-2'>MONITOR YOUR KIDS</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Guard with SenDigi</h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>Real-Time, Trusted, Secure</p>
          <ReactTyped
            className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
            strings={["Family", "Parents", "Kids"]}
            typeSpeed={140}
            backSpeed={150}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          Monitor and guard your kids digital activity from gadget negative effect{" "}
        </p>
        <div className=' mx-auto py-3'>
          <button
            onClick={handleGetStarted}
            className='bg-[#0197b2] w-full h-full mx-auto my-4 px-6 rounded-md font-medium text-white transition duration-300 ease-in-out hover:scale-105 transform -z-0'>
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
