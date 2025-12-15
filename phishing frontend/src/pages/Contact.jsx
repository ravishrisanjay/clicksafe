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
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30">
      
      {/* 1. HERO HEADER */}
      <div className="relative pt-20 pb-12 px-6 text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex justify-center items-center gap-4">
          <span className="text-5xl animate-float">📬</span> 
          Get in <span className="bg-gradient-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Have questions about cybersecurity? Need help identifying a threat? 
          Our security experts are ready to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-12">
        
        {/* 2. MAIN CONTACT FORM (Left Side) */}
        <div className="lg:col-span-2">
          <div className="bg-cyber-900/50 backdrop-blur-md border border-cyber-700 rounded-3xl p-8 md:p-10 shadow-glass">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send Secure Message</h2>
              <p className="text-slate-400">Fill out the form below. We typically respond within 24 hours.</p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-safe/10 border border-safe/20 rounded-xl flex items-center gap-4 animate-fade-in">
                <div className="w-10 h-10 bg-safe/20 rounded-full flex items-center justify-center text-xl">✅</div>
                <div>
                  <h3 className="text-white font-bold">Message Encrypted & Sent!</h3>
                  <p className="text-safe text-sm">Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white ml-1">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="phishing-report">Report Phishing Attempt</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="training">Training Request</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you stay safe?"
                  required
                  rows={6}
                  className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-cyber-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-glow transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Encrypting & Sending...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Send Secure Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 3. SIDEBAR INFO (Right Side) */}
        <div className="space-y-8">
          
          {/* Contact Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Direct Channels</h3>
            
            {[
              { icon: '📧', title: 'Email Support', info: 'support@clicksafe.org', sub: 'Response in 24h' },
              { icon: '📞', title: 'Phone Support', info: '+1-800-CLICKSAFE', sub: 'Mon-Fri, 9AM-6PM' },
              { icon: '🚨', title: 'Emergency', info: '+1-800-CYBER-911', sub: '24/7 Threat Response' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-cyber-800/50 border border-cyber-700 rounded-xl hover:bg-cyber-800 hover:border-brand-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-cyber-900 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-brand-400 font-mono text-sm">{item.info}</p>
                  <p className="text-slate-500 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion Style */}
          <div className="bg-cyber-800/30 p-6 rounded-2xl border border-cyber-700">
            <h3 className="text-xl font-bold text-white mb-6">Common Questions</h3>
            <div className="space-y-6">
              {[
                { q: "How fast is the response?", a: "We triage reports within 24 hours. Critical threats get priority." },
                { q: "Can you help with active hacks?", a: "Yes. Use the emergency hotline immediately for active breaches." },
                { q: "Do you offer corporate training?", a: "Absolutely. Contact us for team training packages." }
              ].map((faq, i) => (
                <div key={i}>
                  <h4 className="text-white font-semibold text-sm mb-1">{faq.q}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-brand-900/20 p-4 rounded-xl border border-brand-500/20 flex gap-3 items-start">
            <span className="text-xl">🔒</span>
            <div>
              <h4 className="text-brand-400 font-bold text-sm">Secure Transmission</h4>
              <p className="text-slate-400 text-xs mt-1">
                Your data is encrypted end-to-end. We never share reporter identities with third parties without consent.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}