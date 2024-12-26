import type { Post } from "@/types";

const egyptianFirstNames = [
  'Ahmed', 'Mohamed', 'Sara', 'Nour', 'Hassan', 'Fatima', 'Youssef', 'Mariam', 'Omar', 'Layla',
  'Khaled', 'Amira', 'Mostafa', 'Rana', 'Karim', 'Dina', 'Amir', 'Yasmin', 'Tarek', 'Heba'
];

const egyptianLastNames = [
  'Ibrahim', 'Hassan', 'Ali', 'Mohamed', 'Ahmed', 'Mahmoud', 'Kamal', 'Samir', 'Farid', 'Zaki',
  'El-Sayed', 'Abdel-Rahman', 'El-Din', 'Mansour', 'Nasser', 'Fouad', 'Saleh', 'Youssef', 'Hamed', 'Rizk'
];

const egyptianRoles = [
  'Software Engineer at QudSystem',
  'Product Designer at Cairo Tech Hub',
  'Marketing Specialist at Alexandria Digital',
  'Content Creator at EgyptianCreatives',
  'Business Developer at Delta Valley',
  'UI/UX Designer at PyramidTech',
  'Project Manager at NileTech',
  'Digital Marketing Manager at CairoInnovates',
  'Professional Photographer at EgyptLens',
  'Startup Founder at EgyptianVentures'
];

const egyptianDescriptions = [
  "Exploring innovative tech solutions in Cairo's bustling startup ecosystem 🚀",
  "Capturing the essence of Alexandria's historic architecture through my lens 📸",
  "Working on exciting projects that shape Egypt's digital future 💡",
  "Collaborating with talented professionals in Egypt's tech hub 🤝",
  "Building bridges between traditional and modern business practices in Egypt 🌉",
  "Showcasing Egyptian creativity through digital innovation ✨",
  "Contributing to Egypt's growing tech community with QudSystem 💻",
  "Developing sustainable solutions for Egyptian businesses 🌱",
  "Creating opportunities in Egypt's digital economy 📱",
  "Innovating at the heart of MENA's tech revolution with QudPro 🔮"
];

const getRandomElement = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const getRandomTimeAgo = () => {
  const times = ['just now', '5m', '10m', '30m', '1h', '2h', '5h', '1d'];
  return getRandomElement(times);
};

export const generateRandomPost = (index: number): Post => {
  const id = Date.now() + index;
  return {
    id,
    title: `Post ${index + 1}`,
    category: getRandomElement(['Professional', 'Technology', 'Business', 'Design', 'Innovation']),
    description: getRandomElement(egyptianDescriptions),
    imageUrl: `https://source.unsplash.com/random/800x600/?egypt,business&sig=${id}`,
    author: {
      name: `${getRandomElement(egyptianFirstNames)} ${getRandomElement(egyptianLastNames)}`,
      role: getRandomElement(egyptianRoles),
      avatar: `https://source.unsplash.com/random/40x40/?portrait&sig=${id}`
    },
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    timeAgo: getRandomTimeAgo()
  };
};

export const generateRandomPosts = (count: number): Post[] => 
  Array.from({ length: count }, (_, index) => generateRandomPost(index));