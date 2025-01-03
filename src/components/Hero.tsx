import { Camera, Users, Search, Bell, MessageCircle, Home, Briefcase, Grid, LogOut, Settings, User, HelpCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultProfile } from "@/utils/profileGenerator";

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const profile = defaultProfile;

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Settings page is under construction.",
    });
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Help center is under construction.",
    });
  };

  const ProfileDropdown = () => (
    <DropdownMenuContent 
      className="w-64 mt-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700" 
      align="end"
    >
      <DropdownMenuLabel className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-qudpro-primary text-white">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{profile.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="my-1 border-gray-200 dark:border-gray-700" />
      <DropdownMenuGroup>
        <DropdownMenuItem 
          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={() => navigate('/profile')}
        >
          <User className="mr-3 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={handleSettingsClick}
        >
          <Settings className="mr-3 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={handleHelpClick}
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          <span>Help Center</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="my-1 border-gray-200 dark:border-gray-700" />
      <DropdownMenuItem 
        className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-red-600 dark:text-red-400"
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-qudpro-primary text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{profile.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <ProfileDropdown />
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300">
              <Bell className="h-6 w-6" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-qudpro-primary text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <ProfileDropdown />
            </DropdownMenu>
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