// Profil.jsx
import React from "react"
import { Link } from "react-router-dom" // Import Link
import Pic2 from "../assets/pic2.jpg"

function Profil() {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500PX] mx-auto my-4' src={Pic2} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold'>PROFILE</p>
          <p className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>SenDigi</p>
          <p>
            We are your trusted solution for parents to monitor and manage children's gadget usage in the digital age.
            With our user-friendly platform accessible via web and mobile devices, we provide extensive access for
            parents to monitor children's online activities in real-time. With SenDigi, you can mitigate the risks of
            exposure to inappropriate content, screen addiction, and the dangers of gadget dependency. Join us at
            SenDigi and be part of the effort to safeguard the digital well-being of the next generation!.
          </p>
          {/* Ganti button dengan Link */}
          <Link to='/Profile-Detail' className='my-6 mr-auto'>
            <button className='bg-black text-[#00df9a] w-full rounded-md font-medium md:mx-0 py-3 px-6'>
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profil
