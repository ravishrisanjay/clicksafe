import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AwarenessLinkService from '../services/AwarenessLinkService';

const profileOptions = [
  'https://www.w3schools.com/howto/img_avatar.png',
  'https://www.w3schools.com/howto/img_avatar2.png',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/lego/6.jpg'
];

export default function Profile() {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', about: '', email: '', profileImageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Stats State
  const [linkStats, setLinkStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
    expiredLinks: 0,
    recentLinks: []
  });
  const [statsLoading, setStatsLoading] = useState(false);

  const BACKEND_URL = 'http://localhost:8080/api/user/profile';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfileData();
      fetchLinkStatistics();
    }
  }, [editing, token, isAuthenticated]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BACKEND_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUser(data);
      setForm({
        name: data.name || '',
        about: data.about || '',
        email: data.email || '',
        profileImageUrl: data.profileImageUrl || profileOptions[0]
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLinkStatistics = async () => {
    if (!isAuthenticated) return;
    setStatsLoading(true);
    try {
      const response = await AwarenessLinkService.getUserLinks();
      if (response.success && response.links) {
        const links = response.links;
        const now = new Date();
        const activeLinks = links.filter(link => link.isActive && new Date(link.expiresAt) > now && link.currentClicks < link.maxClicks);
        const expiredLinks = links.length - activeLinks.length;
        const totalClicks = links.reduce((sum, link) => sum + link.currentClicks, 0);
        
        setLinkStats({
          totalLinks: links.length,
          totalClicks,
          activeLinks: activeLinks.length,
          expiredLinks,
          recentLinks: links.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Error fetching link statistics:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setUser(data);
      setEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = { facebook: '📘', instagram: '📷', netflix: '🎬', amazon: '📦', google: '🌐' };
    return icons[platform?.toLowerCase()] || '🔗';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-900 text-white">
        <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400">Loading Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HEADER */}
      <div className="relative bg-cyber-900 border-b border-cyber-700 py-12 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={user.profileImageUrl || profileOptions[0]} 
              alt="Profile" 
              className="relative w-32 h-32 rounded-full border-4 border-cyber-800 object-cover shadow-2xl"
            />
            {editing && (
              <div className="absolute bottom-0 right-0 bg-brand-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-brand-400 transition-colors">
                📷
              </div>
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.name || 'Cyber Defender'}</h1>
            <p className="text-brand-400 font-mono text-sm mb-4">{user.email}</p>
            <p className="text-slate-400 max-w-2xl">{user.about || "No bio provided yet."}</p>
          </div>
          <div className="flex gap-4">
            {!editing ? (
              <button 
                onClick={() => setEditing(true)}
                className="px-6 py-2.5 bg-cyber-800 hover:bg-cyber-700 border border-cyber-600 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                >
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        
        {/* 2. LEFT COLUMN: EDIT FORM / STATS */}
        <div className="lg:col-span-1 space-y-8">
          
          {editing && (
            <div className="bg-cyber-900/50 border border-cyber-700 rounded-2xl p-6 shadow-glass animate-fade-in">
              <h3 className="text-white font-bold mb-4">Update Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-cyber-800 border border-cyber-600 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Bio</label>
                  <textarea 
                    value={form.about} 
                    onChange={e => setForm({...form, about: e.target.value})}
                    rows={4}
                    className="w-full bg-cyber-800 border border-cyber-600 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Avatar</label>
                  <div className="grid grid-cols-5 gap-2">
                    {profileOptions.map((url, i) => (
                      <img 
                        key={i} 
                        src={url} 
                        onClick={() => setForm({...form, profileImageUrl: url})}
                        className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all ${form.profileImageUrl === url ? 'border-brand-500 scale-110' : 'border-transparent hover:border-slate-500'}`}
                        alt="avatar option"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-cyber-900/50 border border-cyber-700 rounded-2xl p-6 shadow-glass">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="text-brand-500">📊</span> Campaign Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cyber-800/50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-white">{linkStats.totalLinks}</div>
                <div className="text-xs text-slate-500 uppercase">Total Links</div>
              </div>
              <div className="bg-cyber-800/50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-brand-400">{linkStats.totalClicks}</div>
                <div className="text-xs text-slate-500 uppercase">Total Clicks</div>
              </div>
              <div className="bg-cyber-800/50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-emerald-400">{linkStats.activeLinks}</div>
                <div className="text-xs text-slate-500 uppercase">Active</div>
              </div>
              <div className="bg-cyber-800/50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-slate-400">{linkStats.expiredLinks}</div>
                <div className="text-xs text-slate-500 uppercase">Expired</div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. RIGHT COLUMN: RECENT ACTIVITY */}
        <div className="lg:col-span-2">
          <div className="bg-cyber-900/50 border border-cyber-700 rounded-2xl p-8 shadow-glass">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Recent Campaigns</h3>
              <button 
                onClick={fetchLinkStatistics}
                className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="space-y-4">
              {linkStats.recentLinks.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="text-4xl mb-3">📭</div>
                  <p>No campaigns created yet.</p>
                </div>
              ) : (
                linkStats.recentLinks.map((link, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-cyber-800/30 border border-cyber-700 rounded-xl hover:bg-cyber-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyber-900 rounded-full flex items-center justify-center text-2xl border border-cyber-700">
                        {getPlatformIcon(link.platformType)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white capitalize">{link.platformType} Simulation</h4>
                        <p className="text-xs text-slate-500">Created: {new Date(link.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-brand-400 font-bold text-lg">{link.currentClicks} <span className="text-slate-500 text-sm font-normal">clicks</span></div>
                      <div className={`text-xs font-bold ${link.isActive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {link.isActive ? '● ACTIVE' : '● EXPIRED'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}