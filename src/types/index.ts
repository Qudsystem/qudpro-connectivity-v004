export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  author: Author;
  likes: number;
  comments: number;
  timeAgo: string;
}

export interface PlatformStats {
  professionals: number;
  jobsPosted: number;
  articles: number;
  upcomingEvents: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  coverImage: string;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  connections: number;
  views: number;
  posts: number;
  followers: number;
  following: number;
  jobsPosted: number;
  articles: number;
  upcomingEvents: number;
}

export interface NotificationType {
  id: number;
  type: "connection" | "like" | "message" | "job";
  content: string;
  time: string;
  read: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  count: number;
  type: "job" | "post" | "event" | "group";
}