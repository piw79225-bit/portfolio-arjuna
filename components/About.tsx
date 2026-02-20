import React from 'react';
import { SiteSettings } from '../types';

interface AboutProps {
  settings: SiteSettings['about'];
}

const About: React.FC<AboutProps> = ({ settings }) => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass p-2">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Arjuna" 
                  className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 p-8 glass rounded-3xl border-cyan-500/20 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-cyan-400">01</div>
                <div className="w-[1px] h-10 bg-slate-700"></div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mono">Unified<br/>Portfolio</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-sm font-bold tracking-[0.4em] text-cyan-500 uppercase mono mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-cyan-500"></span> {settings.sectionTitle}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black mb-10 text-white leading-tight uppercase tracking-tighter">
              {settings.title} <span className="text-cyan-400 italic glow-text">{settings.highlight}</span>
            </h3>
            
            <div className="space-y-8 text-slate-400 leading-relaxed text-xl font-light">
              {settings.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-slate-900">
              {settings.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500 mono">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;