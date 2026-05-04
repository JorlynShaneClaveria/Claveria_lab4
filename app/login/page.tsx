'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setMessage('');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: username } }
      });
      if (error) setMessage(error.message);
      else if (!data.session) setMessage('Check your email to verify your account.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    }
  };

  if (loading) return null;

  // --- LOGGED IN VIEW ---
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef9c3] p-4 font-sans text-slate-800">
        <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-[40px] p-12 text-center border border-black/5 shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Welcome!</h1>
          <p className="text-slate-600 mb-8 font-medium">
            Logged in as {user.user_metadata?.display_name || user.email}
          </p>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  // --- LOGIN / SIGNUP FORM ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef9c3] p-4 font-sans">
      <div className="w-full max-w-lg bg-white/40 backdrop-blur-lg rounded-[40px] p-10 md:p-16 border border-white/60 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Machine Learning Hub
          </h1>
          <p className="text-slate-600 font-medium">
            {isSignUp ? 'Create your account' : 'Login to continue'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-5 py-4 bg-white/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-5 py-4 bg-white/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-5 py-4 bg-white/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            required 
          />

          <button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 text-lg mt-4"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        {message && (
          <div className="mt-6 p-3 rounded-xl text-sm text-center bg-white/20 text-slate-700 border border-black/5 font-medium">
            {message}
          </div>
        )}

        <div className="mt-8 text-center text-slate-600 text-sm font-medium">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }} 
            className="text-slate-900 hover:underline font-bold ml-1 transition-colors"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}