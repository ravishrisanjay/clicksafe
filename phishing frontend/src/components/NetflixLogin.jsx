import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import background from '../assets/background.jpg';

const NetflixLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Ref to prevent double-firing in React Strict Mode
  const effectRan = useRef(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // --- LOGIC TO RECORD CLICK ---
  useEffect(() => {
    if (effectRan.current === true) return;

    const recordClick = async () => {
      effectRan.current = true; // Mark as ran

      // If no token, stop loading and show page
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log('Recording click for Netflix token:', token);
        
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

  // --- HANDLE FORM SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
        alert("Please enter a valid email or phone number.");
        return;
    }

    // Redirect to the awareness education page
    navigate('/awareness', { 
      state: { 
        platform: 'netflix',
        message: token 
          ? 'You just fell for a phishing simulation! This was a fake Netflix login page.'
          : 'You just interacted with a fake Netflix login page! Note how realistic it looks.'
      }
    });
  };

  // --- RENDER ---
  if (loading) {
      return (
          <div style={{
              minHeight: "100vh",
              backgroundColor: "#000",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#e50914"
          }}>
              <h1>Loading...</h1>
          </div>
      );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5)",
        }}
      ></div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 10,
        }}
      ></div>

      {/* Netflix Logo */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          zIndex: 30,
        }}
      >
        <div
          style={{
            color: "#e50914",
            fontSize: "40px",
            fontWeight: "bold",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          NETFLIX
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "450px" }}>
          {/* Sign In Form */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              borderRadius: "4px",
              padding: "60px 68px 40px",
              minHeight: "660px"
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "28px",
              }}
            >
              Sign In
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "16px 20px",
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.backgroundColor = "#454545"}
                  onBlur={(e) => e.target.style.backgroundColor = "#333"}
                />
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: "40px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "16px 20px",
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.backgroundColor = "#454545"}
                  onBlur={(e) => e.target.style.backgroundColor = "#333"}
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#e50914",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginBottom: "12px",
                }}
              >
                Sign In
              </button>

              {/* OR divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "16px 0",
                }}
              >
                <span style={{ color: "#999", fontSize: "14px" }}>OR</span>
              </div>

              {/* Use a sign-in code button */}
              <button
                type="button"
                onClick={() => alert("This is a simulation. Just click Sign In.")}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "rgba(128,128,128,0.2)",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
              >
                Use a sign-in code
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#b3b3b3", marginTop: "10px" }}>
                 <div>
                    <input 
                        type="checkbox" 
                        id="remember" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ marginRight: "5px" }}
                    />
                    <label htmlFor="remember">Remember me</label>
                 </div>
                 <a href="#" onClick={e => e.preventDefault()} style={{ color: "#b3b3b3", textDecoration: "none" }}>Need help?</a>
              </div>
            </form>

            <div style={{ marginTop: "40px", color: "#737373", fontSize: "16px" }}>
                New to Netflix? <a href="#" onClick={e => e.preventDefault()} style={{ color: "white", textDecoration: "none" }}>Sign up now</a>.
            </div>
            
            <div style={{ marginTop: "20px", fontSize: "13px", color: "#8c8c8c" }}>
               This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" style={{ color: "#0071eb", textDecoration: "none" }}>Learn more</a>.
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "#999",
          fontSize: "14px",
          padding: "30px 0"
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <p style={{ marginBottom: "20px" }}>Questions? Call 000-800-919-1743 (Toll-Free)</p>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
            gap: "12px",
            fontSize: "13px"
          }}>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>FAQ</a>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>Help Centre</a>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>Terms of Use</a>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>Cookie Preferences</a>
            <a href="#" style={{ color: "#999", textDecoration: "none" }}>Corporate Information</a>
          </div>
          
          <div style={{ marginTop: "20px" }}>
            <select style={{ background: "black", color: "#999", border: "1px solid #333", padding: "5px" }}>
                <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixLogin;