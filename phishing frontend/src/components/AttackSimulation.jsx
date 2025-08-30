import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import AwarenessLinkService from "../components/AwarenessLinkService";
import LinkManager from "../components/LinkManager";

// Import the fake login page components
import Facebook from "../components/Facebook";
import Instagram from "../components//Instagram";
import Google from "../facklogin/Google";
import NetflixLogin from "../components/NetflixLogin";
import Amazon from "../facklogin/Amazon";

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
  const [selectedExample, setSelectedExample] = useState(null);
  
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

  const username = localStorage.getItem("username") || "User";

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

  // 🔥 FIXED: Improved URL handling and error checking
  const generateAwarenessLink = async () => {
    if (!isAuthenticated) {
      alert("Please login to generate awareness links");
      return;
    }

    setIsGenerating(true);
    setGenerationError("");
    
    try {
      console.log('Generating link with settings:', linkSettings); // Debug log
      
      const response = await AwarenessLinkService.generateLink({
        platformType: linkSettings.platformType,
        expiryHours: linkSettings.expiryHours,
        maxClicks: linkSettings.maxClicks
      });

      console.log('API Response:', response); // Debug log

      if (response.success) {
        // 🔥 FIXED: Better URL and token handling
        let extractedToken = null;
        let fullUrl = response.link;
        
        // Try to extract token from URL if it's a full URL
        if (fullUrl && fullUrl.includes('?token=')) {
          try {
            const url = new URL(fullUrl);
            extractedToken = url.searchParams.get('token');
          } catch (urlError) {
            console.warn('Could not parse URL, extracting token differently:', urlError);
            // Fallback: extract token from URL string
            const tokenMatch = fullUrl.match(/token=([^&]+)/);
            extractedToken = tokenMatch ? tokenMatch[1] : null;
          }
        }
        
        // If response includes separate token field, use that
        if (response.token) {
          extractedToken = response.token;
          // Build the URL if not already provided in correct format
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
        
        console.log('Created new link object:', newLink); // Debug log
        
        setGeneratedLinks(prev => [newLink, ...prev]);
        setRecentlyGenerated(fullUrl);
        
        // Refresh the full list from server
        setTimeout(() => {
          fetchUserLinks();
        }, 1000);
        
      } else {
        setGenerationError(response.message || "Failed to generate link");
      }
    } catch (error) {
      console.error('Error generating link:', error);
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

  // 🔥 FIXED: Improved status badge logic
  const getStatusBadge = (link) => {
    if (!link) return <span style={styles.expiredBadge}>❓ Unknown</span>;
    
    const now = new Date();
    let expiryDate;
    
    try {
      // Handle different date formats
      expiryDate = new Date(link.expiresAt);
      if (isNaN(expiryDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (dateError) {
      console.warn('Could not parse expiry date:', link.expiresAt, dateError);
      return <span style={styles.expiredBadge}>❓ Date Error</span>;
    }
    
    // Check status in order of priority
    if (!link.isActive || link.isActive === false) {
      return <span style={styles.expiredBadge}>❌ Deactivated</span>;
    } else if (now > expiryDate) {
      return <span style={styles.expiredBadge}>⏰ Time Expired</span>;
    } else if ((link.currentClicks || 0) >= (link.maxClicks || 1)) {
      return <span style={styles.expiredBadge}>✋ Max Clicks Reached</span>;
    } else {
      return <span style={styles.activeBadge}>✅ Active</span>;
    }
  };

  // 🔥 FIXED: Filter out expired links for summary
  const getActiveLinks = () => {
    return generatedLinks.filter(link => {
      if (!link.isActive) return false;
      
      const now = new Date();
      let expiryDate;
      
      try {
        expiryDate = new Date(link.expiresAt);
        if (isNaN(expiryDate.getTime())) return false;
      } catch {
        return false;
      }
      
      return now <= expiryDate && (link.currentClicks || 0) < (link.maxClicks || 1);
    });
  };

  // Get the current component to render
  const CurrentComponent = phishingData.login[activeCategory];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🛡️ Phishing Attack Simulation Center</h1>
        <p style={styles.subtitle}>
          Learn to identify and protect yourself from phishing attacks through interactive demonstrations
        </p>
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        {[
          { key: "demo", label: "🎭 Live Demos", icon: "🔍" },
          { key: "examples", label: "📧 Email Examples", icon: "📨" },
          { key: "sms", label: "📱 SMS Examples", icon: "💬" },
          { key: "create", label: "🔗 Create Awareness Link", icon: "⚡" },
          { key: "manage", label: "📊 Manage Links", icon: "📋" }
        ].map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.navButton,
              ...(activeSection === tab.key ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div style={styles.content}>
        
        {/* Demo Section */}
        {activeSection === "demo" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🎭 Interactive Fake Login Pages</h2>
            <p style={styles.sectionDesc}>
              Click on different platforms below to see how convincing fake login pages can look
            </p>
            
            {/* Platform Selector */}
            <div style={styles.platformGrid}>
              {Object.keys(phishingData.login).map((platform) => (
                <button
                  key={platform}
                  style={{
                    ...styles.platformCard,
                    ...(activeCategory === platform ? styles.platformCardActive : {})
                  }}
                  onClick={() => setActiveCategory(platform)}
                >
                  <div style={styles.platformIcon}>
                    {platform === "Facebook" && "📘"}
                    {platform === "Instagram" && "📷"}
                    {platform === "Google" && "🌐"}
                    {platform === "Netflix" && "🎬"}
                    {platform === "Amazon" && "📦"}
                  </div>
                  <span style={styles.platformName}>{platform}</span>
                </button>
              ))}
            </div>

            {/* Live Preview */}
            <div style={styles.previewContainer}>
              <h3 style={styles.previewTitle}>
                🔍 {activeCategory} Fake Login Page Preview
              </h3>
              <div style={styles.warningBanner}>
                ⚠️ This is a FAKE page for educational purposes only
              </div>
              <div style={styles.componentWrapper}>
                <CurrentComponent />
              </div>
            </div>
          </div>
        )}

        {/* Email Examples Section */}
        {activeSection === "examples" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📧 Phishing Email Examples</h2>
            <p style={styles.sectionDesc}>
              Learn to spot red flags in these common phishing email examples
            </p>
            
            <div style={styles.examplesGrid}>
              {phishingExamples.emails.map((email, index) => (
                <div key={index} style={styles.exampleCard}>
                  <div style={styles.emailHeader}>
                    <strong>From:</strong> {email.sender}
                  </div>
                  <div style={styles.emailSubject}>
                    <strong>Subject:</strong> {email.subject}
                  </div>
                  <div style={styles.emailContent}>
                    {email.content}
                  </div>
                  <div style={styles.redFlags}>
                    <h4 style={styles.redFlagsTitle}>🚩 Red Flags:</h4>
                    <ul style={styles.redFlagsList}>
                      {email.redFlags.map((flag, i) => (
                        <li key={i} style={styles.redFlag}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SMS Examples Section */}
        {activeSection === "sms" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📱 Phishing SMS Examples</h2>
            <p style={styles.sectionDesc}>
              Recognize suspicious text messages and protect yourself from SMS phishing
            </p>
            
            <div style={styles.smsGrid}>
              {phishingExamples.sms.map((sms, index) => (
                <div key={index} style={styles.smsCard}>
                  <div style={styles.smsHeader}>
                    <span style={styles.smsIcon}>📱</span>
                    <strong>From: {sms.sender}</strong>
                  </div>
                  <div style={styles.smsMessage}>
                    {sms.message}
                  </div>
                  <div style={styles.redFlags}>
                    <h4 style={styles.redFlagsTitle}>🚩 Red Flags:</h4>
                    <ul style={styles.redFlagsList}>
                      {sms.redFlags.map((flag, i) => (
                        <li key={i} style={styles.redFlag}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Link Section - Enhanced */}
        {activeSection === "create" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔗 Create Awareness Simulation Link</h2>
            <p style={styles.sectionDesc}>
              Generate secure, time-limited links to educate others about phishing attacks
            </p>
            
            {!isAuthenticated ? (
              <div style={styles.loginPrompt}>
                <h3>🔐 Login Required</h3>
                <p>You need to be logged in to create awareness links.</p>
              </div>
            ) : (
              <>
                <div style={styles.createLinkContainer}>
                  <div style={styles.linkCreator}>
                    <h3>🎯 Link Configuration:</h3>
                    
                    {/* Platform Selection */}
                    <div style={styles.configSection}>
                      <label style={styles.configLabel}>Select Platform to Simulate:</label>
                      <div style={styles.platformSelector}>
                        {Object.keys(phishingData.login).map((platform) => (
                          <label key={platform} style={styles.radioLabel}>
                            <input
                              type="radio"
                              name="platform"
                              value={platform.toLowerCase()}
                              checked={linkSettings.platformType === platform.toLowerCase()}
                              onChange={(e) => setLinkSettings(prev => ({
                                ...prev,
                                platformType: e.target.value
                              }))}
                              style={styles.radioInput}
                            />
                            <span style={styles.radioText}>
                              {getPlatformIcon(platform.toLowerCase())} {platform}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Expiry Time Selection */}
                    <div style={styles.configSection}>
                      <label style={styles.configLabel}>Link Expires After:</label>
                      <select
                        value={linkSettings.expiryHours}
                        onChange={(e) => setLinkSettings(prev => ({
                          ...prev,
                          expiryHours: parseInt(e.target.value)
                        }))}
                        style={styles.select}
                      >
                        <option value={1}>1 Hour</option>
                        <option value={6}>6 Hours</option>
                        <option value={24}>24 Hours (1 Day)</option>
                        <option value={72}>72 Hours (3 Days)</option>
                        <option value={168}>1 Week</option>
                      </select>
                    </div>

                    {/* Max Clicks Selection */}
                    <div style={styles.configSection}>
                      <label style={styles.configLabel}>Maximum Clicks Allowed:</label>
                      <select
                        value={linkSettings.maxClicks}
                        onChange={(e) => setLinkSettings(prev => ({
                          ...prev,
                          maxClicks: parseInt(e.target.value)
                        }))}
                        style={styles.select}
                      >
                        <option value={1}>1 Click (One-time use)</option>
                        <option value={5}>5 Clicks</option>
                        <option value={10}>10 Clicks</option>
                        <option value={25}>25 Clicks</option>
                        <option value={100}>100 Clicks</option>
                      </select>
                    </div>
                    
                    {generationError && (
                      <div style={styles.errorMessage}>
                        ❌ {generationError}
                      </div>
                    )}
                    
                    <button 
                      style={{
                        ...styles.generateButton,
                        ...(isGenerating ? styles.generateButtonDisabled : {})
                      }}
                      onClick={generateAwarenessLink}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "⏳ Generating..." : "🔗 Generate Awareness Link"}
                    </button>
                  </div>

                  {/* Recently Generated Link */}
                  {recentlyGenerated && (
                    <div style={styles.linkResult}>
                      <h3>✅ Link Generated Successfully!</h3>
                      <div style={styles.linkContainer}>
                        <input
                          style={styles.linkInput}
                          value={recentlyGenerated}
                          readOnly
                          onClick={(e) => e.target.select()}
                        />
                        <button 
                          style={styles.copyButton}
                          onClick={() => copyToClipboard(recentlyGenerated)}
                        >
                          📋 Copy
                        </button>
                        <button
                          style={styles.shareButton}
                          onClick={() => shareViaEmail(recentlyGenerated, linkSettings.platformType)}
                        >
                          📧 Share
                        </button>
                      </div>
                      <div style={styles.linkInstructions}>
                        <h4>🎯 How to use this link:</h4>
                        <ul>
                          <li>Share this link with friends/family for educational purposes</li>
                          <li>It will show them a fake {linkSettings.platformType} login page first</li>
                          <li>The link expires after {linkSettings.expiryHours} hours</li>
                          <li>Maximum {linkSettings.maxClicks} people can use this link</li>
                          <li>After they interact with the fake page, they'll learn about phishing</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 🔥 FIXED: Quick Links Summary - Only show active links */}
                  {getActiveLinks().length > 0 && (
                    <div style={styles.quickSummary}>
                      <h3>📊 Your Active Links ({getActiveLinks().length})</h3>
                      <div style={styles.summaryGrid}>
                        {getActiveLinks().slice(0, 3).map((link, index) => (
                          <div key={index} style={styles.summaryCard}>
                            <div style={styles.summaryHeader}>
                              <span>{getPlatformIcon(link.platformType)} {link.platformType}</span>
                              {getStatusBadge(link)}
                            </div>
                            <div style={styles.summaryStats}>
                              {link.currentClicks || 0}/{link.maxClicks} clicks
                            </div>
                            <div style={styles.summaryUrl}>
                              <small>{link.fullUrl}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p style={styles.viewAllPrompt}>
                        View all links in the "📊 Manage Links" tab
                      </p>
                    </div>
                  )}
                </div>

                {/* Safety Tips */}
                <div style={styles.safetyTips}>
                  <h3>🛡️ Safety Reminders:</h3>
                  <div style={styles.tipsList}>
                    <div style={styles.tip}>✅ Always verify sender authenticity</div>
                    <div style={styles.tip}>✅ Check URLs carefully before clicking</div>
                    <div style={styles.tip}>✅ Use two-factor authentication</div>
                    <div style={styles.tip}>✅ Keep software updated</div>
                    <div style={styles.tip}>✅ Trust your instincts - if it feels wrong, it probably is</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Manage Links Section */}
        {activeSection === "manage" && (
          <div style={styles.section}>
            {!isAuthenticated ? (
              <div style={styles.loginPrompt}>
                <h3>🔐 Login Required</h3>
                <p>You need to be logged in to manage your awareness links.</p>
              </div>
            ) : (
              <LinkManager />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    color: 'white',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: '0',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: '10px',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  navButtonActive: {
    backgroundColor: '#007bff',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  section: {
    minHeight: '400px',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
    borderBottom: '3px solid #007bff',
    paddingBottom: '10px',
  },
  sectionDesc: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
  },
  platformCard: {
    padding: '20px',
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  platformCardActive: {
    borderColor: '#007bff',
    backgroundColor: '#e7f3ff',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(0,123,255,0.2)',
  },
  platformIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  platformName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
  },
  previewContainer: {
    marginTop: '30px',
  },
  previewTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: '#333',
  },
  warningBanner: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: '600',
    border: '1px solid #ffeaa7',
  },
  componentWrapper: {
    border: '2px solid #dee2e6',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '600px',
    position: 'relative',
  },
  examplesGrid: {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: '1fr',
  },
  exampleCard: {
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  emailHeader: {
    marginBottom: '8px',
    color: '#666',
  },
  emailSubject: {
    marginBottom: '15px',
    color: '#333',
    fontSize: '1.1rem',
  },
  emailContent: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    whiteSpace: 'pre-line',
    border: '1px solid #dee2e6',
    fontFamily: 'monospace',
  },
  smsGrid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  smsCard: {
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  smsHeader: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  smsIcon: {
    fontSize: '1.2rem',
  },
  smsMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '18px',
    marginBottom: '15px',
    maxWidth: '80%',
    marginLeft: 'auto',
    wordWrap: 'break-word',
  },
  redFlags: {
    marginTop: '15px',
  },
  redFlagsTitle: {
    color: '#dc3545',
    fontSize: '1rem',
    margin: '0 0 10px 0',
  },
  redFlagsList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  redFlag: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '5px 10px',
    marginBottom: '5px',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '2px solid #e9ecef',
  },
  createLinkContainer: {
    display: 'grid',
    gap: '30px',
  },
  linkCreator: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #dee2e6',
  },
  configSection: {
    marginBottom: '25px',
  },
  configLabel: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  platformSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '10px',
    marginTop: '10px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
  },
  radioInput: {
    marginRight: '8px',
  },
  radioText: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #f5c6cb',
  },
  generateButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    width: '100%',
  },
  generateButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  linkResult: {
    backgroundColor: '#d4edda',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #c3e6cb',
  },
  linkContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  linkInput: {
    flex: '1',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '14px',
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  linkInstructions: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #c3e6cb',
  },
  quickSummary: {
    backgroundColor: '#e7f3ff',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #b8daff',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginBottom: '15px',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #b8daff',
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  summaryStats: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '5px',
  },
  summaryUrl: {
    fontSize: '0.7rem',
    color: '#999',
    wordBreak: 'break-all',
    fontFamily: 'monospace',
  },
  viewAllPrompt: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: '0.95rem',
    margin: 0,
  },
  activeBadge: {
    color: '#28a745',
    fontWeight: '600',
    fontSize: '0.8rem',
  },
  expiredBadge: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: '0.8rem',
  },
  safetyTips: {
    marginTop: '40px',
    backgroundColor: '#d1ecf1',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #bee5eb',
  },
  tipsList: {
    display: 'grid',
    gap: '10px',
    marginTop: '15px',
  },
  tip: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '1rem',
    border: '1px solid #bee5eb',
  },
};
