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

const generateRandomComment = (id: number): Comment => ({
  id,
  content: `This is a great insight about ${topics[Math.floor(Math.random() * topics.length)]}!`,
  author: {
    name: egyptianNames[Math.floor(Math.random() * egyptianNames.length)],
    avatar: `https://source.unsplash.com/random/150x150?face&${id}`,
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
    imageUrl: `https://source.unsplash.com/random/800x600?${randomTopics[0].toLowerCase()},egypt&${id}`,
    author: {
      name: egyptianNames[Math.floor(Math.random() * egyptianNames.length)],
      role: `Professional at ${egyptianCompanies[Math.floor(Math.random() * egyptianCompanies.length)]}`,
      avatar: `https://source.unsplash.com/random/150x150?face&${id}`
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