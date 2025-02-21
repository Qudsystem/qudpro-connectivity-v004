import { useState } from 'react';
import { Card } from "./ui/card";
import { ThumbsUp, Heart, Angry, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, Brain, ChevronUp, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Post, Comment } from "@/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: number, reactionType: string) => void;
  onComment: (postId: number, comment: Comment) => void;
  onShare: (postId: number) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: number) => void;
  onProfileClick: (username: string) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, onComment, onShare, onEdit, onDelete, onProfileClick, isLiked }: PostCardProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const reactionSound = new Audio('/sounds/like-sound.mp3');

  const handleReaction = (reactionType: string) => {
    setCurrentReaction(reactionType);
    onLike(post.id, reactionType);
    reactionSound.play().catch(console.error);
    setShowReactions(false);
  };

  const handleProfileClick = () => {
    onProfileClick(post.author.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      content: commentText,
      author: {
        id: 'user-' + Date.now(),
        name: 'Current User',
        avatar: 'https://github.com/shadcn.png',
        role: 'Member'
      },
      timeAgo: 'Just now'
    };

    onComment(post.id, newComment);
    setCommentText('');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      toast({
        description: "تم فتح التعليقات",
        duration: 1500,
      });
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Angry className="w-4 h-4 text-red-500" />;
      default:
        return <Brain className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                {post.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{post.author.role}</p>
              <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(post)}>
                  Edit Post
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => {
                    onDelete(post.id);
                    toast({
                      description: "Post deleted successfully",
                    });
                  }}
                  className="text-destructive"
                >
                  Delete Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onShare(post.id)}>
                Share Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-foreground mb-4">{post.description}</p>
        
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg"
            loading="lazy"
          />
        )}
        
        <div className="mt-4 flex items-center justify-between text-muted-foreground">
          <div className="flex space-x-6">
            <div 
              className="relative"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <button 
                className={`reaction-button ${currentReaction ? 'text-primary' : ''}`}
                onClick={() => handleReaction('like')}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              
              {showReactions && (
                <div className="absolute bottom-full left-0 mb-2 flex space-x-2 bg-background border rounded-full p-2 shadow-lg">
                  <button onClick={() => handleReaction('like')} className="hover:scale-125 transition-transform">
                    <ThumbsUp className="w-5 h-5 text-primary" />
                  </button>
                  <button onClick={() => handleReaction('love')} className="hover:scale-125 transition-transform">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  <button onClick={() => handleReaction('angry')} className="hover:scale-125 transition-transform">
                    <Angry className="w-5 h-5 text-orange-500" />
                  </button>
                </div>
              )}
            </div>
            
            <button 
              className={`reaction-button ${showComments ? 'text-primary' : ''}`}
              onClick={toggleComments}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
              {showComments ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
          
          <button 
            className="reaction-button"
            onClick={() => onShare(post.id)}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Comments Section */}
        {showComments && (
          <div className="mt-4 border-t pt-4 animate-fade-up">
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="اكتب تعليقك..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-grow rounded-full bg-muted/50"
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  تعليق
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {post.comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="flex space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-foreground">{comment.author.name}</div>
                      <div className="text-xs text-muted-foreground">{comment.timeAgo}</div>
                    </div>
                    <p className="text-sm text-foreground mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {post.analysis && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Engagement: {post.analysis.engagement}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Reach: {post.analysis.reach}</span>
              </div>

              <div className="flex items-center space-x-2">
                {getSentimentIcon(post.analysis.sentiment)}
                <span className="capitalize">{post.analysis.sentiment}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
