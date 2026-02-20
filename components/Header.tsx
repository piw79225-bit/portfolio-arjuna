
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, isAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'hero' ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('hero')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <span className="text-slate-950 font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-xl font-bold tracking-tighter glow-text">LAB<span className="text-cyan-400">ID</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-500/80 mono">Tech Laboratory</p>
            </div>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const viewKey = link.href.replace('#', '');
            const isActive = currentView === viewKey || (viewKey === 'projects' && currentView === 'works');
            return (
              <button 
                key={link.href} 
                onClick={() => onNavigate(viewKey === 'projects' ? 'works' : viewKey)}
                className={`text-xs font-bold transition-all uppercase tracking-widest mono border-b-2 py-1 ${
                  isActive 
                  ? 'text-cyan-400 border-cyan-500 shadow-[0_5px_10px_-5px_rgba(34,211,238,0.5)]' 
                  : 'text-slate-400 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <button 
          onClick={() => window.location.hash = isAdmin ? 'dashboard' : 'admin'}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all uppercase tracking-[0.2em] text-[10px] font-black mono group ${
            isAdmin ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAdmin ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {isAdmin ? 'Lab Console' : 'Admin Console'}
        </button>
      </div>
    </header>
  );
};

export default Header;
