import { User, MapPin, Users, Briefcase, Link2, Camera, Award, ChartBar } from "lucide-react";
import { Card } from "./ui/card";
import { defaultProfile } from "@/utils/profileGenerator";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { generateProfile } from "@/utils/profileGenerator";
import { Progress } from "./ui/progress";

const ProfileCard = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [profileStrength, setProfileStrength] = useState(75); // Example value

  // Update profile data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newProfile = generateProfile();
      setProfile(newProfile);
      toast({
        description: "Profile updated with new information",
        duration: 2000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: "React", endorsements: 42 },
    { name: "TypeScript", endorsements: 38 },
    { name: "Node.js", endorsements: 25 },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-qudpro-primary to-blue-700"></div>
      <div className="px-6 pb-6">
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
                toast({
                  description: "Profile image failed to load, showing fallback image",
                  duration: 2000,
                });
              }}
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-qudpro-primary cursor-pointer">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-600">{profile.role}</p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>{profile.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              <a href="#" className="text-blue-600 hover:underline">{profile.website}</a>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{profile.connections}+ connections</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-qudpro-primary text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
              Connect
            </button>
            <button className="flex-1 border border-qudpro-primary text-qudpro-primary py-2 px-4 rounded-full hover:bg-blue-50 transition-colors">
              Message
            </button>
          </div>

          {/* Profile Strength Indicator */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Profile Strength</h4>
              <span className="text-sm text-qudpro-primary">{profileStrength}%</span>
            </div>
            <Progress value={profileStrength} className="h-2" />
          </div>

          {/* Skills Section */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Skills & Endorsements</h4>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-qudpro-primary" />
                    <span className="text-sm text-gray-600">{skill.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{skill.endorsements} endorsements</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Profile Analytics</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="text-qudpro-primary">{profile.views}</span> profile views
              </p>
              <p className="text-gray-600">
                <span className="text-qudpro-primary">{profile.impressions}</span> post impressions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;