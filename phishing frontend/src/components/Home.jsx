import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const stats = [
    { number: "3.4B", label: "Phishing emails sent daily", icon: "📧" },
    { number: "83%", label: "Organizations experienced phishing attacks", icon: "🏢" },
    { number: "$12B", label: "Annual losses from phishing", icon: "💰" },
    { number: "1 in 4", label: "People fall for phishing attempts", icon: "⚠️" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "College Student",
      text: "ClickSafe helped me spot a fake scholarship email that almost got my personal info. Now I'm teaching my friends too!",
      avatar: "👩‍🎓"
    },
    {
      name: "Robert Martinez", 
      role: "Small Business Owner",
      text: "After training with ClickSafe, my team caught 3 phishing attempts this month. It's saving our business!",
      avatar: "👨‍💼"
    },
    {
      name: "Margaret Wilson",
      role: "Retired Teacher",
      text: "I thought I was too old to learn about online safety, but ClickSafe made it so simple and fun!",
      avatar: "👩‍🏫"
    }
  ];

  const features = [
    {
      icon: "🎯",
      title: "Interactive Simulations",
      description: "Practice with real-world phishing scenarios in a safe environment",
      color: "#3b82f6"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your improvement and see how your skills develop over time",
      color: "#10b981"
    },
    {
      icon: "🏆",
      title: "Skill Challenges",
      description: "Test your knowledge with gamified learning experiences",
      color: "#f59e0b"
    },
    {
      icon: "👥",
      title: "Community Learning",
      description: "Share experiences and learn from others in our safe community",
      color: "#8b5cf6"
    }
  ];

  const faqs = [
    {
      question: "Is ClickSafe really free?",
      answer: "Yes! ClickSafe is completely free for individuals, schools, and communities. Our mission is to make cybersecurity education accessible to everyone."
    },
    {
      question: "Do I need technical knowledge?",
      answer: "Not at all! ClickSafe is designed for everyone, from tech beginners to experts. Our lessons start with the basics and guide you step by step."
    },
    {
      question: "How long does it take to complete?",
      answer: "You can start benefiting immediately! A basic session takes 10-15 minutes, but you can learn at your own pace and return anytime."
    },
    {
      question: "Can I use this to train my team?",
      answer: "Absolutely! ClickSafe is perfect for businesses, schools, and organizations looking to improve their cybersecurity awareness."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroBackground}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.badge}>
              🏆 #1 Phishing Awareness Platform
            </div>
            <h1 style={styles.heroTitle}>
              Protect Yourself from
              <span style={styles.highlight}> Cyber Threats</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Master the art of spotting phishing attacks with interactive simulations, 
              real-world examples, and personalized learning paths. Join over 100,000+ users 
              who've strengthened their digital defense skills.
            </p>
            <div style={styles.heroCTA}>
              <Link to="/learn" style={styles.primaryButton}>
                <span style={styles.buttonIcon}>🚀</span>
                Start Your Journey
              </Link>
              <Link to="/attack-simulation" style={styles.secondaryButton}>
                <span style={styles.buttonIcon}>🎭</span>
                Try Demo
              </Link>
            </div>
            <div style={styles.heroStats}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>100K+</span>
                <span style={styles.statLabel}>Users Protected</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>95%</span>
                <span style={styles.statLabel}>Success Rate</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>24/7</span>
                <span style={styles.statLabel}>Available</span>
              </div>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.floatingCard}>
              <div style={styles.cardHeader}>
                <span style={styles.cardIcon}>🛡️</span>
                <span>Security Alert</span>
              </div>
              <div style={styles.cardContent}>
                <p>Phishing attempt detected and blocked!</p>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill}></div>
                </div>
                <span style={styles.cardStatus}>✅ You're protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS SECTION */}
      <section style={styles.liveStats} data-animate id="live-stats">
        <div style={styles.sectionContainer}>
          <h2 style={styles.statsTitle}>Live Threat Intelligence</h2>
          <div style={styles.rotatingStats}>
            <div style={styles.currentStat}>
              <span style={styles.statIcon}>{stats[currentStat].icon}</span>
              <span style={styles.statValue}>{stats[currentStat].number}</span>
              <span style={styles.statDescription}>{stats[currentStat].label}</span>
            </div>
          </div>
          <div style={styles.statIndicators}>
            {stats.map((_, index) => (
              <div 
                key={index}
                style={{
                  ...styles.indicator,
                  ...(index === currentStat ? styles.indicatorActive : {})
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howItWorks} data-animate id="how-it-works">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>How ClickSafe Works</h2>
            <p style={styles.sectionSubtitle}>
              Our proven 4-step methodology helps you build unshakeable cybersecurity skills
            </p>
          </div>
          
          <div style={styles.processFlow}>
            {[
              { 
                step: "01", 
                title: 'Learn Fundamentals', 
                desc: 'Start with interactive lessons covering phishing basics, attack vectors, and red flags to watch for.',
                icon: '📚',
                color: '#3b82f6'
              },
              { 
                step: "02", 
                title: 'Practice Simulations', 
                desc: 'Engage with realistic phishing scenarios based on actual attacks — completely risk-free environment.',
                icon: '🧪',
                color: '#10b981'
              },
              { 
                step: "03", 
                title: 'Get Instant Feedback', 
                desc: 'Receive detailed explanations on why certain elements make messages dangerous or legitimate.',
                icon: '💡',
                color: '#f59e0b'
              },
              { 
                step: "04", 
                title: 'Share & Protect', 
                desc: 'Create awareness campaigns for friends, family, and colleagues to multiply your impact.',
                icon: '🛡️',
                color: '#8b5cf6'
              }
            ].map((item, i) => (
              <div key={i} style={styles.processStep}>
                <div style={{...styles.stepNumber, backgroundColor: item.color}}>
                  {item.step}
                </div>
                <div style={{...styles.stepIcon, backgroundColor: item.color + '20'}}>
                  {item.icon}
                </div>
                <h3 style={styles.stepTitle}>{item.title}</h3>
                <p style={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.features} data-animate id="features">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Powerful Features for Everyone</h2>
            <p style={styles.sectionSubtitle}>
              Advanced tools designed with simplicity in mind
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={{...styles.featureIcon, backgroundColor: feature.color + '20'}}>
                  <span style={{color: feature.color}}>{feature.icon}</span>
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.description}</p>
                <div style={{...styles.featureAccent, backgroundColor: feature.color}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.testimonials} data-animate id="testimonials">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Real Stories, Real Protection</h2>
            <p style={styles.sectionSubtitle}>
              Hear from people who've strengthened their digital defenses with ClickSafe
            </p>
          </div>
          
          <div style={styles.testimonialsGrid}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.testimonialContent}>
                  <div style={styles.quoteIcon}>"</div>
                  <p style={styles.testimonialText}>{testimonial.text}</p>
                </div>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.authorAvatar}>{testimonial.avatar}</div>
                  <div style={styles.authorInfo}>
                    <div style={styles.authorName}>{testimonial.name}</div>
                    <div style={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={styles.faq} data-animate id="faq">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need to know about getting started
            </p>
          </div>
          
          <div style={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>{faq.question}</h3>
                <p style={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCTA}>
        <div style={styles.ctaContainer}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Become Cyber-Resilient?</h2>
            <p style={styles.ctaSubtitle}>
              Join thousands of users who've already strengthened their digital defenses. 
              Start your journey to online safety today — it's free, fun, and effective.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/learn" style={styles.ctaPrimaryButton}>
                <span style={styles.buttonIcon}>🚀</span>
                Start Learning Now
              </Link>
              <Link to="/analytics" style={styles.ctaSecondaryButton}>
                <span style={styles.buttonIcon}>📊</span>
                View Threat Data
              </Link>
            </div>
            <div style={styles.ctaTrust}>
              <span style={styles.trustBadge}>🔒 100% Secure</span>
              <span style={styles.trustBadge}>🆓 Forever Free</span>
              <span style={styles.trustBadge}>⚡ Instant Access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    lineHeight: 1.6,
    margin: 0,
    padding: 0,
  },
  
  // Hero Section
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    overflow: 'hidden',
  },
  
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'2\' fill=\'%23ffffff\' opacity=\'0.1\'/></svg>") repeat',
    backgroundSize: '50px 50px',
    animation: 'float 20s ease-in-out infinite',
  },
  
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  
  heroText: {
    zIndex: 2,
  },
  
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)',
  },
  
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    lineHeight: '1.1',
  },
  
  highlight: {
    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  
  heroCTA: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#10b981',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
  },
  
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  
  buttonIcon: {
    fontSize: '1.2rem',
  },
  
  heroStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  
  statItem: {
    textAlign: 'center',
  },
  
  statNumber: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },
  
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  floatingCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    color: '#1f2937',
    maxWidth: '300px',
    animation: 'float 3s ease-in-out infinite',
  },
  
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  
  cardIcon: {
    fontSize: '1.5rem',
  },
  
  cardContent: {
    textAlign: 'left',
  },
  
  progressBar: {
    width: '100%',
    height: '0.5rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem',
    margin: '1rem 0',
    overflow: 'hidden',
  },
  
  progressFill: {
    width: '85%',
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '0.25rem',
    animation: 'progress 2s ease-out',
  },
  
  cardStatus: {
    color: '#10b981',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  
  // Live Stats Section
  liveStats: {
    padding: '4rem 2rem',
    backgroundColor: '#1f2937',
    color: 'white',
    textAlign: 'center',
  },
  
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  statsTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '3rem',
    color: 'white',
  },
  
  rotatingStats: {
    marginBottom: '2rem',
  },
  
  currentStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  
  statIcon: {
    fontSize: '3rem',
  },
  
  statValue: {
    fontSize: '4rem',
    fontWeight: '800',
    color: '#ffd700',
  },
  
  statDescription: {
    fontSize: '1.2rem',
    opacity: 0.9,
  },
  
  statIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  
  indicator: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  indicatorActive: {
    backgroundColor: '#ffd700',
    transform: 'scale(1.5)',
  },
  
  // How It Works Section
  howItWorks: {
    padding: '6rem 2rem',
    backgroundColor: '#f8fafc',
  },
  
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  processFlow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
  },
  
  processStep: {
    position: 'relative',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  
  stepNumber: {
    position: 'absolute',
    top: '-1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  
  stepIcon: {
    width: '4rem',
    height: '4rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    margin: '2rem auto 1rem',
  },
  
  stepTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  
  stepDesc: {
    color: '#6b7280',
    lineHeight: '1.6',
  },
  
  // Features Section
  features: {
    padding: '6rem 2rem',
    backgroundColor: 'white',
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  
  featureCard: {
    position: 'relative',
    padding: '2.5rem 2rem',
    borderRadius: '1rem',
    backgroundColor: '#f8fafc',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },
  
  featureIcon: {
    width: '4rem',
    height: '4rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  
  featureDesc: {
    color: '#6b7280',
    lineHeight: '1.6',
  },
  
  featureAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
  },
  
  // Testimonials Section
  testimonials: {
    padding: '6rem 2rem',
    backgroundColor: '#f8fafc',
  },
  
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  
  testimonialCard: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  
  testimonialContent: {
    marginBottom: '2rem',
  },
  
  quoteIcon: {
    fontSize: '3rem',
    color: '#d1d5db',
    lineHeight: '1',
    marginBottom: '1rem',
  },
  
  testimonialText: {
    fontSize: '1.1rem',
    color: '#374151',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  
  authorAvatar: {
    fontSize: '3rem',
  },
  
  authorInfo: {
    flex: 1,
  },
  
  authorName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  
  authorRole: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  
  // FAQ Section
  faq: {
    padding: '6rem 2rem',
    backgroundColor: 'white',
  },
  
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  
  faqItem: {
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
  },
  
  faqQuestion: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  
  faqAnswer: {
    color: '#6b7280',
    lineHeight: '1.6',
  },
  
  // Final CTA Section
  finalCTA: {
    padding: '6rem 2rem',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
    color: 'white',
  },
  
  ctaContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  ctaContent: {
    padding: '2rem',
  },
  
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  
  ctaSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  
  ctaPrimaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#10b981',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
  },
  
  ctaSecondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  ctaTrust: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  
  trustBadge: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 85%; }
  }
  
  .process-step:hover {
    transform: translateY(-5px);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .testimonial-card:hover {
    transform: translateY(-3px);
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
  
  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .process-flow {
      grid-template-columns: 1fr;
    }
    
    .hero-stats {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
`;
document.head.appendChild(styleSheet);
