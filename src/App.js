import React, { useState } from 'react';
import './App.css';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let stringValue = localStorage.getItem('user');
    let numberValue = parseInt(stringValue, 10);

    if (numberValue === 200) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
