import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

export default function AwarenessPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚠️ Warning: You Just Clicked a Fake Link</h1>
        <p style={styles.paragraph}>
          This was a simulation to show how easy it is to fall for phishing attacks.
        </p>
        <p style={styles.paragraph}>
          If this had been a real phishing site, your sensitive information could have been stolen.
        </p>
        <p style={styles.paragraph}>
          You were just one click away from becoming a victim of cybercrime.
        </p>
        <hr style={styles.divider} />
        <p style={styles.paragraph}>
          ✅ Learn how to protect yourself and others from phishing attacks.
        </p>
        <Link to="/learn">
          <button style={styles.button}>Click Here to Stay Safe</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #141E30, #243B55)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  divider: {
    margin: "20px 0",
    borderColor: "#444",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};
