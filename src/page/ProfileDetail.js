import React from "react"
import hilPic from "../assets/hilPic.jpeg"
import resPic from "../assets/resPic.jpeg"
import schedulePic from "../assets/schedule.png"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Pic2 from "../assets/pic2.jpg"

function ProfileDetail() {
  return (
    <div>
      <Navbar />
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto'>
          <h1 className='text-[#00df9a] font-bold text-center text-4xl mb-8'>Company Profile</h1>
          <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <img className='w-[500PX] mx-auto my-4' src={Pic2} alt='/' />
              <div className='flex flex-col justify-center'>
                <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>SenDigi (Sentinel Digital)</p>
                <p>
                  Welcome to SenDigi (Sentinel Digital)! We are your trusted solution for parents to monitor and manage
                  children's gadget usage in the digital age. With our user-friendly platform accessible via web and
                  mobile devices, we provide extensive access for parents to monitor children's online activities in
                  real-time. With SenDigi, you can mitigate the risks of exposure to inappropriate content, screen
                  addiction, and the dangers of gadget dependency. Join us at SenDigi and be part of the effort to
                  safeguard the digital well-being of the next generation!.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-black py-16 px-4'>
        <div className='max-w-[1240px] mx-auto'>
          <h1 className='text-[#00df9a] font-bold text-center text-4xl mb-8'>Vision & Mission</h1>
          <div className='w-full bg-white py-16 px-4 rounded-lg'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Vision</p>
              <p>
                To become a pioneer in empowering parents with innovative solutions to monitor and manage children's
                technology usage, creating a safe and balanced digital environment for future generations.
              </p>
              <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 pt-8'>Mission</p>
              <ol className='list-decimal pt-8'>
                <li>
                  Provide a user-friendly and feature-rich platform for parents to monitor and control children's online
                  activities in real-time.
                </li>
                <li>
                  Reduce the risks of exposure to inappropriate content, screen addiction, and the dangers of gadget
                  dependency through effective and proactive solutions.
                </li>
                <li>
                  Continuously develop our products and services based on customer feedback, so we can consistently meet
                  the needs and expectations of parents in managing their children's digital lives.
                </li>
                <li>
                  Promote awareness and educate parents on the importance of proper supervision and management of
                  children's technology usage to create a healthy and safe digital environment.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full py-[10rem] px-4 bg-white'>
        <h1 className='text-[#00df9a] font-bold text-center text-4xl mb-20'>Developer</h1>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={hilPic} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>Web Developer</h2>
            <p className='text-center text-2xl font-bold'>Hilmy Febrian</p>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>Frontend & Backend Web</p>
              <p className='mx-8'>Handle UI & UX Web</p>
              <p className='mx-8'>Pentes Website</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>
              Details
            </button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={resPic} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>Fullstack Engineer</h2>
            <p className='text-center text-2xl font-bold'>Resqi Ageng</p>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>Backend</p>
              <p className='mx-8'>Server & API</p>
              <p className='mx-8'>Team Lead</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>
              Details
            </button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={schedulePic} alt='#' />
            <h2 className='text-3xl font-bold text-center py-6'>Mobile Developer</h2>
            <p className='text-center text-2xl font-bold'>Nathan Dwipasca</p>
            <div className='text-center font-medium'>
              <p className='mx-8 mt-8'>Mobile UI & UX</p>
              <p className='mx-8'>Mobile Testing</p>
              <p className='mx-8'>Mobile Designer</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>
              Details
            </button>
          </div>
        </div>
      </div>
      {/* <Profil/> */}
      {/* <Features /> */}
      <Footer />
    </div>
  )
}

export default ProfileDetail
