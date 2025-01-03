// Helper function to generate random time
export const getRandomTimeAgo = () => {
  const times = ['just now', '5 minutes ago', '10 minutes ago', '30 minutes ago', '1 hour ago', '2 hours ago', '5 hours ago', '1 day ago'];
  return times[Math.floor(Math.random() * times.length)];
};

// Helper function to generate random Egyptian names
export const getRandomEgyptianName = () => {
  const firstNames = ['Ahmed', 'Mohamed', 'Sara', 'Nour', 'Hassan', 'Fatima', 'Youssef', 'Mariam', 'Omar', 'Layla'];
  const lastNames = ['Ibrahim', 'Hassan', 'Ali', 'Mohamed', 'Ahmed', 'Mahmoud', 'Kamal', 'Samir', 'Farid', 'Zaki'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Helper function to generate random roles
export const getRandomRole = () => {
  const roles = [
    'Software Engineer at QudSystem',
    'Product Designer at QudPro',
    'Marketing Specialist',
    'Content Creator',
    'Business Developer',
    'UI/UX Designer',
    'Project Manager at QudSystem',
    'Digital Marketing Manager',
    'Photographer',
    'Startup Founder'
  ];
  return roles[Math.floor(Math.random() * roles.length)];
};

// Helper function to generate random descriptions about Egypt
export const getRandomDescription = () => {
  const descriptions = [
    "Exploring innovative tech solutions in Cairo's bustling startup ecosystem with QudSystem",
    "Capturing the essence of Alexandria's historic architecture",
    "Working on exciting projects that shape Egypt's digital future through QudPro",
    "Collaborating with talented professionals in Egypt's tech hub",
    "Building bridges between traditional and modern business practices in Egypt",
    "Showcasing Egyptian creativity through digital innovation",
    "Contributing to Egypt's growing tech community with QudSystem",
    "Developing sustainable solutions for Egyptian businesses",
    "Creating opportunities in Egypt's digital economy through QudPro",
    "Innovating at the heart of MENA's tech revolution"
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate random posts
export const generateRandomPost = () => ({
  id: Date.now() + Math.random(),
  title: `Post ${Math.floor(Math.random() * 1000)}`,
  category: ['Professional', 'Technology', 'Business', 'Design', 'Innovation'][Math.floor(Math.random() * 5)],
  description: getRandomDescription(),
  imageUrl: `https://source.unsplash.com/random/800x600/?egypt,business&sig=${Date.now()}`,
  author: {
    name: getRandomEgyptianName(),
    role: getRandomRole(),
    avatar: `https://source.unsplash.com/random/40x40/?portrait&sig=${Date.now()}`
  },
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 100) + 10,
  timeAgo: getRandomTimeAgo(),
  isUserPost: false
});