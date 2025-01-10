import { useState, useEffect } from 'react';
import { defaultProfile, generateProfile } from "@/utils/profileGenerator";
import { toast } from "@/components/ui/use-toast";

export const useProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    // Update profile periodically
    const interval = setInterval(() => {
      const newProfile = generateProfile();
      setProfile(newProfile);
      toast({
        description: "Profile updated with new information",
        duration: 2000,
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const updateProfile = (newData: Partial<typeof defaultProfile>) => {
    setProfile(prev => ({ ...prev, ...newData }));
    toast({
      description: "Profile updated successfully",
      duration: 2000,
    });
  };

  return {
    profile,
    updateProfile,
  };
};