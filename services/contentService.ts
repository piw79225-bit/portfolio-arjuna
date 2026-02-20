import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import { Project, Skill, SiteSettings, Role } from '../types.ts';
import { PROJECTS as INITIAL_PROJECTS, SKILLS as INITIAL_SKILLS } from '../constants.tsx';

const SETTINGS_DOC_ID = 'main_settings';

export const DEFAULT_ROLES: Role[] = [
  { id: '1', title: 'AI Specialist', description: 'Mengembangkan model cerdas untuk solusi otomatisasi.', icon: 'fa-brain' },
  { id: '2', title: 'Tech Educator', description: 'Mendemokratisasi akses teknologi melalui pendidikan.', icon: 'fa-chalkboard-user' },
  { id: '3', title: 'Digital Architect', description: 'Merancang ekosistem web yang skalabel dan aman.', icon: 'fa-layer-group' }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  hero: {
    explorerName: "ARJUNA",
    typingText: "Inovasi Tanpa Batas",
    description: "Pusat kendali untuk eksperimen teknologi digital, kecerdasan buatan, dan pengembangan ekosistem informatika di Indonesia.",
    status: "LAB_OPERATIONAL",
    coreVersion: "ARJUNA-V3.5"
  },
  about: {
    sectionTitle: "Spesifikasi Entitas",
    sectionSubtitle: "Digital Identity",
    title: "Membangun Masa",
    highlight: "Depan",
    paragraphs: [
      "Selamat datang di Laboratorium Teknologi ID. Saya adalah Arjuna, seorang arsitek digital yang mendedikasikan waktu untuk mengeksplorasi batas-batas kemungkinan teknologi.",
      "Visi saya adalah menciptakan sinergi antara manusia dan kecerdasan buatan untuk kemajuan ekosistem pendidikan dan industri di Indonesia."
    ],
    stats: [
      { label: "Projek Selesai", value: "25+" },
      { label: "Uptime Sistem", value: "99.9%" }
    ]
  },
  roles: {
    sectionTitle: "Peran Strategis",
    sectionSubtitle: "Mission Brief"
  },
  expertise: {
    sectionTitle: "Arsenal Teknologi",
    sectionSubtitle: "Skill Matrix"
  },
  works: {
    sectionTitle: "Eksperimen Pilihan",
    sectionSubtitle: "Archived Projects"
  },
  contact: {
    sectionTitle: "Uplink Komunikasi",
    sectionSubtitle: "Connect With Lab",
    email: "arjuna@lab.tech",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
    copyright: "© 2024 ARJUNA LABORATORY — ALL SYSTEMS NOMINAL"
  }
};

export const contentService = {
  getSettings: async (): Promise<SiteSettings> => {
    try {
      const docRef = doc(db, "settings", SETTINGS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data() as SiteSettings;
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    } catch (error) {
      console.warn("Using Fallback Settings:", error);
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings: async (settings: SiteSettings) => {
    await setDoc(doc(db, "settings", SETTINGS_DOC_ID), settings);
  },
  getWorks: async (): Promise<Project[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "works"));
      const data = querySnapshot.docs.map(doc => doc.data() as Project);
      return data.length > 0 ? data : INITIAL_PROJECTS;
    } catch (error) {
      return INITIAL_PROJECTS;
    }
  },
  saveWork: async (project: Project) => {
    await setDoc(doc(db, "works", project.id), project);
  },
  deleteWork: async (id: string) => {
    await deleteDoc(doc(db, "works", id));
  },
  getExpertise: async (): Promise<Skill[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "expertise"));
      const data = querySnapshot.docs.map(doc => doc.data() as Skill);
      return data.length > 0 ? data : INITIAL_SKILLS;
    } catch (error) {
      return INITIAL_SKILLS;
    }
  },
  saveSkill: async (skill: Skill) => {
    await setDoc(doc(db, "expertise", skill.name), skill);
  },
  deleteSkill: async (name: string) => {
    await deleteDoc(doc(db, "expertise", name));
  },
  getRoles: async (): Promise<Role[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "roles"));
      const data = querySnapshot.docs.map(doc => doc.data() as Role);
      return data.length > 0 ? data : DEFAULT_ROLES;
    } catch (error) {
      return DEFAULT_ROLES;
    }
  },
  saveRole: async (role: Role) => {
    await setDoc(doc(db, "roles", role.id), role);
  },
  deleteRole: async (id: string) => {
    await deleteDoc(doc(db, "roles", id));
  }
};
