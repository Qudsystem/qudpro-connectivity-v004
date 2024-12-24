import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Network = () => {
  const suggestions = [
    {
      id: 1,
      name: "Sara Ahmed",
      role: "UI/UX Designer",
      company: "Tech Solutions Egypt",
      avatar: "https://source.unsplash.com/random/40x40/?woman",
      mutualConnections: 12
    },
    {
      id: 2,
      name: "Mohamed Kamal",
      role: "Software Engineer",
      company: "Cairo Digital",
      avatar: "https://source.unsplash.com/random/40x40/?man",
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Nour Ibrahim",
      role: "Product Manager",
      company: "Innovation Hub",
      avatar: "https://source.unsplash.com/random/40x40/?girl",
      mutualConnections: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connection Stats */}
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Your Network</h3>
                <p className="text-gray-600">500+ connections</p>
              </div>
            </div>
          </Card>

          {/* Connection Suggestions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">People you may know</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((person) => (
                <Card key={person.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.role}</p>
                      <p className="text-sm text-gray-600">{person.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {person.mutualConnections} mutual connections
                      </p>
                      <Button className="mt-3 w-full">Connect</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;