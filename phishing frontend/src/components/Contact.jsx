import React from 'react';

export default function Contact() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>📬 Contact Us</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: '#555' }}>
        Have questions, suggestions, or want to report a scam? We're here to help.
      </p>

      {/* Contact Form */}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="text"
          placeholder="Your Name"
          required
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <textarea
          placeholder="Your Message"
          required
          rows={6}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#004080',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>

      {/* Support Info */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Need Quick Help?</h2>
        <p style={{ marginBottom: '5px' }}>📧 Email: support@clicksafe.org</p>
        <p>📞 Phone: +1-800-CLICKSAFE</p>
        <p style={{ color: '#777', marginTop: '20px' }}>
          We usually respond within 24 hours. Stay alert, stay safe!
        </p>
      </div>
    </div>
  );
}
