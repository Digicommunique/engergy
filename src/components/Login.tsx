import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Battery } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@enersys.erp');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (email === 'admin@enersys.erp' && password === '12345678') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 1200);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Panel - Branding */}
      <div className="md:w-1/2 industrial-gradient flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center"
        >
          <div className="bg-brand-electric/20 p-6 rounded-3xl inline-block mb-8 backdrop-blur-md border border-white/10">
            <Battery className="w-16 h-16 text-brand-electric" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">EnerSys ERP</h1>
          <p className="text-xl text-blue-100/80 font-light">Powering Smart Battery Manufacturing</p>
        </motion.div>
        
        {/* Subtle animated background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-electric/10 rounded-full blur-[120px]" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-main">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-md glass-card p-10"
        >
          <h2 className="text-2xl font-bold text-brand-navy mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Enter your credentials to access the ERP</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-steel focus:border-brand-steel outline-none transition-all placeholder:text-gray-400"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-sm font-medium text-brand-steel hover:underline">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-steel focus:border-brand-steel outline-none transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-brand-electric hover:bg-brand-electric-hover text-white py-3.5 rounded-lg font-semibold transition-all shadow-md shadow-brand-electric/20 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
             <button type="button" className="text-sm text-gray-500 hover:text-brand-steel transition-colors">
               Contact System Administrator
             </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <p className="text-gray-400 text-xs text-center">
          © 2026 Digital Communique Private Limited. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
