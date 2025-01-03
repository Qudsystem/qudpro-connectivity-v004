interface ProfileData {
  name: string;
  role: string;
  email: string;
  avatar: string;
  location: string;
  company: string;
  portfolio: string;
  connections: number;
  views: number;
  impressions: number;
}

const arabicFirstNames = [
  'أحمد', 'محمد', 'علي', 'عمر', 'يوسف', 'حسن', 'إبراهيم', 'خالد', 'عبدالله', 'طارق',
  'سارة', 'فاطمة', 'نور', 'ريم', 'ليلى', 'مريم', 'هدى', 'رنا', 'دينا', 'منى'
];

const arabicLastNames = [
  'المصري', 'السيد', 'أحمد', 'محمود', 'حسن', 'علي', 'إبراهيم', 'عبدالرحمن', 'العربي', 'الشريف'
];

const roles = [
  'مهندس برمجيات في QudSystem',
  'مصمم منتجات في QudPro',
  'مدير تسويق',
  'مطور واجهات المستخدم',
  'مدير مشاريع في QudSystem',
  'مصمم UX/UI',
  'مدير تقني في QudPro',
  'محلل أعمال',
  'مطور تطبيقات',
  'مستشار تقني'
];

export const generateProfile = (): ProfileData => {
  const firstName = arabicFirstNames[Math.floor(Math.random() * arabicFirstNames.length)];
  const lastName = arabicLastNames[Math.floor(Math.random() * arabicLastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  const role = roles[Math.floor(Math.random() * roles.length)];
  
  return {
    name: fullName,
    role: role,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@qudpro.com`,
    avatar: `https://source.unsplash.com/random/400x400/?portrait&sig=${Date.now()}`,
    location: 'القاهرة، مصر',
    company: 'QudSystem',
    portfolio: 'portfolio.qudpro.com',
    connections: Math.floor(Math.random() * 900) + 100,
    views: Math.floor(Math.random() * 100) + 50,
    impressions: Math.floor(Math.random() * 200) + 100
  };
};

export const defaultProfile = generateProfile();