import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkNotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🚫</div>
        <h1 style={styles.title}>Link Not Found</h1>
        
        <div style={styles.message}>
          <p>
            The link you followed is <strong>invalid</strong>, <strong>has been removed</strong>, 
            or <strong>never existed</strong>.
          </p>
          <p>
            If you received this link from someone you don't know, or if it seemed suspicious, 
            this could have been a malicious attempt.
          </p>
        </div>

        <div style={styles.warningBox}>
          <h3>⚠️ Red Flags to Watch For:</h3>
          <ul style={styles.warningList}>
            <li>Links from unknown senders or suspicious emails</li>
            <li>URLs that don't match the claimed organization</li>
            <li>Urgent messages demanding immediate action</li>
            <li>Requests for personal information or passwords</li>
            <li>Poor spelling or grammar in messages</li>
          </ul>
        </div>

        <div style={styles.safetyTips}>
          <h3>🛡️ Stay Safe Online:</h3>
          <div style={styles.tipsGrid}>
            <div style={styles.tip}>
              <span style={styles.tipIcon}>✅</span>
              <span>Always verify sender identity before clicking links</span>
            </div>
            <div style={styles.tip}>
              <span style={styles.tipIcon}>✅</span>
              <span>Hover over links to see where they actually lead</span>
            </div>
            <div style={styles.tip}>
              <span style={styles.tipIcon}>✅</span>
              <span>When in doubt, visit the official website directly</span>
            </div>
            <div style={styles.tip}>
              <span style={styles.tipIcon}>✅</span>
              <span>Report suspicious links to help protect others</span>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <Link to="/learn" style={styles.primaryButton}>
            📚 Learn About Phishing Protection
          </Link>
          <Link to="/attack-simulation" style={styles.secondaryButton}>
            🎭 Try Safe Simulations
          </Link>
          <Link to="/" style={styles.tertiaryButton}>
            🏠 Homepage
          </Link>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Stay vigilant and help others learn about online safety with <strong>ClickSafe</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    maxWidth: '700px',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '3rem',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: '#dc3545',
    marginBottom: '2rem',
    fontWeight: '700',
  },
  message: {
    fontSize: '1.1rem',
    color: '#495057',
    lineHeight: '1.6',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  warningList: {
    margin: '1rem 0 0 1rem',
    lineHeight: '1.6',
  },
  safetyTips: {
    backgroundColor: '#d1ecf1',
    border: '1px solid #bee5eb',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  tipsGrid: {
    display: 'grid',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  tip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1rem',
  },
  tipIcon: {
    fontSize: '1.2rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  secondaryButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  tertiaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  footer: {
    borderTop: '1px solid #e9ecef',
    paddingTop: '1.5rem',
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#6c757d',
    margin: 0,
  },
};
