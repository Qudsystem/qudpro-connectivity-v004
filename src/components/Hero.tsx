import { Camera, Users, Search, Bell } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-qudpro-primary">QudPro</h1>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-qudpro-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-qudpro-primary">
              <Camera className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-qudpro-primary">
              <Users className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-qudpro-primary relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;