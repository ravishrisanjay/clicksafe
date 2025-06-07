import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function NavbarLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          <Link style={styles.logo} to="/">🛡️ PhishAware</Link>
          <Link style={styles.link} to="/learn">Learn</Link>
          <Link style={styles.link} to="/attack-simulation">Simulations</Link>
          <Link style={styles.link} to="/analytics">Analytics</Link>
          <Link style={styles.link} to="/contact">Contact</Link>
          <Link style={styles.link} to="/about">About</Link>
        </div>

        <div style={styles.rightSection}>
          {isAuthenticated && (
            <Link to="/profile" title="Profile">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                style={styles.profileImage}
              />
            </Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <Link style={styles.loginLink} to="/login">Login</Link>
          )}
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#1a1a2e',
    padding: '12px 24px',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    color: '#00adb5',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  link: {
    color: '#eee',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.2s',
  },
  profileImage: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: '2px solid #00adb5',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  loginLink: {
    backgroundColor: '#00adb5',
    color: '#fff',
    padding: '8px 14px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '14px',
  }
};
