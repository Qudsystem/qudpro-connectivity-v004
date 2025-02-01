import { Image, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Post, Comment } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { generateRandomPosts } from "./PhotoGrid/PostGenerator";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const newPosts = generateRandomPosts(5).map((post, index) => ({
          ...post,
          id: Date.now() + index,
          comments: [] // Initialize empty comments array
        }));
        setPosts(newPosts);
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل المنشورات. يرجى المحاولة مرة أخرى.",
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
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes - 1 }
            : post
        )
      );
      toast({
        description: "تم إلغاء الإعجاب بالمنشور",
        duration: 2000,
      });
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      );
      toast({
        description: "تم الإعجاب بالمنشور!",
        duration: 2000,
      });
    }
  };

  const handleComment = (postId: number, comment: Comment) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      )
    );
    
    toast({
      description: "تم إضافة تعليق بنجاح!",
      duration: 2000,
    });
  };

  const handleShare = (postId: number) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    toast({
      description: "تم نسخ رابط المنشور!",
      duration: 2000,
    });
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
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
          onComment={handleComment}
          onShare={handleShare}
          onProfileClick={handleProfileClick}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
