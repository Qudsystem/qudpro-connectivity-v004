import { Image, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Post, Comment } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { generateRandomPosts } from "./PhotoGrid/PostGenerator";
import PostCard from "./PhotoGrid/PostCard";

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const newPosts = generateRandomPosts(5).map((post, index) => ({
          ...post,
          id: Date.now() + index
        }));
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

    const interval = setInterval(() => {
      const newPost = {
        ...generateRandomPosts(1)[0],
        id: Date.now()
      };
      setPosts(prevPosts => [newPost, ...prevPosts.slice(0, 9)]);
      toast({
        description: "تم إضافة منشور جديد!",
        duration: 2000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      toast({
        description: "تم إلغاء الإعجاب",
        duration: 2000,
      });
    } else {
      setLikedPosts(prev => [...prev, postId]);
      toast({
        description: "تم الإعجاب بالمنشور!",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={`skeleton-${i}`} className="p-6">
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
        <PostCard
          key={post.id}
          post={post}
          isLiked={likedPosts.includes(post.id)}
          onLike={handleLike}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;