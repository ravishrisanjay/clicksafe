import React, { useEffect, useState } from 'react';
import AwarenessLinkService from '../services/AwarenessLinkService';

export default function LinkManager() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserLinks();
  }, []);

  const fetchUserLinks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await AwarenessLinkService.getUserLinks();
      if (response.success) {
        setLinks(response.links || []);
      } else {
        setError('Failed to fetch links: ' + response.message);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      setError('Error loading links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (linkUrl) => {
    navigator.clipboard.writeText(linkUrl).then(() => {
      alert('Link copied to clipboard! 📋');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  const shareViaEmail = (linkUrl) => {
    const subject = encodeURIComponent('🛡️ Test Your Cybersecurity Skills!');
    const body = encodeURIComponent(
      `Hi! I've been learning about cybersecurity and wanted to share this educational simulation with you.\n\nClick here to test your ability to spot phishing attempts: ${linkUrl}\n\nThis is a safe, educational tool designed to help people recognize online scams.\n\nStay safe online!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const getStatusBadge = (link) => {
    const now = new Date();
    const expiryDate = new Date(link.expiresAt);
    const isExpired = !link.isActive || now > expiryDate || link.currentClicks >= link.maxClicks;

    if (isExpired) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Active
      </span>
    );
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'facebook': '📘',
      'instagram': '📷',
      'netflix': '🎬',
      'amazon': '📦',
      'google': '🌐'
    };
    return icons[platform?.toLowerCase()] || '🔗';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading your campaigns...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-cyber-900/50 p-6 rounded-2xl border border-cyber-700 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">📊</span> Campaign Manager
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track and manage your active simulations.</p>
        </div>
        <button 
          onClick={fetchUserLinks}
          className="px-4 py-2 bg-cyber-800 hover:bg-cyber-700 text-white rounded-lg border border-cyber-600 transition-all text-sm font-medium flex items-center gap-2"
        >
          <span>🔄</span> Refresh Data
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Grid Content */}
      {links.length === 0 ? (
        <div className="text-center py-16 bg-cyber-800/20 rounded-2xl border-2 border-dashed border-cyber-700">
          <div className="text-5xl mb-4 opacity-50">🔗</div>
          <h3 className="text-xl font-bold text-white mb-2">No Links Generated Yet</h3>
          <p className="text-slate-400 mb-6">Create your first simulation to start tracking results.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <div key={link.id} className="bg-cyber-900/80 backdrop-blur-sm border border-cyber-700 rounded-xl p-5 hover:border-brand-500/30 transition-all group">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyber-800 rounded-lg flex items-center justify-center text-xl border border-cyber-600">
                    {getPlatformIcon(link.platformType)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white capitalize">{link.platformType}</h3>
                    <p className="text-xs text-slate-500">ID: {link.id.toString().slice(-4)}</p>
                  </div>
                </div>
                {getStatusBadge(link)}
              </div>

              {/* URL Input */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  value={`http://localhost:8080/awareness/${link.token}`}
                  readOnly
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-lg py-2 px-3 text-xs text-slate-400 font-mono focus:border-brand-500 focus:text-brand-400 outline-none transition-colors cursor-pointer"
                  onClick={(e) => e.target.select()}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-cyber-800/50 p-2 rounded-lg">
                  <div className="text-xs text-slate-500">Clicks</div>
                  <div className="font-bold text-white">{link.currentClicks}/{link.maxClicks}</div>
                </div>
                <div className="bg-cyber-800/50 p-2 rounded-lg">
                  <div className="text-xs text-slate-500">Created</div>
                  <div className="font-bold text-white text-xs py-1">
                    {new Date(link.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                  </div>
                </div>
                <div className="bg-cyber-800/50 p-2 rounded-lg">
                  <div className="text-xs text-slate-500">Expires</div>
                  <div className="font-bold text-white text-xs py-1">
                    {new Date(link.expiresAt).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(`http://localhost:8080/awareness/${link.token}`)}
                  className="flex-1 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>📋</span> Copy
                </button>
                <button
                  onClick={() => shareViaEmail(`http://localhost:8080/awareness/${link.token}`)}
                  className="flex-1 py-2 bg-cyber-700 hover:bg-cyber-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-cyber-600"
                >
                  <span>📧</span> Share
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}