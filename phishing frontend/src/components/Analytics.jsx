import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const phishingData = [
  { month: 'Jan', scams: 320000, blocked: 280000 },
  { month: 'Feb', scams: 410000, blocked: 360000 },
  { month: 'Mar', scams: 380000, blocked: 340000 },
  { month: 'Apr', scams: 450000, blocked: 410000 },
  { month: 'May', scams: 470000, blocked: 430000 },
];

const awarenessData = [
  { name: 'Visited Site', value: 500000, color: '#3B82F6' },
  { name: 'Completed Learning', value: 210000, color: '#10B981' },
  { name: 'Shared With Others', value: 120000, color: '#F59E0B' },
];

const industryData = [
  { name: 'Banking & Finance', attacks: 2210000, risk: 'Critical' },
  { name: 'Healthcare', attacks: 1800000, risk: 'High' },
  { name: 'E-Commerce', attacks: 1500000, risk: 'High' },
  { name: 'Education', attacks: 1140000, risk: 'Medium' },
  { name: 'Government', attacks: 1020000, risk: 'High' },
  { name: 'Technology', attacks: 890000, risk: 'Medium' },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Analytics() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>📊 2025 Phishing Analysis & Awareness Impact</h1>
        <p style={styles.pageSubtitle}>
          Comprehensive cybersecurity analytics and threat intelligence dashboard
        </p>
      </div>

      {/* Overview Cards */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📈 Key Metrics Overview</h2>
        <div style={styles.overviewGrid}>
          {[
            { 
              number: '3,550,000', 
              label: 'Total Attacks (2025)', 
              sublabel: '+16.5% from 2024',
              icon: '🚨',
              color: '#EF4444'
            },
            { 
              number: '89%', 
              label: 'Detection Rate', 
              sublabel: '+5% improvement',
              icon: '🎯',
              color: '#10B981'
            },
            { 
              number: '$18.7B', 
              label: 'Estimated Losses', 
              sublabel: '+12.1% YoY',
              icon: '💰',
              color: '#F59E0B'
            },
            { 
              number: '1.2M', 
              label: 'Users Protected', 
              sublabel: '+20.2% growth',
              icon: '🛡️',
              color: '#3B82F6'
            }
          ].map((item, index) => (
            <div 
              key={index}
              style={{
                ...styles.overviewCard,
                ...(hoveredCard === index ? styles.overviewCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.cardIcon}>{item.icon}</div>
              <div style={{...styles.cardNumber, color: item.color}}>{item.number}</div>
              <div style={styles.cardLabel}>{item.label}</div>
              <div style={styles.cardSublabel}>{item.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Trends Chart */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📉 Monthly Attack Trends</h2>
        <p style={styles.sectionDescription}>
          Track phishing attacks and successful blocks throughout 2025
        </p>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={phishingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScams" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000}K`} />
              <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="scams" 
                stackId="1"
                stroke="#EF4444" 
                fill="url(#colorScams)"
                name="Total Attacks"
              />
              <Area 
                type="monotone" 
                dataKey="blocked" 
                stackId="2"
                stroke="#10B981" 
                fill="url(#colorBlocked)"
                name="Blocked Attacks"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* User Awareness Impact */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🛡️ Awareness Program Impact</h2>
        <p style={styles.sectionDescription}>
          User engagement and knowledge sharing metrics for our awareness initiatives
        </p>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={awarenessData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {awarenessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Impact Summary */}
        <div style={styles.impactSummary}>
          <div style={styles.impactItem}>
            <span style={styles.impactIcon}>👥</span>
            <div>
              <h4>500K+ Site Visitors</h4>
              <p>Users actively seeking cybersecurity education</p>
            </div>
          </div>
          <div style={styles.impactItem}>
            <span style={styles.impactIcon}>🎓</span>
            <div>
              <h4>210K+ Completed Training</h4>
              <p>Users who finished our comprehensive phishing course</p>
            </div>
          </div>
          <div style={styles.impactItem}>
            <span style={styles.impactIcon}>📢</span>
            <div>
              <h4>120K+ Shared Knowledge</h4>
              <p>Users who shared awareness with friends and family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Under Attack */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🏢 Industries Under Attack</h2>
        <p style={styles.sectionDescription}>
          Most targeted industry sectors and their associated risk levels
        </p>
        
        {/* Industry Chart */}
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={industryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString() + ' attacks', 'Total Attacks']}
                labelFormatter={(label) => `Industry: ${label}`}
              />
              <Bar dataKey="attacks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Risk Analysis */}
        <div style={styles.industryAnalysis}>
          <h3 style={styles.analysisTitle}>🎯 Industry Risk Analysis</h3>
          <div style={styles.industryGrid}>
            {industryData.map((industry, index) => (
              <div key={index} style={styles.industryCard}>
                <div style={styles.industryHeader}>
                  <h4 style={styles.industryName}>{industry.name}</h4>
                  <span style={{
                    ...styles.riskBadge,
                    backgroundColor: industry.risk === 'Critical' ? '#DC2626' :
                                   industry.risk === 'High' ? '#EA580C' : '#D97706',
                  }}>
                    {industry.risk} Risk
                  </span>
                </div>
                <p style={styles.industryStats}>
                  <strong>{(industry.attacks / 1000000).toFixed(1)}M attacks</strong> recorded in 2025
                </p>
                <div style={styles.industryInsights}>
                  {industry.name === 'Banking & Finance' && 
                    'Primary targets: customer credentials, payment systems, wire transfer authorization'
                  }
                  {industry.name === 'Healthcare' && 
                    'Focus areas: patient records, insurance data, medical device networks'
                  }
                  {industry.name === 'E-Commerce' && 
                    'Attack vectors: payment processing, customer databases, supply chain'
                  }
                  {industry.name === 'Education' && 
                    'Vulnerable assets: student records, research data, administrative systems'
                  }
                  {industry.name === 'Government' && 
                    'Critical targets: citizen data, infrastructure systems, classified information'
                  }
                  {industry.name === 'Technology' && 
                    'Key risks: source code theft, customer data, intellectual property'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intelligence Summary */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔍 Current Threat Landscape</h2>
        <div style={styles.threatGrid}>
          <div style={styles.threatCard}>
            <div style={styles.threatIcon}>📧</div>
            <h3>Email Phishing</h3>
            <div style={styles.threatNumber}>45%</div>
            <p>Most common attack vector with sophisticated social engineering</p>
          </div>
          <div style={styles.threatCard}>
            <div style={styles.threatIcon}>📱</div>
            <h3>SMS Attacks</h3>
            <div style={styles.threatNumber}>25%</div>
            <p>Growing trend targeting mobile users with urgent messages</p>
          </div>
          <div style={styles.threatCard}>
            <div style={styles.threatIcon}>🎭</div>
            <h3>Social Engineering</h3>
            <div style={styles.threatNumber}>20%</div>
            <p>Voice calls and social media manipulation campaigns</p>
          </div>
          <div style={styles.threatCard}>
            <div style={styles.threatIcon}>🤖</div>
            <h3>AI-Powered</h3>
            <div style={styles.threatNumber}>10%</div>
            <p>Emerging threat using AI for personalized attack content</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            Data compiled from global threat intelligence feeds, cybersecurity reports, and ClickSafe platform analytics
          </p>
          <p style={styles.footerMeta}>
            Last updated: August 2025 | Next update: September 2025 | 
            <span style={styles.footerLink}> View Methodology</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    color: '#1E293B',
  },
  
  header: {
    background: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  
  pageTitle: {
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  
  pageSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  section: {
    backgroundColor: 'white',
    margin: '40px 20px',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #E2E8F0',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  
  sectionTitle: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: '1rem',
    borderBottom: '4px solid #3B82F6',
    paddingBottom: '0.75rem',
  },
  
  sectionDescription: {
    fontSize: '1.125rem',
    color: '#64748B',
    marginBottom: '2rem',
    lineHeight: '1.7',
  },
  
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    marginTop: '30px',
  },
  
  overviewCard: {
    backgroundColor: '#F8FAFC',
    padding: '35px 30px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    border: '2px solid #E2E8F0',
    transition: 'all 0.3s ease',
    cursor: 'default',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  overviewCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
    borderColor: '#3B82F6',
  },
  
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  
  cardNumber: {
    fontSize: '3rem',
    fontWeight: '900',
    lineHeight: '1.1',
    marginBottom: '12px',
    wordBreak: 'break-word',
  },
  
  cardLabel: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  
  cardSublabel: {
    fontSize: '0.95rem',
    color: '#6B7280',
    fontWeight: '500',
  },
  
  chartContainer: {
    backgroundColor: '#FAFAFA',
    padding: '30px 20px',
    borderRadius: '15px',
    marginTop: '25px',
    border: '1px solid #E5E7EB',
  },
  
  impactSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '35px',
  },
  
  impactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '25px',
    backgroundColor: '#F0F9FF',
    borderRadius: '15px',
    border: '1px solid #BAE6FD',
  },
  
  impactIcon: {
    fontSize: '3rem',
    flexShrink: 0,
  },
  
  industryAnalysis: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#F8FAFC',
    borderRadius: '15px',
    border: '1px solid #E2E8F0',
  },
  
  analysisTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '25px',
  },
  
  industryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
  },
  
  industryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  
  industryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  
  industryName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1E293B',
    margin: 0,
  },
  
  riskBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  industryStats: {
    fontSize: '1rem',
    color: '#374151',
    marginBottom: '12px',
  },
  
  industryInsights: {
    fontSize: '0.95rem',
    color: '#64748B',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  
  threatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  
  threatCard: {
    backgroundColor: '#F8FAFC',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    border: '2px solid #E2E8F0',
    transition: 'all 0.3s ease',
  },
  
  threatIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
  },
  
  threatNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: '15px',
  },
  
  footer: {
    backgroundColor: '#1E293B',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    marginTop: '60px',
  },
  
  footerContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  footerText: {
    fontSize: '1rem',
    marginBottom: '15px',
    lineHeight: '1.6',
    opacity: 0.9,
  },
  
  footerMeta: {
    fontSize: '0.9rem',
    opacity: 0.7,
  },
  
  footerLink: {
    color: '#3B82F6',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  
  // Responsive styles
  '@media (max-width: 768px)': {
    pageTitle: {
      fontSize: '2.5rem',
    },
    section: {
      margin: '20px 10px',
      padding: '25px 20px',
    },
    overviewGrid: {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
    cardNumber: {
      fontSize: '2.5rem',
    },
    industryGrid: {
      gridTemplateColumns: '1fr',
    },
    threatGrid: {
      gridTemplateColumns: '1fr',
    },
  },
};
