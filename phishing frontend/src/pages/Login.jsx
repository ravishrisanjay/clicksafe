import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLogin
      ? 'http://localhost:8080/api/auth/login'
      : 'http://localhost:8080/api/users/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        if (isLogin) {
          const data = await response.json();
          login(data.token);
          navigate(from, { replace: true });
        } else {
          alert('Registration successful! Please login.');
          setIsLogin(true);
        }
      } else {
        const errorText = await response.text();
        alert((isLogin ? 'Login' : 'Signup') + ' failed: ' + errorText);
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans text-slate-300 selection:bg-brand-500/30 p-6">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="w-full max-w-md bg-cyber-900/80 backdrop-blur-xl border border-cyber-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyber-800 rounded-full mb-6 border border-cyber-700 shadow-glass">
            <span className="text-4xl animate-float">🛡️</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join the Defense'}
          </h2>
          <p className="text-slate-400">
            {isLogin
              ? 'Enter your credentials to access the secure dashboard.'
              : 'Create an account to start your cybersecurity training.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white ml-1">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">👤</span>
              <input
                type="text"
                placeholder="CyberSentinel"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-cyber-900 border border-cyber-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-white ml-1">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-cyber-900 border border-cyber-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-cyber-800 disabled:text-slate-500 text-white font-bold rounded-xl shadow-glow transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Authenticating...
              </>
            ) : (
              <>
                {isLogin ? '🔓 Unlock Dashboard' : '🚀 Create Account'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-cyber-700">
          <p className="text-slate-400 text-sm">
            {isLogin ? "New to ClickSafe? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-400 hover:text-brand-300 font-bold ml-1 transition-colors hover:underline"
            >
              {isLogin ? 'Start Training Now' : 'Login Securely'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;