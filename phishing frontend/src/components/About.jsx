import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '125K+', label: 'Users Protected', icon: '🛡️' },
    { number: '89%', label: 'Attack Prevention Rate', icon: '🎯' },
    { number: '50+', label: 'Countries Reached', icon: '🌍' },
    { number: '2.3M', label: 'Threats Identified', icon: '🔍' }
  ];

  const features = [
    {
      icon: '🎭',
      title: 'Interactive Simulations',
      description: 'Practice with realistic phishing scenarios in a safe environment without any risk to your data or devices.'
    },
    {
      icon: '📚',
      title: 'Comprehensive Learning',
      description: 'Step-by-step lessons covering all types of phishing attacks, from basic email scams to advanced social engineering.'
    },
    {
      icon: '⚡',
      title: 'Instant Feedback',
      description: 'Get immediate explanations when you identify threats correctly or fall for simulated attacks.'
    },
    {
      icon: '👥',
      title: 'Community Driven',
      description: 'Join thousands of users sharing experiences and learning together to create a safer digital world.'
    },
    {
      icon: '🆓',
      title: 'Always Free',
      description: 'No hidden costs, no premium subscriptions. Cybersecurity education should be accessible to everyone.'
    },
    {
      icon: '📱',
      title: 'Multi-Platform',
      description: 'Access ClickSafe from any device - desktop, tablet, or smartphone with a responsive design.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Cybersecurity Research Director',
      bio: 'Former NSA cybersecurity analyst with 15+ years in threat intelligence',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Educational Technology Lead',
      bio: 'EdTech specialist focused on making complex topics accessible to all ages',
      avatar: '👨‍🏫'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Behavioral Psychology Expert',
      bio: 'Specialist in understanding why people fall for social engineering attacks',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroIcon}>🛡️</span>
            About ClickSafe
          </h1>
          <p style={styles.heroSubtitle}>
            Empowering digital citizens with the knowledge and skills to recognize, 
            avoid, and report phishing attacks through interactive education and real-world simulations.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/learn" style={styles.primaryButton}>
              Start Learning
            </Link>
            <Link to="/attack-simulation" style={styles.secondaryButton}>
              Try Simulation
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <h2 style={styles.statsTitle}>Our Impact in Numbers</h2>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        
        {/* Navigation Tabs */}
        <div style={styles.tabNavigation}>
          {[
            { id: 'mission', label: 'Our Mission', icon: '🎯' },
            { id: 'story', label: 'Our Story', icon: '📖' },
            { id: 'approach', label: 'Our Approach', icon: '🔬' },
            { id: 'team', label: 'Our Team', icon: '👥' }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab.id ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          
          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div style={styles.tabPanel}>
              <h2 style={styles.sectionTitle}>Our Mission: Democratizing Cybersecurity Education</h2>
              
              <div style={styles.missionContent}>
                <div style={styles.missionText}>
                  <p style={styles.paragraph}>
                    <strong>ClickSafe</strong> was born from a simple but critical observation: traditional cybersecurity 
                    training is often boring, expensive, and ineffective. People learn best by doing, not by reading 
                    lengthy manuals or sitting through PowerPoint presentations.
                  </p>
                  
                  <p style={styles.paragraph}>
                    Our mission is to make cybersecurity education accessible, engaging, and effective for everyone—from 
                    curious teenagers to busy professionals to tech-anxious seniors. We believe that in today's digital 
                    world, cybersecurity literacy should be as fundamental as reading and writing.
                  </p>

                  <div style={styles.missionPoints}>
                    <div style={styles.missionPoint}>
                      <span style={styles.pointIcon}>🌟</span>
                      <div>
                        <h4>Accessibility First</h4>
                        <p>No technical background required. Our platform adapts to your learning style and pace.</p>
                      </div>
                    </div>
                    <div style={styles.missionPoint}>
                      <span style={styles.pointIcon}>🎓</span>
                      <div>
                        <h4>Evidence-Based Learning</h4>
                        <p>Every lesson is backed by cognitive science research and real-world threat intelligence.</p>
                      </div>
                    </div>
                    <div style={styles.missionPoint}>
                      <span style={styles.pointIcon}>🤝</span>
                      <div>
                        <h4>Community Impact</h4>
                        <p>When you learn to protect yourself, you also protect your family, friends, and colleagues.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div style={styles.tabPanel}>
              <h2 style={styles.sectionTitle}>The Story Behind ClickSafe</h2>
              
              <div style={styles.storyContent}>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineYear}>2023</div>
                  <div style={styles.timelineContent}>
                    <h3>The Problem Becomes Personal</h3>
                    <p>
                      Our founder's grandmother lost $3,000 to a sophisticated phone scam impersonating her bank. 
                      Despite being warned about scams, she fell victim to a well-crafted social engineering attack 
                      that exploited her trust and urgency.
                    </p>
                  </div>
                </div>

                <div style={styles.timelineItem}>
                  <div style={styles.timelineYear}>2024</div>
                  <div style={styles.timelineContent}>
                    <h3>Research and Development</h3>
                    <p>
                      We assembled a team of cybersecurity experts, educational psychologists, and UX designers 
                      to create an evidence-based approach to phishing education. We studied why traditional 
                      training fails and how to make learning stick.
                    </p>
                  </div>
                </div>

                <div style={styles.timelineItem}>
                  <div style={styles.timelineYear}>2025</div>
                  <div style={styles.timelineContent}>
                    <h3>Launch and Impact</h3>
                    <p>
                      ClickSafe launched with our first interactive simulations. Within months, we prevented 
                      thousands of successful phishing attacks and built a community of digitally literate users 
                      who share knowledge with their networks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Approach Tab */}
          {activeTab === 'approach' && (
            <div style={styles.tabPanel}>
              <h2 style={styles.sectionTitle}>Our Scientific Approach to Learning</h2>
              
              <p style={styles.paragraph}>
                ClickSafe isn't just another training platform. Every aspect of our approach is grounded in 
                cognitive science, behavioral psychology, and cybersecurity research.
              </p>

              <div style={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <div key={index} style={styles.featureCard}>
                    <div style={styles.featureIcon}>{feature.icon}</div>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                    <p style={styles.featureDescription}>{feature.description}</p>
                  </div>
                ))}
              </div>

              <div style={styles.approachDetails}>
                <h3 style={styles.detailsTitle}>The Science of Effective Cybersecurity Training</h3>
                <div style={styles.principlesList}>
                  <div style={styles.principle}>
                    <h4>🧠 Cognitive Load Theory</h4>
                    <p>We present information in digestible chunks to avoid overwhelming learners and improve retention.</p>
                  </div>
                  <div style={styles.principle}>
                    <h4>🎯 Spaced Repetition</h4>
                    <p>Key concepts are reinforced at optimal intervals to strengthen long-term memory formation.</p>
                  </div>
                  <div style={styles.principle}>
                    <h4>⚡ Active Learning</h4>
                    <p>Hands-on simulations create stronger neural pathways than passive information consumption.</p>
                  </div>
                  <div style={styles.principle}>
                    <h4>💡 Contextual Learning</h4>
                    <p>Training scenarios mirror real-world situations to improve knowledge transfer to daily life.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div style={styles.tabPanel}>
              <h2 style={styles.sectionTitle}>Meet the ClickSafe Team</h2>
              
              <p style={styles.paragraph}>
                Our diverse team combines expertise in cybersecurity, education, psychology, and technology 
                to create the most effective phishing awareness training available.
              </p>

              <div style={styles.teamGrid}>
                {teamMembers.map((member, index) => (
                  <div key={index} style={styles.teamCard}>
                    <div style={styles.teamAvatar}>{member.avatar}</div>
                    <h3 style={styles.teamName}>{member.name}</h3>
                    <div style={styles.teamRole}>{member.role}</div>
                    <p style={styles.teamBio}>{member.bio}</p>
                  </div>
                ))}
              </div>

              <div style={styles.joinTeam}>
                <h3>Want to Join Our Mission?</h3>
                <p>
                  We're always looking for passionate individuals who want to make the internet safer for everyone. 
                  Whether you're a cybersecurity expert, educator, developer, or simply someone who cares about 
                  digital safety, we'd love to hear from you.
                </p>
                <Link to="/contact" style={styles.joinButton}>
                  Get in Touch
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Strengthen Your Digital Defenses?</h2>
          <p style={styles.ctaText}>
            Join thousands of users who've learned to identify and avoid phishing attacks. 
            Start your journey to cybersecurity awareness today.
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/learn" style={styles.ctaPrimaryButton}>
              Start Your Training
            </Link>
            <Link to="/analytics" style={styles.ctaSecondaryButton}>
              View Our Impact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },
  
  hero: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
  },
  
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '900',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  
  heroIcon: {
    fontSize: '4rem',
  },
  
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.9,
    marginBottom: '2.5rem',
    lineHeight: '1.7',
  },
  
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  
  primaryButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  
  statsSection: {
    padding: '60px 20px',
    backgroundColor: 'white',
  },
  
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  statsTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '3rem',
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  
  statCard: {
    padding: '2rem',
    borderRadius: '15px',
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    transition: 'transform 0.3s ease',
  },
  
  statIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  statNumber: {
    fontSize: '3rem',
    fontWeight: '900',
    color: '#4f46e5',
    marginBottom: '0.5rem',
  },
  
  statLabel: {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '600',
  },
  
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
  },
  
  tabNavigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '3rem',
    backgroundColor: 'white',
    padding: '0.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap',
  },
  
  tabButton: {
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#64748b',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  tabButtonActive: {
    backgroundColor: '#4f46e5',
    color: 'white',
  },
  
  tabIcon: {
    fontSize: '1.2rem',
  },
  
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '3rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  
  tabPanel: {
    minHeight: '500px',
  },
  
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
    borderBottom: '4px solid #4f46e5',
    paddingBottom: '1rem',
  },
  
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#475569',
    marginBottom: '1.5rem',
  },
  
  missionContent: {
    display: 'grid',
    gap: '2rem',
  },
  
  missionText: {
    marginBottom: '2rem',
  },
  
  missionPoints: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
  
  missionPoint: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  
  pointIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  
  storyContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  
  timelineItem: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  
  timelineYear: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#4f46e5',
    minWidth: '80px',
    flexShrink: 0,
  },
  
  timelineContent: {
    flex: 1,
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  
  featureCard: {
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  
  featureDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
  },
  
  approachDetails: {
    backgroundColor: '#f1f5f9',
    padding: '2.5rem',
    borderRadius: '15px',
    border: '1px solid #cbd5e1',
  },
  
  detailsTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '2rem',
  },
  
  principlesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  
  principle: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  
  teamCard: {
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '15px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  
  teamAvatar: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  
  teamName: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  
  teamRole: {
    fontSize: '1rem',
    color: '#4f46e5',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  
  teamBio: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
  },
  
  joinTeam: {
    backgroundColor: '#f0f9ff',
    padding: '2.5rem',
    borderRadius: '15px',
    textAlign: 'center',
    border: '1px solid #bae6fd',
  },
  
  joinButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    display: 'inline-block',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
  },
  
  ctaSection: {
    background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center',
  },
  
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  
  ctaText: {
    fontSize: '1.2rem',
    opacity: 0.9,
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  
  ctaPrimaryButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '1.25rem 2.5rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
  },
  
  ctaSecondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '1.25rem 2.5rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  // Responsive styles
  '@media (max-width: 768px)': {
    heroTitle: {
      fontSize: '2.5rem',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    
    tabNavigation: {
      flexDirection: 'column',
      gap: '0.25rem',
    },
    
    tabContent: {
      padding: '2rem 1.5rem',
    },
    
    timelineItem: {
      flexDirection: 'column',
      gap: '1rem',
    },
    
    missionPoints: {
      gap: '1rem',
    },
    
    missionPoint: {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '1rem',
    },
  },
};

// Add CSS animations and hover effects
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  .stat-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-card:hover,
  .team-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  .primary-button:hover,
  .cta-primary-button:hover {
    background-color: #059669;
    transform: translateY(-2px);
  }
  
  .secondary-button:hover,
  .cta-secondary-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .join-button:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
  }
`;
document.head.appendChild(styleSheet);
