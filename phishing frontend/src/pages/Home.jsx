import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "3.4B", label: "Phishing emails daily", icon: "📧" },
    { number: "83%", label: "Orgs attacked this year", icon: "🏢" },
    { number: "$12B", label: "Annual global losses", icon: "💰" },
    { number: "1 in 4", label: "Users fall for scams", icon: "⚠️" }
  ];

  const features = [
    { icon: "🎯", title: "Interactive Sims", desc: "Practice with real-world phishing scenarios in a safe sandbox.", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    { icon: "📊", title: "Live Analytics", desc: "Track your progress and see how your defensive skills improve.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    { icon: "🏆", title: "Skill Badges", desc: "Earn recognition as you master different cybersecurity domains.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    { icon: "👥", title: "Community Intel", desc: "Share new threats and learn from others in real-time.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              #1 Phishing Defense Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Defend Against <br/>
              <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Digital Threats</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master the art of spotting phishing attacks through AI-powered simulations and interactive training.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link to="/learn" className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold shadow-glow transition-all hover:-translate-y-1 flex items-center gap-2">
                <span>🚀</span> Start Training
              </Link>
              <Link to="/attack-simulation" className="px-8 py-4 bg-cyber-800 border border-cyber-700 hover:border-brand-500 text-white rounded-2xl font-bold transition-all hover:-translate-y-1 flex items-center gap-2">
                <span>🎭</span> Try Demo
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="pt-8 border-t border-cyber-700 flex justify-center lg:justify-start gap-12">
              {[
                { label: "Users Protected", val: "100K+" },
                { label: "Success Rate", val: "95%" },
                { label: "Uptime", val: "99.9%" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white">{stat.val}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual / Floating Card */}
          <div className="hidden lg:flex justify-center relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">SECURE_CHANNEL_ESTABLISHED</div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-cyber-800/50 p-4 rounded-xl border border-cyber-700 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center text-xl">🚨</div>
                  <div>
                    <div className="text-white font-bold text-sm">Threat Detected</div>
                    <div className="text-slate-400 text-xs">Phishing attempt blocked</div>
                  </div>
                </div>
                <div className="bg-cyber-800/50 p-4 rounded-xl border border-cyber-700 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-safe/20 flex items-center justify-center text-xl">🛡️</div>
                  <div>
                    <div className="text-white font-bold text-sm">System Protected</div>
                    <div className="text-slate-400 text-xs">Firewall active</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-cyber-700">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Analysis Progress</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-cyber-800 rounded-full h-1.5">
                    <div className="bg-brand-500 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. LIVE THREAT TICKER */}
      <div className="bg-cyber-800/30 border-y border-cyber-700 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8">
          <span className="text-brand-500 animate-pulse">● LIVE</span>
          <div className="flex items-center gap-3 transition-all duration-500">
            <span className="text-2xl">{stats[currentStat].icon}</span>
            <span className="text-white font-bold text-xl">{stats[currentStat].number}</span>
            <span className="text-slate-400">{stats[currentStat].label}</span>
          </div>
        </div>
      </div>

      {/* 3. HOW IT WORKS */}
      <div className="py-24 px-6 bg-cyber-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Defense in Depth</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our 4-step methodology builds unshakeable cybersecurity habits.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Learn", desc: "Master the fundamentals of threat detection.", icon: "📚" },
              { step: "02", title: "Simulate", desc: "Face realistic attacks in a safe environment.", icon: "🧪" },
              { step: "03", title: "Analyze", desc: "Get AI-powered feedback on your actions.", icon: "🤖" },
              { step: "04", title: "Protect", desc: "Apply your skills to secure your digital life.", icon: "🛡️" }
            ].map((item, i) => (
              <div key={i} className="relative bg-cyber-800/30 p-8 rounded-3xl border border-cyber-700 hover:bg-cyber-800/50 transition-all hover:-translate-y-2 group">
                <div className="absolute -top-6 left-8 text-6xl font-black text-cyber-800 group-hover:text-cyber-700 transition-colors select-none">
                  {item.step}
                </div>
                <div className="relative z-10 pt-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FEATURES GRID */}
      <div className="py-24 px-6 bg-cyber-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feat, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${feat.border} ${feat.bg} backdrop-blur-sm transition-all hover:scale-[1.02]`}>
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-cyber-900 border border-cyber-700 shadow-sm shrink-0`}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${feat.color}`}>{feat.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. CTA FOOTER */}
      <div className="py-24 px-6 text-center bg-gradient-to-b from-cyber-900 to-blue-900/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Future?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Join thousands of users who have transformed from vulnerable targets into cyber defenders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/learn" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1">
              Start Free Training
            </Link>
            <Link to="/analytics" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-transform hover:-translate-y-1">
              View Threat Data
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2">🔒 100% Secure</span>
            <span className="flex items-center gap-2">🆓 Forever Free</span>
            <span className="flex items-center gap-2">⚡ Instant Access</span>
          </div>
        </div>
      </div>

    </div>
  );
}