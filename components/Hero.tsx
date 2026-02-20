import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings['hero'];
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ settings, onNavigate }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= settings.typingText.length) {
        setDisplayText(settings.typingText.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [settings.typingText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse pointer-events-none delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-6 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-10 shadow-inner">
          <span className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase mono">Laboratorium Teknologi ID — v3.5</span>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-none">
          <span className="block text-slate-600 text-3xl md:text-5xl font-light mb-6 mono tracking-[0.2em] opacity-40">Explorer:</span>
          <span className="block glow-text text-white uppercase italic hover:not-italic transition-all duration-700 cursor-default">
            {settings.explorerName}
          </span>
        </h1>

        <div className="h-12 flex items-center justify-center mb-12">
          <p className="text-3xl md:text-5xl font-black text-cyan-400 mono italic tracking-tight">
            <span className="opacity-50">&gt;</span> {displayText}<span className="inline-block w-2 h-10 ml-3 bg-cyan-500 animate-pulse"></span>
          </p>
        </div>

        <p className="max-w-3xl mx-auto text-slate-400 text-xl md:text-2xl mb-16 leading-relaxed font-light opacity-80">
          {settings.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={() => onNavigate('projects')}
            className="group relative px-12 py-5 bg-cyan-500 text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              Jelajahi Projek <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
            </span>
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="px-12 py-5 border border-slate-800 bg-slate-900/40 text-slate-200 font-bold rounded-full hover:bg-slate-800 hover:border-slate-600 transition-all uppercase tracking-widest text-sm backdrop-blur-md"
          >
            Spesifikasi Lab
          </button>
        </div>
      </div>

      {/* Decorative Terminal Elements */}
      <div className="absolute top-10 left-10 opacity-40 hidden md:block">
        <div className="glass p-5 mono text-[10px] text-cyan-500 border-cyan-500/20 rounded-xl">
          <p className="flex justify-between gap-4"><span>SYSTEM:</span> <span className="text-white font-bold">{settings.status}</span></p>
          <p className="flex justify-between gap-4"><span>UPLINK:</span> <span className="text-white font-bold">STABLE</span></p>
          <p className="flex justify-between gap-4"><span>CORE:</span> <span className="text-white font-bold">{settings.coreVersion}</span></p>
          <div className="w-full h-[2px] bg-slate-800 my-2"></div>
          <p className="animate-pulse">_LISTENING_TO_PORT_8080</p>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-30 hidden md:block">
        <div className="text-right mono text-[10px] text-slate-500 font-bold tracking-widest">
          <p>LOC_LAT: -6.2088</p>
          <p>LOC_LONG: 106.8456</p>
          <p className="mt-2 text-cyan-500/50">ID_TECH_LAB_SECURE_NODE</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;