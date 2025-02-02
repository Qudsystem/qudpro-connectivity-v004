import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ProfileType } from "@/types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileType;
  onSave: (updatedProfile: Partial<ProfileType>) => void;
}

export const EditProfileModal = ({ isOpen, onClose, profile, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    company: profile.company,
    location: profile.location,
    about: profile.about,
    website: profile.website,
    email: profile.email,
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'profile') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'cover') {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
      } else {
        setProfileImage(file);
        setProfilePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically upload images to your storage service
      // and get back URLs to store in the profile
      
      const updatedProfile = {
        ...formData,
        // In a real app, you'd use the URLs from your storage service
        avatar: profilePreview || profile.avatar,
        coverImage: coverPreview || undefined,
      };

      onSave(updatedProfile);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Cover Image Upload */}
            <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {(coverPreview || profile.coverImage) && (
                <img
                  src={coverPreview || profile.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <Label
                htmlFor="cover-upload"
                className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Camera className="w-5 h-5" />
                <Input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'cover')}
                />
              </Label>
            </div>

            {/* Profile Image Upload */}
            <div className="relative w-24 h-24 mx-auto -mt-12">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700">
                <img
                  src={profilePreview || profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Camera className="w-4 h-4" />
                <Input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'profile')}
                />
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};