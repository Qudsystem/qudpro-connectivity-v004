import { Camera, Users, Search, Bell, MessageCircle, Home, Briefcase, Grid } from "lucide-react";
import { Input } from "./ui/input";

const Hero = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-qudpro-primary">QudPro</h1>
            <div className="hidden md:block ml-10">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItem icon={<Home className="h-6 w-6" />} label="Home" active />
            <NavItem icon={<Users className="h-6 w-6" />} label="Network" />
            <NavItem icon={<Briefcase className="h-6 w-6" />} label="Jobs" />
            <NavItem icon={<MessageCircle className="h-6 w-6" />} label="Messages" />
            <NavItem icon={<Bell className="h-6 w-6" />} label="Notifications" count={3} />
            <NavItem icon={<Grid className="h-6 w-6" />} label="Work" />
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600">
              <Bell className="h-6 w-6" />
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

const NavItem = ({ icon, label, active = false, count }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  count?: number;
}) => {
  return (
    <button className="flex flex-col items-center text-gray-500 hover:text-qudpro-primary relative">
      <div className={`p-1 rounded-lg ${active ? 'text-qudpro-primary' : ''}`}>
        {icon}
        {count && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
      <span className="text-xs mt-0.5">{label}</span>
    </button>
  );
};

export default Hero;