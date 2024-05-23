import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate, /*useLocation*/ } from "react-router-dom";
import logoSendigi from "../assets/logoSendigi.png";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  //const location = useLocation(); // Hook to get current location

  useEffect(() => {
    checkLoginStatus();
    fetchProfilePicture();
  }, []);

  const checkLoginStatus = () => {
    fetch(process.env.REACT_APP_AUTH_CHECK_URL, {
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
    fetch(process.env.REACT_APP_GET_PICTURE_URL, {
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
    fetch(process.env.REACT_APP_LOGOUT_USER, {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          navigate("/login");
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

  // Determine the text color based on the current path
 // const textColor = (location.pathname === '/' || location.pathname === '/login') ? 'text-white' : 'text-black';

  return (

    <div className={`flex justify-between items-center h-24 w-full mx-auto px-4 text-black bg-white`}>
      <h1 className='w-full text-3xl font-bold text-[#0197b2] flex gap-2 items-center md:ml-[25%] '>
        <img
          className="w-[50px]"
          src={logoSendigi}
          alt="SenDigi"
        />
        <h1 className='text-3xl font-bold text-[#0197b2]'>SenDigi</h1>
      </h1>
      <ul className='hidden md:flex md:mr-[25%]'>
        <li className='p-4 '>
          <Link to='/' className="hover:text-[#0197b2]">Home</Link>
        </li>
        <li className='p-4'>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to='/login' className="hover:text-[#0197b2]">Login</Link>
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
              width: '40px',
              height: '40px'
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
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 z-50"
            : "fixed left-[-100%]"
        }>
        <h1 className='w-full text-3xl font-bold text-[#0197b2] m-4'>SenDigi</h1>
        <ul className='p-4 uppercase'>
          <li className='p-4 border-b border-gray-600 '>
            <Link to='/' className="text-black hover:text-[#0197b2]">Home</Link>
          </li>
          <li className='p-4 border-b border-gray-600'>
            <Link to='/company' className="text-black hover:text-[#0197b2]">Company</Link>
          </li>
          <li className='p-4 border-b border-gray-600 text-black hover:text-[#0197b2] hover:cursor-pointer'>About</li>
          <li className='p-4 border-b border-gray-600 text-black hover:text-[#0197b2] hover:cursor-pointer'>Contact</li>
          <li className='p-4'>
            {isLoggedIn ? (
              <button className="text-black hover:text-[#0197b2]" onClick={handleLogout}>LOGOUT</button>
            ) : (
              <Link to='/login' className="text-black hover:text-[#0197b2]">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
