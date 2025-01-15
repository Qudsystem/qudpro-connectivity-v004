import { Card } from "./ui/card";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, Brain } from "lucide-react";
import type { Post } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, isLiked }: PostCardProps) => {
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
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 hover:text-qudpro-primary cursor-pointer">
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
                    <span>Engagement: {post.analysis.engagement}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Post engagement metric</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Reach: {post.analysis.reach}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total reach of this post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span className={getSentimentColor(post.analysis.sentiment)}>
                      {post.analysis.sentiment.charAt(0).toUpperCase() + post.analysis.sentiment.slice(1)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Content sentiment analysis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.analysis.topics.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  #{topic.replace(/\s+/g, '')}
                </span>
              ))}
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
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
          <button className="hover:text-blue-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-4 space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 text-sm">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{comment.author.name}</div>
                <p className="text-gray-600">{comment.content}</p>
                <div className="text-gray-400 text-xs">{comment.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;