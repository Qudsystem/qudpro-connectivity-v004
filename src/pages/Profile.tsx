import { Button } from "@/components/ui/button";
import { Camera, MapPin, Briefcase, Link2, Users, Pencil, Globe, School, Plus } from "lucide-react";
import Hero from "@/components/Hero";
import { useProfile } from "@/hooks/useProfile";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { profile } = useProfile();

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
                      src="https://github.com/shadcn.png"
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="ml-4 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
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
            {/* Experience Section */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Experience</h3>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Lead Photographer</h4>
                    <p className="text-sm text-gray-600">{profile.company} • 2020 - Present</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Leading commercial photography projects and managing a team of photographers.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Education Section */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Education</h3>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <School className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Cairo University</h4>
                  <p className="text-sm text-gray-600">Bachelor's in Photography and Visual Arts</p>
                  <p className="text-sm text-gray-600">2016 - 2020</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;