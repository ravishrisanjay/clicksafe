import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Facebook() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Hooks for navigation and URL parameters
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const effectRan = useRef(false); // Ref to prevent double-firing in Strict Mode

  const token = searchParams.get('token');

  // --- 1. RECORD CLICK ON PAGE LOAD ---
  useEffect(() => {
    if (effectRan.current === true) return;

    const recordClick = async () => {
      effectRan.current = true;

      // If no token is present, stop loading and show the page
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log('Recording click for Facebook token:', token);
        
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

  // --- 2. HANDLE LOGIN & INTERACTIONS ---
  const handleLogin = (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      alert("The email address or mobile number you entered isn't connected to an account.");
      return;
    }

    // Redirect to awareness page with educational message
    navigate('/awareness', { 
      state: { 
        platform: 'facebook',
        message: token 
          ? 'You just fell for a phishing simulation! This was a fake Facebook login page.' 
          : 'You just interacted with a fake Facebook login page! Notice the URL was not facebook.com.'
      }
    });
  };

  const handleAction = (action) => {
    let message = "";
    if (action === "forgot") {
      message = "You clicked 'Forgotten password' on a phishing site. Attackers use this to steal your email address or security answers.";
    } else if (action === "create") {
      message = "You tried to create an account on a fake page. Never enter personal details unless you are sure you are on the real facebook.com.";
    }

    navigate('/awareness', { 
      state: { 
        platform: 'facebook',
        message: message
      }
    });
  };

  if (loading) {
    return <div style={{height: "100vh", background: "#f0f2f5"}}></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={styles.left}>
          <h1 style={styles.logo}>facebook</h1>
          <h3 style={styles.subtitle}>
            Facebook helps you connect and share with the people in your life.
          </h3>
        </div>
        <div style={styles.right}>
          <div style={styles.card}>
            <input
              type="text"
              placeholder="Email address or phone number"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} style={styles.loginBtn}>
              Log in
            </button>
            <a 
              href="#" 
              style={styles.forgot} 
              onClick={(e) => { e.preventDefault(); handleAction("forgot"); }}
            >
              Forgotten password?
            </a>
            <hr style={styles.hr} />
            <button 
              style={styles.createBtn}
              onClick={() => handleAction("create")}
            >
              Create new account
            </button>
          </div>
          <p style={styles.createPage}>
            <b>Create a Page</b> for a celebrity, brand or business.
          </p>
        </div>
      </div>
      <footer style={styles.footer}>
        <p style={styles.languages}>
          English (UK) தமிழ் తెలుగు ಕನ್ನಡ اردو हिन्दी മലയാളം සිංහල ਪੰਜਾਬੀ বাংলা ગુજરાતી
          <button style={styles.langBtn}>+</button>
        </p>
        <hr />
        <p style={styles.links}>
          Sign Up · Log in · Messenger · Facebook Lite · Video · Meta Pay · Meta Store · Meta
          Quest · Ray-Ban Meta · Meta AI · Instagram · Threads · Voting Information Centre ·
          Privacy Policy · Privacy Centre · About · Create ad · Create Page · Developers ·
          Careers · Cookies · AdChoices · Terms · Help · Contact uploading and non-users
        </p>
        <p style={styles.copy}>Meta © 2025</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Helvetica, Arial, sans-serif",
    backgroundColor: "#f0f2f5",
    padding: "0 10px",
    minHeight: "100vh",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    flexWrap: "wrap",
    paddingTop: "50px",
  },
  left: {
    maxWidth: "400px",
    margin: "20px",
    paddingRight: "32px",
  },
  logo: {
    fontSize: "55px",
    color: "#1877f2",
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
    marginTop: "0",
  },
  subtitle: {
    fontSize: "24px",
    color: "#1c1e21",
    fontWeight: "normal",
    lineHeight: "32px",
  },
  right: {
    margin: "20px",
    maxWidth: "400px",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px 16px",
    fontSize: "17px",
    borderRadius: "6px",
    border: "1px solid #dddfe2",
    outline: "none",
  },
  loginBtn: {
    padding: "12px",
    backgroundColor: "#1877f2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    lineHeight: "28px",
  },
  forgot: {
    color: "#1877f2",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  hr: {
    margin: "10px 0",
    border: "none",
    borderBottom: "1px solid #dadde1",
  },
  createBtn: {
    padding: "12px",
    backgroundColor: "#42b72a",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "17px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "fit-content",
    margin: "0 auto",
  },
  createPage: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "26px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    fontSize: "12px",
    color: "#737373",
    background: "#fff",
    marginTop: "auto",
  },
  languages: {
    marginBottom: "10px",
  },
  langBtn: {
    marginLeft: "5px",
    padding: "0 8px",
    fontSize: "14px",
    cursor: "pointer",
    border: "1px solid #ccd0d5",
    background: "#f5f6f7",
    fontWeight: "bold",
  },
  links: {
    margin: "10px 0",
    lineHeight: "1.6",
  },
  copy: {
    marginTop: "10px",
  },
};