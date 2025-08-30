import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function AwarenessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get platform and message from location state or URL params
  const { platform, message } = location.state || {};
  const urlParams = new URLSearchParams(location.search);
  const platformFromUrl = urlParams.get('platform') || platform || 'unknown';
  const messageFromUrl = message || `You just interacted with a simulated ${platformFromUrl} phishing page!`;

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: '📘',
      instagram: '📷',
      netflix: '🎬',
      amazon: '📦',
      google: '🌐'
    };
    return icons[platform?.toLowerCase()] || '🎯';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: '#1877f2',
      instagram: '#E4405F',
      netflix: '#E50914',
      amazon: '#FF9900',
      google: '#4285F4'
    };
    return colors[platform?.toLowerCase()] || '#007bff';
  };

  const getPhishingTips = (platform) => {
    const tips = {
      facebook: [
        'Always check the URL - it should be facebook.com, not a similar-looking domain',
        'Look for the secure padlock icon (HTTPS) in your browser',
        'Facebook will never ask for your password via email or suspicious links',
        'Enable two-factor authentication on your real Facebook account'
      ],
      instagram: [
        'Verify the URL is instagram.com before entering credentials',
        'Instagram never asks for login via external links in messages',
        'Be suspicious of urgent messages about account suspension',
        'Check for spelling errors and poor grammar in suspicious messages'
      ],
      netflix: [
        'Netflix will never ask you to verify payment via email links',
        'Always log into Netflix directly through their official website',
        'Be cautious of "free trial" offers from unofficial sources',
        'Netflix emails come from official @netflix.com addresses'
      ],
      amazon: [
        'Amazon URLs should always start with amazon.com or smile.amazon.com',
        'Be wary of urgent messages about account suspension',
        'Amazon will never ask for sensitive info via email',
        'Check for the padlock icon and correct spelling in URLs'
      ],
      google: [
        'Google sign-in pages should always be on accounts.google.com',
        'Look for Google\'s official branding and design',
        'Enable 2-step verification on your Google account',
        'Google will never ask for passwords via email or suspicious links'
      ]
    };
    
    const defaultTips = [
      'Always verify the URL carefully before entering credentials',
      'Look for HTTPS and the correct domain name',
      'Be suspicious of urgent requests for login information',
      'When in doubt, navigate to the official website directly',
      'Enable two-factor authentication wherever possible'
    ];
    
    return tips[platform?.toLowerCase()] || defaultTips;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.alertIcon}>🚨</div>
          <h1 style={styles.title}>Phishing Simulation Alert!</h1>
        </div>

        <div style={{...styles.warningBox, borderColor: getPlatformColor(platformFromUrl)}}>
          <div style={styles.platformHeader}>
            <span style={styles.platformIcon}>{getPlatformIcon(platformFromUrl)}</span>
            <h2 style={styles.warningTitle}>
              You Just Experienced a {platformFromUrl.charAt(0).toUpperCase() + platformFromUrl.slice(1)} Phishing Simulation
            </h2>
          </div>
          <p style={styles.warningMessage}>{messageFromUrl}</p>
          <div style={styles.congratsBox}>
            <p><strong>🎉 Congratulations!</strong> You've just completed an educational phishing simulation.</p>
            <p>This was <strong>completely safe</strong> and designed to help you recognize real phishing attempts.</p>
          </div>
        </div>

        <div style={styles.learningSection}>
          <h3 style={styles.learningTitle}>🧠 What You Should Have Noticed:</h3>
          <div style={styles.tipsGrid}>
            {getPhishingTips(platformFromUrl).map((tip, index) => (
              <div key={index} style={styles.tipCard}>
                <span style={styles.tipIcon}>💡</span>
                <span style={styles.tipText}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.statsSection}>
          <h3 style={styles.statsTitle}>📊 Did You Know?</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>43%</div>
              <div style={styles.statLabel}>of cyber attacks target small businesses</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>90%</div>
              <div style={styles.statLabel}>of data breaches are caused by human error</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>3.4B</div>
              <div style={styles.statLabel}>phishing emails sent daily</div>
            </div>
          </div>
        </div>

        <div style={styles.protectionSection}>
          <h3 style={styles.protectionTitle}>🛡️ How to Protect Yourself:</h3>
          <div style={styles.protectionGrid}>
            <div style={styles.protectionItem}>
              <span style={styles.protectionIcon}>🔍</span>
              <div>
                <h4 style={styles.protectionItemTitle}>Verify URLs</h4>
                <p style={styles.protectionItemText}>Always check the web address carefully before entering sensitive information</p>
              </div>
            </div>
            <div style={styles.protectionItem}>
              <span style={styles.protectionIcon}>🔐</span>
              <div>
                <h4 style={styles.protectionItemTitle}>Use 2FA</h4>
                <p style={styles.protectionItemText}>Enable two-factor authentication on all important accounts</p>
              </div>
            </div>
            <div style={styles.protectionItem}>
              <span style={styles.protectionIcon}>📧</span>
              <div>
                <h4 style={styles.protectionItemTitle}>Be Skeptical</h4>
                <p style={styles.protectionItemText}>Question urgent requests for personal information via email or text</p>
              </div>
            </div>
            <div style={styles.protectionItem}>
              <span style={styles.protectionIcon}>🔄</span>
              <div>
                <h4 style={styles.protectionItemTitle}>Stay Updated</h4>
                <p style={styles.protectionItemText}>Keep your software and browsers updated with latest security patches</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <Link to="/learn" style={styles.learnButton}>
            📚 Learn More About Cybersecurity
          </Link>
          <Link to="/attack-simulation" style={styles.simulationButton}>
            🎭 Try More Simulations
          </Link>
          <Link to="/" style={styles.homeButton}>
            🏠 Return Home
          </Link>
        </div>

        <div style={styles.shareSection}>
          <h4 style={styles.shareTitle}>📢 Share the Knowledge!</h4>
          <p style={styles.shareText}>Help others stay safe by sharing this educational tool with friends and family.</p>
          <button 
            style={styles.shareButton}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'ClickSafe - Phishing Awareness Tool',
                  text: 'I just learned about phishing attacks with this educational tool. Check it out!',
                  url: window.location.origin
                });
              } else {
                navigator.clipboard.writeText(window.location.origin);
                alert('Link copied to clipboard!');
              }
            }}
          >
            🔗 Share ClickSafe
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            <strong>Remember:</strong> This was a safe, educational simulation. 
            Stay vigilant and think before you click in real situations!
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    maxWidth: '900px',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '3rem',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  alertIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'pulse 2s infinite',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1e293b',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  warningBox: {
    backgroundColor: '#fef3c7',
    padding: '2rem',
    borderRadius: '16px',
    border: '2px solid #f59e0b',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  platformHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  platformIcon: {
    fontSize: '2rem',
  },
  warningTitle: {
    fontSize: '1.5rem',
    color: '#92400e',
    margin: '0',
    fontWeight: '600',
  },
  warningMessage: {
    fontSize: '1.1rem',
    color: '#92400e',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  congratsBox: {
    backgroundColor: '#d1fae5',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #34d399',
  },
  learningSection: {
    marginBottom: '3rem',
  },
  learningTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  tipsGrid: {
    display: 'grid',
    gap: '1rem',
  },
  tipCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
  },
  tipIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  tipText: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.6',
  },
  statsSection: {
    backgroundColor: '#eff6ff',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #bfdbfe',
    marginBottom: '3rem',
  },
  statsTitle: {
    fontSize: '1.5rem',
    color: '#1e40af',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #bfdbfe',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500',
  },
  protectionSection: {
    marginBottom: '3rem',
  },
  protectionTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  protectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  protectionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  protectionIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  protectionItemTitle: {
    fontSize: '1.1rem',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    fontWeight: '600',
  },
  protectionItemText: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  learnButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  simulationButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  homeButton: {
    backgroundColor: '#6b7280',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
  },
  shareSection: {
    backgroundColor: '#f0fdf4',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #bbf7d0',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  shareTitle: {
    fontSize: '1.3rem',
    color: '#166534',
    margin: '0 0 1rem 0',
    fontWeight: '600',
  },
  shareText: {
    fontSize: '1rem',
    color: '#15803d',
    marginBottom: '1.5rem',
  },
  shareButton: {
    backgroundColor: '#22c55e',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    borderTop: '2px solid #e2e8f0',
    paddingTop: '2rem',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '1rem',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.6',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .learn-button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }
  
  .simulation-button:hover {
    background-color: #059669;
    transform: translateY(-2px);
  }
  
  .home-button:hover {
    background-color: #4b5563;
    transform: translateY(-2px);
  }
  
  .share-button:hover {
    background-color: #16a34a;
  }
`;
document.head.appendChild(styleSheet);
