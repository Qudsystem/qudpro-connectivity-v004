import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { ProfileExperience } from "@/components/profile/ProfileExperience";
import { ProfileEducation } from "@/components/profile/ProfileEducation";
import { ProfileSkills } from "@/components/profile/ProfileSkills";
import { ProfileStrength } from "@/components/profile/ProfileStrength";
import { ProfileAnalytics } from "@/components/profile/ProfileAnalytics";

const Profile = () => {
  const { profile } = useProfile();

  const mockSkills = [
    { name: "React", endorsements: 42 },
    { name: "TypeScript", endorsements: 38 },
    { name: "Node.js", endorsements: 25 },
    { name: "UI/UX Design", endorsements: 19 },
    { name: "Project Management", endorsements: 15 },
  ];

  const mockStrengthData = {
    strength: 75,
    recommendations: [
      "Add a profile photo to get more views",
      "Write a summary about yourself",
      "Add your recent work experience",
    ],
  };

  const mockAnalytics = {
    views: 324,
    connections: 500,
    impressions: 1205,
    viewsData: [
      { date: "Mon", views: 24 },
      { date: "Tue", views: 13 },
      { date: "Wed", views: 98 },
      { date: "Thu", views: 39 },
      { date: "Fri", views: 48 },
      { date: "Sat", views: 38 },
      { date: "Sun", views: 43 },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader profile={profile} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileStrength {...mockStrengthData} />
            <ProfileAbout profile={profile} />
            <ProfileSkills skills={mockSkills} />
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileAnalytics {...mockAnalytics} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;