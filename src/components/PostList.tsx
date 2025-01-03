import { Post } from "@/types";
import PostCard from "./PostCard";
import { toast } from "@/components/ui/use-toast";

interface PostListProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  likedPosts: number[];
}

const PostList = ({ posts, onLike, onEdit, onDelete, likedPosts }: PostListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onEdit={onEdit}
          onDelete={onDelete}
          isLiked={likedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;