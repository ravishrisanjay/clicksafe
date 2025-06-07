import React from 'react';

export default function About() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#004080' }}>About ClickSafe 🛡️</h1>

      <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#333' }}>
        <strong>ClickSafe</strong> is a free, educational tool built to help people recognize and avoid online scams—especially phishing attacks. Our mission is simple: make cybersecurity awareness accessible, interactive, and effective for everyone, regardless of age or tech experience.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '40px', color: '#004080' }}>Why We Built ClickSafe</h2>
      <p style={{ fontSize: '1rem', marginBottom: '20px', color: '#444' }}>
        Every day, millions of phishing messages are sent out, tricking people into giving up personal information, passwords, or money. Many of these scams are highly convincing, and even tech-savvy users fall for them.
        <br /><br />
        We believe that with the right knowledge and a little practice, anyone can spot the warning signs. That’s where ClickSafe comes in.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '40px', color: '#004080' }}>What Makes ClickSafe Different?</h2>
      <ul style={{ fontSize: '1rem', color: '#444', paddingLeft: '20px', lineHeight: '1.7' }}>
        <li>✅ Interactive simulations that mimic real phishing attempts</li>
        <li>✅ Instant, clear feedback that helps you understand mistakes</li>
        <li>✅ Easy-to-understand lessons and tips—no jargon</li>
        <li>✅ Designed for students, seniors, families, and professionals</li>
        <li>✅ 100% free to use and share</li>
      </ul>

      <h2 style={{ fontSize: '1.8rem', marginTop: '40px', color: '#004080' }}>Join the Movement</h2>
      <p style={{ fontSize: '1rem', color: '#444' }}>
        Whether you're a teacher, a parent, a company, or just someone who wants to stay safe online—we invite you to explore ClickSafe. Learn, practice, and share. Together, we can build a safer internet for everyone.
      </p>
    </div>
  );
}
