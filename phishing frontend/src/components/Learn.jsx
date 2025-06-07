import React from 'react';

export default function Learn() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.8rem', color: '#004080', marginBottom: '20px' }}>📘 Learn About Phishing</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Phishing is one of the most common cyber threats. It's when someone tries to trick you into revealing private information like passwords, OTPs, or bank details through fake emails, texts, or messages. This page will teach you how to identify phishing, avoid traps, and stay safe online — whether you're a student, parent, or everyday user.
      </p>

      {/* SECTION 1: WHAT IS PHISHING */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>🔍 What is Phishing?</h2>
        <p>
          Phishing is a type of cyber attack where scammers impersonate trusted people or companies to trick you. These messages often create fear, urgency, or curiosity — and may ask you to:
        </p>
        <ul>
          <li>Click on a suspicious link</li>
          <li>Open a fake attachment</li>
          <li>Enter personal details on a fake website</li>
        </ul>
      </section>

      {/* SECTION 2: TYPES OF PHISHING */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>🎭 Common Types of Phishing Attacks</h2>
        <ul>
          <li>
            <strong>Email Phishing:</strong> Fake emails that look like they're from your bank, school, or government.
          </li>
          <li>
            <strong>SMS Phishing (Smishing):</strong> Text messages claiming urgent issues like delivery problems or blocked accounts.
          </li>
          <li>
            <strong>Voice Phishing (Vishing):</strong> Phone calls pretending to be from tech support or your bank.
          </li>
          <li>
            <strong>Spear Phishing:</strong> Personalized attacks targeting specific people or organizations.
          </li>
          <li>
            <strong>Social Media Phishing:</strong> Fake profiles or hacked accounts that message you pretending to be friends or family.
          </li>
        </ul>
      </section>

      {/* SECTION 3: HOW TO IDENTIFY PHISHING */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>🕵️‍♂️ How to Spot a Phishing Message</h2>
        <ul>
          <li>
            <strong>Too good to be true:</strong> "You've won a free iPhone!" or similar giveaways.
          </li>
          <li>
            <strong>Spelling and grammar errors:</strong> Real companies rarely make sloppy mistakes.
          </li>
          <li>
            <strong>Urgent or scary tone:</strong> "Your account will be locked in 24 hours!"
          </li>
          <li>
            <strong>Suspicious links:</strong> Hover over the link to see where it really goes.
          </li>
          <li>
            <strong>Requests for sensitive info:</strong> Legitimate companies will never ask for passwords or OTPs via email or SMS.
          </li>
        </ul>
      </section>

      {/* SECTION 4: HOW TO STAY SAFE */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>🛡️ How to Stay Safe Online</h2>
        <ul>
          <li>Never click on links or download attachments from unknown senders.</li>
          <li>Always check the sender's email address or phone number.</li>
          <li>Use strong, unique passwords and change them regularly.</li>
          <li>Enable two-factor authentication (2FA) on all important accounts.</li>
          <li>Install antivirus software and keep it up to date.</li>
          <li>Talk to your family and friends about phishing — educate them too.</li>
        </ul>
      </section>

      {/* SECTION 5: WHAT TO DO IF YOU FALL FOR IT */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>🚨 What to Do If You Fall for a Phishing Attack</h2>
        <ol>
          <li>Immediately change any passwords you may have given away.</li>
          <li>Contact your bank if you entered financial information.</li>
          <li>Report the scam to your local cyber crime authorities.</li>
          <li>Scan your device for malware or spyware.</li>
          <li>Warn others so they don't fall for the same trick.</li>
        </ol>
      </section>

      {/* SECTION 6: SHARE & SPREAD AWARENESS */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#333' }}>📢 Share ClickSafe with Friends & Family</h2>
        <p>
          The more people who know about phishing, the safer we all are. Encourage your parents, friends, classmates, and neighbors to visit ClickSafe and try the simulations. Learning can be simple, fun, and free.
        </p>
      </section>

      {/* FINAL CTA */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p>Ready to test what you’ve learned?</p>
        <a href="/attack-simulation" style={{ background: '#004080', padding: '12px 24px', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
          Try a Phishing Simulation 🔐
        </a>
      </div>
    </div>
  );
}
