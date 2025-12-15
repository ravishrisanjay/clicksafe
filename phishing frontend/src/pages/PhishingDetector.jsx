import React, { useState, useRef, useEffect } from 'react';

export default function PhishingDetector() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your CyberGuard AI. 🛡️\n\nPaste a suspicious message or text below, and I'll analyze it for phishing patterns using my heuristic engine."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const userText = inputText; 
    
    // 1. Add User Message to UI
    const newUserMsg = {
      id: Date.now(),
      type: 'user',
      text: userText,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      // 2. Prepare Auth Token
      const token = localStorage.getItem('token');

      // 3. Call the REAL Backend API
      const response = await fetch('http://localhost:8080/api/detector/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Secure call
        },
        body: JSON.stringify({ 
          text: userText,
          imageUrl: "" // Image logic can be added later
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();

      // 4. Format the Bot Response
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: `**${data.verdict}**\n\n${data.message}`
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Analysis failed:", error);
      
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: "⚠️ **Connection Error**\n\nI couldn't reach the analysis server. Please ensure your backend (port 8080) is running."
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-brand-500/30 flex items-center justify-center p-4">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-4xl bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl shadow-2xl flex flex-col h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-cyber-700 bg-cyber-900/50 flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-cyber-800 rounded-full flex items-center justify-center border border-cyber-600 shadow-glass">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-cyber-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Phishing Detection AI</h1>
            <p className="text-xs text-brand-400 font-mono">SYSTEM_ONLINE // READY_TO_SCAN</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-cyber-900/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                  msg.type === 'user' 
                    ? 'bg-brand-600 border-brand-400 text-white' 
                    : 'bg-cyber-800 border-cyber-600 text-emerald-400'
                }`}>
                  {msg.type === 'user' ? '👤' : '🛡️'}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl shadow-md text-sm leading-relaxed whitespace-pre-wrap border ${
                  msg.type === 'user' 
                    ? 'bg-brand-600/90 text-white rounded-tr-none border-brand-500' 
                    : 'bg-cyber-800/80 text-slate-200 rounded-tl-none border-cyber-700'
                }`}>
                  {msg.image && (
                    <img src={msg.image} alt="User upload" className="max-w-full rounded-lg mb-3 border border-white/20" />
                  )}
                  {/* Render bold text properly */}
                  {msg.text.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index} className={msg.type === 'bot' ? 'text-white' : ''}>{part}</strong> : part
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-cyber-800 border border-cyber-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 ml-11">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-cyber-900 border-t border-cyber-700">
          
          {selectedImage && (
            <div className="mb-3 p-2 bg-cyber-800 rounded-lg flex items-center justify-between border border-cyber-700 mx-1">
              <span className="text-xs text-brand-400 truncate max-w-[200px] flex items-center gap-2">
                📷 {selectedImage.name}
              </span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-red-400 hover:bg-red-500/10 p-1 rounded-full text-xs transition-colors"
              >
                ✕ Remove
              </button>
            </div>
          )}
          
          <form onSubmit={handleSend} className="flex items-end gap-2">
            {/* Image Upload Button */}
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <label 
                htmlFor="image-upload"
                className="p-3.5 text-slate-400 hover:text-brand-400 hover:bg-cyber-800 rounded-xl cursor-pointer transition-all border border-transparent hover:border-cyber-700 flex items-center justify-center"
                title="Upload Screenshot"
              >
                📷
              </label>
            </div>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious text here..."
              className="flex-1 bg-cyber-800 border border-cyber-700 text-white placeholder-slate-500 text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !selectedImage}
              className="p-3.5 bg-brand-600 text-white rounded-xl hover:bg-brand-500 disabled:opacity-50 disabled:bg-cyber-700 disabled:cursor-not-allowed transition-all shadow-glow active:scale-95"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}