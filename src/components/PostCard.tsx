import { Card } from "./ui/card";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, Brain, X } from "lucide-react";
import type { Post, Comment } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onComment: (postId: number, comment: Comment) => void;
  onShare: (postId: number) => void;
  onProfileClick: (username: string) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, onComment, onShare, onProfileClick, isLiked }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      author: {
        name: "أنت",
        avatar: "https://github.com/shadcn.png",
        role: "مستخدم"
      },
      timeAgo: "الآن"
    };

    onComment(post.id, comment);
    setNewComment("");
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onProfileClick(post.author.name)}
          >
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900 hover:text-qudpro-primary">
                {post.author.name}
              </h3>
              <div className="text-sm text-gray-500">
                <p>{post.author.role}</p>
                <p>{post.timeAgo}</p>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{post.description}</p>
        
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg"
          loading="lazy"
        />
        
        {post.analysis && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>التفاعل: {post.analysis.engagement}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>مقياس تفاعل المنشور</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>الوصول: {post.analysis.reach}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>إجمالي وصول هذا المنشور</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span className={getSentimentColor(post.analysis.sentiment)}>
                      {post.analysis.sentiment === 'positive' ? 'إيجابي' : 
                       post.analysis.sentiment === 'negative' ? 'سلبي' : 'محايد'}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تحليل مشاعر المحتوى</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between text-gray-500">
          <div className="flex space-x-6">
            <button 
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={() => onLike(post.id)}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
          <button 
            className="hover:text-blue-600 transition-colors"
            onClick={() => onShare(post.id)}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {showComments && (
          <div className="mt-4">
            <div className="flex space-x-2 mb-4">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تعليقاً..."
                className="flex-1"
              />
              <Button onClick={handleSubmitComment}>تعليق</Button>
            </div>
            
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 text-sm">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div 
                      className="font-medium cursor-pointer hover:text-qudpro-primary"
                      onClick={() => onProfileClick(comment.author.name)}
                    >
                      {comment.author.name}
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                    <div className="text-gray-400 text-xs">{comment.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;