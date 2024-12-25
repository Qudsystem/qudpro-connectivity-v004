import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Calendar, Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { WorkItem } from "@/types";
import { toast } from "sonner";
import WorkItemCard from "@/components/WorkItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Work = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const workItems: WorkItem[] = [
    {
      id: 1,
      title: "Photography Project Management",
      icon: <Briefcase className="h-6 w-6" />,
      description: "Track and manage your ongoing photography projects",
      count: 5,
      type: "project"
    },
    {
      id: 2,
      title: "Content Calendar",
      icon: <FileText className="h-6 w-6" />,
      description: "Plan and schedule your content posts",
      count: 12,
      type: "content"
    },
    {
      id: 3,
      title: "Photography Events",
      icon: <Calendar className="h-6 w-6" />,
      description: "Upcoming photography events and workshops",
      count: 3,
      type: "event"
    },
    {
      id: 4,
      title: "Professional Groups",
      icon: <Users className="h-6 w-6" />,
      description: "Photography communities and networking",
      count: 8,
      type: "group"
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddItem = () => {
    toast.success("Feature coming soon!");
  };

  const filteredItems = workItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByType = (type: string) => {
    if (type === "all") return filteredItems;
    return filteredItems.filter(item => item.type === type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Dashboard</h1>
            <Button onClick={handleAddItem} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search work items..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
              <TabsTrigger value="project" onClick={() => setActiveTab("project")}>Projects</TabsTrigger>
              <TabsTrigger value="content" onClick={() => setActiveTab("content")}>Content</TabsTrigger>
              <TabsTrigger value="event" onClick={() => setActiveTab("event")}>Events</TabsTrigger>
              <TabsTrigger value="group" onClick={() => setActiveTab("group")}>Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredByType("all").map((item) => (
                  <WorkItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            {["project", "content", "event", "group"].map((type) => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredByType(type).map((item) => (
                    <WorkItemCard key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Work;