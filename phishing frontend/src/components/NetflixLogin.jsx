<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// Make sure this path is correct for your project structure
import background from '../assets/background.jpg'; 
=======
import React, { useState } from "react";

// ✅ Top of your file (if not already done)
import background from '../assets/background.jpg';


>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c

const NetflixLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to prevent double-firing in React Strict Mode (Same fix as Amazon)
  const effectRan = useRef(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // --- LOGIC TO RECORD CLICK ---
  useEffect(() => {
    if (effectRan.current === true) return;

    const recordClick = async () => {
      effectRan.current = true; // Mark as ran

      if (!token) {
        console.log('No token found, showing fake page without recording click');
        setLoading(false);
        return;
      }

      try {
        console.log('Recording click for Netflix token:', token);
        
        const response = await fetch('http://localhost:8080/api/awareness-links/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (!response.ok) {
          throw new Error('Failed to record click');
        }
        
        const data = await response.json();
        console.log('Click recording result:', data);

      } catch (err) {
        console.error('Error recording click:', err);
        // We don't block the UI on error, we just log it
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

=======

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in:", { email, password, rememberMe });
  };

>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
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
<<<<<<< HEAD
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
=======
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
    filter: "brightness(0.5)", // Optional: dim the background
  }}
></div>

>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c

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
<<<<<<< HEAD
            fontSize: "40px",
            fontWeight: "bold",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
=======
            fontSize: "30px",
            fontWeight: "bold",
            letterSpacing: "2px",
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
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
<<<<<<< HEAD
        <div style={{ width: "100%", maxWidth: "450px" }}>
=======
        <div style={{ width: "100%", maxWidth: "400px" }}>
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
          {/* Sign In Form */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
<<<<<<< HEAD
              borderRadius: "4px",
              padding: "60px 68px 40px",
              minHeight: "660px"
=======
              borderRadius: "8px",
              padding: "48px",
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "32px",
<<<<<<< HEAD
                fontWeight: "700",
                marginBottom: "28px",
=======
                fontWeight: "600",
                marginBottom: "32px",
                margin: "0 0 32px 0",
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
              }}
            >
              Sign In
            </h1>

            <form onSubmit={handleSubmit}>
<<<<<<< HEAD
              {/* Email Input */}
=======
              {/* Email or mobile number input */}
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
<<<<<<< HEAD
                    height: "50px",
                    padding: "16px 20px",
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "4px",
=======
                    height: "56px",
                    padding: "16px",
                    backgroundColor: "#333",
                    border: "1px solid #666",
                    borderRadius: "6px",
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
<<<<<<< HEAD
                  onFocus={(e) => e.target.style.backgroundColor = "#454545"}
                  onBlur={(e) => e.target.style.backgroundColor = "#333"}
                />
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: "40px" }}>
=======
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#555";
                    e.target.style.borderColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "#333";
                    e.target.style.borderColor = "#666";
                  }}
                />
              </div>

              {/* Password input */}
              <div style={{ marginBottom: "24px" }}>
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
<<<<<<< HEAD
                    height: "50px",
                    padding: "16px 20px",
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "4px",
=======
                    height: "56px",
                    padding: "16px",
                    backgroundColor: "#333",
                    border: "1px solid #666",
                    borderRadius: "6px",
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
<<<<<<< HEAD
                  onFocus={(e) => e.target.style.backgroundColor = "#454545"}
                  onBlur={(e) => e.target.style.backgroundColor = "#333"}
=======
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#555";
                    e.target.style.borderColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "#333";
                    e.target.style.borderColor = "#666";
                  }}
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
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
<<<<<<< HEAD
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  marginTop: "24px",
                  marginBottom: "12px",
                }}
=======
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f40612")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#e50914")}
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
              >
                Sign In
              </button>

<<<<<<< HEAD
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#b3b3b3" }}>
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

            <div style={{ marginTop: "100px", color: "#737373", fontSize: "16px" }}>
                New to Netflix? <a href="#" onClick={e => e.preventDefault()} style={{ color: "white", textDecoration: "none" }}>Sign up now</a>.
            </div>
            
            <div style={{ marginTop: "20px", fontSize: "13px", color: "#8c8c8c" }}>
               This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" style={{ color: "#0071eb", textDecoration: "none" }}>Learn more</a>.
            </div>

=======
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
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#333",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Use a sign-in code
              </button>

              {/* Forgot password */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <a
                  href="#"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Forgot password?
                </a>
              </div>
            </form>

            {/* Remember me checkbox */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "16px",
                  height: "16px",
                }}
              />
              <label
                htmlFor="remember"
                style={{
                  color: "#999",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Remember me
              </label>
            </div>

            {/* Sign up link */}
            <div
              style={{ color: "#999", fontSize: "14px", marginBottom: "16px" }}
            >
              New to Netflix?{" "}
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Sign up now
              </a>
              .
            </div>

            {/* reCAPTCHA notice */}
            <div style={{ fontSize: "12px", color: "#666" }}>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a
                href="#"
                style={{ color: "#0071eb", textDecoration: "none" }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Learn more
              </a>
              .
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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#999",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          {/* Contact info */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: 0 }}>
              Questions? Call 000-800-919-1743 (Toll-Free)
            </p>
          </div>

          {/* Footer links grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                FAQ
              </a>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Cookie Preferences
              </a>
            </div>
            <div>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Help Centre
              </a>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Corporate Information
              </a>
            </div>
            <div>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Terms of Use
              </a>
            </div>
            <div>
              <a
                href="#"
                style={{
                  color: "#999",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Privacy
              </a>
            </div>
          </div>

          {/* Language selector */}
          <div>
            <select
              style={{
                backgroundColor: "transparent",
                border: "1px solid #666",
                color: "#999",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              <option value="en">🌐 English</option>
            </select>
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default NetflixLogin;
=======
export default NetflixLogin;
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
