import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          <span style={styles.titleIcon}>📬</span>
          Get in Touch
        </h1>
        <p style={styles.subtitle}>
          Have questions about cybersecurity? Need help with phishing? Want to report a scam? 
          Our security experts are here to assist you.
        </p>
      </div>

      <div style={styles.mainContent}>
        {/* Contact Form Section */}
        <div style={styles.formSection}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Send Us a Message</h2>
            <p style={styles.formDescription}>
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {submitStatus === 'success' && (
            <div style={styles.successMessage}>
              <span style={styles.successIcon}>✅</span>
              <div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll respond within 24 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>👤</span>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  style={styles.input}
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📝</span>
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="phishing-report">Report Phishing Attempt</option>
                <option value="technical-support">Technical Support</option>
                <option value="training">Training Request</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="feedback">Feedback & Suggestions</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💬</span>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your inquiry in detail..."
                required
                rows={6}
                style={styles.textarea}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {})
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                <>
                  <span style={styles.buttonIcon}>🚀</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div style={styles.contactInfo}>
          <h2 style={styles.contactTitle}>Other Ways to Reach Us</h2>
          
          <div style={styles.contactCards}>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>📧</div>
              <h3 style={styles.contactCardTitle}>Email Support</h3>
              <p style={styles.contactCardText}>support@clicksafe.org</p>
              <p style={styles.contactCardSubtext}>Response within 24 hours</p>
            </div>

            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>📞</div>
              <h3 style={styles.contactCardTitle}>Phone Support</h3>
              <p style={styles.contactCardText}>+1-800-CLICKSAFE</p>
              <p style={styles.contactCardSubtext}>Mon-Fri, 9AM-6PM EST</p>
            </div>

            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>🚨</div>
              <h3 style={styles.contactCardTitle}>Emergency Hotline</h3>
              <p style={styles.contactCardText}>+1-800-CYBER-911</p>
              <p style={styles.contactCardSubtext}>24/7 for urgent threats</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={styles.faqSection}>
            <h3 style={styles.faqTitle}>Frequently Asked Questions</h3>
            <div style={styles.faqList}>
              <div style={styles.faqItem}>
                <h4 style={styles.faqQuestion}>How quickly do you respond to reports?</h4>
                <p style={styles.faqAnswer}>
                  We respond to all inquiries within 24 hours. Emergency threats are addressed immediately.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h4 style={styles.faqQuestion}>Can you help with ongoing attacks?</h4>
                <p style={styles.faqAnswer}>
                  Yes! Contact our emergency hotline immediately if you're experiencing an active cyber attack.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h4 style={styles.faqQuestion}>Do you provide training for organizations?</h4>
                <p style={styles.faqAnswer}>
                  Absolutely. We offer customized cybersecurity training programs for businesses and institutions.
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div style={styles.securityNotice}>
            <div style={styles.securityIcon}>🔒</div>
            <div>
              <h4 style={styles.securityTitle}>Your Privacy is Protected</h4>
              <p style={styles.securityText}>
                All communications are encrypted and handled confidentially. We never share your information 
                with third parties without your explicit consent.
              </p>
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
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
  },
  
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  
  titleIcon: {
    fontSize: '3.5rem',
  },
  
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  
  formSection: {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  
  formHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  
  formTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  
  formDescription: {
    color: '#64748b',
    fontSize: '1.1rem',
  },
  
  successMessage: {
    backgroundColor: '#dcfce7',
    border: '1px solid #86efac',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  
  successIcon: {
    fontSize: '2rem',
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  
  inputGroup: {
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
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
  },
  
  select: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
  },
  
  textarea: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
  },
  
  submitButton: {
    padding: '1.25rem 2rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
    marginTop: '1rem',
  },
  
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  
  buttonIcon: {
    fontSize: '1.2rem',
  },
  
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  
  contactTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  
  contactCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  contactCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  
  contactIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  
  contactCardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  
  contactCardText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: '0.25rem',
  },
  
  contactCardSubtext: {
    fontSize: '0.9rem',
    color: '#64748b',
  },
  
  faqSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
  },
  
  faqTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  faqItem: {
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '1rem',
  },
  
  faqQuestion: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  
  faqAnswer: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },
  
  securityNotice: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  
  securityIcon: {
    fontSize: '1.5rem',
    marginTop: '0.25rem',
  },
  
  securityTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: '0.5rem',
  },
  
  securityText: {
    fontSize: '0.9rem',
    color: '#0369a1',
    lineHeight: '1.5',
    margin: 0,
  },
  
  // Responsive styles
  '@media (max-width: 1024px)': {
    mainContent: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
    },
  },
  
  '@media (max-width: 768px)': {
    title: {
      fontSize: '2.5rem',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    
    formSection: {
      padding: '2rem 1.5rem',
    },
    
    inputRow: {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    
    mainContent: {
      padding: '2rem 1rem',
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
  
  .contact-card:hover {
    transform: translateY(-3px);
  }
  
  .input:focus,
  .select:focus,
  .textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background-color: #ffffff;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
  }
`;
document.head.appendChild(styleSheet);
