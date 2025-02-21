
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Mail } from "lucide-react";
import { generateRandomPost } from "./PhotoGrid/PostGenerator";
import { useEffect, useState } from "react";

const profileImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

const egyptianCompanies = [
  "QudSystem", "Cairo Tech", "Alexandria Digital", "Delta Solutions",
  "Nile Innovations", "Pyramid Software", "Sphinx Technologies"
];

const locations = [
  "Cairo, Egypt", 
  "Alexandria, Egypt", 
  "Giza, Egypt", 
  "Luxor, Egypt",
  "Aswan, Egypt"
];

const ProfileCard = () => {
  const [randomData, setRandomData] = useState({
    name: "",
    role: "",
    avatar: "",
    location: "",
    company: ""
  });

  useEffect(() => {
    const randomPost = generateRandomPost(Date.now());
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
    const randomCompany = egyptianCompanies[Math.floor(Math.random() * egyptianCompanies.length)];

    setRandomData({
      name: randomPost.author.name,
      role: randomPost.author.role,
      avatar: randomImage,
      location: randomLocation,
      company: randomCompany
    });
  }, []);

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={randomData.avatar}
            alt={randomData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            Online
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1">
          {randomData.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {randomData.role}
        </p>

        <div className="w-full space-y-2 mb-4">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{randomData.location}</span>
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <LinkIcon className="w-4 h-4 mr-1" />
            <span>{randomData.company}</span>
          </div>
        </div>

        <Button className="w-full mb-2">
          Connect
        </Button>
        <Button variant="outline" className="w-full">
          Message
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
