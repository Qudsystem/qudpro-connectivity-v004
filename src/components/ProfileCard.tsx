import { User, MapPin, Users } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700"></div>
      <div className="px-4 py-4">
        <div className="relative -mt-12 mb-3">
          <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
            <User className="w-10 h-10 text-gray-500" />
          </div>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            John Doe
          </h3>
          <p className="text-sm text-gray-600">Professional Photographer</p>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Cairo, Egypt</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>500+ connections</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;