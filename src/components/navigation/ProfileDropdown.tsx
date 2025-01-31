import { Settings, User, HelpCircle, LogOut } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useProfile();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Help center is under construction.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt={profile.name} />
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
      <DropdownMenuContent 
        className="w-64 mt-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700" 
        align="end"
      >
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt={profile.name} />
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
    </DropdownMenu>
  );
};