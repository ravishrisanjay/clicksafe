import React from "react";

export default function Facebook() {
  const loginRedirectUrl = "/home"; // Change this as needed

  const handleLogin = () => {
    window.location.href = loginRedirectUrl;
  };

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
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.loginBtn}>
              Log in
            </button>
            <a href="#" style={styles.forgot}>
              Forgotten password?
            </a>
            <hr style={styles.hr} />
            <button style={styles.createBtn}>Create new account</button>
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
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    flexWrap: "wrap",
  },
  left: {
    maxWidth: "400px",
    margin: "20px",
  },
  logo: {
    fontSize: "55px",
    color: "#1877f2",
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
  },
  subtitle: {
    fontSize: "24px",
    color: "#1c1e21",
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
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  loginBtn: {
    padding: "12px",
    backgroundColor: "#1877f2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  forgot: {
    color: "#1877f2",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "14px",
  },
  hr: {
    margin: "10px 0",
  },
  createBtn: {
    padding: "12px",
    backgroundColor: "#42b72a",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  createPage: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "16px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    fontSize: "12px",
    color: "#737373",
  },
  languages: {
    marginBottom: "10px",
  },
  langBtn: {
    marginLeft: "5px",
    padding: "2px 8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  links: {
    margin: "10px 0",
    lineHeight: "1.6",
  },
  copy: {
    marginTop: "10px",
  },
};
