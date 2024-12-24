import { useState } from "react";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Bell, UserPlus, Heart, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  type: "connection" | "like" | "message" | "job";
  content: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "connection",
      content: "Ahmed Hassan wants to connect with you",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "like",
      content: "Sara Ahmed liked your post about photography",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "message",
      content: "New message from Mohamed Kamal",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "job",
      content: "New job matching your profile: Senior Photographer at Cairo Studio",
      time: "2 days ago",
      read: true
    }
  ]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "connection":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "job":
        return <Briefcase className="h-5 w-5 text-purple-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          </div>
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors ${
                notification.read
                  ? "bg-white dark:bg-gray-800"
                  : "bg-blue-50 dark:bg-blue-900/20"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100">{notification.content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;