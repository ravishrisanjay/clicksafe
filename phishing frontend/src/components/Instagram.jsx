import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import instapic from '../assets/instapic.png';

export default function Instagram() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const effectRan = useRef(false); // Ref to prevent double-firing
  
  const token = searchParams.get('token');

  // --- 1. RECORD CLICK ON PAGE LOAD ---
  useEffect(() => {
    if (effectRan.current === true) return;

    const recordClick = async () => {
      effectRan.current = true; 

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log('Recording click for Instagram token:', token);
        
        await fetch('http://localhost:8080/api/awareness-links/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        console.log('Click recorded successfully');
      } catch (err) {
        console.error('Error recording click:', err);
      } finally {
        setLoading(false);
      }
    };

    recordClick();
  }, [token]);

  // --- 2. NAVIGATION HANDLER ---
  const handleAction = (actionType) => {
    let message = '';
    
    if (actionType === 'login') {
      if (!username || !password) return; // Don't redirect if empty
      message = token 
        ? 'You just fell for a phishing simulation! This was a fake Instagram login page.' 
        : 'You just interacted with a fake Instagram login page!';
    } else if (actionType === 'facebook') {
      message = 'You clicked "Log in with Facebook" on a phishing site! Attackers often use this to steal multiple accounts at once.';
    } else if (actionType === 'forgot') {
      message = 'You clicked "Forgot Password" on a fake site. Attackers use this to trick you into revealing your email or recovery questions.';
    } else if (actionType === 'signup') {
      message = 'You tried to "Sign Up" on a fake page. Always check the URL (instagram.com) before entering personal details.';
    }

    navigate('/awareness', { 
      state: { 
        platform: 'instagram',
        message: message
      }
    });
  };

  if (loading) {
    return <div style={{height: "100vh", background: "#000"}}></div>;
  }

  return (
    <div className="container">
      <div className="wrapper">
        {/* Left Section with Image */}
        <div className="left">
          <img src={instapic} alt="Instagram preview" className="preview-img" />
        </div>
        {/* Right Section with Login */}
        <div className="right">
          <div className="login-box">
            <h1 className="logo">Instagram</h1>

            {/* Login Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleAction('login'); }}>
              <input
                type="text"
                placeholder="Phone number, username, or email"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="password-box">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="show">Show</span>
              </div>

              <button type="submit" className="login-btn">Log in</button>
            </form>

            <div className="or">
              <div className="line"></div>
              <span>OR</span>
              <div className="line"></div>
            </div>

            <button 
              className="facebook-btn" 
              onClick={() => handleAction('facebook')}
            >
              Log in with Facebook
            </button>

            <a 
              href="#" 
              className="forgot" 
              onClick={(e) => { e.preventDefault(); handleAction('forgot'); }}
            >
              Forgot password?
            </a>
          </div>

          {/* Sign up section */}
          <div className="signup-box">
            <span>Don’t have an account?</span>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleAction('signup'); }}
            >
              Sign up
            </a>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Meta · About · Blog · Jobs · Help · API · Privacy · Terms · Locations · Instagram Lite · Meta AI · Meta AI Articles · Threads · Contact Uploading & Non-Users · Meta Verified</p>
            <p>English © 2025 Instagram from Meta</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CSS in the same file */
const css = `
html, body {
  margin: 0;
  padding: 0;
  background: #000;   /* Make sure background is black everywhere */
  height: 100%;
}

/* ✅ Make it responsive */
@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
  }

  /* Hide the image completely on small screens */
  .left {
    display: none !important;
  }

  .right {
    max-width: 100%;
    padding: 20px;
  }

  .login-box {
    padding: 20px;
  }

  .signup-box {
    padding: 15px;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000;
  font-family: Arial, sans-serif;
  color: #fff;
}
.wrapper {
  display: flex;
  max-width: 1000px;
  width: 100%;
}
.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview-img {
  max-height: 700px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  width: 100%;
}
.login-box {
  background: #000;
  border: none;
  padding: 40px;
  width: 100%;
}
.logo {
  text-align: center;
  font-size: 48px;
  font-family: cursive;
  margin-bottom: 40px;
}
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #000;
  border: 1px solid #444;
  color: #fff;
  border-radius: 10px;
}
.password-box {
  position: relative;
}
.show {
  position: absolute;
  right: 10px;
  top: 12px;
  font-size: 12px;
  color: #0095f6;
  cursor: pointer;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  margin: 15px 0;
  cursor: pointer;
}
.or {
  display: flex;
  align-items: center;
  text-align: center;
  color: #8e8e8e;
  font-size: 12px;
  margin: 20px 0;
}
.line {
  flex: 1;
  height: 1px;
  background: #262626;
}
.or span {
  margin: 0 10px;
}
.facebook-btn {
  width: 100%;
  background: none;
  border: none;
  color: #0095f6;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}
.forgot {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #0095f6;
  margin-top: 10px;
  cursor: pointer;
}
.signup-box {
  border: 1px solid #262626;
  background: #000;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  width: 100%;
}
.signup-box a {
  color: #0095f6;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
}
.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 11px;
  color: #8e8e8e;
  line-height: 1.5;
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}