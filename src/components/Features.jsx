import React from "react"
import timePic from "../assets/time.png"
import lockPic from "../assets/lock.png"
import schedulePic from "../assets/schedule.png"
import { Link } from "react-router-dom"

function Features() {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white' src={timePic} alt='#' />
          <h2 className='text-2xl font-bold text-center py-6'>App Usage Time</h2>
          <p className='text-center text-4xl font-bold'>Free</p>
          <div className='text-center font-medium'>
            <p className='mx-8 mt-8 px-20'>Monitor your kids app usage on gadget</p>
          </div>
          <Link to='/DetailUsage' className='justify-center items-center text-center'>
            <button className='bg-[#0197b2] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>
              Details
            </button>
          </Link>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white' src={lockPic} alt='#' />
          <h2 className='text-2xl font-bold text-center py-6'>Lock Application</h2>
          <p className='text-center text-4xl font-bold'>Free</p>
          <div className='text-center font-medium'>
            <p className='mx-8 mt-8 px-16'>Lock specific app to secure your kids from app addiction</p>
          </div>
          <Link to='/DetailLock' className='justify-center items-center text-center'>
            <button className='bg-[#0197b2] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>
              Details
            </button>
          </Link>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white' src={schedulePic} alt='#' />
          <h2 className='text-2xl font-bold text-center py-6'>Lock Scheduling</h2>
          <p className='text-center text-4xl font-bold'>Free</p>
          <div className='text-center font-medium'>
            <p className='mx-8 mt-8 px-16'>Set app time scheduling for your kids</p>
          </div>
          <Link to='/DetailScheduling' className='justify-center items-center text-center'>
            <button className='bg-[#0197b2] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Features
