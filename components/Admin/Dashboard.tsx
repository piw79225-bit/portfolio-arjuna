
import React, { useState, useEffect } from 'react';
import { Project, Skill, NavLink, SiteSettings, Role } from '../../types';
import { contentService } from '../../services/contentService';

interface DashboardProps {
  onLogout: () => void;
  onUpdate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onUpdate }) => {
  const [works, setWorks] = useState<Project[]>([]);
  const [expertise, setExpertise] = useState<Skill[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'roles' | 'expertise' | 'works' | 'contact'>('roles');
  const [loading, setLoading] = useState(false);
  
  // CRUD Forms
  const [editingId, setEditingId] = useState<string | null>(null);
  const [workForm, setWorkForm] = useState<Partial<Project>>({ title: '', category: 'AI Specialist', description: '', image: '', tags: [], link: '', htmlContent: '', slug: '' });
  const [expertiseForm, setExpertiseForm] = useState<Skill>({ name: '', level: 80, icon: 'fa-solid fa-code' });
  const [roleForm, setRoleForm] = useState<Partial<Role>>({ title: '', description: '', icon: 'fa-solid fa-user-gear' });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    const [w, e, r, s] = await Promise.all([
      contentService.getWorks(),
      contentService.getExpertise(),
      contentService.getRoles(),
      contentService.getSettings()
    ]);
    setWorks(w);
    setExpertise(e);
    setRoles(r);
    setSettings(s);
    setLoading(false);
    onUpdate();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setLoading(true);
    await contentService.saveSettings(settings);
    setLoading(false);
    alert('Konfigurasi Lab Berhasil Diunggah ke Firestore!');
    onUpdate();
  };

  const handleHtmlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setWorkForm({ ...workForm, htmlContent: content });
      alert('File HTML berhasil dimuat ke memori!');
    };
    reader.readAsText(file);
  };
  // CRUD Works
  const handleSaveWork = async () => {
    if (!workForm.title) return;
    setLoading(true);
    const id = editingId || Date.now().toString();
    const slug = workForm.slug || workForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newWork = { ...workForm, id, slug, tags: workForm.tags?.length ? workForm.tags : ['Lab'] } as Project;
    await contentService.saveWork(newWork);
    setWorkForm({ title: '', category: 'AI Specialist', description: '', image: '', tags: [], link: '', htmlContent: '', slug: '' });
    setEditingId(null);
    await refreshData();
  };

  const handleDeleteWork = async (id: string) => {
    if (!confirm("Hapus data eksperimen ini dari database?")) return;
    setLoading(true);
    await contentService.deleteWork(id);
    await refreshData();
  };

  // CRUD Expertise
  const handleSaveExpertise = async () => {
    if (!expertiseForm.name) return;
    setLoading(true);
    await contentService.saveSkill(expertiseForm);
    setExpertiseForm({ name: '', level: 80, icon: 'fa-solid fa-code' });
    setEditingId(null);
    await refreshData();
  };

  const handleDeleteExpertise = async (name: string) => {
    if (!confirm("Hapus keahlian ini?")) return;
    setLoading(true);
    await contentService.deleteSkill(name);
    await refreshData();
  };

  // CRUD Roles
  const handleSaveRole = async () => {
    if (!roleForm.title) return;
    setLoading(true);
    const id = editingId || Date.now().toString();
    const newRole = { ...roleForm, id } as Role;
    await contentService.saveRole(newRole);
    setRoleForm({ title: '', description: '', icon: 'fa-solid fa-user-gear' });
    setEditingId(null);
    await refreshData();
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm("Hapus peran ini?")) return;
    setLoading(true);
    await contentService.deleteRole(id);
    await refreshData();
  };

  if (!settings) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans">
      {/* Sidebar tetap sama */}
      <aside className="w-80 glass border-r border-slate-800/50 p-8 flex flex-col h-screen fixed z-30">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-800/50">
          <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center font-black text-slate-950 shadow-lg shadow-cyan-500/20">A</div>
          <div><span className="block font-black tracking-tighter text-xl glow-text uppercase">Console</span><span className="text-[9px] text-cyan-500 mono uppercase tracking-[0.2em] font-bold">Lab Controller v10</span></div>
        </div>

        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {[
            { id: 'roles', label: '1. Roles', icon: 'fa-user-tag' },
            { id: 'expertise', label: '2. Expertise', icon: 'fa-bolt-lightning' },
            { id: 'works', label: '3. Works', icon: 'fa-briefcase' },
            { id: 'hero', label: 'Hero Section', icon: 'fa-rocket' },
            { id: 'contact', label: 'Contact Section', icon: 'fa-at' },
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id as any); setEditingId(null); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900/50'}`}>
              <i className={`fa-solid ${item.icon} text-lg`}></i>
              <span className="text-sm uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>
        
        {loading && <div className="p-4 mono text-[10px] text-cyan-500 animate-pulse text-center">SYNCHRONIZING WITH CLOUD...</div>}
        
        <button onClick={onLogout} className="mt-8 flex items-center gap-3 px-6 py-4 text-red-400 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 rounded-2xl"><i className="fa-solid fa-power-off"></i> Tutup Console</button>
      </aside>

      <main className="ml-80 flex-1 p-12 bg-slate-950/80 min-h-screen">
        
        {/* Konten Tab Roles */}
        {activeTab === 'roles' && (
          <div className="max-w-5xl animate-in fade-in">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-cyan-500">Cloud Config: Roles</h2>
            <p className="text-slate-500 mb-10 mono text-xs">Penyimpanan asinkron via Google Firestore.</p>
            
            <form onSubmit={handleSaveSettings} className="mb-12 glass p-8 rounded-3xl border-slate-800/50 grid grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Title</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.roles.sectionTitle} onChange={e => setSettings({...settings, roles: {...settings.roles, sectionTitle: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Subtitle</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.roles.sectionSubtitle} onChange={e => setSettings({...settings, roles: {...settings.roles, sectionSubtitle: e.target.value}})} />
              </div>
              <button type="submit" disabled={loading} className="col-span-2 py-3 bg-slate-800 text-cyan-400 font-bold rounded-xl text-[10px] uppercase tracking-widest disabled:opacity-50">Sync Header Roles</button>
            </form>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-4 glass p-8 rounded-3xl border-slate-800/50 h-fit sticky top-12">
                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-6">{editingId ? 'Update Cloud Role' : 'New Cloud Role'}</h3>
                <div className="space-y-4">
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Judul Peran" value={roleForm.title} onChange={e => setRoleForm({...roleForm, title: e.target.value})} />
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="FontAwesome Icon" value={roleForm.icon} onChange={e => setRoleForm({...roleForm, icon: e.target.value})} />
                  <textarea className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm h-24" placeholder="Deskripsi Singkat" value={roleForm.description} onChange={e => setRoleForm({...roleForm, description: e.target.value})} />
                  <button onClick={handleSaveRole} disabled={loading} className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-[0.2em]">{editingId ? 'Update Firestore' : 'Upload Role'}</button>
                </div>
              </div>
              <div className="col-span-8 space-y-4">
                {roles.map(r => (
                  <div key={r.id} className="glass p-5 rounded-2xl border-slate-800/50 flex justify-between items-center group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 flex items-center justify-center rounded-xl text-xl"><i className={`fa-solid ${r.icon}`}></i></div>
                      <div><h4 className="font-bold uppercase tracking-tight">{r.title}</h4><p className="text-xs text-slate-500">{r.description}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(r.id); setRoleForm(r); }} className="p-3 text-slate-500 hover:text-cyan-400"><i className="fa-solid fa-pen-nib"></i></button>
                      <button onClick={() => handleDeleteRole(r.id)} className="p-3 text-slate-500 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB EXPERTISE */}
        {activeTab === 'expertise' && (
          <div className="max-w-5xl animate-in fade-in">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-cyan-500">Cloud Config: Expertise</h2>
            <form onSubmit={handleSaveSettings} className="mb-12 glass p-8 rounded-3xl border-slate-800/50 grid grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Title</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.expertise.sectionTitle} onChange={e => setSettings({...settings, expertise: {...settings.expertise, sectionTitle: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Subtitle</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.expertise.sectionSubtitle} onChange={e => setSettings({...settings, expertise: {...settings.expertise, sectionSubtitle: e.target.value}})} />
              </div>
              <button type="submit" disabled={loading} className="col-span-2 py-3 bg-slate-800 text-cyan-400 font-bold rounded-xl text-[10px] uppercase tracking-widest disabled:opacity-50">Sync Header Expertise</button>
            </form>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-4 glass p-8 rounded-3xl border-slate-800/50 h-fit">
                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-6">Deploy Skill to Cloud</h3>
                <div className="space-y-4">
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Nama Skill" value={expertiseForm.name} onChange={e => setExpertiseForm({...expertiseForm, name: e.target.value})} />
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Icon Class" value={expertiseForm.icon} onChange={e => setExpertiseForm({...expertiseForm, icon: e.target.value})} />
                  <input type="range" className="w-full accent-cyan-500" value={expertiseForm.level} onChange={e => setExpertiseForm({...expertiseForm, level: parseInt(e.target.value)})} />
                  <button onClick={handleSaveExpertise} disabled={loading} className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-[0.2em]">Deploy to Firestore</button>
                </div>
              </div>
              <div className="col-span-8 space-y-3">
                {expertise.map(e => (
                  <div key={e.name} className="glass p-4 rounded-xl flex justify-between items-center">
                    <div className="flex items-center gap-4"><i className={`${e.icon} text-cyan-400 w-6`}></i><span className="font-bold">{e.name} ({e.level}%)</span></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(e.name); setExpertiseForm(e); }} className="text-slate-500 hover:text-cyan-400 p-2"><i className="fa-solid fa-pen"></i></button>
                      <button onClick={() => handleDeleteExpertise(e.name)} className="text-slate-500 hover:text-red-500 p-2"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB WORKS */}
        {activeTab === 'works' && (
          <div className="max-w-5xl animate-in fade-in">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-cyan-500">Cloud Config: Works</h2>
            <form onSubmit={handleSaveSettings} className="mb-12 glass p-8 rounded-3xl border-slate-800/50 grid grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Title</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.works.sectionTitle} onChange={e => setSettings({...settings, works: {...settings.works, sectionTitle: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase mono text-slate-500 font-black">Section Subtitle</label>
                <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3 text-sm" value={settings.works.sectionSubtitle} onChange={e => setSettings({...settings, works: {...settings.works, sectionSubtitle: e.target.value}})} />
              </div>
              <button type="submit" disabled={loading} className="col-span-2 py-3 bg-slate-800 text-cyan-400 font-bold rounded-xl text-[10px] uppercase tracking-widest disabled:opacity-50">Sync Header Works</button>
            </form>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-4 glass p-8 rounded-3xl border-slate-800/50 h-fit sticky top-12">
                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-6">Archive New Work</h3>
                <div className="space-y-4">
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Judul Projek" value={workForm.title} onChange={e => setWorkForm({...workForm, title: e.target.value})} />
                  <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" value={workForm.category} onChange={e => setWorkForm({...workForm, category: e.target.value as any})}>
                    <option value="AI Specialist">AI Specialist</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Robotics">Robotics</option>
                  </select>
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Image URL" value={workForm.image} onChange={e => setWorkForm({...workForm, image: e.target.value})} />
                  <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Project Link" value={workForm.link} onChange={e => setWorkForm({...workForm, link: e.target.value})} />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase mono text-slate-500 font-black">Project Slug (URL Path)</label>
                    <div className="flex gap-2">
                      <span className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-[10px] text-slate-500 mono flex items-center">/demo/</span>
                      <input className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="my-project-url" value={workForm.slug} onChange={e => setWorkForm({...workForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase mono text-slate-500 font-black">Upload Portofolio HTML</label>
                    <input 
                      type="file" 
                      accept=".html" 
                      onChange={handleHtmlUpload}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm file:bg-cyan-500 file:border-none file:rounded-md file:text-[10px] file:font-black file:uppercase file:px-3 file:py-1 file:mr-4 file:cursor-pointer" 
                    />
                    {workForm.htmlContent && (
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] text-green-500 mono">HTML Content Loaded ({workForm.htmlContent.length} chars)</p>
                        <button 
                          type="button"
                          onClick={() => setWorkForm({ ...workForm, htmlContent: '' })}
                          className="text-[9px] text-red-500 uppercase font-bold hover:underline"
                        >
                          Hapus HTML
                        </button>
                      </div>
                    )}
                  </div>

                  <textarea className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm h-24" placeholder="Deskripsi" value={workForm.description} onChange={e => setWorkForm({...workForm, description: e.target.value})} />
                  <button onClick={handleSaveWork} disabled={loading} className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-[0.2em]">Upload to Lab Cloud</button>
                  {editingId && <button onClick={() => {setEditingId(null); setWorkForm({title:'', category:'AI Specialist', description:'', image:'', tags:[], link:'', htmlContent: '', slug: ''})}} className="w-full py-2 text-slate-500 text-[10px] uppercase font-bold">Batal Edit</button>}
                </div>
              </div>
              <div className="col-span-8 space-y-4">
                {works.map(w => (
                  <div key={w.id} className="glass p-4 rounded-2xl flex gap-6 items-center group">
                    <img src={w.image || undefined} className="w-16 h-16 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all" />
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-sm">{w.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-cyan-500 mono">{w.category}</span>
                        {w.slug && <a href={`/demo/${w.slug}`} target="_blank" rel="noreferrer" className="text-[9px] text-slate-500 hover:text-cyan-400 mono underline">/demo/{w.slug}</a>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(w.id); setWorkForm(w); }} className="text-slate-500 hover:text-cyan-400 p-2"><i className="fa-solid fa-pen-nib"></i></button>
                      <button onClick={() => handleDeleteWork(w.id)} className="text-slate-500 hover:text-red-500 p-2"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editor untuk Hero, Contact tetap mirip */}
        {(activeTab === 'hero' || activeTab === 'contact') && (
          <div className="max-w-4xl animate-in fade-in">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 text-cyan-500">Cloud Editor: {activeTab.toUpperCase()}</h2>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="glass p-10 rounded-[2.5rem] border-slate-800/50 space-y-6">
                {activeTab === 'hero' && (
                  <>
                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm" value={settings.hero.explorerName} onChange={e => setSettings({...settings, hero: {...settings.hero, explorerName: e.target.value}})} placeholder="Explorer Name" />
                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm" value={settings.hero.typingText} onChange={e => setSettings({...settings, hero: {...settings.hero, typingText: e.target.value}})} placeholder="Typing Text" />
                    <textarea className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm h-32" value={settings.hero.description} onChange={e => setSettings({...settings, hero: {...settings.hero, description: e.target.value}})} placeholder="Description" />
                  </>
                )}
                {activeTab === 'contact' && (
                  <div className="grid grid-cols-2 gap-6">
                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm" value={settings.contact.email} onChange={e => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})} placeholder="Email" />
                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm" value={settings.contact.linkedin} onChange={e => setSettings({...settings, contact: {...settings.contact, linkedin: e.target.value}})} placeholder="LinkedIn" />
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-3xl hover:bg-cyan-400 uppercase tracking-[0.2em] disabled:opacity-50 shadow-lg shadow-cyan-500/20">Sync Configuration to Firestore</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
