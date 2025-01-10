import { ReactNode } from "react";

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
  isPinned?: boolean;
}

export interface PlatformStats {
  professionals: number;
  jobsPosted: number;
  articles: number;
  upcomingEvents: number;
}

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  count: number;
  type: "project" | "content" | "event" | "group";
}
