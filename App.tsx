import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Projects from './components/Projects.tsx';
import LabAssistant from './components/LabAssistant.tsx';
import Login from './components/Admin/Login.tsx';
import Dashboard from './components/Admin/Dashboard.tsx';
import { contentService, DEFAULT_SETTINGS, DEFAULT_ROLES } from './services/contentService.ts';
import { PROJECTS as INITIAL_PROJECTS, SKILLS as INITIAL_SKILLS } from './constants.tsx';
import { Skill, Project, SiteSettings, Role } from './types.ts';

const DynamicRoles: React.FC<{ roles: Role[], config: SiteSettings['roles'] }> = ({ roles, config }) => (
  <section className="min-h-[80vh] py-32 bg-slate-950 relative overflow-hidden flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-xs font-bold tracking-[0.5em] text-cyan-500 uppercase mono mb-4 opacity-70">{config.sectionSubtitle}</h2>
        <h3 className="text-4xl md:text-7xl font-black text-white glow-text uppercase tracking-tighter">{config.sectionTitle}</h3>
        <div className="w-20 h-1 bg-cyan-500/30 mx-auto mt-8"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map(role => (
          <div key={role.id} className="glass p-10 rounded-3xl border-slate-800/50 hover:border-cyan-500/40 transition-all duration-500 group">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 text-3xl mb-8 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              <i className={`fa-solid ${role.icon}`}></i>
            </div>
            <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{role.title}</h4>
            <p className="text-slate-400 text-sm font-light leading-relaxed">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DynamicExpertise: React.FC<{ skills: Skill[], config: SiteSettings['expertise'] }> = ({ skills, config }) => (
  <section className="min-h-[80vh] py-32 bg-slate-950 relative flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="container mx-auto px-6">
       <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-[0.6em] text-cyan-500 uppercase mono mb-6 opacity-60">{config.sectionSubtitle}</h2>
          <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter glow-text">{config.sectionTitle}</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(skill => (
            <div key={skill.name} className="glass p-8 rounded-2xl border-slate-800/50 group hover:border-cyan-500/40 transition-all">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <i className={`${skill.icon} text-cyan-500 text-xl`}></i>
                    <h4 className="text-lg font-black text-white uppercase tracking-widest">{skill.name}</h4>
                  </div>
                  <span className="text-xl font-bold text-slate-700 group-hover:text-cyan-500 transition-colors mono">{skill.level}%</span>
               </div>
               <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
               </div>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [view, setView] = useState<'portfolio' | 'login' | 'dashboard' | 'demo'>('portfolio');
  const [demoProject, setDemoProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [works, setWorks] = useState<Project[]>(INITIAL_PROJECTS);
  const [expertise, setExpertise] = useState<Skill[]>(INITIAL_SKILLS);
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const syncWithCloud = async () => {
    try {
      const [fetchedWorks, fetchedExpertise, fetchedRoles, fetchedSettings] = await Promise.all([
        contentService.getWorks(),
        contentService.getExpertise(),
        contentService.getRoles(),
        contentService.getSettings()
      ]);
      setWorks(fetchedWorks);
      setExpertise(fetchedExpertise);
      setRoles(fetchedRoles);
      setSettings(fetchedSettings);
    } catch (err) {
      console.error("Cloud Sync Failed", err);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHash = () => {
    const hash = window.location.hash;
    const path = window.location.pathname;

    if (path.startsWith('/demo/')) {
      const slug = path.split('/demo/')[1];
      const project = works.find(w => w.slug === slug || w.id === slug);
      if (project) {
        setDemoProject(project);
        setView('demo');
        return;
      }
    }

    if (hash === '#admin') setView('login');
    else if (hash === '#dashboard') setView('dashboard');
    else { setView('portfolio'); }
  };

  useEffect(() => {
    const auth = localStorage.getItem('arjuna_lab_auth');
    if (auth === 'true') setIsAdmin(true);
    syncWithCloud();
    
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    handleHash();
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  useEffect(() => {
    handleHash();
  }, [works]);

  if (view === 'demo' && demoProject) {
    const isUrlDemo = demoProject.demoType === 'url' && demoProject.demoUrl;
    
    return (
      <div className="fixed inset-0 bg-black z-[9999] overflow-hidden">
        <iframe 
          src={isUrlDemo ? demoProject.demoUrl : undefined}
          srcDoc={!isUrlDemo ? demoProject.htmlContent : undefined} 
          title={demoProject.title} 
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
        />
        <button 
          onClick={() => { window.location.pathname = '/'; }}
          className="fixed top-6 right-6 w-12 h-12 bg-slate-900/90 text-white rounded-full flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all z-[10000] shadow-2xl border border-white/10"
          title="Tutup Preview"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
    );
  }

  if (view === 'login') return <Login onLogin={(s) => { if(s) { setIsAdmin(true); localStorage.setItem('arjuna_lab_auth', 'true'); window.location.hash = 'dashboard'; } }} />;
  if (view === 'dashboard') return <Dashboard onLogout={() => { setIsAdmin(false); localStorage.removeItem('arjuna_lab_auth'); window.location.hash = ''; }} onUpdate={syncWithCloud} />;

  const renderPage = () => {
    switch (currentSection) {
      case 'hero':
        return <Hero settings={settings.hero} onNavigate={navigateTo} />;
      case 'roles':
        return <div className="pt-20"><DynamicRoles roles={roles} config={settings.roles} /></div>;
      case 'expertise':
        return <div className="pt-20"><DynamicExpertise skills={expertise} config={settings.expertise} /></div>;
      case 'projects':
      case 'works':
        return <div className="pt-20"><Projects projects={works} config={settings.works} /></div>;
      case 'contact':
        return (
          <section className="min-h-screen pt-40 pb-20 bg-slate-950 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-xs font-bold tracking-[0.6em] text-cyan-500 uppercase mono mb-8 opacity-60">{settings.contact.sectionSubtitle}</h2>
              <h2 className="text-6xl md:text-9xl font-black mb-12 italic glow-text uppercase tracking-tighter">Get in <span className="text-cyan-400">Touch</span></h2>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-16 font-light leading-relaxed">
                Ada proyek menarik atau ingin berdiskusi tentang masa depan teknologi? Laboratorium kami selalu terbuka untuk kolaborasi inovatif.
              </p>
              <a href={`mailto:${settings.contact.email}`} className="text-cyan-400 text-2xl md:text-5xl font-black mb-20 block hover:text-white transition-all tracking-tighter uppercase mono break-all">
                {settings.contact.email}
              </a>
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                 <a href={settings.contact.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 px-8 py-4 glass rounded-2xl border-slate-800 hover:border-cyan-500/50 transition-all">
                   <i className="fa-brands fa-linkedin-in text-2xl text-slate-500 group-hover:text-cyan-400"></i>
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white">LinkedIn</span>
                 </a>
                 <a href={settings.contact.github} target="_blank" rel="noreferrer" className="group flex items-center gap-4 px-8 py-4 glass rounded-2xl border-slate-800 hover:border-white transition-all">
                   <i className="fa-brands fa-github text-2xl text-slate-500 group-hover:text-white"></i>
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white">GitHub</span>
                 </a>
                 <a href={settings.contact.instagram} target="_blank" rel="noreferrer" className="group flex items-center gap-4 px-8 py-4 glass rounded-2xl border-slate-800 hover:border-pink-500/50 transition-all">
                   <i className="fa-brands fa-instagram text-2xl text-slate-500 group-hover:text-pink-500"></i>
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white">Instagram</span>
                 </a>
              </div>
            </div>
          </section>
        );
      default:
        return <Hero settings={settings.hero} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      <Header currentView={currentSection} onNavigate={navigateTo} isAdmin={isAdmin} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <footer className="py-12 bg-slate-950 border-t border-slate-900/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-slate-950 shadow-lg shadow-cyan-500/20">A</div>
            <div>
              <p className="text-[10px] text-slate-600 mono uppercase tracking-widest font-bold">{settings.contact.copyright}</p>
              <p className="text-[9px] text-cyan-900 mono uppercase mt-1">Status: Operational — No Critical Errors</p>
            </div>
          </div>
          <nav className="flex gap-8">
            <button onClick={() => navigateTo('hero')} className="text-[10px] text-slate-500 hover:text-cyan-400 font-bold uppercase mono tracking-widest transition-colors">Lab Home</button>
            <button onClick={() => navigateTo('contact')} className="text-[10px] text-slate-500 hover:text-cyan-400 font-bold uppercase mono tracking-widest transition-colors">Direct Uplink</button>
          </nav>
        </div>
      </footer>
      
      <LabAssistant />
    </div>
  );
};

export default App;