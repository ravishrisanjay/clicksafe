import React, { useState } from 'react';

export default function ReportIncident() {
  const [activeTab, setActiveTab] = useState('financial');

  const content = {
    financial: {
      icon: "💸",
      title: "Financial Fraud",
      steps: [
        "IMMEDIATELY call 1930 (National Cyber Crime Helpline). Reporting within the 'Golden Hour' is critical.",
        "Contact your bank's fraud department to block cards and freeze accounts.",
        "Change your net banking and UPI PINs immediately.",
        "File a formal complaint at cybercrime.gov.in.",
        "Do not delete any SMS or transaction alerts; take screenshots as evidence."
      ]
    },
    social: {
      icon: "🔓",
      title: "Account Hacked",
      steps: [
        "Do not pay any ransom if demanded by the hacker.",
        "Check your email for 'Login Alert' messages and try the 'Secure your account' link.",
        "Use the 'Forgot Password' option and verify identity via video selfie if available.",
        "Inform friends/followers via another platform (e.g., WhatsApp) that you are hacked.",
        "Enable Two-Factor Authentication (2FA) immediately upon recovery."
      ]
    },
    blackmail: {
      icon: "⚠️",
      title: "Sextortion / Blackmail",
      steps: [
        "DO NOT PAY. Paying never stops the blackmail; they will ask for more.",
        "Stop all communication but DO NOT BLOCK immediately (mute them) to preserve chat history.",
        "Take screenshots of threats, profile URLs, and payment demands.",
        "Deactivate (don't delete) social accounts temporarily to cut off access to your friends list.",
        "Report to the local cyber cell or cybercrime.gov.in immediately."
      ]
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30 flex items-center justify-center p-6">
      
      <div className="max-w-4xl w-full">
        
        {/* 1. HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center justify-center gap-3">
            <span className="animate-pulse text-red-500">🚨</span> 
            Victim Support <span className="text-red-500">Centre</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Don't panic. Follow these emergency steps immediately to minimize damage and recover your assets.
          </p>
        </div>

        {/* 2. EMERGENCY HELPLINE BOX */}
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold animate-pulse">
              📞
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Emergency Helpline (India)</h3>
              <p className="text-red-200">Dial <strong className="text-white text-lg">1930</strong> immediately for financial fraud.</p>
            </div>
          </div>
          <a 
            href="https://cybercrime.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/30"
          >
            Report on CyberCrime.gov.in →
          </a>
        </div>

        {/* 3. TABS NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'financial', label: 'Money Loss', icon: '💸' },
            { id: 'social', label: 'Account Hacked', icon: '🔓' },
            { id: 'blackmail', label: 'Blackmail', icon: '⚠️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyber-800 text-white border-2 border-brand-500 shadow-glow transform -translate-y-1'
                  : 'bg-cyber-900/50 text-slate-400 border-2 border-cyber-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. CONTENT CARD */}
        <div className="bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Background Glow based on tab */}
          <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] -z-10 opacity-20 ${
            activeTab === 'financial' ? 'bg-red-500' :
            activeTab === 'social' ? 'bg-blue-500' : 'bg-amber-500'
          }`}></div>

          <div className="flex items-center gap-4 mb-8 border-b border-cyber-700 pb-4">
            <span className="text-4xl">{content[activeTab].icon}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {content[activeTab].title}
            </h2>
          </div>

          <ul className="space-y-6">
            {content[activeTab].steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4 p-4 bg-cyber-800/50 rounded-xl border border-cyber-700 hover:bg-cyber-800 transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-cyber-700 text-center">
            <p className="text-slate-500 text-sm">
              Note: This information is for immediate guidance only. Always follow official instructions from law enforcement.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}