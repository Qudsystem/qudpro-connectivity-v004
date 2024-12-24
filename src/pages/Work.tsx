import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Calendar, Users } from "lucide-react";

const Work = () => {
  const workItems = [
    {
      id: 1,
      title: "My Jobs",
      icon: <Briefcase className="h-6 w-6" />,
      description: "View and manage your job applications",
      count: 5
    },
    {
      id: 2,
      title: "My Posts",
      icon: <FileText className="h-6 w-6" />,
      description: "Manage your published content",
      count: 12
    },
    {
      id: 3,
      title: "Events",
      icon: <Calendar className="h-6 w-6" />,
      description: "Upcoming professional events",
      count: 3
    },
    {
      id: 4,
      title: "Groups",
      icon: <Users className="h-6 w-6" />,
      description: "Your professional communities",
      count: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Work</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workItems.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-qudpro-primary/10 rounded-lg">
                    {item.icon}
                  </div>
                  {item.count > 0 && (
                    <span className="bg-qudpro-primary text-white px-2 py-1 rounded-full text-sm">
                      {item.count}
                    </span>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;