import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: "Ahmed Hassan",
      avatar: "https://source.unsplash.com/random/40x40/?man",
      lastMessage: "Thanks for connecting!",
      time: "2m ago",
      unread: true
    },
    {
      id: 2,
      name: "Sara Ahmed",
      avatar: "https://source.unsplash.com/random/40x40/?woman",
      lastMessage: "The project looks great!",
      time: "1h ago",
      unread: false
    },
    {
      id: 3,
      name: "Mohamed Kamal",
      avatar: "https://source.unsplash.com/random/40x40/?person",
      lastMessage: "When can we meet?",
      time: "3h ago",
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <Card className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    conversation.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-semibold truncate">
                        {conversation.name}
                      </h4>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 p-4 flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex items-center space-x-4 border-b pb-4">
              <img
                src={conversations[0].avatar}
                alt={conversations[0].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{conversations[0].name}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {/* Chat messages would go here */}
            </div>

            <div className="border-t pt-4">
              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;