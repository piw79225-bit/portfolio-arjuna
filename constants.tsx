
import { Project, Skill } from './types';

export const NAV_LINKS = [
  { label: 'Laboratorium', href: '#hero' },
  { label: 'Roles', href: '#roles' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Works', href: '#projects' },
  { label: 'Kontak', href: '#contact' }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sistem Deteksi Isyarat AI',
    category: 'AI Specialist',
    description: 'Eksperimen laboratorium dalam pengolahan citra real-time untuk menerjemahkan bahasa isyarat menjadi teks.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'TensorFlow', 'Computer Vision'],
    link: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Machine Learning', level: 90, icon: 'fa-solid fa-microchip' },
  { name: 'Web Architecture', level: 85, icon: 'fa-solid fa-code' }
];
