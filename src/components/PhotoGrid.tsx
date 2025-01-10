import { Image, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Post, Comment } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { generateRandomPosts } from "./PhotoGrid/PostGenerator";

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
                  <span>{post.comments.length}</span>
                </button>
              </div>
              <button className="hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-4 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 text-sm">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <p className="text-gray-600">{comment.content}</p>
                    <div className="text-gray-400 text-xs">{comment.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGrid;