import { User, MapPin, Users, Briefcase, Link2, Camera } from "lucide-react";
import { Card } from "./ui/card";
import { defaultProfile } from "@/utils/profileGenerator";

const ProfileCard = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-qudpro-primary to-blue-700"></div>
      <div className="px-6 pb-6">
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-qudpro-primary cursor-pointer">
              {defaultProfile.name}
            </h3>
            <p className="text-sm text-gray-600">{defaultProfile.role}</p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>{defaultProfile.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{defaultProfile.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              <a href="#" className="text-blue-600 hover:underline">{defaultProfile.website}</a>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{defaultProfile.connections}+ connections</span>
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

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Profile Analytics</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="text-qudpro-primary">{defaultProfile.views}</span> profile views
              </p>
              <p className="text-gray-600">
                <span className="text-qudpro-primary">{defaultProfile.impressions}</span> post impressions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;