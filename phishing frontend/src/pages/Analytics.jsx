import React, { useState } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid 
} from 'recharts';

// Data matched to the new color palette
const phishingData = [
  { month: 'Jan', scams: 320000, blocked: 280000 },
  { month: 'Feb', scams: 410000, blocked: 360000 },
  { month: 'Mar', scams: 380000, blocked: 340000 },
  { month: 'Apr', scams: 450000, blocked: 410000 },
  { month: 'May', scams: 470000, blocked: 430000 },
];

const awarenessData = [
  { name: 'Visited Site', value: 500000, color: '#3b82f6' }, // brand-500
  { name: 'Completed Learning', value: 210000, color: '#10b981' }, // safe
  { name: 'Shared With Others', value: 120000, color: '#f59e0b' }, // amber
];

const industryData = [
  { name: 'Finance', attacks: 2210000, risk: 'Critical' },
  { name: 'Healthcare', attacks: 1800000, risk: 'High' },
  { name: 'Retail', attacks: 1500000, risk: 'High' },
  { name: 'Edu', attacks: 1140000, risk: 'Medium' },
  { name: 'Gov', attacks: 1020000, risk: 'High' },
  { name: 'Tech', attacks: 890000, risk: 'Medium' },
];

export default function Analytics() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Custom Tooltip for Dark Mode Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-900 border border-cyber-700 p-4 rounded-xl shadow-xl">
          <p className="font-bold text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HEADER */}
      <div className="relative pt-16 pb-12 px-6 text-center">
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] -z-10"></div>
         
         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
           Global Threat <span className="bg-gradient-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">Intelligence</span>
         </h1>
         <p className="text-lg text-slate-400 max-w-2xl mx-auto">
           Real-time telemetry and awareness impact analysis for 2025.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-8">
        
        {/* 2. OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              number: '3.5M+', label: 'Total Attacks', sub: '▲ 16.5%', 
              icon: '🚨', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' 
            },
            { 
              number: '89%', label: 'Detection Rate', sub: '▲ 5.0%', 
              icon: '🎯', color: 'text-safe', bg: 'bg-safe/10', border: 'border-safe/20' 
            },
            { 
              number: '$18.7B', label: 'Est. Losses', sub: '▲ 12.1%', 
              icon: '💰', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' 
            },
            { 
              number: '1.2M', label: 'Users Protected', sub: '▲ 20.2%', 
              icon: '🛡️', color: 'text-brand-500', bg: 'bg-brand-500/10', border: 'border-brand-500/20' 
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden bg-cyber-900/50 backdrop-blur-md border ${item.border} p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group`}
            >
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl grayscale group-hover:grayscale-0`}>
                {item.icon}
              </div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${item.bg} ${item.color} text-2xl`}>
                {item.icon}
              </div>
              <div className={`text-3xl font-extrabold text-white mb-1`}>{item.number}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">{item.label}</div>
              <div className={`text-xs font-bold mt-2 ${item.color}`}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* 3. CHART: ATTACK TRENDS */}
          <div className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 p-8 rounded-3xl shadow-glass">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-danger rounded-full"></span>
                Attack Volume vs. Blocked
              </h2>
              <p className="text-sm text-slate-400 ml-4">Monthly threat interception metrics</p>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={phishingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScams" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `${value / 1000}K`} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="scams" stroke="#ef4444" strokeWidth={3} fill="url(#colorScams)" name="Total Attacks" />
                  <Area type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={3} fill="url(#colorBlocked)" name="Blocked" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. CHART: AWARENESS IMPACT */}
          <div className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 p-8 rounded-3xl shadow-glass flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-brand-500 rounded-full"></span>
                Awareness Conversion
              </h2>
              <p className="text-sm text-slate-400 ml-4">User engagement funnel statistics</p>
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="h-[250px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={awarenessData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {awarenessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend/Stats */}
              <div className="w-full md:w-1/2 space-y-4">
                {awarenessData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-cyber-800 rounded-xl border border-cyber-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-bold text-white">{(item.value / 1000)}K</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 5. INDUSTRIES & THREATS */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Industry Risk Chart */}
          <div className="lg:col-span-2 bg-cyber-900/50 backdrop-blur-md border border-cyber-700 p-8 rounded-3xl shadow-glass">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                  Targeted Industries
                </h2>
                <p className="text-sm text-slate-400 ml-4">Sectors with highest attack volume</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
                  <Bar dataKey="attacks" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40}>
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.risk === 'Critical' ? '#ef4444' : entry.risk === 'High' ? '#f97316' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Threat Landscape Cards */}
          <div className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 p-8 rounded-3xl shadow-glass">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                Active Threats
             </h2>
             <div className="space-y-4">
               {[
                 { name: 'Email Phishing', val: '45%', icon: '📧', trend: 'steady' },
                 { name: 'SMS Smishing', val: '25%', icon: '📱', trend: 'up' },
                 { name: 'Social Eng.', val: '20%', icon: '🎭', trend: 'up' },
                 { name: 'AI Deepfakes', val: '10%', icon: '🤖', trend: 'rapid' }
               ].map((threat, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-cyber-800/50 rounded-2xl border border-cyber-700 hover:bg-cyber-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{threat.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{threat.name}</div>
                        <div className="text-xs text-slate-500">
                          {threat.trend === 'up' && '↗ Trending Up'}
                          {threat.trend === 'rapid' && '↑ Rapid Growth'}
                          {threat.trend === 'steady' && '→ Steady'}
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-black text-slate-200">{threat.val}</div>
                 </div>
               ))}
             </div>
          </div>

        </div>

        {/* 6. FOOTER */}
        <div className="border-t border-cyber-700 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            Data compiled from global threat intelligence feeds and ClickSafe telemetry.
            <br className="hidden md:block"/>
            Last updated: <span className="text-brand-500">August 2025</span>
          </p>
        </div>

      </div>
    </div>
  );
}