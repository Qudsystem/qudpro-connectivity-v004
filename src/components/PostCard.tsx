import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Pencil, Trash2, Link2, Send, Pin } from "lucide-react";
import { Card } from "./ui/card";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { Post, Comment } from "@/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  onPin?: (postId: number) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, onEdit, onDelete, onPin, isLiked }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const postUrl = `${window.location.origin}/post/${post.id}`;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      author: {
        name: "Current User",
        avatar: "https://github.com/shadcn.png",
        role: "Software Engineer"
      },
      timeAgo: "just now",
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast({
      description: "Comment added successfully!",
      duration: 2000,
    });
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast({
      description: "Link copied to clipboard!",
      duration: 2000,
    });
    setShowShareDialog(false);
  };

  const handlePin = () => {
    if (onPin) {
      onPin(post.id);
      toast({
        description: post.isPinned ? "Post unpinned" : "Post pinned to your profile",
        duration: 2000,
      });
    }
  };

  return (
    <Card className={`overflow-hidden animate-fade-in ${post.isPinned ? 'border-2 border-qudpro-primary' : ''}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <h3 className="font-medium text-white hover:text-qudpro-primary cursor-pointer">
                {post.author.name}
              </h3>
              <div className="text-sm text-gray-500">
                <p>{post.author.role}</p>
                <p>{post.timeAgo}</p>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {onPin && (
                <DropdownMenuItem onClick={handlePin}>
                  <Pin className="w-4 h-4 mr-2" />
                  {post.isPinned ? 'Unpin' : 'Pin'}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => {
                  onDelete(post.id);
                  toast({
                    description: "Post deleted",
                    duration: 2000,
                  });
                }}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                isLiked ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={() => onLike(post.id)}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{isLiked ? post.likes + 1 : post.likes}</span>
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </button>
          </div>
          <button 
            className="hover:text-blue-600 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1"
              />
              <Button onClick={handleAddComment}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-white">{comment.author.name}</h4>
                      <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={postUrl} readOnly />
              <Button onClick={copyLink}>
                <Link2 className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;