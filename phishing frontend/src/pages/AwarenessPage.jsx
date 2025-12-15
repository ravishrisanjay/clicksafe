import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function AwarenessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get platform details
  const urlParams = new URLSearchParams(location.search);
  const platform = urlParams.get('platform') || location.state?.platform || 'unknown';
  const message = location.state?.message || `You just clicked a simulated ${platform} link!`;

  // Platform Styling Config
  const platformConfig = {
    facebook: { icon: '📘', color: 'text-blue-500', border: 'border-blue-500', bg: 'bg-blue-500/10' },
    instagram: { icon: '📷', color: 'text-pink-500', border: 'border-pink-500', bg: 'bg-pink-500/10' },
    netflix: { icon: '🎬', color: 'text-red-600', border: 'border-red-600', bg: 'bg-red-600/10' },
    amazon: { icon: '📦', color: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500/10' },
    google: { icon: '🌐', color: 'text-blue-400', border: 'border-blue-400', bg: 'bg-blue-400/10' },
    unknown: { icon: '🎯', color: 'text-brand-500', border: 'border-brand-500', bg: 'bg-brand-500/10' }
  };

  const currentConfig = platformConfig[platform.toLowerCase()] || platformConfig.unknown;

  const getPhishingTips = (platform) => {
    const tips = {
      facebook: [
        'Check the URL: Is it really facebook.com?',
        'Look for the padlock (HTTPS) icon.',
        'Facebook never asks for passwords via email.',
        'Enable 2FA to block unauthorized logins.'
      ],
      instagram: [
        'Verify the URL is instagram.com.',
        'Ignore urgent "Account Suspended" DMs.',
        'Check for poor grammar/spelling.',
        'Never login from a link sent by a stranger.'
      ],
      // ... Add other platforms as needed
    };
    return tips[platform.toLowerCase()] || [
      'Always verify the URL before typing.',
      'Be skeptical of urgent requests.',
      'Check for HTTPS and correct domain spelling.',
      'When in doubt, type the address manually.'
    ];
  };

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30 flex items-center justify-center p-6">
      
      <div className="max-w-4xl w-full bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ${currentConfig.bg} rounded-full blur-[120px] -z-10`}></div>

        {/* 1. HEADER ALERT */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyber-800 rounded-full mb-6 border border-cyber-700 shadow-glass animate-bounce">
            <span className="text-5xl">🚨</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Simulation <span className={currentConfig.color}>Alert!</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Don't worry! This was a <span className="text-safe font-bold">safe educational simulation</span>. 
            However, if this were real, your credentials would have been stolen.
          </p>
        </div>

        {/* 2. WARNING CARD */}
        <div className={`bg-cyber-800/50 border-l-4 ${currentConfig.border} rounded-r-xl p-6 mb-10`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{currentConfig.icon}</span>
            <h2 className="text-2xl font-bold text-white capitalize">
              {platform} Phishing Simulation
            </h2>
          </div>
          <p className="text-lg text-slate-300 mb-4">{message}</p>
          <div className="bg-safe/10 border border-safe/20 rounded-lg p-4 text-safe font-semibold flex items-center gap-3">
            <span>🎉</span>
            <span>Great job spotting the simulation! Now let's learn how to spot the real thing.</span>
          </div>
        </div>

        {/* 3. LEARNING SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* What You Missed */}
          <div className="bg-cyber-900/50 border border-cyber-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-amber-500">🚩</span> Red Flags to Spot
            </h3>
            <ul className="space-y-4">
              {getPhishingTips(platform).map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-cyber-800 flex items-center justify-center text-xs border border-cyber-600 shrink-0">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="bg-cyber-900/50 border border-cyber-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-brand-500">📊</span> Why It Matters
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-white">90%</div>
                <div className="text-sm text-slate-500">of data breaches start with a phishing email</div>
              </div>
              <div className="w-full h-px bg-cyber-700"></div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-white">3.4B</div>
                <div className="text-sm text-slate-500">phishing emails are sent daily worldwide</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. ACTIONS */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/learn" className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all hover:-translate-y-1 flex items-center gap-2">
            <span>📚</span> Learn Defense
          </Link>
          <Link to="/attack-simulation" className="px-8 py-4 bg-cyber-800 border border-cyber-700 hover:border-brand-500 text-white rounded-xl font-bold transition-all hover:-translate-y-1 flex items-center gap-2">
            <span>🎭</span> Try Another
          </Link>
          <Link to="/" className="px-8 py-4 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-xl font-bold transition-all hover:-translate-y-1 flex items-center gap-2">
            <span>🏠</span> Home
          </Link>
        </div>

        {/* 5. FOOTER */}
        <div className="mt-12 pt-8 border-t border-cyber-800 text-center">
          <p className="text-slate-500 text-sm">
            This educational tool is safe and does not store any entered credentials.
          </p>
        </div>

      </div>
    </div>
  );
}