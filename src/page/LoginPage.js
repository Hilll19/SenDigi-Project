import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../LoginPage.css'; // Import file CSS untuk animasi

function LoginPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-40">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-center mb-4">Welcome to Login Page!</h1>
            <p className="text-sm text-justify mb-6">We provide a seamless login process with your favorite providers that automatically registers new users, i.e. <strong>no password stored!</strong> <span role="img" aria-label="celebrate">🥳🎉</span></p>
            <a href="https://api.resqiar.com/auth/google" className="block w-full text-center py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Login with Google
            </a>
            <div className="flex justify-center mt-6">
              <p className="text-sm text-gray-600">By logging in, you agree to our <a href="/misc/pp.html" className="underline">Privacy Policy</a> and <a href="/misc/tos.html" className="underline">Terms of Service</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
