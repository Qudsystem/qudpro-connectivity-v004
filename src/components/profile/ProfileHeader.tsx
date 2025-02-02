import { Button } from "@/components/ui/button";
import { Camera, MapPin, Plus, Pencil } from "lucide-react";
import { ProfileType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileHeaderProps {
  profile: ProfileType;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = (updatedProfile: Partial<ProfileType>) => {
    // Here you would typically make an API call to update the profile
    // For now, we'll just show a success message
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-qudpro-primary to-blue-700 relative">
          <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <div className="flex items-end">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={profile.avatar || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
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
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="ml-4 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">{profile.role}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Pencil className="w-4 h-4" /> Edit Profile
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Connect
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
    </>
  );
};