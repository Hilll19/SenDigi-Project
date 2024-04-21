import React from 'react';
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-ful h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] font-boldp-2'>MONITORING YOUR KIDS</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Guard with SenDigi</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Real-Time, Trusted, Secured</p>
                <ReactTyped className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2' strings={['Family', 'Parents', 'Kids']} typeSpeed={120} backSpeed={146} loop/>
            </div>
            <p className='md:text-2zl text-xl font-bold text-gray-500'>Monitoring your digital activity kids to guard from negatife effect gadget </p>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>
    </div>
  )
}

export default Hero