interface Profile {
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
}

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
  "Tarek Mahmoud"
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
  "Food Photographer"
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
  "Giza Photography"
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
  "Ismailia, Egypt"
];

export const generateProfile = (): Profile => {
  const randomIndex = Math.floor(Math.random() * arabicNames.length);
  const name = arabicNames[randomIndex];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const username = name.toLowerCase().replace(' ', '');

  return {
    name,
    role,
    company,
    location,
    website: `${username}.portfolio.com`,
    email: `${username}@qudpro.com`,
    connections: Math.floor(Math.random() * 900) + 100,
    views: Math.floor(Math.random() * 100) + 1,
    impressions: Math.floor(Math.random() * 200) + 1,
    about: `Professional photographer with extensive experience in ${role.toLowerCase()}. Passionate about capturing the essence of Egyptian culture and landscapes through the lens.`
  };
};

export const defaultProfile = generateProfile();