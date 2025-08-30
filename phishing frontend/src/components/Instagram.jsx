import React from 'react'
import instapic from '../assets/instapic.png'
export default function Instagram() {
  // Put your image location here


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

            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="input"
            />

            <div className="password-box">
              <input
                type="password"
                placeholder="Password"
                className="input"
              />
              <span className="show">Show</span>
            </div>

            <button className="login-btn">Log in</button>

            <div className="or">
              <div className="line"></div>
              <span>OR</span>
              <div className="line"></div>
            </div>

            <button className="facebook-btn">Log in with Facebook</button>

            <a href="#" className="forgot">Forgot password?</a>
          </div>

          {/* Sign up section */}
          <div className="signup-box">
            <span>Don’t have an account?</span>
            <a href="#">Sign up</a>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Meta · About · Blog · Jobs · Help · API · Privacy · Terms · Locations · Instagram Lite · Meta AI · Meta AI Articles · Threads · Contact Uploading & Non-Users · Meta Verified</p>
            <p>English © 2025 Instagram from Meta</p>
          </div>
        </div>
      </div>
    </div>
  )
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
  border: none;         /* Remove border */
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
}
.signup-box {
  border: 1px solid #262626;
  background: #000;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}
.signup-box a {
  color: #0095f6;
  font-weight: bold;
  margin-left: 5px;
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
