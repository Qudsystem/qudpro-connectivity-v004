import { Button } from "@/components/ui/button";
import { Camera, MapPin, Briefcase, Link2, Users, Pencil, Globe, School, Plus } from "lucide-react";
import Hero from "@/components/Hero";
import { useProfile } from "@/hooks/useProfile";
import { Card } from "@/components/ui/card";
import { ProfileAnalytics } from "@/components/profile/ProfileAnalytics";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { ProfileExperience } from "@/components/profile/ProfileExperience";
import { ProfileEducation } from "@/components/profile/ProfileEducation";

const Profile = () => {
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader profile={profile} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileAbout profile={profile} />
            <ProfileAnalytics profile={profile} />
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;