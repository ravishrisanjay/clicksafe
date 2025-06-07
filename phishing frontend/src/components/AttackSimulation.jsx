import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const phishingData = {
  login: {
    "Fake Bank Login Page": "facebook_login_rendered.html",
    "Social Media Login": "instagram_login_rendered.html",
    "Corporate Portals": "googledrive_login_rendered.html",
    "University Portals": "linkedin_login_rendered.html",
    "E-commerce Sites": "paypal_login_rendered.html",
  },
};

export default function AttackSimulation() {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("login");
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(phishingData.login)[0]
  );

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // ✅ Corrected generateLink
  const generateLink = () => {
    const key = btoa(`${username}-${Date.now()}`);
    const fileName = phishingData.login[activeCategory];
    return `${window.location.origin}/fackpagehtml/${fileName}?user=${username}&key=${key}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 Login Page Simulation</h1>

      {/* Category Selector */}
      <div style={{ marginBottom: 20 }}>
        {Object.keys(phishingData.login).map((cat) => (
          <button
            key={cat}
            style={{
              marginRight: 8,
              padding: "6px 12px",
              backgroundColor: activeCategory === cat ? "#28a745" : "#ddd",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Sharable Link */}
      <div>
        <h3>📎 Sharable Phishing Simulation Link:</h3>
        <input
          style={{ width: "100%", padding: 8 }}
          value={generateLink()}
          readOnly
          onClick={(e) => e.target.select()}
        />
        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: 5 }}>
          Copy this link and send it to simulate a phishing page click.
        </p>
      </div>

      {/* 🔍 Live Preview */}
      <div style={{ marginTop: 40 }}>
        <h3>🔍 Live Page Preview</h3>
        <iframe
          title="Phishing Preview"
          src={`/fackpagehtml/${phishingData.login[activeCategory]}`}
          width="100%"
          height="600"
          style={{
            border: "2px solid #ccc",
            borderRadius: "6px",
            marginTop: "16px",
          }}
        />
      </div>
    </div>
  );
}
