import React, { useState, useContext, useEffect } from "react";

// Context & Services
import { AuthContext } from "../context/AuthContext";
import AwarenessLinkService from "../services/AwarenessLinkService";
import LinkManager from "../components/LinkManager";

// Simulations
import Facebook from "../simulations/Facebook";
import Instagram from "../simulations/Instagram";
import Google from "../simulations/Google";
import NetflixLogin from "../simulations/NetflixLogin"; 
import Amazon from "../simulations/Amazon";

const phishingData = {
  login: {
    "Facebook": Facebook,
    "Instagram": Instagram,
    "Google": Google,
    "Netflix": NetflixLogin,
    "Amazon": Amazon,
  },
};

const phishingExamples = {
  emails: [
    {
      subject: "🚨 Your Amazon Account Has Been Suspended",
      sender: "security@amazon-support.net",
      content: "Dear Customer,\n\nWe detected unusual activity on your account. Click here to verify your identity within 24 hours to avoid permanent suspension.\n\nVerify Account: amazon-verify.secure-login.net\n\nAmazon Security Team",
      redFlags: ["Suspicious domain", "Urgent language", "Fake urgency", "Misspelled sender"]
    },
    {
      subject: "💰 You've Won $1,000,000!",
      sender: "winner@lottery-international.com",
      content: "Congratulations! You've been selected as our grand prize winner. Click the link below to claim your prize immediately.\n\nClaim Prize: secure-lottery-claim.net/winner\n\nLottery Commission",
      redFlags: ["Too good to be true", "Unknown sender", "Suspicious link", "No verification"]
    },
    {
      subject: "⚠️ Your Bank Account Will Be Closed",
      sender: "alerts@your-bank-security.org",
      content: "Your account will be closed due to security reasons. Update your information immediately to prevent closure.\n\nUpdate Now: bank-secure-update.net\n\nYour Bank Security",
      redFlags: ["Fear tactics", "Fake urgency", "Suspicious domain", "Generic greeting"]
    }
  ],
  sms: [
    {
      sender: "+1-555-BANK",
      message: "ALERT: Suspicious activity detected on your account. Verify immediately: bit.ly/bank-verify-urgent or your account will be locked.",
      redFlags: ["Shortened URL", "Urgent language", "Fear tactics"]
    },
    {
      sender: "PayPal",
      message: "Your PayPal account has been limited. Restore access now: paypal-restore.net/verify. Act within 2 hours!",
      redFlags: ["Fake domain", "Time pressure", "Impersonation"]
    },
    {
      sender: "+91-98765-43210",
      message: "Congratulations! You've won iPhone 15 Pro. Claim here: apple-winner.com/claim. Limited time offer!",
      redFlags: ["Unknown number", "Too good to be true", "Suspicious domain"]
    }
  ]
};

export default function AttackSimulation() {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("demo");
  const [activeCategory, setActiveCategory] = useState("Facebook");
  
  // New state for link generation
  const [linkSettings, setLinkSettings] = useState({
    platformType: "facebook",
    expiryHours: 24,
    maxClicks: 1
  });
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [recentlyGenerated, setRecentlyGenerated] = useState(null);

  // Load user's existing links on component mount
  useEffect(() => {
    if (isAuthenticated && activeSection === "create") {
      fetchUserLinks();
    }
  }, [isAuthenticated, activeSection]);

  // Update linkSettings when activeCategory changes
  useEffect(() => {
    setLinkSettings(prev => ({
      ...prev,
      platformType: activeCategory.toLowerCase()
    }));
  }, [activeCategory]);

  const fetchUserLinks = async () => {
    try {
      const response = await AwarenessLinkService.getUserLinks();
      if (response.success) {
        setGeneratedLinks(response.links || []);
      }
    } catch (error) {
      console.error('Error fetching user links:', error);
    }
  };

  const generateAwarenessLink = async () => {
    if (!isAuthenticated) {
      alert("Please login to generate awareness links");
      return;
    }

    setIsGenerating(true);
    setGenerationError("");
    
    try {
      const response = await AwarenessLinkService.generateLink({
        platformType: linkSettings.platformType,
        expiryHours: linkSettings.expiryHours,
        maxClicks: linkSettings.maxClicks
      });

      if (response.success) {
        let extractedToken = null;
        let fullUrl = response.link;
        
        if (fullUrl && fullUrl.includes('?token=')) {
          try {
            const url = new URL(fullUrl);
            extractedToken = url.searchParams.get('token');
          } catch (urlError) {
            const tokenMatch = fullUrl.match(/token=([^&]+)/);
            extractedToken = tokenMatch ? tokenMatch[1] : null;
          }
        }
        
        if (response.token) {
          extractedToken = response.token;
          if (!fullUrl.includes('localhost:5173')) {
            fullUrl = `http://localhost:5173/${linkSettings.platformType}?token=${response.token}`;
          }
        }

        const newLink = {
          id: Date.now(),
          token: extractedToken,
          platformType: linkSettings.platformType,
          expiresAt: response.expiresAt,
          maxClicks: linkSettings.maxClicks,
          currentClicks: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          fullUrl: fullUrl
        };
        
        setGeneratedLinks(prev => [newLink, ...prev]);
        setRecentlyGenerated(fullUrl);
        
        setTimeout(() => {
          fetchUserLinks();
        }, 1000);
        
      } else {
        setGenerationError(response.message || "Failed to generate link");
      }
    } catch (error) {
      setGenerationError("Error generating link. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Link copied to clipboard! 📋");
    }).catch(() => {
      alert("Failed to copy link");
    });
  };

  const shareViaEmail = (link, platform) => {
    const subject = encodeURIComponent('🛡️ Test Your Cybersecurity Skills!');
    const body = encodeURIComponent(
      `Hi there!\n\nI've been learning about cybersecurity and wanted to share this educational simulation with you.\n\nClick here to test your ability to spot phishing attempts: ${link}\n\nThis is a safe, educational tool designed to help people recognize online scams.\n\nStay safe online!\n\n---\nSent via ClickSafe Awareness Platform`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: "📘",
      instagram: "📷", 
      google: "🌐",
      netflix: "🎬",
      amazon: "📦"
    };
    return icons[platform] || "🔗";
  };

  const getStatusBadge = (link) => {
    if (!link) return <span className="text-amber-500">❓ Unknown</span>;
    
    const now = new Date();
    let expiryDate;
    
    try {
      expiryDate = new Date(link.expiresAt);
      if (isNaN(expiryDate.getTime())) throw new Error('Invalid date');
    } catch (dateError) {
      return <span className="text-amber-500">❓ Date Error</span>;
    }
    
    if (!link.isActive) {
      return <span className="text-danger">❌ Deactivated</span>;
    } else if (now > expiryDate) {
      return <span className="text-amber-500">⏰ Expired</span>;
    } else if ((link.currentClicks || 0) >= (link.maxClicks || 1)) {
      return <span className="text-purple-500">✋ Max Clicks</span>;
    } else {
      return <span className="text-safe">✅ Active</span>;
    }
  };

  const getActiveLinks = () => {
    return generatedLinks.filter(link => {
      if (!link.isActive) return false;
      const now = new Date();
      let expiryDate;
      try {
        expiryDate = new Date(link.expiresAt);
        if (isNaN(expiryDate.getTime())) return false;
      } catch { return false; }
      return now <= expiryDate && (link.currentClicks || 0) < (link.maxClicks || 1);
    });
  };

  const CurrentComponent = phishingData.login[activeCategory];

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HEADER */}
      <div className="relative pt-16 pb-12 px-6 text-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
         
         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
           Attack <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Simulation Hub</span>
         </h1>
         <p className="text-lg text-slate-400 max-w-2xl mx-auto">
           Experience real-world phishing scenarios in a safe, controlled environment.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* 2. NAVIGATION TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: "demo", label: "Live Demos", icon: "🎭" },
            { key: "examples", label: "Email Scams", icon: "📧" },
            { key: "sms", label: "SMS Scams", icon: "📱" },
            { key: "create", label: "Create Link", icon: "🔗" },
            { key: "manage", label: "Manage Links", icon: "📊" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === tab.key
                  ? 'bg-brand-600 text-white shadow-glow transform -translate-y-1'
                  : 'bg-cyber-800/50 text-slate-400 hover:bg-cyber-700 hover:text-white border border-transparent hover:border-cyber-600'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. CONTENT SECTIONS */}
        <div className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 rounded-3xl p-6 md:p-8 shadow-glass min-h-[500px]">
          
          {/* --- DEMO SECTION --- */}
          {activeSection === "demo" && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Interactive Fake Login Pages</h2>
                <p className="text-slate-400">Select a platform to see how convincing fake pages can look.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {Object.keys(phishingData.login).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setActiveCategory(platform)}
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                      activeCategory === platform
                        ? 'bg-brand-500/20 border-brand-500 text-white shadow-glow'
                        : 'bg-cyber-800/50 border-cyber-700 text-slate-400 hover:border-brand-500/50 hover:text-white'
                    }`}
                  >
                    <span className="text-3xl">
                      {platform === "Facebook" && "📘"}
                      {platform === "Instagram" && "📷"}
                      {platform === "Google" && "🌐"}
                      {platform === "Netflix" && "🎬"}
                      {platform === "Amazon" && "📦"}
                    </span>
                    <span className="font-semibold text-sm">{platform}</span>
                  </button>
                ))}
              </div>

              <div className="border border-cyber-700 rounded-xl overflow-hidden bg-white">
                <div className="bg-amber-100 text-amber-800 px-4 py-2 text-sm font-bold text-center border-b border-amber-200 flex items-center justify-center gap-2">
                  <span>⚠️</span> THIS IS A FAKE PAGE FOR EDUCATIONAL PURPOSES
                </div>
                <div className="relative">
                  <CurrentComponent />
                  {/* Overlay to prevent actual interaction if needed, or leave interactive */}
                </div>
              </div>
            </div>
          )}

          {/* --- EMAIL EXAMPLES --- */}
          {activeSection === "examples" && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-danger pl-4">Phishing Email Gallery</h2>
              <div className="grid gap-6">
                {phishingExamples.emails.map((email, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border border-cyber-700 shadow-lg">
                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                      <div className="text-slate-800 font-semibold text-lg">{email.subject}</div>
                      <div className="text-slate-500 text-sm mt-1">From: <span className="font-mono bg-slate-200 px-1 rounded text-red-600">{email.sender}</span></div>
                    </div>
                    <div className="p-6 text-slate-700 whitespace-pre-line font-mono text-sm bg-white">
                      {email.content}
                    </div>
                    <div className="bg-red-50 px-6 py-4 border-t border-red-100">
                      <h4 className="text-danger font-bold text-sm mb-2 flex items-center gap-2">🚩 RED FLAGS DETECTED:</h4>
                      <div className="flex flex-wrap gap-2">
                        {email.redFlags.map((flag, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-red-200 text-red-600 rounded-full text-xs font-semibold shadow-sm">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SMS EXAMPLES --- */}
          {activeSection === "sms" && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">SMS Smishing Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phishingExamples.sms.map((sms, index) => (
                  <div key={index} className="bg-cyber-800 border border-cyber-700 rounded-3xl p-6 relative">
                    {/* Phone Frame Styling */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-cyber-900 rounded-b-xl"></div>
                    
                    <div className="flex items-center gap-3 mb-6 mt-4">
                      <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-xl">👤</div>
                      <div>
                        <div className="text-white font-bold">{sms.sender}</div>
                        <div className="text-xs text-slate-500">Today 10:42 AM</div>
                      </div>
                    </div>
                    
                    <div className="bg-cyber-700/50 p-4 rounded-2xl rounded-tl-none text-slate-200 text-sm leading-relaxed mb-6 border border-cyber-600">
                      {sms.message}
                    </div>

                    <div className="pt-4 border-t border-cyber-700">
                      <h4 className="text-danger font-bold text-xs mb-3">🚩 THREAT INDICATORS:</h4>
                      <div className="space-y-2">
                        {sms.redFlags.map((flag, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
                            {flag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CREATE LINK SECTION --- */}
          {activeSection === "create" && (
            <div className="animate-fade-in">
              {!isAuthenticated ? (
                <div className="text-center py-20 bg-cyber-800/30 rounded-2xl border border-cyber-700 border-dashed">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                  <p className="text-slate-400">You must be logged in to generate training links.</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Form */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Configure Simulation</h2>
                      <p className="text-slate-400 text-sm">Create a safe, trackable link to test awareness.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-cyber-800/50 p-6 rounded-2xl border border-cyber-700">
                        <label className="block text-sm font-bold text-white mb-4">Select Platform Template</label>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.keys(phishingData.login).map((platform) => (
                            <button
                              key={platform}
                              onClick={() => setLinkSettings(prev => ({ ...prev, platformType: platform.toLowerCase() }))}
                              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                linkSettings.platformType === platform.toLowerCase()
                                  ? 'bg-brand-500/20 border-brand-500 text-white'
                                  : 'bg-cyber-900/50 border-cyber-700 text-slate-400 hover:border-brand-500/30'
                              }`}
                            >
                              <span>{getPlatformIcon(platform.toLowerCase())}</span>
                              <span className="text-sm font-medium">{platform}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-cyber-800/50 p-6 rounded-2xl border border-cyber-700">
                           <label className="block text-sm font-bold text-white mb-2">Link Expiry</label>
                           <select 
                             className="w-full bg-cyber-900 border border-cyber-600 text-white rounded-lg p-3 text-sm focus:border-brand-500 outline-none"
                             value={linkSettings.expiryHours}
                             onChange={(e) => setLinkSettings(prev => ({ ...prev, expiryHours: parseInt(e.target.value) }))}
                           >
                              <option value={1}>1 Hour</option>
                              <option value={24}>24 Hours</option>
                              <option value={168}>1 Week</option>
                           </select>
                        </div>
                        <div className="bg-cyber-800/50 p-6 rounded-2xl border border-cyber-700">
                           <label className="block text-sm font-bold text-white mb-2">Max Clicks</label>
                           <select 
                             className="w-full bg-cyber-900 border border-cyber-600 text-white rounded-lg p-3 text-sm focus:border-brand-500 outline-none"
                             value={linkSettings.maxClicks}
                             onChange={(e) => setLinkSettings(prev => ({ ...prev, maxClicks: parseInt(e.target.value) }))}
                           >
                              <option value={1}>1 Person</option>
                              <option value={5}>5 People</option>
                              <option value={100}>100 People</option>
                           </select>
                        </div>
                      </div>

                      {generationError && (
                        <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded-xl text-sm">
                          ❌ {generationError}
                        </div>
                      )}

                      <button
                        onClick={generateAwarenessLink}
                        disabled={isGenerating}
                        className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-cyber-700 text-white font-bold rounded-xl shadow-glow transition-all active:scale-95"
                      >
                        {isGenerating ? "Creating Simulation..." : "🚀 Generate Training Link"}
                      </button>
                    </div>
                  </div>

                  {/* Results Side */}
                  <div className="space-y-6">
                    {recentlyGenerated ? (
                      <div className="bg-safe/10 border border-safe/30 p-6 rounded-2xl animate-fade-in">
                        <h3 className="text-safe font-bold text-lg mb-4 flex items-center gap-2">
                          ✅ Simulation Active
                        </h3>
                        <div className="flex gap-2 mb-6">
                          <input 
                            readOnly 
                            value={recentlyGenerated} 
                            className="flex-1 bg-cyber-900 border border-cyber-700 text-slate-300 text-sm rounded-lg px-4 font-mono"
                          />
                          <button 
                            onClick={() => copyToClipboard(recentlyGenerated)}
                            className="px-4 py-2 bg-cyber-700 hover:bg-cyber-600 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="text-sm text-slate-400 space-y-2">
                           <p>• Share this link with your team or family.</p>
                           <p>• It simulates a {linkSettings.platformType} login page.</p>
                           <p>• Results will appear in the "Manage Links" tab.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-cyber-700 rounded-2xl text-center">
                        <div>
                          <div className="text-4xl mb-4 opacity-50">🔗</div>
                          <p className="text-slate-500">Your generated link will appear here.</p>
                        </div>
                      </div>
                    )}

                    {getActiveLinks().length > 0 && (
                      <div className="bg-cyber-800/30 p-6 rounded-2xl border border-cyber-700">
                        <h3 className="text-white font-bold mb-4">Active Campaigns</h3>
                        <div className="space-y-3">
                          {getActiveLinks().slice(0, 3).map((link, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-cyber-900 rounded-lg border border-cyber-700">
                              <div className="flex items-center gap-3">
                                <span>{getPlatformIcon(link.platformType)}</span>
                                <span className="text-sm text-slate-300 capitalize">{link.platformType}</span>
                              </div>
                              <span className="text-xs text-brand-500 font-mono">
                                {link.currentClicks}/{link.maxClicks} clicks
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- MANAGE SECTION --- */}
          {activeSection === "manage" && (
            <div className="animate-fade-in">
              {!isAuthenticated ? (
                <div className="text-center py-20 bg-cyber-800/30 rounded-2xl border border-cyber-700 border-dashed">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                  <p className="text-slate-400">Please login to view your campaign analytics.</p>
                </div>
              ) : (
                <LinkManager />
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}