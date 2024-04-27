import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    fetchProfilePicture();
  }, []);

  const checkLoginStatus = () => {
    fetch("http://localhost:8888/auth/check", {
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

  const fetchProfilePicture = () => {
    fetch("http://localhost:8888/user/profile", {
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch profile picture');
      })
      .then(data => {
        if (data.PictureURL) {
          setProfilePicture(data.PictureURL);
        } else {
          throw new Error('Profile picture URL not found');
        }
      })
      .catch(error => {
        console.error('Error fetching profile picture:', error);
      });
  };

  const handleLogout = () => {
    fetch("http://localhost:8888/auth/logout", {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          navigate("/LoginPage");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>
        <Link to='/'>SenDigi</Link>
      </h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>
          <Link to='/'>Home</Link>
        </li>
        <li className='p-4'>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to='/LoginPage'>Login</Link>
          )}
        </li>
        {isLoggedIn && profilePicture && (
          <img
            src={profilePicture}
            alt="Profile"
            className="h-10 w-10 rounded-full mt-3 ml-4"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 50%',
              width: '40px', // Atur lebar gambar secara eksplisit
              height: '40px' // Atur tinggi gambar secara eksplisit
            }}
          />
        )}
      </ul>
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
  );
};

export default Navbar;
