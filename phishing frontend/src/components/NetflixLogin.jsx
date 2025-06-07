import React, { useState } from "react";

// ✅ Top of your file (if not already done)
import background from '../assets/background.jpg';



const NetflixLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in:", { email, password, rememberMe });
  };

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
    filter: "brightness(0.5)", // Optional: dim the background
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
            fontSize: "30px",
            fontWeight: "bold",
            letterSpacing: "2px",
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
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Sign In Form */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              borderRadius: "8px",
              padding: "48px",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "32px",
                fontWeight: "600",
                marginBottom: "32px",
                margin: "0 0 32px 0",
              }}
            >
              Sign In
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Email or mobile number input */}
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: "56px",
                    padding: "16px",
                    backgroundColor: "#333",
                    border: "1px solid #666",
                    borderRadius: "6px",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
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
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: "56px",
                    padding: "16px",
                    backgroundColor: "#333",
                    border: "1px solid #666",
                    borderRadius: "6px",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
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

              {/* Sign In Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#e50914",
                  border: "none",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixLogin;
