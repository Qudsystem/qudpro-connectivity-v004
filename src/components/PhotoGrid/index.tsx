import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import type { Post } from "@/types";
import PostList from "../PostList";
import { usePosts } from "@/hooks/usePosts";
import { generateRandomPost } from "./PostGenerator";
import { toast } from "@/components/ui/use-toast";

const PhotoGrid = () => {
  const { posts: userPosts, isLoading: isUserPostsLoading, createPost, deletePost } = usePosts();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const randomPosts = Array.from({ length: 5 }, (_, index) => generateRandomPost(index));
        
        const combined = [...userPosts, ...randomPosts].sort((a, b) => {
          const timeA = new Date(a.timeAgo).getTime();
          const timeB = new Date(b.timeAgo).getTime();
          return timeB - timeA;
        });
        
        setAllPosts(combined);
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل المنشورات. يرجى المحاولة مرة أخرى.",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();

    const interval = setInterval(() => {
      const newPost = generateRandomPost(Date.now());
      setAllPosts(prevPosts => [newPost, ...prevPosts.slice(0, 9)]);
      toast({
        description: "تم إضافة منشور جديد!",
        duration: 2000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [userPosts]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      toast({
        description: "تم إلغاء الإعجاب بالمنشور",
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

  if (isLoading || isUserPostsLoading) {
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
    <PostList
      posts={allPosts}
      onLike={handleLike}
      onDelete={deletePost}
      likedPosts={likedPosts}
    />
  );
};

export default PhotoGrid;