import { useEffect, useState } from 'react';
import { Users, Briefcase, BookOpen, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const PlatformStats = () => {
  const [stats, setStats] = useState({
    professionals: 5234,
    jobsPosted: 1890,
    articles: 342,
    upcomingEvents: 56
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        professionals: prev.professionals + Math.floor(Math.random() * 3),
        jobsPosted: prev.jobsPosted + Math.floor(Math.random() * 2),
        articles: prev.articles + Math.floor(Math.random() * 1),
        upcomingEvents: 50 + Math.floor(Math.random() * 10)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">إحصائيات المنصة</h3>
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Users className="w-4 h-4 ml-2" />
          <span className="stat-number">{stats.professionals.toLocaleString()} محترف</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Briefcase className="w-4 h-4 ml-2" />
          <span className="stat-number">{stats.jobsPosted.toLocaleString()} وظيفة</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <BookOpen className="w-4 h-4 ml-2" />
          <span className="stat-number">{stats.articles.toLocaleString()} مقال</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 ml-2" />
          <span className="stat-number">{stats.upcomingEvents.toLocaleString()} فعالية قادمة</span>
        </div>
      </div>
    </Card>
  );
};