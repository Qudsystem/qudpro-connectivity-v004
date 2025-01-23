import { Post } from "@/types";
import PostCard from "./PostCard";
import { toast } from "@/components/ui/use-toast";

interface PostListProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onDelete: (postId: number) => void;
  likedPosts: number[];
}

const PostList = ({ posts, onLike, onDelete, likedPosts }: PostListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={(postId, comment) => {
            // Handle comment
            toast({
              description: "تم إضافة التعليق بنجاح",
              duration: 2000,
            });
          }}
          onShare={(postId) => {
            // Handle share
            const postUrl = `${window.location.origin}/post/${postId}`;
            navigator.clipboard.writeText(postUrl);
            toast({
              description: "تم نسخ رابط المنشور",
              duration: 2000,
            });
          }}
          onProfileClick={(username) => {
            // Handle profile click
            window.location.href = `/profile/${username}`;
          }}
          isLiked={likedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;