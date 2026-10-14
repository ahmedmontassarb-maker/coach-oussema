export type IconType = 
  | 'Flame' 
  | 'Dumbbell' 
  | 'Zap' 
  | 'HeartPulse' 
  | 'Trophy' 
  | 'Target' 
  | 'Apple' 
  | 'Shield' 
  | 'Activity'
  | 'Timer';

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  iconName: IconType;
  highlights: string[];
  targetAudience: string;
  format: string; // e.g., 'Présentiel & En Ligne'
  badge?: string; // e.g., 'Plus Demandé'
  active: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  program: string;
  rating: number; // 1-5
  review: string;
  achievement: string; // e.g. '-12 kg en 4 mois'
  avatar: string;
  date: string;
  featured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  goal: string;
  preferredFormat: string;
  message: string;
  date: string;
  status: 'nouveau' | 'contacte' | 'archive';
}

export interface VideoPreset {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface SiteConfig {
  coachName: string;
  title: string;
  experienceYears: number;
  heroHeadline: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroVideoPoster: string;
  videoOverlayDarkness: number; // percentage 0 - 100
  instagramUrl: string;
  facebookUrl: string;
  whatsappNumber: string; // "+33 6 70 84 27 89"
  whatsappRaw: string; // "33670842789"
  email: string;
  location: string;
  bioText: string;
  coachPhotoUrl: string;
  customVideoFileName?: string;
}

