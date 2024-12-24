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