import React, { useContext, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavbarLayout() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    // 1. GLOBAL DARK WRAPPER: Forces the whole app to be dark
    <div className="min-h-screen bg-cyber-900 text-slate-300 font-sans selection:bg-brand-500/30 flex flex-col">
      
      {/* 2. GLASS NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-cyber-900/80 backdrop-blur-lg border-b border-cyber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-glow transition-transform group-hover:scale-110">
                🛡️
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Click<span className="text-brand-500">Safe</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { path: '/learn', label: 'Academy', icon: '🎓' },
                { path: '/detector', label: 'AI Detector', icon: '🤖' },
                { path: '/attack-simulation', label: 'Simulations', icon: '🎭' },
                { path: '/analytics', label: 'Intel', icon: '📊' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive(link.path)
                      ? 'bg-cyber-800 text-white shadow-sm border border-cyber-600'
                      : 'text-slate-400 hover:text-white hover:bg-cyber-800/50'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-cyber-800 border border-cyber-600 flex items-center justify-center">
                      👤
                    </div>
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-bold text-white bg-red-500/10 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-bold text-white bg-brand-600 rounded-lg hover:bg-brand-500 shadow-glow transition-all hover:-translate-y-0.5"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-cyber-900 border-b border-cyber-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/learn" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-cyber-800">Academy</Link>
              <Link to="/detector" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-cyber-800">AI Detector</Link>
              <Link to="/attack-simulation" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-cyber-800">Simulations</Link>
              <Link to="/login" className="block w-full text-center mt-4 px-5 py-3 font-bold text-white bg-brand-600 rounded-lg">Login / Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* 3. MAIN CONTENT RENDERER */}
      <main className="flex-grow relative">
        {/* Decorative Background Mesh */}
        <div className="fixed inset-0 pointer-events-none z-0">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Page Content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-cyber-900 border-t border-cyber-800 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 ClickSafe Defense Platform. Enterprise Security for Everyone.
          </p>
        </div>
      </footer>

    </div>
  );
}