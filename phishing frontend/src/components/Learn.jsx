import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Learn() {
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview', icon: '🔍' },
    { id: 'types', title: 'Types of Attacks', icon: '🎭' },
    { id: 'psychology', title: 'Psychology Behind Attacks', icon: '🧠' },
    { id: 'identification', title: 'How to Identify', icon: '🕵️' },
    { id: 'examples', title: 'Real Examples', icon: '📧' },
    { id: 'protection', title: 'Protection Strategies', icon: '🛡️' },
    { id: 'response', title: 'Incident Response', icon: '🚨' },
    { id: 'advanced', title: 'Advanced Topics', icon: '🎓' },
    { id: 'quiz', title: 'Knowledge Check', icon: '🧪' }
  ];

  const phishingStats = [
    { label: 'Phishing emails sent daily', value: '3.4 billion', icon: '📧' },
    { label: 'Organizations targeted annually', value: '83%', icon: '🏢' },
    { label: 'Average cost per incident', value: '$4.9M', icon: '💰' },
    { label: 'Success rate of attacks', value: '36%', icon: '⚠️' }
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

  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
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
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>🎓</span>
            Complete Phishing Defense Guide
          </h1>
          <p style={styles.subtitle}>
            Master the art of detecting and preventing phishing attacks with our comprehensive learning platform
          </p>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${(completedSections.size / sections.length) * 100}%`
                }}
              />
            </div>
            <span style={styles.progressText}>
              {completedSections.size} of {sections.length} sections completed
            </span>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Navigation Sidebar */}
        <nav style={styles.sidebar}>
          <div style={styles.sidebarContent}>
            <h3 style={styles.sidebarTitle}>Learning Path</h3>
            {sections.map(section => (
              <button
                key={section.id}
                style={{
                  ...styles.navButton,
                  ...(activeSection === section.id ? styles.navButtonActive : {}),
                  ...(completedSections.has(section.id) ? styles.navButtonCompleted : {})
                }}
                onClick={() => setActiveSection(section.id)}
              >
                <span style={styles.navIcon}>{section.icon}</span>
                <span style={styles.navText}>{section.title}</span>
                {completedSections.has(section.id) && (
                  <span style={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <main style={styles.content}>
          
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🔍 Understanding Phishing: The Complete Picture</h2>
              
              <div style={styles.introCard}>
                <p style={styles.sectionIntro}>
                  Phishing is the #1 cybersecurity threat worldwide, affecting millions of individuals and organizations every day. 
                  It's a form of social engineering where attackers impersonate trusted entities to steal sensitive information, 
                  money, or gain unauthorized access to systems.
                </p>
              </div>

              <div style={styles.statsGrid}>
                {phishingStats.map((stat, index) => (
                  <div key={index} style={styles.statCard}>
                    <div style={styles.statIcon}>{stat.icon}</div>
                    <div style={styles.statValue}>{stat.value}</div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={styles.definitionBox}>
                <h3 style={styles.definitionTitle}>📚 What Exactly Is Phishing?</h3>
                <p style={styles.definitionText}>
                  Phishing combines "phone" and "fishing" - it's the practice of casting a wide net (like fishing) 
                  to catch unsuspecting victims through fraudulent communications. Attackers create fake messages, 
                  websites, or calls that appear legitimate to trick people into:
                </p>
                <ul style={styles.definitionList}>
                  <li>Revealing passwords, PINs, or personal information</li>
                  <li>Clicking malicious links or downloading harmful files</li>
                  <li>Transferring money or making unauthorized purchases</li>
                  <li>Installing malware on their devices</li>
                  <li>Providing access to secure systems or accounts</li>
                </ul>
              </div>

              <div style={styles.timelineSection}>
                <h3 style={styles.timelineTitle}>📈 Evolution of Phishing</h3>
                <div style={styles.timeline}>
                  <div style={styles.timelineItem}>
                    <div style={styles.timelineYear}>1990s</div>
                    <div style={styles.timelineContent}>
                      <h4>Email Spam Era</h4>
                      <p>Early phishing attempts via mass email campaigns</p>
                    </div>
                  </div>
                  <div style={styles.timelineItem}>
                    <div style={styles.timelineYear}>2000s</div>
                    <div style={styles.timelineContent}>
                      <h4>Website Spoofing</h4>
                      <p>Fake banking and e-commerce sites become common</p>
                    </div>
                  </div>
                  <div style={styles.timelineItem}>
                    <div style={styles.timelineYear}>2010s</div>
                    <div style={styles.timelineContent}>
                      <h4>Social Media & Mobile</h4>
                      <p>Attacks expand to SMS, social platforms, and mobile apps</p>
                    </div>
                  </div>
                  <div style={styles.timelineItem}>
                    <div style={styles.timelineYear}>2020s</div>
                    <div style={styles.timelineContent}>
                      <h4>AI-Powered Attacks</h4>
                      <p>Sophisticated, personalized attacks using AI and deepfakes</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('overview')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Types Section */}
          {activeSection === 'types' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🎭 Types of Phishing Attacks</h2>
              
              <div style={styles.typesGrid}>
                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>📧</span>
                    <h3>Email Phishing</h3>
                    <span style={styles.severityBadge}>High Risk</span>
                  </div>
                  <p style={styles.typeDescription}>
                    The most common form - fake emails impersonating banks, social media, or trusted companies.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Common Tactics:</h4>
                    <ul>
                      <li>Account suspension notices</li>
                      <li>Prize/lottery winnings</li>
                      <li>Urgent security alerts</li>
                      <li>Invoice or payment requests</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>📱</span>
                    <h3>SMS Phishing (Smishing)</h3>
                    <span style={styles.severityBadge}>Medium Risk</span>
                  </div>
                  <p style={styles.typeDescription}>
                    Text message-based attacks, often using shortened URLs and urgent language.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Common Tactics:</h4>
                    <ul>
                      <li>Package delivery notifications</li>
                      <li>Banking alerts</li>
                      <li>Government service messages</li>
                      <li>Contest/giveaway notifications</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>📞</span>
                    <h3>Voice Phishing (Vishing)</h3>
                    <span style={styles.severityBadge}>High Risk</span>
                  </div>
                  <p style={styles.typeDescription}>
                    Phone calls from scammers pretending to be tech support, banks, or government agencies.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Common Tactics:</h4>
                    <ul>
                      <li>Tech support scams</li>
                      <li>IRS/tax authority calls</li>
                      <li>Bank fraud alerts</li>
                      <li>Medicare/insurance scams</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>🎯</span>
                    <h3>Spear Phishing</h3>
                    <span style={styles.severityBadge}>Critical</span>
                  </div>
                  <p style={styles.typeDescription}>
                    Highly targeted attacks using personal information to appear more legitimate.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Targeting Methods:</h4>
                    <ul>
                      <li>Social media research</li>
                      <li>Company directory mining</li>
                      <li>Public record searches</li>
                      <li>Previous data breaches</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>👥</span>
                    <h3>Social Media Phishing</h3>
                    <span style={styles.severityBadge}>Medium Risk</span>
                  </div>
                  <p style={styles.typeDescription}>
                    Fake profiles, hacked accounts, or malicious apps on social platforms.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Common Tactics:</h4>
                    <ul>
                      <li>Fake friend requests</li>
                      <li>Malicious quiz/game apps</li>
                      <li>Romance scams</li>
                      <li>Cryptocurrency schemes</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.typeCard}>
                  <div style={styles.typeHeader}>
                    <span style={styles.typeIcon}>🐋</span>
                    <h3>Whaling</h3>
                    <span style={styles.severityBadge}>Critical</span>
                  </div>
                  <p style={styles.typeDescription}>
                    Attacks specifically targeting high-value individuals like CEOs or executives.
                  </p>
                  <div style={styles.typeDetails}>
                    <h4>Target Characteristics:</h4>
                    <ul>
                      <li>C-level executives</li>
                      <li>High-net-worth individuals</li>
                      <li>Government officials</li>
                      <li>Celebrity personalities</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('types')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Psychology Section */}
          {activeSection === 'psychology' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🧠 The Psychology Behind Phishing Attacks</h2>
              
              <div style={styles.psychologyIntro}>
                <p>
                  Understanding why phishing works is crucial to defending against it. Attackers exploit 
                  fundamental human psychological principles to bypass our rational thinking.
                </p>
              </div>

              <div style={styles.psychologyGrid}>
                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>⚡</div>
                  <h3>Urgency & Scarcity</h3>
                  <p>
                    "Your account will be closed in 24 hours!" - Creates panic that bypasses logical thinking.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> "Limited time offer - only 3 spots left!"
                  </div>
                </div>

                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>👨‍💼</div>
                  <h3>Authority</h3>
                  <p>
                    People naturally defer to perceived authority figures like banks, government, or IT departments.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> "This is Microsoft Security - your computer is infected."
                  </div>
                </div>

                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>😰</div>
                  <h3>Fear & Loss Aversion</h3>
                  <p>
                    Threats of loss (money, access, security) trigger strong emotional responses.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> "Suspicious activity detected - verify now or lose access."
                  </div>
                </div>

                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>🤝</div>
                  <h3>Social Proof</h3>
                  <p>
                    "Everyone is doing it" mentality - makes victims feel safe following others.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> "Join 10,000+ satisfied customers who have already claimed their reward!"
                  </div>
                </div>

                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>🎁</div>
                  <h3>Reciprocity</h3>
                  <p>
                    Offering something "free" creates obligation to give something back.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> "Congratulations! You've won $1000. Just pay $50 processing fee."
                  </div>
                </div>

                <div style={styles.psychCard}>
                  <div style={styles.psychIcon}>💝</div>
                  <h3>Trust & Familiarity</h3>
                  <p>
                    Using familiar brands, logos, and personal information to appear legitimate.
                  </p>
                  <div style={styles.psychExample}>
                    <strong>Example:</strong> Perfect recreations of Netflix, Amazon, or bank login pages.
                  </div>
                </div>
              </div>

              <div style={styles.defenseStrategies}>
                <h3>🛡️ Psychological Defense Strategies</h3>
                <div style={styles.strategyList}>
                  <div style={styles.strategy}>
                    <span style={styles.strategyIcon}>⏸️</span>
                    <div>
                      <h4>Pause Before Acting</h4>
                      <p>Take a deep breath and think: "Why am I feeling rushed?"</p>
                    </div>
                  </div>
                  <div style={styles.strategy}>
                    <span style={styles.strategyIcon}>❓</span>
                    <div>
                      <h4>Question Everything</h4>
                      <p>Ask: "Did I expect this message?" and "How do they know my information?"</p>
                    </div>
                  </div>
                  <div style={styles.strategy}>
                    <span style={styles.strategyIcon}>✅</span>
                    <div>
                      <h4>Verify Independently</h4>
                      <p>Contact the organization directly through official channels.</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('psychology')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Identification Section */}
          {activeSection === 'identification' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🕵️ How to Identify Phishing Attempts</h2>
              
              <div style={styles.identificationGuide}>
                <div style={styles.checklistSection}>
                  <h3>🔍 Red Flag Checklist</h3>
                  <div style={styles.checklist}>
                    <div style={styles.checklistCategory}>
                      <h4>📧 Email Red Flags</h4>
                      <ul style={styles.checklistItems}>
                        <li>Generic greetings ("Dear Customer")</li>
                        <li>Spelling and grammar mistakes</li>
                        <li>Mismatched or suspicious sender addresses</li>
                        <li>Unexpected attachments</li>
                        <li>Urgent language creating panic</li>
                        <li>Requests for sensitive information</li>
                        <li>Suspicious links (hover to check destination)</li>
                      </ul>
                    </div>
                    
                    <div style={styles.checklistCategory}>
                      <h4>🌐 Website Red Flags</h4>
                      <ul style={styles.checklistItems}>
                        <li>No HTTPS (missing padlock icon)</li>
                        <li>Misspelled URLs (amazom.com vs amazon.com)</li>
                        <li>Poor design or low-quality images</li>
                        <li>Unexpected login requests</li>
                        <li>No contact information or privacy policy</li>
                        <li>Too-good-to-be-true offers</li>
                      </ul>
                    </div>

                    <div style={styles.checklistCategory}>
                      <h4>📱 SMS/Call Red Flags</h4>
                      <ul style={styles.checklistItems}>
                        <li>Unexpected messages about deliveries/accounts</li>
                        <li>Shortened URLs (bit.ly, tinyurl)</li>
                        <li>Requests for immediate action</li>
                        <li>Calls demanding personal information</li>
                        <li>Robocalls claiming urgent issues</li>
                        <li>Pressure to stay on the line</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={styles.analysisTools}>
                  <h3>🛠️ Analysis Tools & Techniques</h3>
                  <div style={styles.toolsGrid}>
                    <div style={styles.toolCard}>
                      <h4>Email Headers</h4>
                      <p>Check the full email headers to see the actual sender and routing information.</p>
                      <div style={styles.toolExample}>
                        <code>Return-Path: scammer@fake-domain.com</code>
                      </div>
                    </div>
                    
                    <div style={styles.toolCard}>
                      <h4>Link Analysis</h4>
                      <p>Hover over links (don't click) to see the actual destination URL.</p>
                      <div style={styles.toolExample}>
                        Display: "www.paypal.com"<br/>
                        Actual: "www.paypa1-security.net"
                      </div>
                    </div>
                    
                    <div style={styles.toolCard}>
                      <h4>Domain Verification</h4>
                      <p>Use WHOIS lookup tools to check domain registration details and age.</p>
                      <div style={styles.toolExample}>
                        Legitimate domains are usually older than 1 year
                      </div>
                    </div>
                    
                    <div style={styles.toolCard}>
                      <h4>Reverse Image Search</h4>
                      <p>Check if profile pictures or images are stolen from other sources.</p>
                      <div style={styles.toolExample}>
                        Use Google Images or TinEye for verification
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('identification')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Examples Section */}
          {activeSection === 'examples' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📧 Real-World Phishing Examples</h2>
              
              <div style={styles.examplesContainer}>
                {realExamples.map((example, index) => (
                  <div key={index} style={styles.exampleCard}>
                    <div style={styles.exampleHeader}>
                      <div style={styles.exampleType}>
                        <span style={styles.exampleIcon}>
                          {example.type === 'Email Phishing' ? '📧' : 
                           example.type === 'SMS Phishing' ? '📱' : '💬'}
                        </span>
                        <span>{example.type}</span>
                      </div>
                      <div style={{
                        ...styles.severityIndicator,
                        backgroundColor: example.severity === 'High' ? '#dc2626' : 
                                       example.severity === 'Critical' ? '#991b1b' : '#d97706'
                      }}>
                        {example.severity}
                      </div>
                    </div>
                    
                    <div style={styles.exampleContent}>
                      {example.subject && (
                        <div style={styles.exampleMeta}>
                          <strong>Subject:</strong> {example.subject}
                        </div>
                      )}
                      <div style={styles.exampleMeta}>
                        <strong>From:</strong> {example.sender}
                      </div>
                      {example.platform && (
                        <div style={styles.exampleMeta}>
                          <strong>Platform:</strong> {example.platform}
                        </div>
                      )}
                      
                      <div style={styles.exampleMessage}>
                        {example.content}
                      </div>
                    </div>
                    
                    <div style={styles.redFlagsSection}>
                      <h4 style={styles.redFlagsTitle}>🚩 Red Flags Identified:</h4>
                      <ul style={styles.redFlagsList}>
                        {example.redFlags.map((flag, i) => (
                          <li key={i} style={styles.redFlagItem}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.analysisSection}>
                <h3>🔬 Deep Analysis: Common Attack Patterns</h3>
                <div style={styles.patternGrid}>
                  <div style={styles.patternCard}>
                    <h4>The "Urgent Action Required" Pattern</h4>
                    <p>Creates artificial time pressure to prevent careful analysis.</p>
                    <div style={styles.patternKeywords}>
                      Keywords: "Immediately", "Within 24 hours", "Expires today", "Act now"
                    </div>
                  </div>
                  
                  <div style={styles.patternCard}>
                    <h4>The "Security Alert" Pattern</h4>
                    <p>Exploits fear of account compromise or data loss.</p>
                    <div style={styles.patternKeywords}>
                      Keywords: "Suspicious activity", "Unauthorized access", "Security breach"
                    </div>
                  </div>
                  
                  <div style={styles.patternCard}>
                    <h4>The "Prize/Reward" Pattern</h4>
                    <p>Appeals to greed and desire for free benefits.</p>
                    <div style={styles.patternKeywords}>
                      Keywords: "Winner", "Congratulations", "Claim your prize", "Free gift"
                    </div>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('examples')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Protection Section */}
          {activeSection === 'protection' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🛡️ Comprehensive Protection Strategies</h2>
              
              <div style={styles.protectionLayers}>
                <h3>🏰 Multi-Layer Defense Approach</h3>
                <div style={styles.layersContainer}>
                  <div style={styles.layer}>
                    <div style={styles.layerNumber}>1</div>
                    <div style={styles.layerContent}>
                      <h4>Technical Controls</h4>
                      <ul>
                        <li>Email filters and anti-spam software</li>
                        <li>Web browser security settings</li>
                        <li>Antivirus with real-time protection</li>
                        <li>Firewall configuration</li>
                        <li>DNS filtering services</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div style={styles.layer}>
                    <div style={styles.layerNumber}>2</div>
                    <div style={styles.layerContent}>
                      <h4>Authentication Security</h4>
                      <ul>
                        <li>Strong, unique passwords for each account</li>
                        <li>Password managers (recommended tools)</li>
                        <li>Two-factor authentication (2FA/MFA)</li>
                        <li>Biometric authentication where available</li>
                        <li>Regular password rotation</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div style={styles.layer}>
                    <div style={styles.layerNumber}>3</div>
                    <div style={styles.layerContent}>
                      <h4>Behavioral Safeguards</h4>
                      <ul>
                        <li>Verify sender identity independently</li>
                        <li>Never click suspicious links or downloads</li>
                        <li>Use bookmarks for important sites</li>
                        <li>Be skeptical of urgent requests</li>
                        <li>Regular security awareness training</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.toolsRecommendations}>
                <h3>🔧 Recommended Security Tools</h3>
                <div style={styles.toolsCategories}>
                  <div style={styles.toolCategory}>
                    <h4>Password Management</h4>
                    <ul style={styles.toolList}>
                      <li>• Bitwarden (Free & Open Source)</li>
                      <li>• 1Password (Premium features)</li>
                      <li>• LastPass (Basic version)</li>
                      <li>• Browser built-in managers</li>
                    </ul>
                  </div>
                  
                  <div style={styles.toolCategory}>
                    <h4>Email Security</h4>
                    <ul style={styles.toolList}>
                      <li>• Gmail Advanced Protection</li>
                      <li>• Outlook Defender</li>
                      <li>• ProtonMail (Privacy-focused)</li>
                      <li>• Mailinator (Temporary emails)</li>
                    </ul>
                  </div>
                  
                  <div style={styles.toolCategory}>
                    <h4>Browser Protection</h4>
                    <ul style={styles.toolList}>
                      <li>• uBlock Origin (Ad blocker)</li>
                      <li>• Privacy Badger</li>
                      <li>• Chrome/Firefox security extensions</li>
                      <li>• Regular browser updates</li>
                    </ul>
                  </div>
                  
                  <div style={styles.toolCategory}>
                    <h4>Mobile Security</h4>
                    <ul style={styles.toolList}>
                      <li>• Built-in spam call filtering</li>
                      <li>• App permission management</li>
                      <li>• Regular OS updates</li>
                      <li>• Official app stores only</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={styles.quickTips}>
                <h3>⚡ Quick Daily Safety Tips</h3>
                <div style={styles.tipsGrid}>
                  <div style={styles.tipCard}>
                    <span style={styles.tipIcon}>👀</span>
                    <p><strong>Before clicking:</strong> Hover over links to see the real destination</p>
                  </div>
                  <div style={styles.tipCard}>
                    <span style={styles.tipIcon}>🔍</span>
                    <p><strong>Verify sender:</strong> Check the email address carefully for typos</p>
                  </div>
                  <div style={styles.tipCard}>
                    <span style={styles.tipIcon}>📱</span>
                    <p><strong>Separate channels:</strong> If you get an email, verify by phone</p>
                  </div>
                  <div style={styles.tipCard}>
                    <span style={styles.tipIcon}>⏰</span>
                    <p><strong>Take time:</strong> Urgent requests are often scams</p>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('protection')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Response Section */}
          {activeSection === 'response' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🚨 Incident Response: What to Do If You're Targeted</h2>
              
              <div style={styles.responseScenarios}>
                <div style={styles.scenarioCard}>
                  <h3 style={styles.scenarioTitle}>
                    <span style={styles.scenarioIcon}>😰</span>
                    "I Think I Clicked a Malicious Link"
                  </h3>
                  <div style={styles.immediateActions}>
                    <h4>Immediate Actions (Next 5 minutes):</h4>
                    <ol style={styles.actionList}>
                      <li>Disconnect from the internet immediately</li>
                      <li>Don't enter any passwords or personal information</li>
                      <li>Take a screenshot of what you see</li>
                      <li>Close all browser windows</li>
                      <li>Run a full antivirus scan</li>
                    </ol>
                  </div>
                  <div style={styles.followupActions}>
                    <h4>Follow-up Actions (Next 24 hours):</h4>
                    <ul style={styles.actionList}>
                      <li>Change passwords for all important accounts</li>
                      <li>Check bank and credit card statements</li>
                      <li>Report the incident to your IT department</li>
                      <li>Monitor accounts for unusual activity</li>
                      <li>Consider placing a fraud alert with credit bureaus</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.scenarioCard}>
                  <h3 style={styles.scenarioTitle}>
                    <span style={styles.scenarioIcon}>💳</span>
                    "I Entered My Credit Card Information"
                  </h3>
                  <div style={styles.immediateActions}>
                    <h4>Immediate Actions (Next 5 minutes):</h4>
                    <ol style={styles.actionList}>
                      <li>Contact your bank/credit card company immediately</li>
                      <li>Report fraudulent activity and request card cancellation</li>
                      <li>Screenshot the fake website for evidence</li>
                      <li>Do NOT enter any additional information</li>
                      <li>Save all related emails and messages</li>
                    </ol>
                  </div>
                  <div style={styles.followupActions}>
                    <h4>Follow-up Actions (Next 24 hours):</h4>
                    <ul style={styles.actionList}>
                      <li>File a police report if money was stolen</li>
                      <li>Report to FBI's IC3 (Internet Crime Complaint Center)</li>
                      <li>Monitor all financial accounts closely</li>
                      <li>Consider identity theft monitoring services</li>
                      <li>Review and dispute any unauthorized charges</li>
                    </ul>
                  </div>
                </div>

                <div style={styles.scenarioCard}>
                  <h3 style={styles.scenarioTitle}>
                    <span style={styles.scenarioIcon}>🔐</span>
                    "I Gave Away My Login Credentials"
                  </h3>
                  <div style={styles.immediateActions}>
                    <h4>Immediate Actions (Next 5 minutes):</h4>
                    <ol style={styles.actionList}>
                      <li>Change passwords immediately on all accounts</li>
                      <li>Enable 2FA/MFA where not already active</li>
                      <li>Log out of all devices and sessions</li>
                      <li>Check recent login activity</li>
                      <li>Review account settings for unauthorized changes</li>
                    </ol>
                  </div>
                  <div style={styles.followupActions}>
                    <h4>Follow-up Actions (Next 24 hours):</h4>
                    <ul style={styles.actionList}>
                      <li>Notify contacts about potential compromised account</li>
                      <li>Review connected apps and revoke suspicious access</li>
                      <li>Check for unauthorized purchases or subscriptions</li>
                      <li>Update security questions and recovery information</li>
                      <li>Monitor for signs of identity theft</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={styles.reportingSection}>
                <h3>📞 Who to Contact & Report To</h3>
                <div style={styles.contactsGrid}>
                  <div style={styles.contactCard}>
                    <h4>🏛️ Government Agencies</h4>
                    <ul>
                      <li><strong>FBI IC3:</strong> ic3.gov (Internet crimes)</li>
                      <li><strong>FTC:</strong> reportfraud.ftc.gov</li>
                      <li><strong>Local Police:</strong> For financial losses</li>
                      <li><strong>Cybercrime Units:</strong> State-level reporting</li>
                    </ul>
                  </div>
                  
                  <div style={styles.contactCard}>
                    <h4>🏢 Financial Institutions</h4>
                    <ul>
                      <li><strong>Your Bank:</strong> Fraud department directly</li>
                      <li><strong>Credit Card Companies:</strong> 24/7 fraud lines</li>
                      <li><strong>Credit Bureaus:</strong> Equifax, Experian, TransUnion</li>
                      <li><strong>PayPal/Venmo:</strong> Report unauthorized transactions</li>
                    </ul>
                  </div>
                  
                  <div style={styles.contactCard}>
                    <h4>🌐 Tech Companies</h4>
                    <ul>
                      <li><strong>Email Providers:</strong> Report phishing emails</li>
                      <li><strong>Social Media:</strong> Report fake accounts/posts</li>
                      <li><strong>Domain Registrars:</strong> Report malicious websites</li>
                      <li><strong>App Stores:</strong> Report malicious apps</li>
                    </ul>
                  </div>
                  
                  <div style={styles.contactCard}>
                    <h4>💼 Workplace</h4>
                    <ul>
                      <li><strong>IT Security Team:</strong> Immediate notification</li>
                      <li><strong>HR Department:</strong> Policy violations</li>
                      <li><strong>Management:</strong> Potential business impact</li>
                      <li><strong>Legal Department:</strong> Compliance issues</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={styles.preventionReminder}>
                <h3>🔄 Prevention is Better Than Response</h3>
                <p style={styles.preventionText}>
                  While it's important to know how to respond to phishing attacks, the best strategy is prevention. 
                  Regular training, updated security tools, and a healthy skepticism of unsolicited communications 
                  are your first line of defense.
                </p>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('response')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Advanced Topics Section */}
          {activeSection === 'advanced' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🎓 Advanced Phishing Topics</h2>
              
              <div style={styles.advancedTopics}>
                <div style={styles.advancedCard}>
                  <h3>🤖 AI-Powered Phishing Attacks</h3>
                  <p>
                    Modern attackers use artificial intelligence to create more convincing phishing attempts:
                  </p>
                  <ul>
                    <li><strong>Deepfake Audio/Video:</strong> Fake CEO voices requesting wire transfers</li>
                    <li><strong>AI-Written Content:</strong> Grammar-perfect, context-aware phishing emails</li>
                    <li><strong>Personalization at Scale:</strong> Mass attacks with individualized content</li>
                    <li><strong>Social Media Scraping:</strong> AI analyzing public profiles for targeted attacks</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Verify unusual requests through multiple channels, especially financial ones.
                  </div>
                </div>

                <div style={styles.advancedCard}>
                  <h3>🕷️ Business Email Compromise (BEC)</h3>
                  <p>
                    Sophisticated attacks targeting businesses with financial fraud:
                  </p>
                  <ul>
                    <li><strong>CEO Fraud:</strong> Impersonating executives to authorize transfers</li>
                    <li><strong>Vendor Payment Fraud:</strong> Redirecting legitimate payments to attacker accounts</li>
                    <li><strong>Payroll Diversion:</strong> Changing employee direct deposit information</li>
                    <li><strong>Attorney Impersonation:</strong> Urgent "confidential" legal matters</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Implement multi-person approval for financial transactions.
                  </div>
                </div>

                <div style={styles.advancedCard}>
                  <h3>⚡ Lightning-Fast Attack Evolution</h3>
                  <p>
                    How quickly phishing campaigns adapt to current events:
                  </p>
                  <ul>
                    <li><strong>COVID-19 Scams:</strong> Vaccine appointments, relief funds, health alerts</li>
                    <li><strong>Tax Season:</strong> IRS impersonation, refund fraud, filing assistance</li>
                    <li><strong>Holiday Shopping:</strong> Fake delivery notifications, gift card scams</li>
                    <li><strong>Breaking News:</strong> Natural disasters, political events, celebrity news</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Be extra cautious during high-emotion or high-attention events.
                  </div>
                </div>

                <div style={styles.advancedCard}>
                  <h3>📱 Mobile-Specific Attacks</h3>
                  <p>
                    Unique challenges and attack vectors on mobile devices:
                  </p>
                  <ul>
                    <li><strong>App Impersonation:</strong> Fake apps in unofficial stores</li>
                    <li><strong>SMS Takeover:</strong> SIM swapping for 2FA bypass</li>
                    <li><strong>QR Code Attacks:</strong> Malicious codes leading to fake sites</li>
                    <li><strong>Push Notification Spoofing:</strong> Fake system alerts</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Only download apps from official stores, verify QR code sources.
                  </div>
                </div>

                <div style={styles.advancedCard}>
                  <h3>🔗 Supply Chain Attacks</h3>
                  <p>
                    Attackers compromise trusted suppliers to reach ultimate targets:
                  </p>
                  <ul>
                    <li><strong>Software Updates:</strong> Malicious code in legitimate software updates</li>
                    <li><strong>Third-party Services:</strong> Compromising SaaS providers</li>
                    <li><strong>Email Service Providers:</strong> Attacking hosting companies</li>
                    <li><strong>Vendor Relationships:</strong> Using trusted partner credentials</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Verify all software updates, limit third-party access.
                  </div>
                </div>

                <div style={styles.advancedCard}>
                  <h3>🧬 Polymorphic Phishing</h3>
                  <p>
                    Attacks that constantly change to evade detection:
                  </p>
                  <ul>
                    <li><strong>Dynamic Content:</strong> Web pages that change based on visitor</li>
                    <li><strong>Randomized Elements:</strong> Slightly different versions for each target</li>
                    <li><strong>Time-based Activation:</strong> Links that only work during specific periods</li>
                    <li><strong>Geographic Targeting:</strong> Different content based on location</li>
                  </ul>
                  <div style={styles.advancedTip}>
                    <strong>Defense:</strong> Use multiple security tools, stay updated on latest threat intelligence.
                  </div>
                </div>
              </div>

              <div style={styles.futureThreats}>
                <h3>🔮 Emerging Threats to Watch</h3>
                <div style={styles.threatsList}>
                  <div style={styles.threat}>
                    <span style={styles.threatIcon}>🥽</span>
                    <div>
                      <h4>Virtual/Augmented Reality Phishing</h4>
                      <p>Fake VR environments or AR overlays to steal information</p>
                    </div>
                  </div>
                  <div style={styles.threat}>
                    <span style={styles.threatIcon}>🏠</span>
                    <div>
                      <h4>IoT Device Exploitation</h4>
                      <p>Smart home devices used as entry points for phishing campaigns</p>
                    </div>
                  </div>
                  <div style={styles.threat}>
                    <span style={styles.threatIcon}>💰</span>
                    <div>
                      <h4>Cryptocurrency-Based Scams</h4>
                      <p>Fake wallet apps, investment schemes, and NFT marketplace fraud</p>
                    </div>
                  </div>
                  <div style={styles.threat}>
                    <span style={styles.threatIcon}>🤖</span>
                    <div>
                      <h4>Chatbot Impersonation</h4>
                      <p>AI chatbots impersonating customer service representatives</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                style={styles.completeButton}
                onClick={() => markSectionComplete('advanced')}
              >
                Mark as Complete ✓
              </button>
            </div>
          )}

          {/* Quiz Section */}
          {activeSection === 'quiz' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🧪 Knowledge Check Quiz</h2>
              
              <div style={styles.quizContainer}>
                <div style={styles.quizIntro}>
                  <p>Test your understanding of phishing concepts with this interactive quiz. 
                     Each question includes detailed explanations to reinforce learning.</p>
                </div>

                {quizQuestions.map((question, index) => (
                  <div key={question.id} style={styles.questionCard}>
                    <h3 style={styles.questionTitle}>
                      Question {index + 1}: {question.question}
                    </h3>
                    
                    <div style={styles.optionsContainer}>
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          style={{
                            ...styles.optionButton,
                            ...(quizAnswers[question.id] === optionIndex ? styles.selectedOption : {}),
                            ...(showQuizResults && optionIndex === question.correct ? styles.correctOption : {}),
                            ...(showQuizResults && quizAnswers[question.id] === optionIndex && optionIndex !== question.correct ? styles.incorrectOption : {})
                          }}
                          onClick={() => handleQuizAnswer(question.id, optionIndex)}
                          disabled={showQuizResults}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showQuizResults && (
                      <div style={styles.explanation}>
                        <h4>Explanation:</h4>
                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}

                {!showQuizResults ? (
                  <button 
                    style={styles.submitQuizButton}
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <div style={styles.quizResults}>
                    <h3>Quiz Results</h3>
                    <div style={styles.scoreDisplay}>
                      <div style={styles.scoreNumber}>{getQuizScore().percentage}%</div>
                      <div style={styles.scoreText}>
                        {getQuizScore().correct} out of {getQuizScore().total} correct
                      </div>
                    </div>
                    <div style={styles.performanceFeedback}>
                      {getQuizScore().percentage >= 80 ? (
                        <div style={styles.excellentScore}>
                          🎉 Excellent! You have a strong understanding of phishing concepts.
                        </div>
                      ) : getQuizScore().percentage >= 60 ? (
                        <div style={styles.goodScore}>
                          👍 Good job! Consider reviewing the areas you missed.
                        </div>
                      ) : (
                        <div style={styles.needsImprovement}>
                          📚 Consider reviewing the learning materials and retaking the quiz.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Completion Status */}
          {completedSections.size === sections.length && (
            <div style={styles.completionBanner}>
              <h2>🎉 Congratulations!</h2>
              <p>
                You've completed the comprehensive phishing defense course. You now have the knowledge 
                and tools to protect yourself and others from phishing attacks.
              </p>
              <div style={styles.nextSteps}>
                <h3>What's Next?</h3>
                <ul>
                  <li>Practice with our interactive simulations</li>
                  <li>Share your knowledge with friends and family</li>
                  <li>Stay updated with the latest threat intelligence</li>
                  <li>Consider advanced cybersecurity training</li>
                </ul>
              </div>
              <Link to="/attack-simulation" style={styles.simulationButton}>
                Try Phishing Simulations 🎭
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  
  header: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    padding: '3rem 2rem',
  },
  
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  
  titleIcon: {
    fontSize: '3rem',
  },
  
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto 2rem',
  },
  
  progressContainer: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  
  progressBar: {
    width: '100%',
    height: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    transition: 'width 0.5s ease',
    borderRadius: '0.25rem',
  },
  
  progressText: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },
  
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    alignItems: 'start',
  },
  
  sidebar: {
    position: 'sticky',
    top: '2rem',
  },
  
  sidebarContent: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  
  sidebarTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  
  navButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    margin: '0.25rem 0',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    color: '#6b7280',
  },
  
  navButtonActive: {
    backgroundColor: '#4f46e5',
    color: 'white',
  },
  
  navButtonCompleted: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  
  navIcon: {
    fontSize: '1.2rem',
  },
  
  navText: {
    flex: 1,
    textAlign: 'left',
  },
  
  checkmark: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  
  content: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '3rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    minHeight: '800px',
  },
  // Continuation of styles object:
  
  section: {
    marginBottom: '2rem',
  },
  
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  sectionIntro: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#4b5563',
    margin: '0',
  },
  
  introCard: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #bae6fd',
    marginBottom: '2rem',
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  
  statCard: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '1rem',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  
  statIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    display: 'block',
    marginBottom: '0.5rem',
  },
  
  statLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  
  definitionBox: {
    backgroundColor: '#fefce8',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #fde047',
    marginBottom: '3rem',
  },
  
  definitionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#92400e',
  },
  
  definitionText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#78350f',
    marginBottom: '1rem',
  },
  
  definitionList: {
    color: '#78350f',
    paddingLeft: '1.5rem',
  },
  
  timelineSection: {
    marginBottom: '3rem',
  },
  
  timelineTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '2rem',
    color: '#1f2937',
  },
  
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  
  timelineItem: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
  },
  
  timelineYear: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#4f46e5',
    minWidth: '80px',
  },
  
  timelineContent: {
    flex: 1,
  },
  
  typesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  
  typeCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease',
  },
  
  typeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  
  typeIcon: {
    fontSize: '2rem',
  },
  
  severityBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    backgroundColor: '#dc2626',
    color: 'white',
    marginLeft: 'auto',
  },
  
  typeDescription: {
    fontSize: '1rem',
    color: '#4b5563',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  
  typeDetails: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #e2e8f0',
  },
  
  psychologyIntro: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    marginBottom: '3rem',
    border: '1px solid #bae6fd',
  },
  
  psychologyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  
  psychCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  
  psychIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  psychExample: {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#4b5563',
    fontStyle: 'italic',
  },
  
  defenseStrategies: {
    backgroundColor: '#ecfdf5',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #86efac',
    marginBottom: '3rem',
  },
  
  strategyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  strategy: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #bbf7d0',
  },
  
  strategyIcon: {
    fontSize: '1.5rem',
    marginTop: '0.25rem',
  },
  
  identificationGuide: {
    marginBottom: '3rem',
  },
  
  checklistSection: {
    marginBottom: '3rem',
  },
  
  checklist: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  
  checklistCategory: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
  },
  
  checklistItems: {
    paddingLeft: '1.5rem',
    color: '#4b5563',
    lineHeight: '1.8',
  },
  
  analysisTools: {
    backgroundColor: '#fefce8',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #fde047',
    marginBottom: '3rem',
  },
  
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  
  toolCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #facc15',
  },
  
  toolExample: {
    backgroundColor: '#f6f8fa',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginTop: '1rem',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#374151',
  },
  
  examplesContainer: {
    marginBottom: '3rem',
  },
  
  exampleCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  exampleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  exampleType: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  
  exampleIcon: {
    fontSize: '1.5rem',
  },
  
  severityIndicator: {
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'white',
  },
  
  exampleContent: {
    marginBottom: '1.5rem',
  },
  
  exampleMeta: {
    fontSize: '0.9rem',
    color: '#4b5563',
    marginBottom: '0.5rem',
  },
  
  exampleMessage: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    marginTop: '1rem',
  },
  
  redFlagsSection: {
    backgroundColor: '#fef2f2',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #fecaca',
  },
  
  redFlagsTitle: {
    color: '#dc2626',
    fontSize: '1rem',
    margin: '0 0 1rem 0',
  },
  
  redFlagsList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  
  redFlagItem: {
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #f87171',
    color: '#7f1d1d',
    fontSize: '0.9rem',
  },
  
  analysisSection: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #bae6fd',
  },
  
  patternGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  
  patternCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #93c5fd',
  },
  
  patternKeywords: {
    backgroundColor: '#dbeafe',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#1e40af',
    fontStyle: 'italic',
  },
  
  protectionLayers: {
    marginBottom: '3rem',
  },
  
  layersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  
  layer: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
  },
  
  layerNumber: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  
  layerContent: {
    flex: 1,
  },
  
  toolsRecommendations: {
    marginBottom: '3rem',
  },
  
  toolsCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  
  toolCategory: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
  },
  
  toolList: {
    color: '#4b5563',
    paddingLeft: '1rem',
  },
  
  quickTips: {
    backgroundColor: '#ecfdf5',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #86efac',
  },
  
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  
  tipCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #bbf7d0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  
  tipIcon: {
    fontSize: '1.5rem',
    marginTop: '0.25rem',
  },
  
  responseScenarios: {
    marginBottom: '3rem',
  },
  
  scenarioCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  scenarioTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  
  scenarioIcon: {
    fontSize: '1.5rem',
  },
  
  immediateActions: {
    backgroundColor: '#fef2f2',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #fecaca',
  },
  
  followupActions: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #bae6fd',
  },
  
  actionList: {
    color: '#4b5563',
    paddingLeft: '1.5rem',
    lineHeight: '1.8',
  },
  
  reportingSection: {
    marginBottom: '3rem',
  },
  
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  
  contactCard: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
  },
  
  preventionReminder: {
    backgroundColor: '#ecfdf5',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #86efac',
    textAlign: 'center',
  },
  
  preventionText: {
    fontSize: '1.1rem',
    color: '#065f46',
    lineHeight: '1.7',
    margin: '1rem 0 0 0',
  },
  
  advancedTopics: {
    marginBottom: '3rem',
  },
  
  advancedCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  advancedTip: {
    backgroundColor: '#ecfdf5',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginTop: '1rem',
    color: '#065f46',
    border: '1px solid #bbf7d0',
  },
  
  futureThreats: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #bae6fd',
  },
  
  threatsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  
  threat: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #93c5fd',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  
  threatIcon: {
    fontSize: '2rem',
    marginTop: '0.25rem',
  },
  
  quizContainer: {
    marginBottom: '3rem',
  },
  
  quizIntro: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #bae6fd',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  
  questionCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  questionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  
  optionsContainer: {
    display: 'grid',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  
  optionButton: {
    padding: '1rem',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    fontSize: '1rem',
  },
  
  selectedOption: {
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
  },
  
  correctOption: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
  
  incorrectOption: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  
  explanation: {
    backgroundColor: '#fefce8',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #fde047',
    marginTop: '1rem',
  },
  
  submitQuizButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'block',
    margin: '2rem auto 0',
    transition: 'background-color 0.2s ease',
  },
  
  quizResults: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #bae6fd',
    textAlign: 'center',
    marginTop: '2rem',
  },
  
  scoreDisplay: {
    marginBottom: '1.5rem',
  },
  
  scoreNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#1e40af',
    display: 'block',
  },
  
  scoreText: {
    fontSize: '1.1rem',
    color: '#4b5563',
  },
  
  performanceFeedback: {
    marginTop: '1rem',
  },
  
  excellentScore: {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #86efac',
  },
  
  goodScore: {
    backgroundColor: '#fefce8',
    color: '#92400e',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #fde047',
  },
  
  needsImprovement: {
    backgroundColor: '#fef2f2',
    color: '#7f1d1d',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #fecaca',
  },
  
  completeButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  
  completionBanner: {
    backgroundColor: '#ecfdf5',
    padding: '3rem',
    borderRadius: '1rem',
    border: '2px solid #86efac',
    textAlign: 'center',
    marginTop: '3rem',
  },
  
  nextSteps: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    marginTop: '2rem',
    textAlign: 'left',
    maxWidth: '500px',
    margin: '2rem auto',
  },
  
  simulationButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    textDecoration: 'none',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '2rem',
    transition: 'background-color 0.2s ease',
  },
  
  // Responsive styles
  '@media (max-width: 1024px)': {
    mainContent: {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    
    sidebar: {
      position: 'static',
    },
    
    sidebarContent: {
      display: 'flex',
      overflowX: 'auto',
      gap: '0.5rem',
      padding: '1rem',
    },
    
    navButton: {
      minWidth: '150px',
      whiteSpace: 'nowrap',
    },
  },
  
  '@media (max-width: 768px)': {
    title: {
      fontSize: '2rem',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    
    content: {
      padding: '2rem 1rem',
    },
    
    typesGrid: {
      gridTemplateColumns: '1fr',
    },
    
    psychologyGrid: {
      gridTemplateColumns: '1fr',
    },
    
    timeline: {
      gap: '1rem',
    },
    
    timelineItem: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    
    layer: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  .type-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .option-button:hover:not(:disabled) {
    border-color: #4f46e5;
    background-color: #eef2ff;
  }
  
  .complete-button:hover {
    background-color: #059669;
  }
  
  .submit-quiz-button:hover:not(:disabled) {
    background-color: #4338ca;
  }
  
  .submit-quiz-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .simulation-button:hover {
    background-color: #4338ca;
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .section {
    animation: slideIn 0.5s ease-out;
  }
`;
document.head.appendChild(styleSheet);

