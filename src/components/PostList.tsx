import { Post, Comment } from "@/types";
import PostCard from "./PostCard";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PostListProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onDelete: (postId: number) => void;
  likedPosts: number[];
}

const PostList = ({ posts, onLike, onDelete, likedPosts }: PostListProps) => {
  const navigate = useNavigate();

  const handleComment = (postId: number, commentText: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content: commentText,
      author: {
        id: 'current-user-id',
        name: 'Current User',
        avatar: 'https://github.com/shadcn.png',
        role: 'Member'
      },
      timeAgo: 'just now'
    };
    
    toast({
      description: "تم إضافة التعليق بنجاح",
      duration: 2000,
    });
  };

  const handleShare = (postId: number) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    toast({
      description: "تم نسخ رابط المنشور",
      duration: 2000,
    });
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={handleComment}
          onShare={handleShare}
          onProfileClick={handleProfileClick}
          isLiked={likedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;
