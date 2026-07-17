import { localImages, localVideos } from "./mediaData";

export interface ProjectSettings {
  shutter: string;
  aperture: string;
  iso: string;
}

export interface VideoItem {
  url: string;
  title: string;
  duration: string;
  resolution: string;
  category: string;
  thumbnail: string;
  aspectRatio?: 'landscape' | 'portrait';
}


export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string; // matches category slug
  location: string;
  year: string;
  camera: string;
  lens: string;
  settings: ProjectSettings;
  coverImage: string;
  videoUrl?: string; // Optional cover video loop
  images: string[];
  videos?: VideoItem[];
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface GearItem {
  name: string;
  spec: string;
  category: 'Body' | 'Lens' | 'Drone' | 'Lighting' | 'Accessories';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AwardItem {
  year: string;
  title: string;
  category: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  creativePhilosophy: string;
  profileImage: string;
  brands: string[];
  socialLinks: {
    instagram: string;
    youtube: string;
    behance: string;
    whatsapp?: string;
    email?: string;
    location: string;
  };
  stats: {
    label: string;
    value: number;
    suffix: string;
  }[];
  gear: GearItem[];
  timeline: TimelineItem[];
  awards: AwardItem[];
}

// Group images into categories
const natureImages = localImages.filter(img => img.category === 'Nature').map(img => img.src);
const streetImages = localImages.filter(img => img.category === 'Cityscape').map(img => img.src);
const lifeImages = localImages.filter(img => img.category === 'Everyday Life').map(img => img.src);
const lowlightImages = localImages.filter(img => img.category === 'Low Light').map(img => img.src);

// Group videos into categories
const natureVideos = localVideos.filter(v => v.category === 'Nature');
const streetVideos = localVideos.filter(v => v.category === 'Cityscape');
const lifeVideos = localVideos.filter(v => v.category === 'Everyday Life');
const lowlightVideos = localVideos.filter(v => v.category === 'Low Light');

export const categories: Category[] = [
  {
    slug: 'nature',
    name: 'Nature & Landscape',
    description: 'A study of natural light, immense scale, and geographical storytelling.',
    coverImage: natureImages[0] || 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'street',
    name: 'Street & Cityscape',
    description: 'Raw, unscripted moments of human expression and urban textures.',
    coverImage: streetImages[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'life',
    name: 'Everyday Life',
    description: 'Capturing details, stories, and beauty in the mundane.',
    coverImage: lifeImages[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'lowlight',
    name: 'Low Light & Shadow',
    description: 'Playing with contrast, neon vibes, and shadows in the dark.',
    coverImage: lowlightImages[0] || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  },
];

export const projects: Project[] = [
  {
    slug: 'nature-landscapes',
    title: 'Nature & Landscape',
    subtitle: 'Scenic horizons and outdoor explorations.',
    description: 'A visual exploration of the great outdoors. Featuring sunsets, mountains, open horizons, and organic details, this album explores the beauty of natural light and geographic patterns through mobile photography.',
    category: 'nature',
    location: 'Gujarat, India',
    year: '2026',
    camera: 'Samsung Galaxy S24 Ultra',
    lens: 'Hasselblad/Expert RAW equivalent',
    settings: {
      shutter: '1/500s',
      aperture: 'f/1.7',
      iso: '50',
    },
    coverImage: natureImages[0] || 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    // Loop through some videos if available, otherwise first video
    videoUrl: natureVideos[0]?.src || '',
    images: natureImages.length > 0 ? natureImages : ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    videos: natureVideos.map((v, idx) => ({
      url: v.src,
      title: v.title,
      duration: '0:15',
      resolution: '4K UltraHD',
      category: 'Nature',
      thumbnail: natureImages[(idx + 1) % natureImages.length] || natureImages[0] || 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: v.aspectRatio,
    })),
  },
  {
    slug: 'street-cityscapes',
    title: 'Street & Cityscape',
    subtitle: 'Urban geometry, paths, and local textures.',
    description: 'Exploring city life and urban lines. Free from heavy equipment, mobile photography enables blending in to snap authentic street perspectives, geometric structures, and human paths.',
    category: 'street',
    location: 'Ahmedabad, India',
    year: '2026',
    camera: 'Samsung Galaxy S21 FE',
    lens: '26mm Main Wide Angle',
    settings: {
      shutter: '1/250s',
      aperture: 'f/1.8',
      iso: '100',
    },
    coverImage: streetImages[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    videoUrl: streetVideos[0]?.src || '',
    images: streetImages.length > 0 ? streetImages : ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    videos: streetVideos.map((v, idx) => ({
      url: v.src,
      title: v.title,
      duration: '0:12',
      resolution: '1080p FullHD',
      category: 'Cityscape',
      thumbnail: streetImages[(idx + 1) % streetImages.length] || streetImages[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: v.aspectRatio,
    })),
  },
  {
    slug: 'everyday-life',
    title: 'Everyday Life',
    subtitle: 'Candid stories and shapes in daily routines.',
    description: 'A personal gallery of daily details, random shapes, and interesting textures. These photos represent the promptness of mobile cameras, snapping visual diary entries whenever inspiration strikes.',
    category: 'life',
    location: 'Gujarat, India',
    year: '2025',
    camera: 'Samsung Galaxy S21 FE',
    lens: '26mm Main Camera',
    settings: {
      shutter: '1/125s',
      aperture: 'f/1.8',
      iso: '200',
    },
    coverImage: lifeImages[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: lifeVideos[0]?.src || '',
    images: lifeImages.length > 0 ? lifeImages : ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    videos: lifeVideos.map((v, idx) => ({
      url: v.src,
      title: v.title,
      duration: '0:10',
      resolution: '1080p FullHD',
      category: 'Everyday Life',
      thumbnail: lifeImages[(idx + 1) % lifeImages.length] || lifeImages[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: v.aspectRatio,
    })),
  },
  {
    slug: 'low-light-shadows',
    title: 'Low Light & Shadow',
    subtitle: 'Vibrant colors and neon vibes in the dark.',
    description: 'A study of shadows, reflections, and lights in low-light environments. Utilizing the Nightography capabilities of the S24 Ultra, this project showcases contrasty night scenes and long-exposure light trails.',
    category: 'lowlight',
    location: 'Ahmedabad, India',
    year: '2026',
    camera: 'Samsung Galaxy S24 Ultra',
    lens: '24mm Ultra Night Lens',
    settings: {
      shutter: '1/15s',
      aperture: 'f/1.7',
      iso: '800',
    },
    coverImage: lowlightImages[0] || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    videoUrl: lowlightVideos[0]?.src || '',
    images: lowlightImages.length > 0 ? lowlightImages : ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
    videos: lowlightVideos.map((v, idx) => ({
      url: v.src,
      title: v.title,
      duration: '0:14',
      resolution: '4K UltraHD',
      category: 'Low Light',
      thumbnail: lowlightImages[(idx + 1) % lowlightImages.length] || lowlightImages[0] || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: v.aspectRatio,
    })),
  },
];

// Flat list of all videos
export const allVideos: VideoItem[] = projects
  .filter(p => p.videos && p.videos.length > 0)
  .flatMap(p => p.videos!.map(v => ({ ...v, category: p.category })));

// Empty/simplified commercial data so we don't break import lines in files we disabled
export const testimonials: Testimonial[] = [];
export const services: Service[] = [];
export const processSteps: any[] = [];

export const personalInfo: PersonalInfo = {
  name: 'Jignesh Prajapati',
  title: 'Hobbyist Mobile Photographer',
  tagline: 'Capturing everyday stories through the lens of a phone.',
  bio: 'Jignesh Prajapati is a passionate hobbyist photographer based in Gujarat, India. He explores the beauty of the world using his smartphones, capturing fleeting moments of daily life, stunning landscapes, and night urban lights. With a minimal setup consisting of a Samsung Galaxy S21 FE and a Samsung Galaxy S24 Ultra, Jignesh proves that the best camera is indeed the one that\'s always in your pocket.',
  creativePhilosophy: 'Mobile photography is about responsiveness and intimacy. Freed from bulky gear, I can blend into the surroundings and capture genuine, unstaged moments of life. For me, photography is not a business, it is a way to freeze time and appreciate the simple beauty of our surroundings.',
  profileImage: '/me.jpg',
  brands: [],
  socialLinks: {
    instagram: 'https://instagram.com/jignesh_5049', // placeholder/hobby
    youtube: 'https://youtube.com/@jignesh_5049',
    behance: '',
    location: 'Gujarat, India',
  },
  stats: [
    { label: 'Photos Captured', value: 79, suffix: '' },
    { label: 'Videos Recorded', value: 14, suffix: '' },
    { label: 'Devices Used', value: 2, suffix: '' },
    { label: 'Active Years', value: 3, suffix: '+' },
  ],
  gear: [
    { name: 'Samsung Galaxy S24 Ultra', spec: '200 MP quad camera, 5x & 10x optical telephoto', category: 'Body' },
    { name: 'Samsung Galaxy S21 FE', spec: '12 MP triple camera with 3x optical zoom', category: 'Body' },
    { name: 'Lightroom Mobile', spec: 'RAW mobile editing & color grading workflow', category: 'Accessories' },
    { name: 'Mobile Gimbal & Tripod', spec: 'For stable video shots & long-exposure astrophotography', category: 'Accessories' }
  ],
  timeline: [],
  awards: []
};
