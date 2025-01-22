import { useState } from "react";
import { Card } from "./ui/card";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, Brain, Send } from "lucide-react";
import type { Post, Comment } from "@/types";
import { toast } from "./ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  isLiked: boolean;
}

const PostCard = ({ post, onLike, isLiked }: PostCardProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(post.comments);

  const getSentimentColor = (sentiment: "positive" | "neutral" | "negative") => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast({
        description: "يرجى كتابة تعليق قبل الإرسال",
        duration: 2000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const comment: Comment = {
        id: Date.now(),
        content: newComment,
        author: {
          name: "المستخدم الحالي",
          avatar: "https://github.com/shadcn.png",
          role: "عضو في QudPro"
        },
        timeAgo: "الآن"
      };

      setLocalComments([...localComments, comment]);
      setNewComment("");
      toast({
        description: "تم إضافة تعليقك بنجاح",
        duration: 2000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "حدث خطأ أثناء إضافة التعليق",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://source.unsplash.com/random/100x100/?portrait";
                toast({
                  description: "تعذر تحميل صورة الملف الشخصي",
                  duration: 2000,
                });
              }}
            />
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
        </div>
        
        <p className="text-gray-600 mb-4">{post.description}</p>
        
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://source.unsplash.com/random/800x600/?egypt,business";
            toast({
              description: "تعذر تحميل صورة المنشور",
              duration: 2000,
            });
          }}
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
                      {post.analysis.sentiment === "positive" ? "إيجابي" : 
                       post.analysis.sentiment === "negative" ? "سلبي" : "محايد"}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تحليل محتوى المنشور</p>
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
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{localComments.length}</span>
            </button>
          </div>
          <button className="hover:text-blue-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Add Comment Section */}
        <div className="mt-4 flex items-start space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="المستخدم الحالي" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="أضف تعليقاً..."
              className="min-h-[60px] mb-2"
            />
            <Button 
              onClick={handleAddComment}
              disabled={isSubmitting}
              className="flex items-center"
            >
              {isSubmitting ? "جارٍ الإرسال..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  إرسال التعليق
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-4 space-y-4">
          {localComments.map((comment) => (
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
                <div className="font-medium">{comment.author.name}</div>
                <p className="text-gray-600">{comment.content}</p>
                <div className="text-gray-400 text-xs">{comment.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>الملف الشخصي</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              <p className="text-gray-500">{post.author.role}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;