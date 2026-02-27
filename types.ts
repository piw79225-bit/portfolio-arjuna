
export interface Project {
  id: string;
  title: string;
  category: 'AI Specialist' | 'Tech Educator' | 'Digital Architect';
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  hero: {
    explorerName: string;
    typingText: string;
    description: string;
    status: string;
    coreVersion: string;
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    title: string;
    highlight: string;
    paragraphs: string[];
    stats: { label: string; value: string }[];
  };
  roles: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  expertise: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  works: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    email: string;
    linkedin: string;
    instagram: string;
    github: string;
    copyright: string;
  };
}
