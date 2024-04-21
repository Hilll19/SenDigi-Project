import React from 'react'
import timePic from '../assets/time.png'
import lockPic from '../assets/lock.png'
import schedulePic from '../assets/schedule.png'
import { Link } from 'react-router-dom'


function Features() {
    return (
        <div className='w-full py-[10rem] px-4 bg-white'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={timePic} alt="#" />
                    <h2 className='text-2xl font-bold text-center py-6'>Time Usage app</h2>
                    <p className='text-center text-4xl font-bold'>$Free</p>
                    <div className='text-center font-medium'>
                        <p className='mx-8 mt-8'>Monitoring your</p>
                        <p className='mx-8'>kids when usage</p>
                        <p className='mx-8'>app in gadget</p>
                    </div>
                    <Link to="/time-usage" className='justify-center items-center text-center' >
                        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>Details</button>
                    </Link>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={lockPic} alt="#" />
                    <h2 className='text-2xl font-bold text-center py-6'>Lock aplication</h2>
                    <p className='text-center text-4xl font-bold'>$Free</p>
                    <div className='text-center font-medium'>
                        <p className='mx-8 mt-8'>Lock app to</p>
                        <p className='mx-8'>secure your kids</p>
                        <p className='mx-8'>from adicted app</p>
                    </div>
                    <Link to="/lock-app" className='justify-center items-center text-center' >
                        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>Details</button>
                    </Link>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={schedulePic} alt="#" />
                    <h2 className='text-2xl font-bold text-center py-6'>Scheduling </h2>
                    <p className='text-center text-4xl font-bold'>$Free</p>
                    <div className='text-center font-medium'>
                        <p className='mx-8 mt-8'>Set time</p>
                        <p className='mx-8'>scheduling your kids</p>
                        <p className='mx-8'>when usage app</p>
                    </div>
                    <Link to="/time-usage" className='justify-center items-center text-center' >
                        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>Details</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Features