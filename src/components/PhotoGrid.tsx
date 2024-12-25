import { Image, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Post } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";

// Helper function to generate random time
const getRandomTimeAgo = () => {
  const times = ['just now', '5 minutes ago', '10 minutes ago', '30 minutes ago', '1 hour ago', '2 hours ago', '5 hours ago', '1 day ago'];
  return times[Math.floor(Math.random() * times.length)];
};

// Helper function to generate random Egyptian names
const getRandomEgyptianName = () => {
  const firstNames = ['Ahmed', 'Mohamed', 'Sara', 'Nour', 'Hassan', 'Fatima', 'Youssef', 'Mariam', 'Omar', 'Layla'];
  const lastNames = ['Ibrahim', 'Hassan', 'Ali', 'Mohamed', 'Ahmed', 'Mahmoud', 'Kamal', 'Samir', 'Farid', 'Zaki'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Helper function to generate random roles
const getRandomRole = () => {
  const roles = [
    'Software Engineer',
    'Product Designer',
    'Marketing Specialist',
    'Content Creator',
    'Business Developer',
    'UI/UX Designer',
    'Project Manager',
    'Digital Marketing Manager',
    'Photographer',
    'Startup Founder'
  ];
  return roles[Math.floor(Math.random() * roles.length)];
};

// Helper function to generate random descriptions about Egypt
const getRandomDescription = () => {
  const descriptions = [
    "Exploring innovative tech solutions in Cairo's bustling startup ecosystem",
    "Capturing the essence of Alexandria's historic architecture",
    "Working on exciting projects that shape Egypt's digital future",
    "Collaborating with talented professionals in Egypt's tech hub",
    "Building bridges between traditional and modern business practices in Egypt",
    "Showcasing Egyptian creativity through digital innovation",
    "Contributing to Egypt's growing tech community",
    "Developing sustainable solutions for Egyptian businesses",
    "Creating opportunities in Egypt's digital economy",
    "Innovating at the heart of MENA's tech revolution"
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate random posts
const generateRandomPosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: Date.now() + index,
    title: `Post ${index + 1}`,
    category: ['Professional', 'Technology', 'Business', 'Design', 'Innovation'][Math.floor(Math.random() * 5)],
    description: getRandomDescription(),
    imageUrl: `https://source.unsplash.com/random/800x600/?egypt,business&sig=${Date.now() + index}`,
    author: {
      name: getRandomEgyptianName(),
      role: getRandomRole(),
      avatar: `https://source.unsplash.com/random/40x40/?portrait&sig=${Date.now() + index}`
    },
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    timeAgo: getRandomTimeAgo()
  }));
};

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        // Generate initial random posts
        const newPosts = generateRandomPosts(5);
        setPosts(newPosts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    // Add new posts periodically
    const interval = setInterval(() => {
      const newPost = generateRandomPosts(1)[0];
      setPosts(prevPosts => [newPost, ...prevPosts.slice(0, 9)]); // Keep only last 10 posts
      toast({
        description: "New post added to your feed!",
        duration: 2000,
      });
    }, 30000); // Add new post every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      toast({
        description: "Post unliked",
        duration: 2000,
      });
    } else {
      setLikedPosts(prev => [...prev, postId]);
      toast({
        description: "Post liked!",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900 hover:text-qudpro-primary cursor-pointer">
                    {post.author.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    <p>{post.author.role}</p>
                    <p>{post.timeAgo}</p>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{post.description}</p>
            
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
              loading="lazy"
            />
            
            <div className="mt-4 flex items-center justify-between text-gray-500">
              <div className="flex space-x-6">
                <button 
                  className={`flex items-center space-x-1 transition-colors ${
                    likedPosts.includes(post.id) ? 'text-blue-600' : 'hover:text-blue-600'
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
              <button className="hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGrid;