import { Image, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Post } from "@/types";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const photos: Post[] = [
  {
    id: 1,
    title: "Cairo Business District",
    category: "Professional",
    description: "Capturing the essence of modern business in Egypt's capital",
    imageUrl: "https://source.unsplash.com/random/800x600/?cairo,business",
    author: {
      name: "Ahmed Hassan",
      role: "Architectural Photographer",
      avatar: "https://source.unsplash.com/random/40x40/?portrait"
    },
    likes: 234,
    comments: 45,
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    title: "Alexandria Port",
    category: "Industrial",
    description: "A glimpse into Egypt's maritime commerce hub",
    imageUrl: "https://source.unsplash.com/random/800x600/?alexandria,port",
    author: {
      name: "Sara Ahmed",
      role: "Industrial Photographer",
      avatar: "https://source.unsplash.com/random/40x40/?woman"
    },
    likes: 187,
    comments: 32,
    timeAgo: "5 hours ago"
  },
  {
    id: 3,
    title: "Tech Hub",
    category: "Technology",
    description: "Inside Egypt's growing tech ecosystem",
    imageUrl: "https://source.unsplash.com/random/800x600/?office,tech",
    author: {
      name: "Mohamed Kamal",
      role: "Tech Photographer",
      avatar: "https://source.unsplash.com/random/40x40/?man"
    },
    likes: 342,
    comments: 67,
    timeAgo: "1 day ago"
  },
  {
    id: 4,
    title: "Creative Space",
    category: "Design",
    description: "Where creativity meets productivity in Cairo",
    imageUrl: "https://source.unsplash.com/random/800x600/?creative,office",
    author: {
      name: "Nour Ibrahim",
      role: "Interior Photographer",
      avatar: "https://source.unsplash.com/random/40x40/?girl"
    },
    likes: 156,
    comments: 28,
    timeAgo: "2 days ago"
  },
];

const PhotoGrid = () => {
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      toast({
        description: "Post unliked",
        duration: 2000,
      });
    } else {
      setLikedPosts(prev => [...prev, postId]);
      toast({
        description: "Post liked!",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {photos.map((photo) => (
        <Card key={photo.id} className="overflow-hidden animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={photo.author.avatar}
                  alt={photo.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900 hover:text-qudpro-primary cursor-pointer">
                    {photo.author.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    <p>{photo.author.role}</p>
                    <p>{photo.timeAgo}</p>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{photo.description}</p>
            
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-[400px] object-cover rounded-lg"
              loading="lazy"
            />
            
            <div className="mt-4 flex items-center justify-between text-gray-500">
              <div className="flex space-x-6">
                <button 
                  className={`flex items-center space-x-1 transition-colors ${
                    likedPosts.includes(photo.id) ? 'text-blue-600' : 'hover:text-blue-600'
                  }`}
                  onClick={() => handleLike(photo.id)}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{likedPosts.includes(photo.id) ? photo.likes + 1 : photo.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{photo.comments}</span>
                </button>
              </div>
              <button className="hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGrid;
