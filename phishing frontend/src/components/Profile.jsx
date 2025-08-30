import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import AwarenessLinkService from './AwarenessLinkService';

const profileOptions = [
  'https://www.w3schools.com/howto/img_avatar.png',
  'https://www.w3schools.com/howto/img_avatar2.png',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/lego/6.jpg'
];

export default function Profile() {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', about: '', email: '', profileImageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // New state for awareness link statistics
  const [linkStats, setLinkStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
    expiredLinks: 0,
    recentLinks: []
  });
  const [statsLoading, setStatsLoading] = useState(false);

  const BACKEND_URL = 'http://localhost:8080/api/user/profile';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfileData();
      fetchLinkStatistics();
    }
  }, [editing, token, isAuthenticated]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BACKEND_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      console.log('Fetched user data:', data);
      setUser(data);
      setForm({
        name: data.name || '',
        about: data.about || '',
        email: data.email || '',
        profileImageUrl: data.profileImageUrl || profileOptions[0]
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLinkStatistics = async () => {
    if (!isAuthenticated) return;
    
    setStatsLoading(true);
    try {
      const response = await AwarenessLinkService.getUserLinks();
      if (response.success && response.links) {
        const links = response.links;
        const now = new Date();
        
        const activeLinks = links.filter(link => 
          link.isActive && new Date(link.expiresAt) > now && link.currentClicks < link.maxClicks
        );
        
        const expiredLinks = links.filter(link => 
          !link.isActive || new Date(link.expiresAt) <= now || link.currentClicks >= link.maxClicks
        );
        
        const totalClicks = links.reduce((sum, link) => sum + link.currentClicks, 0);
        
        setLinkStats({
          totalLinks: links.length,
          totalClicks,
          activeLinks: activeLinks.length,
          expiredLinks: expiredLinks.length,
          recentLinks: links.slice(0, 5) // Get 5 most recent links
        });
      }
    } catch (error) {
      console.error('Error fetching link statistics:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setUser(data);
      setEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name || '',
      about: user.about || '',
      email: user.email || '',
      profileImageUrl: user.profileImageUrl || profileOptions[0]
    });
    setEditing(false);
  };

  const getClickRate = () => {
    if (!user || !user.linksCreated || user.linksCreated === 0) return 0;
    return (user.linksClicked / user.linksCreated) * 100;
  };

  const getProgressColor = (rate) => {
    if (rate < 30) return '#10b981';
    if (rate < 60) return '#f59e0b';
    return '#ef4444';
  };

  const getEngagementLevel = () => {
    const rate = getClickRate();
    if (rate < 20) return { level: 'Excellent', color: '#10b981', icon: '🌟' };
    if (rate < 40) return { level: 'Good', color: '#3b82f6', icon: '✅' };
    if (rate < 60) return { level: 'Average', color: '#f59e0b', icon: '⚠️' };
    return { level: 'Needs Improvement', color: '#ef4444', icon: '🚨' };
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: '📘',
      instagram: '📷',
      netflix: '🎬',
      amazon: '📦',
      google: '🌐'
    };
    return icons[platform?.toLowerCase()] || '🔗';
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h2>Unable to load profile</h2>
        <p>Please try refreshing the page</p>
      </div>
    );
  }

  const engagement = getEngagementLevel();
  const clickRate = getClickRate();

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>👤</span>
            My Profile
          </h1>
          <p style={styles.subtitle}>Manage your account and view your phishing awareness statistics</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        
        {/* Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardIcon}>🔧</span>
              Profile Information
            </h2>
            <div style={styles.actionButtons}>
              {!editing ? (
                <button style={styles.editButton} onClick={() => setEditing(true)}>
                  <span style={styles.buttonIcon}>✏️</span>
                  Edit Profile
                </button>
              ) : (
                <div style={styles.editButtons}>
                  <button 
                    style={styles.cancelButton} 
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <span style={styles.buttonIcon}>❌</span>
                    Cancel
                  </button>
                  <button 
                    style={styles.saveButton} 
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <span style={styles.buttonIcon}>
                      {saving ? '⏳' : '💾'}
                    </span>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={styles.profileContent}>
            {/* Profile Image Section */}
            <div style={styles.imageSection}>
              <div style={styles.imageContainer}>
                <img
                  src={editing ? form.profileImageUrl : user.profileImageUrl || profileOptions[0]}
                  alt="Profile"
                  style={styles.profileImage}
                />
                <div style={styles.imageOverlay}>
                  <span style={styles.cameraIcon}>📷</span>
                </div>
              </div>
              
              {editing && (
                <div style={styles.imageOptions}>
                  <p style={styles.imageOptionsTitle}>Choose Profile Picture:</p>
                  <div style={styles.imageGrid}>
                    {profileOptions.map((url, index) => (
                      <div
                        key={url}
                        style={{
                          ...styles.imageOption,
                          ...(form.profileImageUrl === url ? styles.imageOptionSelected : {})
                        }}
                        onClick={() => setForm({ ...form, profileImageUrl: url })}
                      >
                        <img src={url} alt={`Option ${index + 1}`} style={styles.optionImage} />
                        {form.profileImageUrl === url && (
                          <div style={styles.selectedOverlay}>
                            <span style={styles.checkIcon}>✓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Details Section */}
            <div style={styles.detailsSection}>
              {editing ? (
                <div style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span style={styles.labelIcon}>👤</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={styles.input}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span style={styles.labelIcon}>📧</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={styles.input}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span style={styles.labelIcon}>📝</span>
                      About Me
                    </label>
                    <textarea
                      value={form.about}
                      onChange={(e) => setForm({ ...form, about: e.target.value })}
                      style={styles.textarea}
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>
                </div>
              ) : (
                <div style={styles.displayInfo}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>👤</span>
                    <div style={styles.infoContent}>
                      <h3 style={styles.infoTitle}>Name</h3>
                      <p style={styles.infoValue}>{user.name || 'Not provided'}</p>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>📧</span>
                    <div style={styles.infoContent}>
                      <h3 style={styles.infoTitle}>Email</h3>
                      <p style={styles.infoValue}>{user.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>📝</span>
                    <div style={styles.infoContent}>
                      <h3 style={styles.infoTitle}>About</h3>
                      <p style={styles.infoValue}>{user.about || 'No description provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Card */}
        <div style={styles.statsCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📊</span>
              Awareness Campaign Analytics
            </h2>
            <button 
              style={styles.refreshButton}
              onClick={fetchLinkStatistics}
              disabled={statsLoading}
            >
              🔄 {statsLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div style={styles.statsContent}>
            {/* Quick Stats Overview */}
            <div style={styles.quickStats}>
              <div style={styles.quickStatCard}>
                <div style={styles.quickStatIcon}>🔗</div>
                <div style={styles.quickStatInfo}>
                  <h3 style={styles.quickStatNumber}>{linkStats.totalLinks}</h3>
                  <p style={styles.quickStatLabel}>Total Links</p>
                </div>
              </div>

              <div style={styles.quickStatCard}>
                <div style={styles.quickStatIcon}>👆</div>
                <div style={styles.quickStatInfo}>
                  <h3 style={styles.quickStatNumber}>{linkStats.totalClicks}</h3>
                  <p style={styles.quickStatLabel}>Total Clicks</p>
                </div>
              </div>

              <div style={styles.quickStatCard}>
                <div style={styles.quickStatIcon}>✅</div>
                <div style={styles.quickStatInfo}>
                  <h3 style={styles.quickStatNumber}>{linkStats.activeLinks}</h3>
                  <p style={styles.quickStatLabel}>Active Links</p>
                </div>
              </div>

              <div style={styles.quickStatCard}>
                <div style={styles.quickStatIcon}>⏰</div>
                <div style={styles.quickStatInfo}>
                  <h3 style={styles.quickStatNumber}>{linkStats.expiredLinks}</h3>
                  <p style={styles.quickStatLabel}>Expired Links</p>
                </div>
              </div>
            </div>

            {/* Legacy Stats (from user profile) */}
            <div style={styles.legacyStats}>
              <div style={styles.statItem}>
                <div style={styles.statIcon}>📈</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>{user.linksCreated || 0}</h3>
                  <p style={styles.statLabel}>Links Created (Legacy)</p>
                </div>
              </div>

              <div style={styles.statItem}>
                <div style={styles.statIcon}>🎯</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>{user.linksClicked || 0}</h3>
                  <p style={styles.statLabel}>Clicks Received (Legacy)</p>
                </div>
              </div>
            </div>

            {/* Engagement Analysis */}
            <div style={styles.engagementSection}>
              <div style={styles.engagementHeader}>
                <h4 style={styles.engagementTitle}>
                  {engagement.icon} Campaign Engagement: {engagement.level}
                </h4>
                <div style={styles.engagementBadge} style={{
                  ...styles.engagementBadge,
                  backgroundColor: engagement.color
                }}>
                  {clickRate.toFixed(1)}% Click Rate
                </div>
              </div>

              <div style={styles.progressBarContainer}>
                <div 
                  style={{
                    ...styles.progressBar,
                    width: `${Math.min(clickRate, 100)}%`,
                    backgroundColor: engagement.color
                  }}
                ></div>
              </div>
              
              <div style={styles.progressLabels}>
                <span style={styles.progressLabel}>0%</span>
                <span style={styles.progressLabel}>50%</span>
                <span style={styles.progressLabel}>100%</span>
              </div>
            </div>

            {/* Recent Links Activity */}
            {linkStats.recentLinks.length > 0 && (
              <div style={styles.recentActivity}>
                <h4 style={styles.activityTitle}>📋 Recent Link Activity</h4>
                <div style={styles.activityList}>
                  {linkStats.recentLinks.map((link, index) => (
                    <div key={index} style={styles.activityItem}>
                      <div style={styles.activityIcon}>
                        {getPlatformIcon(link.platformType)}
                      </div>
                      <div style={styles.activityInfo}>
                        <p style={styles.activityPlatform}>{link.platformType}</p>
                        <p style={styles.activityStats}>
                          {link.currentClicks}/{link.maxClicks} clicks • 
                          {new Date(link.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={styles.activityStatus}>
                        {link.isActive && new Date(link.expiresAt) > new Date() ? (
                          <span style={styles.activeStatus}>🟢 Active</span>
                        ) : (
                          <span style={styles.inactiveStatus}>🔴 Expired</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights and Recommendations */}
            <div style={styles.insights}>
              <h4 style={styles.insightsTitle}>💡 Performance Insights</h4>
              <div style={styles.insightsList}>
                {clickRate < 20 && (
                  <div style={styles.insightItem}>
                    <span style={styles.insightIcon}>🌟</span>
                    <p>Excellent awareness! Your audience shows strong phishing resistance.</p>
                  </div>
                )}
                {clickRate >= 20 && clickRate < 40 && (
                  <div style={styles.insightItem}>
                    <span style={styles.insightIcon}>✅</span>
                    <p>Good results! Consider sharing more links to expand awareness reach.</p>
                  </div>
                )}
                {clickRate >= 40 && clickRate < 60 && (
                  <div style={styles.insightItem}>
                    <span style={styles.insightIcon}>⚠️</span>
                    <p>Average engagement. Consider providing more education before sharing links.</p>
                  </div>
                )}
                {clickRate >= 60 && (
                  <div style={styles.insightItem}>
                    <span style={styles.insightIcon}>🚨</span>
                    <p>High click rate indicates vulnerability. Focus on basic security training first.</p>
                  </div>
                )}
                
                <div style={styles.insightItem}>
                  <span style={styles.insightIcon}>📈</span>
                  <p>
                    Your {linkStats.totalLinks} awareness links have generated {linkStats.totalClicks} total interactions.
                  </p>
                </div>
                
                {linkStats.activeLinks > 0 && (
                  <div style={styles.insightItem}>
                    <span style={styles.insightIcon}>🔥</span>
                    <p>
                      You have {linkStats.activeLinks} active links still collecting data. Great for ongoing awareness!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '20px',
  },
  
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  loadingText: {
    fontSize: '1.1rem',
    color: '#64748b',
    margin: '0',
  },
  
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '15px',
    textAlign: 'center',
  },
  
  errorIcon: {
    fontSize: '3rem',
  },
  
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '3rem 2rem',
    marginBottom: '2rem',
  },
  
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  
  titleIcon: {
    fontSize: '3rem',
  },
  
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    margin: '0',
    fontWeight: '300',
  },
  
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem 3rem',
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: '1fr',
  },
  
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  
  cardHeader: {
    padding: '2rem 2rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  cardIcon: {
    fontSize: '1.5rem',
  },
  
  refreshButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  
  editButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  
  editButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  
  saveButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  
  cancelButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  
  buttonIcon: {
    fontSize: '1rem',
  },
  
  profileContent: {
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  
  imageContainer: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  
  profileImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    display: 'block',
  },
  
  imageOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  },
  
  cameraIcon: {
    fontSize: '2rem',
    color: 'white',
  },
  
  imageOptions: {
    width: '100%',
  },
  
  imageOptionsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
  },
  
  imageOption: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid #e2e8f0',
    transition: 'all 0.2s ease',
  },
  
  imageOptionSelected: {
    border: '2px solid #10b981',
    transform: 'scale(1.05)',
  },
  
  optionImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    display: 'block',
  },
  
  selectedOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  checkIcon: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  
  detailsSection: {
    flex: '1',
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  labelIcon: {
    fontSize: '1rem',
  },
  
  input: {
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  
  textarea: {
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  },
  
  displayInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  
  infoIcon: {
    fontSize: '1.5rem',
    marginTop: '0.25rem',
  },
  
  infoContent: {
    flex: '1',
  },
  
  infoTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#6b7280',
    margin: '0 0 0.25rem 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  infoValue: {
    fontSize: '1.1rem',
    color: '#1f2937',
    margin: '0',
    lineHeight: '1.5',
  },
  
  statsContent: {
    padding: '2rem',
  },
  
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  
  quickStatCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
  },
  
  quickStatIcon: {
    fontSize: '2rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '2px solid #bae6fd',
  },
  
  quickStatInfo: {
    flex: '1',
  },
  
  quickStatNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#0c4a6e',
    margin: '0 0 0.25rem 0',
  },
  
  quickStatLabel: {
    fontSize: '0.9rem',
    color: '#0369a1',
    margin: '0',
    fontWeight: '500',
  },
  
  legacyStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#fef3c7',
    borderRadius: '12px',
    border: '1px solid #fbbf24',
  },
  
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  
  statIcon: {
    fontSize: '2rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '2px solid #fbbf24',
  },
  
  statInfo: {
    flex: '1',
  },
  
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#92400e',
    margin: '0 0 0.25rem 0',
  },
  
  statLabel: {
    fontSize: '0.9rem',
    color: '#b45309',
    margin: '0',
    fontWeight: '500',
  },
  
  engagementSection: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  engagementHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  engagementTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0',
  },
  
  engagementBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  
  progressBarContainer: {
    width: '100%',
    height: '12px',
    backgroundColor: '#e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '0.75rem',
  },
  
  progressBar: {
    height: '100%',
    borderRadius: '6px',
    transition: 'all 1s ease',
  },
  
  progressLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#64748b',
  },
  
  progressLabel: {
    fontWeight: '500',
  },
  
  recentActivity: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem',
  },
  
  activityTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1.5rem 0',
  },
  
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  
  activityIcon: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
  },
  
  activityInfo: {
    flex: '1',
  },
  
  activityPlatform: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
    textTransform: 'capitalize',
  },
  
  activityStats: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: '0',
  },
  
  activityStatus: {
    flexShrink: 0,
  },
  
  activeStatus: {
    color: '#10b981',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  
  inactiveStatus: {
    color: '#ef4444',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  
  insights: {
    backgroundColor: '#f0f9ff',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
  },
  
  insightsTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#0c4a6e',
    margin: '0 0 1.5rem 0',
  },
  
  insightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  insightItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '1rem',
    color: '#1e293b',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
  },
  
  insightIcon: {
    fontSize: '1.2rem',
    marginTop: '0.1rem',
  },
  
  // Responsive styles
  '@media (max-width: 768px)': {
    profileContent: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
    },
    
    cardHeader: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    
    editButtons: {
      flexDirection: 'column',
    },
    
    title: {
      fontSize: '2rem',
    },
    
    quickStats: {
      gridTemplateColumns: '1fr',
    },
    
    legacyStats: {
      gridTemplateColumns: '1fr',
    },
    
    engagementHeader: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .profile-card:hover .image-overlay {
    opacity: 1;
  }
  
  .edit-button:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
  
  .save-button:hover {
    background-color: #059669;
    transform: translateY(-1px);
  }
  
  .cancel-button:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
  }
  
  .refresh-button:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
  }
  
  .input:focus,
  .textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
document.head.appendChild(styleSheet);
