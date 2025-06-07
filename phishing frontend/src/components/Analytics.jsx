import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const phishingData = [
  { name: 'Jan', scams: 320000 },
  { name: 'Feb', scams: 410000 },
  { name: 'Mar', scams: 380000 },
  { name: 'Apr', scams: 450000 },
  { name: 'May', scams: 470000 },
];

const awarenessData = [
  { name: 'Visited Site', value: 500000 },
  { name: 'Completed Learning', value: 210000 },
  { name: 'Shared With Others', value: 120000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function Analytics() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.8rem', color: '#004080', marginBottom: '20px' }}>📊 2025 Phishing Analysis & Awareness Impact</h1>

      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '10px' }}>📈 Monthly Phishing Reports (2025)</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>Track how phishing scams have evolved over the months of 2025.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={phishingData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="scams" fill="#c62828" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '10px' }}>🛡️ User Awareness Contribution</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>Analyzing how many users took action through ClickSafe in 2025.</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={awarenessData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {awarenessData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section style={{ background: '#f4f6f8', padding: '30px 20px', borderRadius: '10px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#004080' }}>📬 Trends & Threat Insights</h2>
        <ul style={{ lineHeight: '1.8', color: '#444', fontSize: '1rem', paddingLeft: '20px' }}>
          <li>🚨 <strong>Banking Phishing:</strong> Fake loan offers and OTP phishing surged in April-May 2025.</li>
          <li>📦 <strong>Delivery Scams:</strong> SMS and emails pretending to be from shipping services.</li>
          <li>🔒 <strong>Credential Theft:</strong> Targeted attacks using cloned login portals for Meta & Google accounts.</li>
          <li>💼 <strong>Fake Job Offers:</strong> Continued to mislead job seekers across LinkedIn & WhatsApp.</li>
        </ul>
      </section>

      <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '1rem', color: '#666' }}>
        Last updated: June 2025 | Data from global reports & ClickSafe platform
      </footer>
    </div>
  );
}
