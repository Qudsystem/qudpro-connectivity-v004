import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Bell, UserPlus, Heart, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/types";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "post",
      content: "تم نشر منشورك عن الذكاء الاصطناعي بنجاح",
      postId: 123,
      timeAgo: "منذ ساعتين",
      read: false
    },
    {
      id: 2,
      type: "comment",
      content: "علق أحمد حسن على منشورك",
      postId: 124,
      timeAgo: "منذ 5 ساعات",
      read: false
    },
    {
      id: 3,
      type: "like",
      content: "أعجب محمد علي بمنشورك",
      postId: 125,
      timeAgo: "منذ يوم",
      read: true
    },
    {
      id: 4,
      type: "connection",
      content: "طلب سارة أحمد الاتصال بك",
      timeAgo: "منذ يومين",
      read: true
    }
  ]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "post":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "connection":
        return <UserPlus className="h-5 w-5 text-purple-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.postId) {
      navigate(`/post/${notification.postId}`);
    }
    markAsRead(notification.id);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الإشعارات</h1>
          </div>
          <Button variant="outline" onClick={markAllAsRead}>
            تحديد الكل كمقروء
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                notification.read
                  ? "bg-white dark:bg-gray-800"
                  : "bg-blue-50 dark:bg-blue-900/20"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100">{notification.content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.timeAgo}</p>
                </div>
                {notification.postId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/post/${notification.postId}`);
                    }}
                  >
                    عرض المنشور
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