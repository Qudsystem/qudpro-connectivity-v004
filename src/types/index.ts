export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  company?: string;
  location?: string;
  website?: string;
  bio?: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  timeAgo: string;
  isUserPost?: boolean;
  analysis?: PostAnalysis;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface Comment {
  id: number;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  createdAt: string;
  timeAgo: string;
}

export interface PlatformStats {
  professionals: number;
  jobsPosted: number;
  articles: number;
  upcomingEvents: number;
}

export interface Settings {
  darkMode: boolean;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  twoFactorEnabled: boolean;
  visibility: 'everyone' | 'connections' | 'none';
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  website?: string;
  bio: string;
  avatar: string;
  coverImage?: string;
  connections: number;
  posts: number;
  views: number;
}

export interface ProfileType {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  coverImage?: string;
  company: string;
  location: string;
  website: string;
  email: string;
  connections: number;
  views: number;
  impressions: number;
  about: string;
  experience?: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education?: {
    school: string;
    degree: string;
    period: string;
  }[];
}

export interface WorkItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  count: number;
  type: 'project' | 'content' | 'event' | 'group';
}

export interface PostAnalysis {
  engagement: number;
  reach: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  timestamp: string;
}