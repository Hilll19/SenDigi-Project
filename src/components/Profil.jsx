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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel provident tenetur modi accusamus eum eius eos
            minus incidunt officia dolorem. Ratione totam eum facere quia. Cumque repudiandae cum at labore.
          </p>
          {/* Ganti button dengan Link */}
          <Link to='/Profile-Detail'>
            <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profil
