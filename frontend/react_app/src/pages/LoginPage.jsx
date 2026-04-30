import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'magic_link'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDevBypass = () => {
    // Force a page reload and set a fake token in localStorage or just let AuthContext know
    // Actually, setting a fake session in localStorage might not trigger Supabase context.
    // Instead, we can just redirect to dashboard, but ProtectedRoute checks useAuth().user.
    // Let's add a fake user to localStorage and update AuthContext, or just instruct the user.
    localStorage.setItem('agrix_dev_bypass', 'true');
    window.location.href = '/';
  };

  const handleAuth = async (e, action = 'login') => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    let result;
    
    if (authMode === 'magic_link') {
      result = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/' },
      });
      if (result.error) setMessage({ type: 'error', text: result.error.message });
      else setMessage({ type: 'success', text: 'Check your email for the magic link!' });
    } else {
      if (action === 'login') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error.message });
      } else {
        if (action === 'signup') {
          setMessage({ type: 'success', text: 'Registration successful! You can now log in.' });
        }
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/50 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/50 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-200/50 rounded-3xl z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 text-center tracking-tight mb-2">Welcome to AgriX</h2>
        <p className="text-slate-500 text-center mb-8 font-medium">Log in to your intelligence platform.</p>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            {message.text}
          </div>
        )}

        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button 
            type="button"
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'password' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Password
          </button>
          <button 
            type="button"
            onClick={() => setAuthMode('magic_link')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'magic_link' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Magic Link
          </button>
        </div>

        <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 bg-white/50"
              placeholder="farmer@domain.com"
            />
          </div>

          {authMode === 'password' && (
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 bg-white/50"
                placeholder="••••••••"
              />
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                authMode === 'password' ? 'Sign In' : 'Send Magic Link'
              )}
            </button>
            
            {authMode === 'password' && (
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleAuth(e, 'signup')}
                className="w-full py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                Create Account
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={handleDevBypass}
            className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-2 border border-emerald-200"
          >
            Skip Login (Dev Mode)
          </button>
        </div>

        <p className="mt-6 text-center text-sm font-medium text-slate-500">
          Secure authentication by Supabase.
        </p>
      </motion.div>
    </div>
  );
}
