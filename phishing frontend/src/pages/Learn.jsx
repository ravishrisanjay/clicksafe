import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Learn() {
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // --- DATA CONSTANTS ---
  const sections = [
    { id: 'overview', title: 'Overview', icon: '🔍' },
    { id: 'types', title: 'Types of Attacks', icon: '🎭' },
    { id: 'psychology', title: 'Psychology', icon: '🧠' },
    { id: 'identification', title: 'How to Identify', icon: '🕵️' },
    { id: 'examples', title: 'Real Examples', icon: '📧' },
    { id: 'protection', title: 'Protection', icon: '🛡️' },
    { id: 'response', title: 'Incident Response', icon: '🚨' },
    { id: 'advanced', title: 'Advanced Topics', icon: '🎓' },
    { id: 'quiz', title: 'Knowledge Check', icon: '🧪' }
  ];

  const phishingStats = [
    { label: 'Emails sent daily', value: '3.4 Billion', icon: '📧', color: 'text-brand-500' },
    { label: 'Orgs targeted', value: '83%', icon: '🏢', color: 'text-purple-500' },
    { label: 'Avg cost per breach', value: '$4.9M', icon: '💰', color: 'text-amber-500' },
    { label: 'Success rate', value: '36%', icon: '⚠️', color: 'text-danger' }
  ];

  const realExamples = [
    {
      type: 'Email Phishing',
      subject: 'Urgent: Your PayPal Account Has Been Suspended',
      sender: 'security@paypaI-alerts.com',
      content: 'We detected unusual activity on your account. Click here to verify your identity within 24 hours or your account will be permanently suspended.',
      redFlags: ['Misspelled domain (PaypaI vs PayPal)', 'Urgent language', 'Fear tactics', 'Suspicious link'],
      severity: 'High'
    },
    {
      type: 'SMS Phishing',
      sender: 'DELIVERY',
      content: 'Your package delivery failed. Click here to reschedule: bit.ly/package-delivery-urgent',
      redFlags: ['Shortened URL', 'Generic sender', 'Unexpected message', 'Urgency'],
      severity: 'Medium'
    },
    {
      type: 'Social Media',
      platform: 'WhatsApp',
      content: 'Hi! I need help urgently. Can you send me $500 via UPI? I\'ll pay back tomorrow. My phone is broken so I\'m messaging from a new number.',
      redFlags: ['Urgency', 'Money request', 'New contact', 'Emotional manipulation'],
      severity: 'High'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the most common type of phishing attack?',
      options: ['Email phishing', 'SMS phishing', 'Voice phishing', 'Social media phishing'],
      correct: 0,
      explanation: 'Email phishing remains the most common attack vector, accounting for over 90% of all phishing attempts.'
    },
    {
      id: 2,
      question: 'Which of these is a major red flag in phishing messages?',
      options: ['Professional formatting', 'Urgent language creating fear', 'Personalized greeting', 'Company logo'],
      correct: 1,
      explanation: 'Urgent language designed to create fear and panic is a classic phishing tactic to make victims act quickly without thinking.'
    },
    {
      id: 3,
      question: 'What should you do if you suspect a phishing email?',
      options: ['Forward it to friends', 'Click the link to verify', 'Delete immediately', 'Report and delete'],
      correct: 3,
      explanation: 'You should report phishing emails to your IT department or anti-phishing services, then delete them safely.'
    }
  ];

  // --- LOGIC ---
  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
    markSectionComplete('quiz');
  };

  const getQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return { correct, total: quizQuestions.length, percentage: Math.round((correct / quizQuestions.length) * 100) };
  };

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HEADER & PROGRESS */}
      <div className="bg-cyber-900 border-b border-cyber-700 sticky top-16 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🎓</span> Phishing Defense Academy
              </h1>
              <p className="text-slate-400 text-sm mt-1">Module 1: Comprehensive Awareness Training</p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full md:w-64">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round((completedSections.size / sections.length) * 100)}%</span>
              </div>
              <div className="w-full bg-cyber-800 rounded-full h-2.5 border border-cyber-700">
                <div 
                  className="bg-brand-500 h-2.5 rounded-full transition-all duration-500 shadow-glow" 
                  style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        
        {/* 2. SIDEBAR NAVIGATION */}
        <nav className="hidden lg:block sticky top-44 space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeSection === section.id 
                  ? 'bg-brand-600 text-white shadow-glow' 
                  : 'text-slate-400 hover:bg-cyber-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="flex-1 text-left">{section.title}</span>
              {completedSections.has(section.id) && (
                <span className="text-emerald-400">✓</span>
              )}
            </button>
          ))}
        </nav>

        {/* 3. MAIN CONTENT AREA */}
        <main className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 rounded-3xl p-8 md:p-12 shadow-glass min-h-[600px]">
          
          {/* --- OVERVIEW --- */}
          {activeSection === 'overview' && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-3xl font-bold text-white border-b border-cyber-700 pb-4">Understanding the Threat</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Phishing is a cybercrime in which a target is contacted by email, telephone, or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {phishingStats.map((stat, i) => (
                  <div key={i} className="bg-cyber-800/50 p-4 rounded-2xl border border-cyber-700 text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
                <h3 className="text-amber-500 font-bold text-lg mb-2">📚 Core Definition</h3>
                <p className="text-slate-300">
                  <span className="text-white font-bold">Phishing (verb):</span> The fraudulent practice of sending emails or other messages purporting to be from reputable companies in order to induce individuals to reveal personal information, such as passwords and credit card numbers.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-cyber-700">
                <h3 className="text-xl font-bold text-white mb-6">Evolution of Attacks</h3>
                <div className="space-y-6 relative border-l-2 border-cyber-700 ml-3 pl-8">
                  {[
                    { year: '1990s', title: 'The Spam Era', text: 'Mass emails sent to millions hoping for a few clicks.' },
                    { year: '2005', title: 'The Banking Era', text: 'Fake banking websites designed to steal login credentials.' },
                    { year: '2015', title: 'The Mobile Era', text: 'Attacks moved to SMS (Smishing) and social media apps.' },
                    { year: '2025', title: 'The AI Era', text: 'Deepfakes, voice cloning, and AI-generated personalized attacks.' }
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-brand-500 border-4 border-cyber-900"></span>
                      <span className="text-brand-400 font-mono text-sm font-bold">{item.year}</span>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => markSectionComplete('overview')} className="w-full py-4 mt-8 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all">
                Complete Section & Continue →
              </button>
            </div>
          )}

          {/* --- TYPES OF ATTACKS --- */}
          {activeSection === 'types' && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-3xl font-bold text-white border-b border-cyber-700 pb-4">Types of Phishing</h2>
              
              <div className="grid gap-6">
                {[
                  { icon: '📧', title: 'Email Phishing', risk: 'High', desc: 'The most common form. Attackers send emails impersonating known brands.', color: 'border-blue-500/30' },
                  { icon: '🎯', title: 'Spear Phishing', risk: 'Critical', desc: 'Highly targeted attacks using personal details gathered from social media to trick a specific person.', color: 'border-red-500/50' },
                  { icon: '🐋', title: 'Whaling', risk: 'Critical', desc: 'Targeting high-profile executives (CEOs, CFOs) to steal sensitive company data or authorize transfers.', color: 'border-purple-500/50' },
                  { icon: '📱', title: 'Smishing (SMS)', risk: 'Medium', desc: 'Phishing via SMS text messages, often claiming a package delivery failed.', color: 'border-green-500/30' },
                  { icon: '📞', title: 'Vishing (Voice)', risk: 'High', desc: 'Phone calls from scammers pretending to be tech support or the IRS.', color: 'border-amber-500/30' }
                ].map((type, i) => (
                  <div key={i} className={`bg-cyber-800/30 p-6 rounded-2xl border ${type.color} hover:bg-cyber-800/50 transition-all`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{type.icon}</span>
                        <h3 className="text-xl font-bold text-white">{type.title}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        type.risk === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        type.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {type.risk} Risk
                      </span>
                    </div>
                    <p className="text-slate-400 ml-12">{type.desc}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => markSectionComplete('types')} className="w-full py-4 mt-8 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all">
                Complete Section & Continue →
              </button>
            </div>
          )}

          {/* --- REAL EXAMPLES --- */}
          {activeSection === 'examples' && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-3xl font-bold text-white border-b border-cyber-700 pb-4">Anatomy of an Attack</h2>
              
              <div className="space-y-12">
                {realExamples.map((ex, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-2xl">
                    {/* Fake Email Header */}
                    <div className="bg-slate-100 border-b border-slate-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 text-lg">{ex.subject}</span>
                        <span className="text-xs font-mono bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200">FAKE</span>
                      </div>
                      <div className="text-sm text-slate-500">
                        <span className="font-bold text-slate-600">From:</span> {ex.sender}
                      </div>
                    </div>
                    
                    {/* Fake Email Body */}
                    <div className="p-6 text-slate-800 font-sans">
                      <p>{ex.content}</p>
                    </div>

                    {/* Red Flags Analysis */}
                    <div className="bg-cyber-900 p-6 border-t-4 border-red-500">
                      <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                        <span>🚩</span> Red Flags Detected:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ex.redFlags.map((flag, idx) => (
                          <span key={idx} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-sm">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => markSectionComplete('examples')} className="w-full py-4 mt-8 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow transition-all">
                Complete Section & Continue →
              </button>
            </div>
          )}

          {/* --- QUIZ SECTION --- */}
          {activeSection === 'quiz' && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Knowledge Check</h2>
                <p className="text-slate-400">Prove your skills to earn your certificate of completion.</p>
              </div>

              <div className="space-y-8">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-cyber-800/30 p-6 rounded-2xl border border-cyber-700">
                    <h3 className="text-lg font-bold text-white mb-4">
                      <span className="text-brand-500 mr-2">{idx + 1}.</span>
                      {q.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={showQuizResults}
                          onClick={() => handleQuizAnswer(q.id, optIdx)}
                          className={`w-full text-left px-5 py-3 rounded-xl border transition-all ${
                            showQuizResults 
                              ? optIdx === q.correct 
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : quizAnswers[q.id] === optIdx 
                                  ? 'bg-red-500/20 border-red-500 text-red-300'
                                  : 'bg-cyber-900/50 border-cyber-700 text-slate-500'
                              : quizAnswers[q.id] === optIdx
                                ? 'bg-brand-500/20 border-brand-500 text-white shadow-glow'
                                : 'bg-cyber-900/50 border-cyber-700 text-slate-400 hover:bg-cyber-800 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {showQuizResults && (
                      <div className="mt-4 p-4 bg-cyber-900/80 rounded-xl border border-cyber-700 text-sm text-slate-300">
                        <span className="font-bold text-brand-400">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!showQuizResults ? (
                <button 
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                  className="w-full py-4 mt-8 bg-brand-600 hover:bg-brand-500 disabled:bg-cyber-800 disabled:text-slate-600 text-white rounded-xl font-bold shadow-glow transition-all"
                >
                  Submit Answers
                </button>
              ) : (
                <div className="mt-8 p-8 bg-cyber-800 rounded-2xl border border-cyber-700 text-center animate-fade-in-up">
                  <div className="text-4xl font-bold text-white mb-2">{getQuizScore().percentage}%</div>
                  <p className="text-slate-400 mb-6">You got {getQuizScore().correct} out of {getQuizScore().total} correct</p>
                  
                  {getQuizScore().percentage >= 70 ? (
                    <div className="inline-block px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 font-bold">
                      🎉 Certified Cyber Defender
                    </div>
                  ) : (
                    <button onClick={() => {setShowQuizResults(false); setQuizAnswers({});}} className="text-brand-400 hover:text-brand-300 underline">
                      Try Again
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- GENERIC PLACEHOLDER FOR OTHER SECTIONS --- */}
          {['psychology', 'identification', 'protection', 'response', 'advanced'].includes(activeSection) && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-cyber-700 pb-4">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <div className="bg-brand-900/20 border border-brand-500/20 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🚧</div>
                <h3 className="text-xl font-bold text-white mb-2">Content Loading...</h3>
                <p className="text-slate-400">This advanced module is part of the full curriculum.</p>
                <button onClick={() => markSectionComplete(activeSection)} className="mt-6 px-6 py-2 bg-cyber-800 hover:bg-cyber-700 text-white rounded-lg transition-colors">
                  Skip & Mark Complete
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}