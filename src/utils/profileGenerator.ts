const arabicNames = [
  "Ahmed Hassan",
  "Mohamed Ali",
  "Omar Ibrahim",
  "Youssef Ahmed",
  "Khaled Mohamed",
  "Mahmoud Samir",
  "Karim Adel",
  "Mostafa Ibrahim",
  "Amr Yasser",
  "Tarek Mahmoud",
  "Nour El Din",
  "Ziad Ahmed",
  "Hossam Hassan",
  "Sherif Mohamed",
  "Ayman Khalil"
];

const roles = [
  "Professional Photographer",
  "Architectural Photographer",
  "Commercial Photographer",
  "Wedding Photographer",
  "Fashion Photographer",
  "Portrait Photographer",
  "Event Photographer",
  "Product Photographer",
  "Travel Photographer",
  "Food Photographer",
  "Creative Director",
  "Visual Artist",
  "Photography Consultant",
  "Studio Manager",
  "Digital Imaging Specialist"
];

const companies = [
  "Cairo Art Studio",
  "Egyptian Lens",
  "Pyramid Pictures",
  "Nile Photography",
  "Alexandria Visual Arts",
  "Delta Images",
  "Luxor Photography",
  "Aswan Studios",
  "Red Sea Media",
  "Giza Photography",
  "QudPro Studios",
  "Pharaoh Media Group",
  "Mediterranean Visuals",
  "Desert Light Photography",
  "Valley of Kings Studio"
];

const locations = [
  "Cairo, Egypt",
  "Alexandria, Egypt",
  "Giza, Egypt",
  "Luxor, Egypt",
  "Aswan, Egypt",
  "Hurghada, Egypt",
  "Sharm El Sheikh, Egypt",
  "Mansoura, Egypt",
  "Port Said, Egypt",
  "Ismailia, Egypt",
  "6th of October City, Egypt",
  "New Cairo, Egypt",
  "El Gouna, Egypt",
  "Dahab, Egypt",
  "Marsa Alam, Egypt"
];

export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  website: string;
  email: string;
  connections: number;
  views: number;
  impressions: number;
  about: string;
  avatar?: string;
}

const aboutTemplates = [
  "Professional {role} with extensive experience in the Egyptian market. Based in {location} and currently working at {company}. Passionate about capturing the essence of Egyptian culture and landscapes through the lens.",
  "Experienced {role} specializing in Egyptian visual storytelling. Currently contributing to {company}'s success in {location}. Dedicated to showcasing Egypt's beauty through professional photography.",
  "Creative {role} based in {location}, bringing Egyptian stories to life through visual media. Leading projects at {company} with a focus on cultural preservation and modern interpretation.",
];

export const generateProfile = (): Profile => {
  const randomIndex = Math.floor(Math.random() * arabicNames.length);
  const name = arabicNames[randomIndex];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const username = name.toLowerCase().replace(' ', '');
  
  const aboutTemplate = aboutTemplates[Math.floor(Math.random() * aboutTemplates.length)];
  const about = aboutTemplate
    .replace('{role}', role.toLowerCase())
    .replace('{location}', location)
    .replace('{company}', company);

  return {
    name,
    role,
    company,
    location,
    website: `${username}.qudpro.com`,
    email: `${username}@qudpro.com`,
    connections: Math.floor(Math.random() * 900) + 100,
    views: Math.floor(Math.random() * 100) + 1,
    impressions: Math.floor(Math.random() * 200) + 1,
    about,
    avatar: `https://source.unsplash.com/random/200x200/?portrait&sig=${Date.now()}`,
  };
};

export const defaultProfile = generateProfile();
