import React, { useState } from 'react';
import { Project, SiteSettings } from '../types';

interface ProjectsProps {
  projects: Project[];
  config: SiteSettings['works'];
}

const Projects: React.FC<ProjectsProps> = ({ projects, config }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewingHtml, setViewingHtml] = useState<string | null>(null);

  const filtered = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="py-20 bg-slate-950/20 animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.4em] text-cyan-500 uppercase mono mb-4">{config.sectionSubtitle}</h2>
          <h3 className="text-4xl md:text-7xl font-black text-white glow-text uppercase tracking-tighter">{config.sectionTitle}</h3>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mt-8"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', 'AI Specialist', 'Tech Educator', 'Digital Architect'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                activeFilter === cat 
                ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((project) => (
            <div key={project.id} className="group relative glass rounded-3xl overflow-hidden border-slate-800 hover:border-cyan-500/40 transition-all duration-700">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-6 right-8">
                   <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-black uppercase tracking-widest mono border border-cyan-500/30">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-10">
                <h4 className="text-3xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                  {project.title}
                </h4>
                <p className="text-slate-400 mb-8 text-lg leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500 mono uppercase tracking-wider bg-slate-950/50 px-3 py-1 rounded-md border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    {project.htmlContent && (
                      <button 
                        onClick={() => setViewingHtml(project.htmlContent || null)}
                        className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] group/btn"
                      >
                        <span>Live Demo</span>
                        <i className="fa-solid fa-laptop-code group-hover/btn:scale-110 transition-transform"></i>
                      </button>
                    )}
                    {project.link ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] group/btn"
                      >
                        <span>Lihat Projek</span>
                        <i className="fa-solid fa-arrow-right-long group-hover/btn:translate-x-3 transition-transform"></i>
                      </a>
                    ) : (
                      !project.htmlContent && (
                        <button className="flex items-center gap-2 text-slate-600 text-xs font-black uppercase tracking-[0.2em] cursor-not-allowed">
                          <span>No Link</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HTML Preview Modal */}
      {viewingHtml && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <div className="relative w-full h-full glass rounded-[2.5rem] border-cyan-500/30 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-slate-950 font-black">DEMO</div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm">Live Preview Mode</h4>
                  <p className="text-[10px] text-cyan-500 mono">SANDBOX_ENVIRONMENT_ACTIVE</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingHtml(null)}
                className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="flex-1 bg-white">
              <iframe 
                srcDoc={viewingHtml} 
                title="Portfolio Preview" 
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;