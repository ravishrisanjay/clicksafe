import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLayout from './components/NavbarLayout';
import Home from './components/Home';
import Learn from './components/Learn';
import About from './components/About';
import AttackSimulation from './components/AttackSimulation';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Analytics from './components/Analytics';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './components/AuthContext'; // correct relative path
import NetflixLogin from './components/netflixlogin';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap all routes */}
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="attack-simulation" element={<RequireAuth><AttackSimulation /></RequireAuth>} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/netflix-login" element={<NetflixLogin/>} />
            {/* <Route path='/awareness' element={<warness/}></Route> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
