import { User, MapPin, Users, Briefcase, Link2 } from "lucide-react";
import { Card } from "./ui/card";

const ProfileCard = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-qudpro-primary to-blue-700"></div>
      <div className="px-6 pb-6">
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-qudpro-primary cursor-pointer">
              John Doe
            </h3>
            <p className="text-sm text-gray-600">Professional Photographer</p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Freelance Photographer</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Cairo, Egypt</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              <a href="#" className="text-blue-600 hover:underline">portfolio.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>500+ connections</span>
            </div>
          </div>
          
          <button className="w-full bg-qudpro-primary text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
            Connect
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;