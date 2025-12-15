import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkNotFound() {
  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30 flex items-center justify-center p-6">
      
      <div className="max-w-2xl w-full bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-red-500/10 rounded-full blur-[120px] -z-10"></div>

        {/* 1. HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyber-800 rounded-full mb-6 border border-cyber-700 shadow-glass">
            <span className="text-5xl animate-pulse">🚫</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Link <span className="text-red-500">Not Found</span>
          </h1>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-left">
            <p className="text-lg text-slate-300 mb-4">
              The link you clicked is invalid, removed, or never existed. If you received this link unexpectedly, be cautious.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                The link might be broken or incomplete.
              </li>
              <li className="flex items-center gap-3 text-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                It could be a malicious link that was taken down.
              </li>
            </ul>
          </div>
        </div>

        {/* 2. SAFETY TIPS */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-brand-500">🛡️</span> Stay Safe Online
          </h3>
          
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Verify Senders</h4>
                <p className="text-sm text-slate-400">Always check who sent the link before clicking.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Hover to Inspect</h4>
                <p className="text-sm text-slate-400">Hover over links to see the actual URL destination.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Go Direct</h4>
                <p className="text-sm text-slate-400">When in doubt, type the website address directly into your browser.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-cyber-700 pt-8">
          <Link to="/learn" className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all hover:-translate-y-1 text-center">
            📚 Learn Protection
          </Link>
          <Link to="/attack-simulation" className="px-8 py-3 bg-cyber-800 border border-cyber-700 hover:border-brand-500 text-white rounded-xl font-bold transition-all hover:-translate-y-1 text-center">
            🎭 Try Simulations
          </Link>
          <Link to="/" className="px-8 py-3 bg-transparent border border-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold transition-all hover:-translate-y-1 text-center">
            🏠 Homepage
          </Link>
        </div>

        {/* 4. FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Stay vigilant with <strong>ClickSafe</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}