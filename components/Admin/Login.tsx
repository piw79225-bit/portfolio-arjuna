
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating authentication delay for "cool" effect
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        onLogin(true);
      } else {
        setError('AKSES DITOLAK: Kredensial Tidak Dikenali');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 animated-grid p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-md w-full glass p-10 rounded-[2rem] border-cyan-500/30 shadow-2xl relative z-10 transition-all">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-cyan-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group hover:rotate-12 transition-transform">
            <i className="fa-solid fa-user-shield text-slate-950 text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black text-white glow-text mb-2 tracking-tighter uppercase">Lab Otorisasi</h2>
          <p className="text-slate-500 mono text-[10px] uppercase tracking-[0.3em]">Administrator Level Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase mono tracking-widest ml-1">ID Personel</label>
            <div className="relative">
               <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
               <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                placeholder="Username"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-cyan-500 uppercase mono tracking-widest ml-1">Kunci Keamanan</label>
            <div className="relative">
              <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              <p className="text-red-500 text-[10px] mono text-center uppercase font-bold tracking-wider">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-2xl hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/10 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <>
                <i className="fa-solid fa-fingerprint"></i>
                Inisialisasi Sesi
              </>
            )}
          </button>
        </form>
        
        <button 
          onClick={() => window.location.hash = ''}
          className="w-full mt-6 text-slate-600 hover:text-cyan-500 text-[10px] mono py-2 transition-colors uppercase tracking-widest"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Terminal Utama
        </button>
      </div>
    </div>
  );
};

export default Login;
