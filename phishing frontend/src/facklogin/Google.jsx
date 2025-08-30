import React, { useState } from 'react';

export default function Google() {
  const AWARENESS_URL = '/awareness'; // Change this to your redirect URL
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const firstTwo = email.trim().slice(0, 2);

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep(2);
  };

  const handleFinalNext = (e) => {
    e.preventDefault();
    window.location.href = AWARENESS_URL;
  };

  return (
    <>
      <div className="google-signin-2025">
        <div className="signin-container">
          {step === 1 ? (
            // Step 1: Email Input Screen
            <div className="signin-card">
              <div className="google-logo">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              
              <h1 className="signin-title">Sign in</h1>
              <p className="signin-subtitle">to continue to Gmail</p>
              
              <form onSubmit={handleEmailNext} className="signin-form">
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    className="signin-input"
                    placeholder="Email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                
                <button type="button" className="forgot-link">Forgot email?</button>
                
                <div className="guest-section">
                  <p className="guest-text">Not your computer? Use Guest mode to sign in privately. <button type="button" className="learn-more-btn">Learn more about using Guest mode</button></p>
                </div>
                
                <div className="action-buttons">
                  <button type="button" className="create-account-btn">Create account</button>
                  <button type="submit" className="next-btn">Next</button>
                </div>
              </form>
            </div>
          ) : (
            // Step 2: Password Input Screen  
            <div className="signin-card">
              <div className="google-logo">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              
              <h1 className="welcome-title">Hi {firstTwo}</h1>
              
              <div className="account-selector">
                <div className="account-avatar">
                  <div className="avatar-circle">{firstTwo.toUpperCase()}</div>
                </div>
                <span className="account-email">{email}</span>
                <button type="button" className="dropdown-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleFinalNext} className="signin-form">
                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    className="signin-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                
                <div className="show-password-container">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="show-password-checkbox"
                      onChange={(e) => {
                        const pwd = document.getElementById('password');
                        if (pwd) pwd.type = e.target.checked ? 'text' : 'password';
                      }}
                    />
                    <span className="checkbox-text">Show password</span>
                  </label>
                </div>
                
                <div className="action-buttons">
                  <button type="button" className="forgot-link">Forgot password?</button>
                  <button type="submit" className="next-btn">Next</button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <footer className="signin-footer">
          <div className="language-selector">
            <select className="language-dropdown">
              <option value="en-US">English (United States)</option>
            </select>
            <svg className="dropdown-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          
          <div className="footer-links">
            <button className="footer-link">Help</button>
            <button className="footer-link">Privacy</button>
            <button className="footer-link">Terms</button>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .google-signin-2025 {
          min-height: 100vh;
          background: #202124;
          color: #e8eaed;
          font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          display: flex;
          flex-direction: column;
        }

        .signin-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .signin-card {
          background: #303134;
          border-radius: 8px;
          padding: 48px 40px 36px;
          width: 100%;
          max-width: 450px;
          min-width: 360px;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
        }

        .google-logo {
          margin-bottom: 16px;
          display: flex;
          justify-content: flex-start;
        }

        .signin-title, .welcome-title {
          font-size: 24px;
          font-weight: 400;
          line-height: 1.3333;
          margin-bottom: 8px;
          color: #e8eaed;
        }

        .signin-subtitle {
          font-size: 16px;
          color: #e8eaed;
          margin-bottom: 26px;
        }

        .signin-form {
          width: 100%;
        }

        .input-container {
          margin-bottom: 24px;
        }

        .signin-input {
          width: 100%;
          height: 56px;
          background: transparent;
          border: 1px solid #5f6368;
          border-radius: 4px;
          color: #e8eaed;
          font-size: 16px;
          padding: 13px 15px;
          outline: none;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .signin-input::placeholder {
          color: #9aa0a6;
        }

        .signin-input:focus {
          border-color: #8ab4f8;
          box-shadow: 0 0 0 1px #8ab4f8;
        }

        .forgot-link {
          background: none;
          border: none;
          color: #8ab4f8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          margin-bottom: 32px;
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .guest-section {
          margin-bottom: 60px;
        }

        .guest-text {
          font-size: 14px;
          color: #9aa0a6;
          line-height: 1.4286;
        }

        .learn-more-btn {
          background: none;
          border: none;
          color: #8ab4f8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }

        .learn-more-btn:hover {
          text-decoration: underline;
        }

        .account-selector {
          display: flex;
          align-items: center;
          background: #3c4043;
          border-radius: 16px;
          padding: 12px 16px;
          margin-bottom: 24px;
          width: fit-content;
          gap: 12px;
        }

        .account-avatar {
          display: flex;
          align-items: center;
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #8ab4f8;
          color: #202124;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
        }

        .account-email {
          font-size: 14px;
          color: #e8eaed;
        }

        .dropdown-btn {
          background: none;
          border: none;
          color: #9aa0a6;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .show-password-container {
          margin-bottom: 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          color: #9aa0a6;
        }

        .show-password-checkbox {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          accent-color: #1a73e8;
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .create-account-btn {
          background: none;
          border: none;
          color: #8ab4f8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 9px 23px;
          border-radius: 4px;
          transition: background-color 0.15s ease-in-out;
        }

        .create-account-btn:hover {
          background: rgba(138,180,248,.04);
        }

        .next-btn {
          background: #1a73e8;
          border: none;
          border-radius: 4px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 9px 23px;
          transition: background-color 0.15s ease-in-out;
        }

        .next-btn:hover {
          background: #2b7de9;
          box-shadow: 0 1px 2px 0 rgba(66,133,244,.3), 0 1px 3px 1px rgba(66,133,244,.15);
        }

        .next-btn:focus {
          box-shadow: 0 0 0 3px rgba(26,115,232,.4);
        }

        .signin-footer {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .language-selector {
          position: relative;
          display: flex;
          align-items: center;
        }

        .language-dropdown {
          background: transparent;
          border: 1px solid #5f6368;
          border-radius: 4px;
          color: #9aa0a6;
          font-size: 14px;
          padding: 8px 32px 8px 12px;
          appearance: none;
          cursor: pointer;
          outline: none;
        }

        .dropdown-icon {
          position: absolute;
          right: 8px;
          pointer-events: none;
          color: #9aa0a6;
        }

        .footer-links {
          display: flex;
          gap: 27px;
          flex-wrap: wrap;
        }

        .footer-link {
          background: none;
          border: none;
          color: #9aa0a6;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease-in-out;
        }

        .footer-link:hover {
          color: #8ab4f8;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .signin-card {
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 24px 20px;
            min-height: calc(100vh - 120px);
            min-width: auto;
          }

          .action-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .next-btn, .create-account-btn {
            width: 100%;
            text-align: center;
            padding: 12px 24px;
          }

          .signin-footer {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .signin-container {
            padding: 16px;
          }

          .signin-card {
            padding: 24px 16px;
          }

          .guest-section {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </>
  );
}
