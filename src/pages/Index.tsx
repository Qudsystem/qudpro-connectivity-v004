import Hero from "@/components/Hero";
import PhotoGrid from "@/components/PhotoGrid";
import ProfileCard from "@/components/ProfileCard";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, BookOpen, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <ProfileCard />
              <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Platform Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 mr-2" />
                    <span>5,234 Professionals</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>1,890 Jobs Posted</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>342 Articles</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>56 Upcoming Events</span>
                  </div>
                </div>
              </Card>
              <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                Powered by QudSystem
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-4 mb-6 bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">JD</span>
                </div>
                <button className="flex-1 text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Share your thoughts or photos...
                </button>
              </div>
            </Card>
            <PhotoGrid />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 mb-6 bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Trending in Egypt</h3>
              <div className="space-y-4">
                {['Cairo Tech Week', 'Photography Exhibition', 'Digital Innovation', 'Egyptian Startups'].map((topic, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100 hover:text-qudpro-primary dark:hover:text-blue-400 cursor-pointer">
                      #{topic.replace(/\s+/g, '')}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{Math.floor(Math.random() * 1000) + 100} posts</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent News</h3>
              <div className="space-y-4">
                {[
                  'New Photography Studio Opens in Alexandria',
                  'Egyptian Tech Startups Raise $50M',
                  'Digital Arts Festival Coming to Cairo',
                  'Professional Networking Event Next Month'
                ].map((news, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100 hover:text-qudpro-primary dark:hover:text-blue-400 cursor-pointer">
                      {news}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{Math.floor(Math.random() * 24) + 1}h ago</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;