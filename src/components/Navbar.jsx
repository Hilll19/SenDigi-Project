// Navbar.js

import React, { useState, useEffect } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [nav, setNav] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    navigate("/LoginPage")
  }

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>SenDigi</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>
          <Link to='/'>Home</Link>
        </li>
        <li className='p-4'>
          <Link to='/Profile-Detail'>Company</Link>
        </li>
        <li className='p-4'>
          {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <Link to='/LoginPage'>Login</Link>}
        </li>
        <CgProfile className='ml-6' size={50} />
      </ul>
      {/* Handle hamburger menu display */}
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>SenDigi</h1>
        <ul className='p-4 uppercase'>
          <li className='p-4 border-b border-gray-600'>
            <Link to='/'>Home</Link>
          </li>
          <li className='p-4 border-b border-gray-600'>
            <Link to='/Profile-Detail'>Company</Link>
          </li>
          <li className='p-4 border-b border-gray-600'>Resources</li>
          <li className='p-4 border-b border-gray-600'>About</li>
          <li className='p-4'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
