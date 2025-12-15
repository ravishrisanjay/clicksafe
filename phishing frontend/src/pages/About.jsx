import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '125K+', label: 'Users Protected', icon: '🛡️', color: 'text-brand-500' },
    { number: '89%', label: 'Prevention Rate', icon: '🎯', color: 'text-emerald-500' },
    { number: '50+', label: 'Countries', icon: '🌍', color: 'text-purple-500' },
    { number: '2.3M', label: 'Threats Stopped', icon: '🔍', color: 'text-amber-500' }
  ];

  const features = [
    { icon: '🎭', title: 'Interactive Sims', desc: 'Practice with realistic scenarios in a safe sandbox.' },
    { icon: '📚', title: 'Expert Learning', desc: 'Lessons covering email scams to social engineering.' },
    { icon: '⚡', title: 'Instant Feedback', desc: 'Get immediate explanations for every action you take.' },
    { icon: '👥', title: 'Community Driven', desc: 'Join thousands sharing real-world threat intel.' },
    { icon: '🆓', title: 'Always Free', desc: 'Enterprise-grade security education for everyone.' },
    { icon: '📱', title: 'Any Device', desc: 'Learn on the go with our responsive mobile platform.' }
  ];

  const teamMembers = [
    { name: 'Dr. Sarah Chen', role: 'Research Director', bio: 'Former NSA analyst with 15+ years in threat intel.', avatar: '👩‍💻' },
    { name: 'Marcus Rodriguez', role: 'EdTech Lead', bio: 'Specialist in gamified learning experiences.', avatar: '👨‍🏫' },
    { name: 'Dr. Emily Watson', role: 'Psychology Expert', bio: 'Expert in social engineering behavioral patterns.', avatar: '👩‍🔬' }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        {/* Glowing Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-cyber-800/50 rounded-full mb-6 border border-cyber-700 backdrop-blur-sm shadow-glass">
            <span className="text-3xl animate-bounce">🛡️</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            About <span className="bg-gradient-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">ClickSafe</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering digital citizens with the skills to recognize, avoid, and report phishing attacks through 
            <span className="text-slate-100 font-semibold"> AI-driven simulations</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/learn" className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all hover:-translate-y-1">
              Start Learning
            </Link>
            <Link to="/attack-simulation" className="px-8 py-3 bg-cyber-800 border border-cyber-700 hover:border-brand-500 text-white rounded-xl font-bold transition-all hover:-translate-y-1">
              Try Simulation
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS BAR */}
      <div className="border-y border-cyber-700 bg-cyber-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{stat.icon}</div>
              <div className={`text-3xl font-extrabold mb-1 ${stat.color}`}>{stat.number}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN CONTENT TABS */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'mission', label: 'Mission', icon: '🎯' },
            { id: 'story', label: 'Story', icon: '📖' },
            { id: 'approach', label: 'Approach', icon: '🔬' },
            { id: 'team', label: 'Team', icon: '👥' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-glow transform -translate-y-1'
                  : 'bg-cyber-800 text-slate-400 hover:bg-cyber-700 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="bg-cyber-800/40 backdrop-blur-md border border-cyber-700 rounded-3xl p-8 md:p-12 min-h-[500px] shadow-glass">
          
          {/* --- MISSION TAB --- */}
          {activeTab === 'mission' && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-3xl font-bold text-white border-l-4 border-brand-500 pl-4">Democratizing Cyber Safety</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  ClickSafe was born from a simple observation: <span className="text-white">Traditional training is boring.</span> People learn best by doing, not by reading PDF manuals.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {[
                    { title: "Accessibility First", icon: "🌟", text: "No technical jargon. We adapt to your pace." },
                    { title: "Evidence Based", icon: "🎓", text: "Backed by cognitive science & threat intel." },
                    { title: "Community Impact", icon: "🤝", text: "Protecting you protects your entire network." }
                  ].map((item, i) => (
                    <div key={i} className="bg-cyber-900/50 p-6 rounded-2xl border border-cyber-700 hover:border-brand-500/50 transition-colors">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h4 className="text-white font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- STORY TAB --- */}
          {activeTab === 'story' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">Our Journey</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {[
                  { year: '2023', title: 'The Spark', text: "Founder's grandmother lost $3k to a phone scam. We decided enough was enough." },
                  { year: '2024', title: 'The Research', text: "Assembled a team of white-hat hackers and psychologists to build a better way to learn." },
                  { year: '2025', title: 'The Launch', text: "ClickSafe goes live. Within months, we prevented thousands of attacks." }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyber-700 bg-cyber-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-brand-500 font-bold text-xs">
                      {item.year}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-cyber-900/80 p-6 rounded-2xl border border-cyber-700 shadow-sm hover:border-brand-500/50 transition-all">
                      <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- APPROACH TAB --- */}
          {activeTab === 'approach' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4">Science of Security</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feat, i) => (
                  <div key={i} className="bg-cyber-900/50 p-6 rounded-2xl border border-cyber-700 hover:bg-cyber-800 transition-all group">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feat.icon}</div>
                    <h3 className="text-white font-bold mb-2">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TEAM TAB --- */}
          {activeTab === 'team' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">The Defenders</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, i) => (
                  <div key={i} className="bg-cyber-900/50 rounded-2xl border border-cyber-700 overflow-hidden hover:shadow-glow transition-all duration-300 group">
                    <div className="h-24 bg-gradient-to-r from-cyber-800 to-cyber-700 relative">
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-cyber-800 rounded-full flex items-center justify-center text-4xl border-4 border-cyber-900 group-hover:scale-110 transition-transform">
                        {member.avatar}
                      </div>
                    </div>
                    <div className="pt-12 pb-6 px-6 text-center">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-brand-500 font-medium text-sm mb-4">{member.role}</p>
                      <p className="text-slate-400 text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center bg-brand-500/10 rounded-2xl p-8 border border-brand-500/20">
                <h3 className="text-2xl font-bold text-white mb-2">Join the Mission?</h3>
                <p className="text-slate-400 mb-6">We are always looking for passionate defenders.</p>
                <Link to="/contact" className="inline-block px-6 py-2 bg-white text-cyber-900 font-bold rounded-lg hover:bg-brand-50 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. CTA FOOTER */}
      <div className="bg-gradient-to-r from-cyber-900 via-blue-900 to-cyber-900 py-20 text-center border-t border-cyber-700">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Strengthen Your Defenses?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of users who have learned to spot the red flags before it's too late.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/learn" className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1">
              Start Training
            </Link>
            <Link to="/analytics" className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-transform hover:-translate-y-1">
              View Impact
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}