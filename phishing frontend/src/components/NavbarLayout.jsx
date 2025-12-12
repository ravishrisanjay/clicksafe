import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function NavbarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/attack-simulation', label: 'Simulations', icon: '🎭' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          {/* Logo */}
          <Link style={styles.logo} to="/">
            <span style={styles.logoIcon}>🛡️</span>
            <span style={styles.logoText}>ClickSafe</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.navLink,
                  ...(isActiveLink(link.path) ? styles.navLinkActive : {})
                }}
              >
                <span style={styles.linkIcon}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div style={styles.rightSection}>
            {isAuthenticated && (
              <Link to="/profile" style={styles.profileContainer}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Profile"
                  style={styles.profileImage}
                />
                <span style={styles.profileTooltip}>Profile</span>
              </Link>
            )}
            
            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.logoutButton}>
                <span style={styles.buttonIcon}>🚪</span>
                Logout
              </button>
            ) : (
              <Link style={styles.loginButton} to="/login">
                <span style={styles.buttonIcon}>🔐</span>
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              style={styles.mobileMenuButton} 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span style={{
                ...styles.hamburger,
                ...(isMobileMenuOpen ? styles.hamburgerOpen : {})
              }}>
                ☰
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.mobileNavLink,
                  ...(isActiveLink(link.path) ? styles.mobileNavLinkActive : {})
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span style={styles.linkIcon}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div style={styles.mobileAuthSection}>
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  style={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={styles.linkIcon}>👤</span>
                  Profile
                </Link>
              )}
              
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }} 
                  style={styles.mobileLogoutButton}
                >
                  <span style={styles.buttonIcon}>🚪</span>
                  Logout
                </button>
              ) : (
                <Link 
                  style={styles.mobileLoginButton} 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={styles.buttonIcon}>🔐</span>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(30, 64, 175, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'relative',
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: '900',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    transition: 'all 0.3s ease',
  },
  
  logoIcon: {
    fontSize: '2.2rem',
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
  },
  
  logoText: {
    letterSpacing: '-0.02em',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  
  navLinkActive: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  
  linkIcon: {
    fontSize: '1.1rem',
  },
  
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  
  profileContainer: {
    position: 'relative',
    textDecoration: 'none',
  },
  
  profileImage: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  
  profileTooltip: {
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
  },
  
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
  },
  
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
  },
  
  buttonIcon: {
    fontSize: '1rem',
  },
  
  mobileMenuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },
  
  hamburger: {
    display: 'block',
    transition: 'all 0.3s ease',
  },
  
  hamburgerOpen: {
    transform: 'rotate(90deg)',
  },
  
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '10px',
    margin: '0.25rem 0',
    transition: 'all 0.3s ease',
  },
  
  mobileNavLinkActive: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
  },
  
  mobileAuthSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '1rem',
    marginTop: '1rem',
  },
  
  mobileLogoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    margin: '0.25rem 0',
    transition: 'all 0.3s ease',
  },
  
  mobileLoginButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0.25rem 0',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  
  mainContent: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#f8fafc',
  },
  
  // Responsive styles
  '@media (max-width: 1024px)': {
    desktopNav: {
      display: 'none',
    },
    mobileMenuButton: {
      display: 'block',
    },
  },
  
  '@media (max-width: 768px)': {
    navContainer: {
      padding: '1rem',
    },
    logoText: {
      fontSize: '1.5rem',
    },
    profileImage: {
      width: '36px',
      height: '36px',
    },
  },
};

// Add CSS animations and hover effects
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .navbar a:hover,
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
  
  .profile-image:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.6);
  }
  
  .profile-container:hover .profile-tooltip {
    opacity: 1;
    visibility: visible;
  }
  
  .logout-button:hover {
    background-color: rgba(220, 38, 38, 0.9) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
  }
  
  .login-button:hover {
    background-color: rgba(5, 150, 105, 0.9) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }
  
  .mobile-menu-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: translateX(5px);
  }
  
  .mobile-menu {
    animation: slideDown 0.3s ease-out;
  }
  
  @media (max-width: 1024px) {
    .desktop-nav {
      display: none !important;
    }
    .mobile-menu-button {
      display: block !important;
    }
  }
`;
document.head.appendChild(styleSheet);
