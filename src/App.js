import React from 'react';
import './App.css';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { Routes, Route, Navigate } from 'react-router-dom';
import User from './pages/User';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
