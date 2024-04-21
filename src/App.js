// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProfileDetail from './page/ProfileDetail';
import TimeUsage from './page/TimeUsage';
import LockApp from './page/LockApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-detail" element={<ProfileDetail />} />
        <Route path="/time-usage" element={<TimeUsage />} />
        <Route path="/lock-app" element={<LockApp />} />
      </Routes>
    </Router>
  );
}

export default App;
