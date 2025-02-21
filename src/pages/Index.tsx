
import Hero from "@/components/Hero";
import PhotoGrid from "@/components/PhotoGrid";
import { PostCreator } from "@/components/PostCreator/PostCreator";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, BookOpen, Calendar } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import type { PlatformStats } from "@/types";
import { AnimatedLogo } from "@/components/ui/animated-logo";

const platformStats: PlatformStats = {
  professionals: 5234,
  jobsPosted: 1890,
  articles: 342,
  upcomingEvents: 56
};

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="text-center p-4">
      <h2 className="text-lg font-semibold text-red-600">Something went wrong:</h2>
      <pre className="text-sm text-gray-500">{error.message}</pre>
    </div>
  );
};

const Index = () => {
  const isAuthenticated = false;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
          <div className="text-center mb-8">
            <AnimatedLogo className="mb-4" />
            <p className="text-lg text-muted-foreground">
              Connect with professionals across Egypt
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ProfileCard />
                </ErrorBoundary>
                <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Platform Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{platformStats.professionals.toLocaleString()} Professionals</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{platformStats.jobsPosted.toLocaleString()} Jobs Posted</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{platformStats.articles.toLocaleString()} Articles</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{platformStats.upcomingEvents.toLocaleString()} Upcoming Events</span>
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
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PostCreator />
                <PhotoGrid />
              </ErrorBoundary>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
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
              </ErrorBoundary>
            </div>
          </div>
        </div>
        {!isAuthenticated && <Footer />}
      </ErrorBoundary>
    </div>
  );
};

export default Index;
