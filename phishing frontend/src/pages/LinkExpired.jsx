import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkExpired() {
  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30 flex items-center justify-center p-6">
      
      <div className="max-w-2xl w-full bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>

        {/* 1. HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyber-800 rounded-full mb-6 border border-cyber-700 shadow-glass">
            <span className="text-5xl animate-pulse">⏰</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Link <span className="text-amber-500">Expired</span>
          </h1>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-left">
            <p className="text-lg text-slate-300 mb-4">
              The awareness simulation link you clicked is no longer active. This usually happens for two reasons:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                The time limit (e.g., 24 hours) has passed.
              </li>
              <li className="flex items-center gap-3 text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                The maximum number of allowed clicks was reached.
              </li>
            </ul>
          </div>
        </div>

        {/* 2. EDUCATIONAL CONTENT */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-brand-500">🎓</span> Why Do Links Expire?
          </h3>
          
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">🔒</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Security Best Practice</h4>
                <p className="text-sm text-slate-400">Legitimate services (like password resets) use time-limited links to prevent unauthorized access if an old email is compromised.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">⚠️</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Scammer Tactics</h4>
                <p className="text-sm text-slate-400">Attackers often create fake urgency ("Expires in 10 minutes!") to make you panic and click without thinking. Always verify deadlines.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">🛡️</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Safe Verification</h4>
                <p className="text-sm text-slate-400">If a link expires, don't request a new one from the same email. Go directly to the official website (e.g., netflix.com) to check your account status.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-cyber-700 pt-8">
          <Link to="/learn" className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all hover:-translate-y-1 text-center">
            📚 Learn More
          </Link>
          <Link to="/" className="px-8 py-3 bg-transparent border border-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold transition-all hover:-translate-y-1 text-center">
            🏠 Go Home
          </Link>
        </div>

        {/* 4. FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            This was an educational simulation by <strong>ClickSafe</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}