import React, { useEffect, useState } from 'react';
import AwarenessLinkService from './AwarenessLinkService';

export default function LinkManager() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserLinks();
  }, []);

  const fetchUserLinks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await AwarenessLinkService.getUserLinks();
      if (response.success) {
        setLinks(response.links || []);
      } else {
        setError('Failed to fetch links: ' + response.message);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      setError('Error loading links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (linkUrl) => {
    navigator.clipboard.writeText(linkUrl).then(() => {
      alert('Link copied to clipboard! 📋');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  const shareViaEmail = (linkUrl, platform) => {
    const subject = encodeURIComponent('🛡️ Test Your Cybersecurity Skills!');
    const body = encodeURIComponent(
      `Hi! I've been learning about cybersecurity and wanted to share this educational simulation with you.\n\nClick here to test your ability to spot phishing attempts: ${linkUrl}\n\nThis is a safe, educational tool designed to help people recognize online scams.\n\nStay safe online!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const getStatusBadge = (link) => {
    const now = new Date();
    const expiryDate = new Date(link.expiresAt);
    
    if (!link.isActive) {
      return <span style={styles.expiredBadge}>❌ Expired</span>;
    } else if (now > expiryDate) {
      return <span style={styles.expiredBadge}>⏰ Time Expired</span>;
    } else if (link.currentClicks >= link.maxClicks) {
      return <span style={styles.expiredBadge}>✋ Max Clicks Reached</span>;
    } else {
      return <span style={styles.activeBadge}>✅ Active</span>;
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'facebook': '📘',
      'instagram': '📷',
      'netflix': '🎬',
      'amazon': '📦',
      'google': '🌐'
    };
    return icons[platform.toLowerCase()] || '🔗';
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h3>Loading your links... ⏳</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📊 Your Generated Awareness Links</h2>
        <button style={styles.refreshButton} onClick={fetchUserLinks}>
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {links.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>🔗 No links generated yet</h3>
          <p>Create your first awareness link in the simulation section to get started!</p>
        </div>
      ) : (
        <div style={styles.linksGrid}>
          {links.map((link) => (
            <div key={link.id} style={styles.linkCard}>
              <div style={styles.linkHeader}>
                <div style={styles.platformInfo}>
                  <span style={styles.platformIcon}>
                    {getPlatformIcon(link.platformType)}
                  </span>
                  <span style={styles.platformName}>
                    {link.platformType.charAt(0).toUpperCase() + link.platformType.slice(1)}
                  </span>
                </div>
                {getStatusBadge(link)}
              </div>

              <div style={styles.linkUrl}>
                <input
                  type="text"
                  value={`http://localhost:8080/awareness/${link.token}`}
                  readOnly
                  style={styles.urlInput}
                  onClick={(e) => e.target.select()}
                />
              </div>

              <div style={styles.linkStats}>
                <div style={styles.stat}>
                  <span style={styles.statLabel}>Clicks:</span>
                  <span style={styles.statValue}>{link.currentClicks}/{link.maxClicks}</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statLabel}>Created:</span>
                  <span style={styles.statValue}>
                    {new Date(link.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statLabel}>Expires:</span>
                  <span style={styles.statValue}>
                    {new Date(link.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={styles.linkActions}>
                <button
                  style={styles.actionButton}
                  onClick={() => copyToClipboard(`http://localhost:8080/awareness/${link.token}`)}
                >
                  📋 Copy
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => shareViaEmail(`http://localhost:8080/awareness/${link.token}`, link.platformType)}
                >
                  📧 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#333',
    margin: 0,
  },
  refreshButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    color: '#666',
  },
  linksGrid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  },
  linkCard: {
    backgroundColor: 'white',
    border: '1px solid #e9ecef',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  linkHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  platformInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  platformIcon: {
    fontSize: '1.5rem',
  },
  platformName: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  activeBadge: {
    color: '#28a745',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  expiredBadge: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  linkUrl: {
    marginBottom: '1rem',
  },
  urlInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
  },
  linkStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  stat: {
    textAlign: 'center',
  },
  statLabel: {
    display: 'block',
    color: '#666',
    fontSize: '0.8rem',
  },
  statValue: {
    display: 'block',
    fontWeight: '600',
    color: '#333',
  },
  linkActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};
