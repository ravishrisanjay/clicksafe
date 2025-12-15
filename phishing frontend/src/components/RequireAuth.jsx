import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure AuthContext has hydration time
    const timer = setTimeout(() => setIsChecking(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // 1. PREMIUM LOADING SCREEN (Instead of null)
  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-900 text-white">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-cyber-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">🛡️</span>
          </div>
        </div>
        <p className="mt-6 text-slate-400 font-mono text-sm animate-pulse">
          VERIFYING_CREDENTIALS...
        </p>
      </div>
    );
  }

  // 2. REDIRECT IF NOT LOGGED IN
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. RENDER PROTECTED PAGE
  return children;
};

export default RequireAuth;