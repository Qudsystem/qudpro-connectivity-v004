import { Camera, Users, Search, Bell, MessageCircle, Home, Briefcase, Grid } from "lucide-react";
import { Input } from "./ui/input";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./navigation/NavItem";
import { ProfileDropdown } from "./navigation/ProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Hero = () => {
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-qudpro-primary to-qudpro-secondary bg-clip-text text-transparent dark:from-white dark:to-gray-300 transition-colors duration-300"
            >
              QudPro
            </Link>
            <div className="hidden md:block ml-10">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
            
            <ProfileDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/notifications" className="w-full">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
                {/* Recent notifications preview */}
                <DropdownMenuItem className="cursor-pointer">
                  New message from Ahmed
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Mohamed liked your post
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  New job matching your profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;