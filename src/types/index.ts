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
}