// Hero.jsx

import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactTyped } from "react-typed"

const Hero = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/Dashboard")
    } else {
      navigate("/LoginPage")
    }
  }

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-ful h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>MONITOR YOUR KIDS</p>
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
        <button
          onClick={handleGetStarted}
          className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          {isLoggedIn ? "Go to Dashboard" : "Get Started"}
        </button>
      </div>
    </div>
  )
}

export default Hero
