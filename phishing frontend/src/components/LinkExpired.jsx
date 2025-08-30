import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkExpired() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>⏰</div>
        <h1 style={styles.title}>This Link Has Expired</h1>
        
        <div style={styles.message}>
          <p>
            The awareness link you clicked has either <strong>expired due to time</strong> or has 
            <strong> reached its maximum number of clicks</strong>.
          </p>
          <p>
            This expiration is by design - awareness links have built-in security measures to prevent 
            misuse and ensure they're used for educational purposes only.
          </p>
        </div>

        <div style={styles.educationalContent}>
          <h3>🎓 What This Teaches You:</h3>
          <div style={styles.lessonGrid}>
            <div style={styles.lesson}>
              <span style={styles.lessonIcon}>🔒</span>
              <div>
                <h4>Link Expiration</h4>
                <p>Legitimate services often use time-limited links for security</p>
              </div>
            </div>
            <div style={styles.lesson}>
              <span style={styles.lessonIcon}>⚠️</span>
              <div>
                <h4>Urgency Tactics</h4>
                <p>Scammers create fake urgency - always verify suspicious time limits</p>
              </div>
            </div>
            <div style={styles.lesson}>
              <span style={styles.lessonIcon}>🛡️</span>
              <div>
                <h4>Safe Practices</h4>
                <p>When in doubt, contact the organization directly through official channels</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <Link to="/learn" style={styles.primaryButton}>
            📚 Learn More About Phishing
          </Link>
          <Link to="/" style={styles.secondaryButton}>
            🏠 Return to Homepage
          </Link>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            This was an educational simulation from <strong>ClickSafe</strong> - 
            helping people stay safe online through interactive learning.
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
    maxWidth: '600px',
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
  educationalContent: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  lessonGrid: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem',
  },
  lesson: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  },
  lessonIcon: {
    fontSize: '1.5rem',
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
    transition: 'background-color 0.3s',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background-color 0.3s',
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
