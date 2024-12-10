import { Camera, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-qudpro-primary to-qudpro-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-fade-up space-y-8">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-center">
            Welcome to QudPro
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Connecting Egyptian professionals through visual storytelling
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Camera className="w-6 h-6" />
              <span>Share Your Story</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Connect with Professionals</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4 text-sm text-gray-300">
        Powered by QudSystem
      </div>
    </div>
  );
};

export default Hero;