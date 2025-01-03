import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Briefcase, Link2, Users } from "lucide-react";
import Hero from "@/components/Hero";
import { defaultProfile } from "@/utils/profileGenerator";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-qudpro-primary to-blue-700"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="w-32 h-32 mx-auto bg-white rounded-full border-4 border-white shadow-lg">
                    <img
                      src="https://source.unsplash.com/random/128x128/?portrait"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                    <Camera className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="text-center space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{defaultProfile.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{defaultProfile.role}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{defaultProfile.company}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{defaultProfile.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Link2 className="w-4 h-4" />
                      <a href="#" className="text-blue-600 hover:underline">{defaultProfile.website}</a>
                    </div>
                  </div>
                  
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {defaultProfile.about}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Lead Photographer</h4>
                    <p className="text-sm text-gray-600">{defaultProfile.company} • 2020 - Present</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Leading commercial photography projects and managing a team of photographers.
                    </p>
                  </div>
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