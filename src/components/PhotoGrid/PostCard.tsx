import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Pencil, Trash2, TrendingUp, Users, Heart } from "lucide-react";
import { Card } from "../ui/card";
import { toast } from "../ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, onEdit, onDelete, isLiked }: PostCardProps) => {
  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://source.unsplash.com/random/100x100/?portrait";
                toast({
                  description: "Profile image failed to load",
                  duration: 2000,
                });
              }}
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 hover:text-qudpro-primary cursor-pointer">
                {post.author.name}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
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
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
        
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://source.unsplash.com/random/800x600/?egypt,business";
            toast({
              description: "Post image failed to load, showing fallback",
              duration: 2000,
            });
          }}
        />
        
        <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div className="flex space-x-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`flex items-center space-x-1 transition-colors ${
                      isLiked ? 'text-blue-600' : 'hover:text-blue-600'
                    }`}
                    onClick={() => onLike(post.id)}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{isLiked ? post.likes + 1 : post.likes}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? 'Unlike' : 'Like'} this post</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comment on this post</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:text-blue-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Comments Section */}
        <div className="mt-4 space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 text-sm">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://source.unsplash.com/random/100x100/?portrait";
                }}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{comment.author.name}</div>
                <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
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