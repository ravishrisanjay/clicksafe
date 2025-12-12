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
import Facebook from './components/Facebook'; // correct relative path
import Instagram from './components/instagram'; // correct relative path
import Google from './facklogin/google';
import Amazon from './facklogin/Amazon';
import AwarenessPage from './components/AwarenessPage'; // ← Added AwarenessPage import

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap all routes */}
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} /> */}
            <Route path="profile" element={<Profile />} />
            {/* <Route path="attack-simulation" element={<RequireAuth><AttackSimulation /></RequireAuth>} /> */}
            <Route path="attack-simulation" element={<AttackSimulation />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>
<<<<<<< HEAD
          <Route path="/netflix" element={<NetflixLogin/>} />
=======
          <Route path="/netflix-login" element={<NetflixLogin/>} />
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
          <Route path="/facebook" element={<Facebook/>} />
          <Route path="/Instagram" element={<Instagram/>} />
          <Route path="/Google" element={<Google/>} />
          <Route path="/Amazon" element={<Amazon/>} />
          <Route path="/awareness" element={<AwarenessPage/>} /> {/* ← Added AwarenessPage route */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
