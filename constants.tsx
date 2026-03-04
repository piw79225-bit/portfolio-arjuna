
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
    link: '#',
    slug: 'deteksi-isyarat'
  },
  {
    id: '2',
    title: 'Arsitektur Cloud Lab',
    category: 'Cloud Engineer',
    description: 'Infrastruktur cloud terdistribusi untuk simulasi komputasi performa tinggi di lingkungan laboratorium.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    link: '#',
    slug: 'cloud-lab'
  },
  {
    id: '3',
    title: 'Analisis Data Genomik',
    category: 'Data Scientist',
    description: 'Platform analisis data besar untuk pemetaan urutan DNA dan identifikasi variasi genetik.',
    image: 'https://images.unsplash.com/photo-1532187875605-1ef1d016b1d5?auto=format&fit=crop&q=80&w=800',
    tags: ['R', 'Big Data', 'Bioinformatics'],
    link: '#',
    slug: 'genomik-data'
  },
  {
    id: '4',
    title: 'Robotika Otonom',
    category: 'Robotics',
    description: 'Pengembangan prototipe robot otonom untuk navigasi dalam ruangan menggunakan sensor LiDAR.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    tags: ['ROS', 'C++', 'LiDAR'],
    link: '#',
    slug: 'robotika-otonom'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Machine Learning', level: 90, icon: 'fa-solid fa-microchip' },
  { name: 'Web Architecture', level: 85, icon: 'fa-solid fa-code' }
];
