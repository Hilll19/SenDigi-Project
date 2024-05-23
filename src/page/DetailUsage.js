import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import timePic from "../assets/timePic.jpg"
import usagePic1 from "../assets/usagePic1.png"
import usagePic2 from "../assets/usagePic2.png"
import dashboardPic from "../assets/dashboardPic.png"

function DetailUsage() {
  return (
    <div>
      <Navbar />
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto'>
          <h1 className='text-[#0197b2] font-bold text-center text-4xl mb-8'>Time Usage feature</h1>
          <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <img className='w-[500PX] mx-auto my-4' src={timePic} alt='/' />
              <div className='flex flex-col justify-center'>
                <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Time Usage Feature in SenDigi</p>
                <p>
                  With the Time Usage feature in SenDigi, we offer a trusted solution for parents to monitor and manage
                  their children's gadget usage in today's digital era. Through our user-friendly platform accessible
                  via both web and mobile devices, we provide extensive access for parents to monitor their children's
                  online activities in real-time. With SenDigi, you can mitigate the risks associated with exposure to
                  inappropriate content, screen addiction, and the perils of gadget dependency. Join us at SenDigi and
                  become part of the initiative to safeguard the digital well-being of the next generation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto'>
          <h1 className='text-[#0197b2] font-bold text-center text-4xl mb-8'>Benefit</h1>
          <div className='w-full bg-[#FAF9F6] py-16 px-4 rounded-lg'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 pt-8'>Time Usage Benefit</p>
              <ol className='list-decimal pt-8'>
                <li>
                  <strong>Comprehensive Parental Monitoring :</strong> The Time Usage feature provides a comprehensive
                  platform accessible via web and mobile devices, empowering parents with robust tools to monitor and
                  control their children's online activities in real-time.
                </li>
                <li>
                  <strong>Flexibility :</strong> Parents gain flexibility with the ability to monitor and control their
                  children's gadget usage across multiple devices, ensuring a seamless experience regardless of the
                  device being used.
                </li>
                <li>
                  <strong>Real-Time Monitoring and Control :</strong> With real-time monitoring and control
                  functionalities, parents can promptly respond to any concerns or inappropriate activities, fostering a
                  safer digital environment for their children.
                </li>
                <li>
                  <strong>Customized Access Control :</strong> Parents can personalize access control profiles for each
                  child, tailoring the restrictions to match their individual needs and developmental stages, thereby
                  ensuring a safer online experience.
                </li>
                <li>
                  <strong>Insightful Usage Reports :</strong> The Time Usage feature enables parents to access
                  comprehensive reports on their children's online activities, providing valuable insights into usage
                  patterns and helping parents make informed decisions about their children's digital habits
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full py-[10rem] px-4 bg-white'>
        <h1 className='text-[#0197b2] font-bold text-center text-4xl mb-20'>Main Feature</h1>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-30 h-80 mx-auto mt-[-3rem] bg-white' src={dashboardPic} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>Dashboard Option</h2>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>1. Provides dashboard options that can be used</p>
              <p className='mx-8'>2. Monitor data via the dashboard</p>
              <p className='mx-8'>3. The dashboard also provides a menu of other features in the sidebarr</p>
            </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-30 mx-auto mt-[-3rem] bg-white' src={usagePic1} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>Statistic Analyze Data</h2>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>1. Provide time analyze data from aplication</p>
              <p className='mx-8'>2. From data daily, weekly, and months</p>
              <p className='mx-8'>3. Provide Chart persentase</p>
            </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-30 h-80 mx-auto mt-[-3rem] bg-white' src={usagePic2} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>App List Monitoring</h2>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>1. Provide application data from mobile</p>
              <p className='mx-8'>2. Provides estimated time data for application usage</p>
              <p className='mx-8'>3. Realtime App list data from Mobile</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Profil/> */}
      {/* <Features /> */}
      <Footer />
    </div>
  )
}

export default DetailUsage
