export interface ProfileType {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  company: string;
  location: string;
  website: string;
  email: string;
  connections: number;
  views: number;
  impressions: number;  // Added this field
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

export interface Skill {
  name: string;
  endorsements: number;
  isEndorsed?: boolean;
}

export interface ProfileAnalytics {
  views: number;
  connections: number;
  impressions: number;
  viewsData: Array<{ date: string; views: number }>;
}

export interface ProfileStrengthData {
  strength: number;
  recommendations: string[];
}

export interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timeAgo: string;
}

export interface PostAnalysis {
  engagement: number;
  reach: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  timestamp: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  likes: number;
  comments: Comment[];
  timeAgo: string;
  isUserPost?: boolean;
  analysis?: PostAnalysis;
}

export interface WorkItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  count: number;
  type: 'project' | 'content' | 'event' | 'group';
}

export interface PlatformStats {
  professionals: number;
  jobsPosted: number;
  articles: number;
  upcomingEvents: number;
}
