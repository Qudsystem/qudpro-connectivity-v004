import { Camera, Users, Search, Bell, MessageCircle, Home, Briefcase, Grid } from "lucide-react";
import { Input } from "./ui/input";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-qudpro-primary">
              QudPro
            </Link>
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
            <NavItem to="/" icon={<Home className="h-6 w-6" />} label="Home" active={location.pathname === '/'} />
            <NavItem to="/network" icon={<Users className="h-6 w-6" />} label="Network" active={location.pathname === '/network'} />
            <NavItem to="/jobs" icon={<Briefcase className="h-6 w-6" />} label="Jobs" active={location.pathname === '/jobs'} />
            <NavItem to="/messages" icon={<MessageCircle className="h-6 w-6" />} label="Messages" active={location.pathname === '/messages'} />
            <NavItem to="/notifications" icon={<Bell className="h-6 w-6" />} label="Notifications" count={3} active={location.pathname === '/notifications'} />
            <NavItem to="/work" icon={<Grid className="h-6 w-6" />} label="Work" active={location.pathname === '/work'} />
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2"></div>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">JD</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300">
              <Bell className="h-6 w-6" />
            </button>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">JD</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, count, to }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  count?: number;
  to: string;
}) => {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-qudpro-primary dark:hover:text-white relative">
      <div className={`p-1 rounded-lg ${active ? 'text-qudpro-primary dark:text-white' : ''}`}>
        {icon}
        {count && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
      <span className="text-xs mt-0.5">{label}</span>
    </Link>
  );
};

export default Hero;