import { useState, useEffect } from 'react';
import { Card } from "./ui/card";
import { ThumbsUp, Heart, Angry, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, Brain } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: number, reactionType: string) => void;
  onComment: (postId: number, comment: string) => void;
  onShare: (postId: number) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: number) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, onComment, onShare, onEdit, onDelete, isLiked }: PostCardProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const navigate = useNavigate();

  const reactionSound = new Audio('/sounds/like-sound.mp3');

  const handleReaction = (reactionType: string) => {
    setCurrentReaction(reactionType);
    onLike(post.id, reactionType);
    reactionSound.play().catch(console.error);
    setShowReactions(false);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.author.id}`);
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
            
            <button className="reaction-button">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
          
          <button 
            className="reaction-button"
            onClick={() => onShare(post.id)}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

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