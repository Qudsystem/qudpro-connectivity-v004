import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import type { Post } from "@/types";
import PostCard from "./PostCard";
import { usePosts } from "@/hooks/usePosts";

const PhotoGrid = () => {
  const { posts, isLoading, createPost, updatePost, deletePost } = usePosts();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPosts(prev => [...prev, postId]);
    }
  };

  if (isLoading) {
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
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onEdit={updatePost}
          onDelete={deletePost}
          isLiked={likedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;