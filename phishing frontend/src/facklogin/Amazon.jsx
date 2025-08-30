import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import amazonlogo from '../assets/amazonlogo.png';

export default function Amazon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [clickRecorded, setClickRecorded] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');

  // Record click when component mounts (if token exists)
  useEffect(() => {
    const recordClick = async () => {
      // If no token, just show the fake page without recording click
      if (!token) {
        console.log('No token found, showing fake page without recording click');
        setLoading(false);
        return;
      }

      try {
        console.log('Recording click for token:', token);
        console.log('Making request to: http://localhost:8080/api/awareness-links/click');
        
        // 🔥 FIXED: Use correct backend URL
        const response = await fetch('http://localhost:8080/api/awareness-links/click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('API Success Response:', data);
        
        if (data.success) {
          console.log('Click recorded successfully');
          setClickRecorded(true);
        } else {
          console.log('Click recording failed:', data.message);
          // Handle different failure scenarios but still show fake page
          if (data.message?.includes('expired')) {
            setError('This link has expired, but you can still see the demo.');
          } else if (data.message?.includes('not found')) {
            setError('Invalid link, but you can still see the demo.');
          } else {
            setError(`Link issue: ${data.message}`);
          }
        }
      } catch (error) {
        console.error('Full error details:', error);
        setError(`Failed to record click: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    recordClick();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    // After user submits credentials, redirect to awareness education page
    navigate('/awareness', { 
      state: { 
        platform: 'amazon',
        message: token 
          ? 'You just fell for a phishing simulation! This was a fake Amazon login page designed to steal your credentials.'
          : 'You just interacted with a fake Amazon login page! This demonstrates how realistic phishing sites can look.'
      }
    });
  };

  // Show loading state while recording click
  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading Amazon Sign In...</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Debug: Token = {token ? 'Present' : 'Missing'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        {/* Show error message if any, but don't redirect */}
        {error && (
          <div style={styles.errorBanner}>
            <p>{error}</p>
          </div>
        )}

        {/* Amazon Logo with .in */}
        <div style={styles.logoContainer}>
          <div style={styles.logoWrapper}>
            <img 
              src={amazonlogo} 
              alt="Amazon" 
              style={styles.logo}
            />
            <span style={styles.domainText}>.in</span>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>Sign in</h1>
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email or mobile phone number
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              autoComplete="username"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" style={styles.signInButton}>
            Continue
          </button>

          <p style={styles.termsText}>
            By continuing, you agree to Amazon's{' '}
            <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
              Conditions of Use
            </a>{' '}
            and{' '}
            <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
              Privacy Notice
            </a>.
          </p>

          <div style={styles.helpSection}>
            <details style={styles.details}>
              <summary style={styles.summary}>Need help?</summary>
              <div style={styles.helpLinks}>
                <a href="#" style={styles.helpLink} onClick={(e) => e.preventDefault()}>
                  Forgot your password?
                </a>
                <a href="#" style={styles.helpLink} onClick={(e) => e.preventDefault()}>
                  Other issues with Sign-In
                </a>
              </div>
            </details>
          </div>
        </form>

        {/* Additional Options */}
        <div style={styles.divider}>
          <span style={styles.dividerText}>New to Amazon?</span>
        </div>

        <button 
          style={styles.createAccountButton}
          onClick={(e) => {
            e.preventDefault();
            navigate('/awareness', { 
              state: { 
                platform: 'amazon',
                message: 'You attempted to create an account on a fake Amazon page!'
              }
            });
          }}
        >
          Create your Amazon account
        </button>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerDivider}></div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink} onClick={(e) => e.preventDefault()}>
              Conditions of Use
            </a>
            <a href="#" style={styles.footerLink} onClick={(e) => e.preventDefault()}>
              Privacy Notice
            </a>
            <a href="#" style={styles.footerLink} onClick={(e) => e.preventDefault()}>
              Help
            </a>
          </div>
          <p style={styles.copyright}>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Amazon Ember, Arial, sans-serif',
    padding: '20px',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: 'Amazon Ember, Arial, sans-serif',
    gap: '20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff9900',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorBanner: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '12px',
    textAlign: 'center',
    border: '1px solid #ffeaa7',
  },
  loginBox: {
    width: '100%',
    maxWidth: '350px',
    padding: '20px',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '18px',
  },
  logoWrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  logo: {
    width: '103px',
    height: 'auto',
    maxHeight: '31px',
    objectFit: 'contain',
    display: 'block',
  },
  domainText: {
    fontSize: '11px',
    color: '#232f3e',
    fontWeight: '400',
    fontFamily: 'Amazon Ember, Arial, sans-serif',
    position: 'absolute',
    right: '-18px',
    bottom: '4px',
    backgroundColor: 'transparent',
  },
  form: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginBottom: '22px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '400',
    lineHeight: '1.2',
    marginBottom: '18px',
    color: '#0F1111',
  },
  inputGroup: {
    marginBottom: '14px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F1111',
    marginBottom: '2px',
  },
  input: {
    width: '100%',
    height: '31px',
    padding: '3px 7px',
    fontSize: '13px',
    border: '1px solid #a6a6a6',
    borderRadius: '3px',
    boxShadow: '0 1px 2px rgba(15,17,17,.15) inset',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
  },
  signInButton: {
    width: '100%',
    height: '29px',
    backgroundColor: '#ffd814',
    border: '1px solid #fcd200',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: '400',
    cursor: 'pointer',
    marginBottom: '22px',
    marginTop: '14px',
    transition: 'background-color 0.15s ease',
  },
  termsText: {
    fontSize: '11px',
    color: '#0F1111',
    lineHeight: '1.4',
    margin: '0 0 16px 0',
  },
  link: {
    color: '#0066c0',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  helpSection: {
    marginTop: '16px',
  },
  details: {
    fontSize: '13px',
  },
  summary: {
    color: '#0066c0',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '13px',
  },
  helpLinks: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  helpLink: {
    color: '#0066c0',
    textDecoration: 'none',
    fontSize: '13px',
    cursor: 'pointer',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '0 0 14px 0',
    height: '44px',
    background: 'linear-gradient(to bottom,rgba(0,0,0,.14),rgba(0,0,0,.03) 3px,transparent)',
  },
  dividerText: {
    backgroundColor: '#f0f0f0',
    color: '#767676',
    fontSize: '12px',
    position: 'relative',
    top: '2px',
    padding: '0 8px',
    zIndex: '5',
  },
  createAccountButton: {
    width: '100%',
    height: '29px',
    backgroundColor: '#e7e9ec',
    border: '1px solid #adb1b8',
    borderRadius: '2px',
    fontSize: '13px',
    fontWeight: '400',
    cursor: 'pointer',
    color: '#0f1111',
    marginBottom: '44px',
    transition: 'background-color 0.15s ease',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '30px',
  },
  footerDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#e7e7e7',
    marginBottom: '22px',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#0066c0',
    textDecoration: 'none',
    fontSize: '11px',
    cursor: 'pointer',
  },
  copyright: {
    fontSize: '10px',
    color: '#767676',
    margin: '0',
    lineHeight: '1.4',
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
