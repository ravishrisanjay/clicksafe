import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* HERO SECTION */}
      <section style={{ background: '#004080', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🛡️ ClickSafe</h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
          Learn to recognize online scams and protect yourself and your loved ones.
        </p>
        <p style={{ marginTop: '10px', color: '#cfd8dc' }}>
          ClickSafe helps anyone—from students to seniors—practice spotting fake messages in a fun, safe way.
        </p>
        <div style={{ marginTop: '30px' }}>
          <Link to="/learn" style={{ marginRight: '15px', background: '#1da1f2', padding: '12px 24px', borderRadius: '6px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Start Learning</Link>
          <Link to="/attack-simulation" style={{ background: 'transparent', border: '2px solid white', padding: '12px 24px', borderRadius: '6px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Try Simulation</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '60px 20px', backgroundColor: '#f4f6f8', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>How It Works</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {[
            { title: 'Learn the Basics', desc: 'Understand how phishing works and how to spot it.', icon: '📘' },
            { title: 'Try Simulations', desc: 'Practice with fake emails and messages — no real risk.', icon: '🧪' },
            { title: 'Instant Feedback', desc: 'Get clear explanations on what made a message dangerous.', icon: '💡' },
            { title: 'Help Others Stay Safe', desc: 'Share ClickSafe with friends, parents, and classmates.', icon: '👨‍👩‍👧‍👦' }
          ].map((item, i) => (
            <div key={i} style={{ width: '220px', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
              <h3 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{item.title}</h3>
              <p style={{ marginTop: '10px', color: '#555' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CLICKSAVE */}
      <section style={{ padding: '60px 20px', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Why ClickSafe?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {[
            {
              title: 'For Everyone',
              desc: 'No tech skills needed — anyone can learn to protect themselves.',
              icon: '🌍'
            },
            {
              title: 'Real Examples',
              desc: 'Train using realistic messages that look like real scams.',
              icon: '✉️'
            },
            {
              title: 'Free & Friendly',
              desc: 'Always free to use. Great for schools, homes, and communities.',
              icon: '🆓'
            }
          ].map((item, i) => (
            <div key={i} style={{ width: '300px', padding: '20px', background: '#f0f0f0', borderRadius: '10px' }}>
              <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
              <h3 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{item.title}</h3>
              <p style={{ marginTop: '10px', color: '#555' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS (NEW) */}
      <section style={{ padding: '60px 20px', backgroundColor: '#fefefe', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#004080' }}>📉 Why It Matters</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto 20px', fontSize: '1.1rem', color: '#333' }}>
          Phishing scams are rising every year. Over <strong>3.4 billion emails</strong> are sent daily by attackers, and <strong>millions of people</strong> fall victim—many without realizing it. Whether you're a student, parent, or grandparent, you deserve to stay safe online.
        </p>
        <p style={{ fontSize: '1rem', marginBottom: '30px' }}>
          Want to learn more about the real-world numbers behind phishing scams?
        </p>
        <Link to="/analytics" style={{ background: '#1da1f2', color: 'white', padding: '10px 22px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}>
          View Analytics 📊
        </Link>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: '#004080', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Let’s Make the Internet Safer Together</h2>
        <p style={{ marginBottom: '30px' }}>Start learning, practice spotting scams, and help others do the same.</p>
        <Link to="/learn" style={{ background: '#1da1f2', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          Get Started
        </Link>
      </section>
    </div>
  );
}
