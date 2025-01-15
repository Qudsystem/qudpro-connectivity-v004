import type { Post, Comment } from "@/types";

const egyptianNames = [
  "Ahmed Hassan", "Mohamed Ali", "Fatima Said", "Nour Ibrahim",
  "Omar Khalil", "Layla Mahmoud", "Zainab Ahmed", "Karim Mostafa"
];

const egyptianCompanies = [
  "QudSystem", "Cairo Tech", "Alexandria Digital", "Delta Solutions",
  "Nile Innovations", "Pyramid Software", "Sphinx Technologies"
];

const topics = [
  "Technology", "Business", "Innovation", "Digital Transformation",
  "Entrepreneurship", "Software Development", "AI & Machine Learning"
];

// Reliable placeholder images from Unsplash
const placeholderImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
];

const profileImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

const generateRandomComment = (id: number): Comment => ({
  id,
  content: `This is a great insight about ${topics[Math.floor(Math.random() * topics.length)]}!`,
  author: {
    name: egyptianNames[Math.floor(Math.random() * egyptianNames.length)],
    avatar: profileImages[Math.floor(Math.random() * profileImages.length)],
    role: `Professional at ${egyptianCompanies[Math.floor(Math.random() * egyptianCompanies.length)]}`
  },
  timeAgo: `${Math.floor(Math.random() * 24)}h ago`
});

const generateRandomComments = (count: number): Comment[] =>
  Array.from({ length: count }, (_, index) => generateRandomComment(index));

export const generateRandomPost = (id: number): Post => {
  const randomTopics = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => topics[Math.floor(Math.random() * topics.length)]
  );

  const engagement = Math.floor(Math.random() * 1000);
  const sentiments = ['positive', 'neutral', 'negative'] as const;

  return {
    id,
    title: `Insights on ${randomTopics[0]}`,
    category: randomTopics[0],
    description: `Exploring the latest developments in ${randomTopics.join(', ')} and their impact on Egyptian businesses. #EgyptTech #Innovation`,
    imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    author: {
      name: egyptianNames[Math.floor(Math.random() * egyptianNames.length)],
      role: `Professional at ${egyptianCompanies[Math.floor(Math.random() * egyptianCompanies.length)]}`,
      avatar: profileImages[Math.floor(Math.random() * profileImages.length)]
    },
    likes: Math.floor(Math.random() * 200),
    comments: generateRandomComments(Math.floor(Math.random() * 5) + 1),
    timeAgo: `${Math.floor(Math.random() * 24)}h ago`,
    analysis: {
      engagement,
      reach: engagement * (Math.floor(Math.random() * 5) + 2),
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      topics: randomTopics,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
    }
  };
};

export const generateRandomPosts = (count: number): Post[] => 
  Array.from({ length: count }, (_, index) => generateRandomPost(index));