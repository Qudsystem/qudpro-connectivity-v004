import { Button } from "@/components/ui/button";
import { Camera, MapPin, Briefcase, Link2, Users, Pencil, Globe, School, Plus, MessageCircle, ThumbsUp } from "lucide-react";
import Hero from "@/components/Hero";
import { useProfile } from "@/hooks/useProfile";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { generateProfile } from "@/utils/profileGenerator";

const Profile = () => {
  const { profile: initialProfile } = useProfile();
  const [profile, setProfile] = useState(initialProfile);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Excited to share my latest photography project in Cairo! 📸",
      likes: 45,
      comments: 12,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      content: "Great meeting with fellow photographers at QudPro Studios today! 🤝",
      likes: 32,
      comments: 8,
      timeAgo: "5h ago"
    }
  ]);

  // Update profile data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newProfile = generateProfile();
      setProfile(newProfile);
      toast({
        description: "Profile information updated",
        duration: 2000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    toast({
      description: "Post liked!",
      duration: 1500,
    });
  };

  const handleComment = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
    toast({
      description: "Comment added!",
      duration: 1500,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image and Profile Section */}
        <Card className="overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-qudpro-primary to-blue-700 relative">
            <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4 flex justify-between items-end">
              <div className="flex items-end">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg">
                    <img
                      src={profile.avatar || "https://github.com/shadcn.png"}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="ml-4 mb-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    {profile.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{profile.role}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Pencil className="w-4 h-4" /> Edit Profile
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Connect
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About Section */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">About</h3>
                <Button variant="ghost" size="sm">
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{profile.about}</p>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <Button variant="ghost" size="sm">
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a href={profile.website} className="text-blue-600 hover:underline">{profile.website}</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{profile.company}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Posts Section */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Posts</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Create Post
                </Button>
              </div>
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 hover:text-blue-600"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes} Likes</span>
                        </button>
                        <button 
                          onClick={() => handleComment(post.id)}
                          className="flex items-center space-x-1 hover:text-blue-600"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments} Comments</span>
                        </button>
                      </div>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;