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
  author: {
    id: string;
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface Comment {
  id: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
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