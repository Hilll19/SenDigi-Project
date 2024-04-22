// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProfileDetail from './page/ProfileDetail';
import TimeUsage from './page/TimeUsage';
import LockApp from './page/LockApp';
import LoginPage from './page/LoginPage';
import Dashboard from './page/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/Profile-Detail" element={<ProfileDetail />} />
        <Route path="/Time-Usage" element={<TimeUsage />} />
        <Route path="/Lock-App" element={<LockApp />} />
        <Route path="/LoginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
