import { User } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-center mb-4">
        <div className="w-20 h-20 bg-qudpro-primary rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-qudpro-primary">John Doe</h3>
        <p className="text-gray-600 mb-4">Professional Photographer</p>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Cairo, Egypt</div>
          <div className="text-sm text-gray-500">500+ Connections</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;