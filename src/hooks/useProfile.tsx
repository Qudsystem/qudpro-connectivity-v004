import { defaultProfile } from "@/utils/profileGenerator";

export const useProfile = () => {
  // For now we'll use the defaultProfile, but this could be expanded to fetch from an API
  return {
    profile: defaultProfile,
  };
};