import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

// Components
import NavbarLayout from './components/NavbarLayout';
import RequireAuth from './components/RequireAuth';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Learn from './pages/Learn';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import AttackSimulation from './pages/AttackSimulation';
import AwarenessPage from './pages/AwarenessPage';
import ReportIncident from './pages/ReportIncident';
import PhishingDetector from './pages/PhishingDetector';

// Simulations
import NetflixLogin from './simulations/NetflixLogin'; 
import Facebook from './simulations/Facebook';
import Instagram from './simulations/Instagram';
import Google from './simulations/Google';
import Amazon from './simulations/Amazon';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="about" element={<About />} />
            <Route path="report-incident" element={<ReportIncident />} />
            
            {/* 🔒 PROTECTED ROUTES (Login Required) */}
            <Route 
              path="profile" 
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } 
            />
            
            {/* 👇 MOVED HERE: Now requires login to access */}
            <Route 
              path="detector" 
              element={
                <RequireAuth>
                  <PhishingDetector />
                </RequireAuth>
              } 
            />
            
            <Route path="attack-simulation" element={<AttackSimulation />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Fake Login Routes */}
          <Route path="/netflix" element={<NetflixLogin/>} />
          <Route path="/facebook" element={<Facebook/>} />
          <Route path="/instagram" element={<Instagram/>} />
          <Route path="/google" element={<Google/>} />
          <Route path="/amazon" element={<Amazon/>} />
          <Route path="/awareness" element={<AwarenessPage/>} /> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);