import { Camera, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-fade-up space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-gray-900">
            Welcome to QudPro
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-gray-600">
            Connecting Egyptian professionals through visual storytelling
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Share Your Story</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Connect with Professionals</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-4 text-xs text-gray-500">
        Powered by QudSystem
      </div>
    </div>
  );
};

export default Hero;