import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Link as LinkIcon, TrendingUp, Users, Brain } from "lucide-react";
import { Progress } from "./ui/progress";

const ProfileCard = () => {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
      <div className="text-center mb-6">
        <img
          src="https://github.com/shadcn.png"
          alt="Ahmed Hassan"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-700 shadow-lg"
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ahmed Hassan</h2>
        <p className="text-gray-600 dark:text-gray-300">Senior Software Engineer</p>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Cairo, Egypt</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Profile Strength</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Skills & Endorsements</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">React</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">42 endorsements</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">TypeScript</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">38 endorsements</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Node.js</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">25 endorsements</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Profile Analytics</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>1475 profile views</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span>500+ connections</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Brain className="w-4 h-4 mr-2" />
              <span>2891 post impressions</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1">Connect</Button>
          <Button variant="outline" className="flex-1">Message</Button>
        </div>

        <div className="text-sm text-center">
          <a 
            href="https://qudsystem.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-center"
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            qudsystem.com
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;