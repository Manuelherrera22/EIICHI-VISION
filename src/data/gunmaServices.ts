export interface GunmaService {
  id: number;
  category: string;
  title: string;
  description: string;
  priceRange?: string;
  availability: 'always' | 'seasonal' | 'by_request';
  languages: string[];
  location?: string;
  icon?: string;
  features?: string[];
}

export const gunmaServices: GunmaService[] = [
  // Daily Living & Home Care
  {
    id: 1,
    category: 'Daily Living & Home Care',
    title: 'Support for electricity, gas, water, and Wi-Fi issues',
    description: 'Comprehensive technical support for all home utilities and internet connectivity issues.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Zap',
    features: ['24/7 emergency support', 'Bilingual technicians', 'Same-day service']
  },
  {
    id: 2,
    category: 'Daily Living & Home Care',
    title: 'House cleaning (garden maintenance, pest control, etc.)',
    description: 'Complete home maintenance including garden care and pest management services.',
    priceRange: '¥8,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Home',
    features: ['Regular maintenance', 'Seasonal garden care', 'Pest prevention']
  },
  {
    id: 3,
    category: 'Daily Living & Home Care',
    title: 'Regular cleaning & bed-making (once or twice a week)',
    description: 'Professional housekeeping services with regular cleaning and bed-making.',
    priceRange: '¥3,000 - ¥8,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Shield',
    features: ['Weekly or bi-weekly service', 'Premium cleaning products', 'Flexible scheduling']
  },
  {
    id: 4,
    category: 'Daily Living & Home Care',
    title: 'Rental of premium tableware and cooking utensils',
    description: 'High-quality Japanese tableware and cooking equipment rental service.',
    priceRange: '¥2,000 - ¥10,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Utensils',
    features: ['Traditional Japanese ware', 'Modern kitchen equipment', 'Delivery and pickup']
  },
  {
    id: 5,
    category: 'Daily Living & Home Care',
    title: 'Furniture and art rental service',
    description: 'Curated selection of furniture and artwork to enhance your living space.',
    priceRange: '¥5,000 - ¥30,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Palette',
    features: ['Traditional Japanese furniture', 'Contemporary art', 'Flexible rental terms']
  },
  {
    id: 6,
    category: 'Daily Living & Home Care',
    title: 'Shopping assistance for daily necessities (English support available)',
    description: 'Personal shopping service with English-speaking support for daily needs.',
    priceRange: '¥3,000 - ¥8,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'ShoppingCart',
    features: ['Personal shopping assistant', 'English language support', 'Local market access']
  },
  {
    id: 7,
    category: 'Daily Living & Home Care',
    title: 'Laundry service / dry-cleaning arrangements',
    description: 'Professional laundry and dry-cleaning services with pickup and delivery.',
    priceRange: '¥2,000 - ¥6,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Shirt',
    features: ['Pickup and delivery', 'Premium dry cleaning', 'Express service available']
  },

  // Transportation Services
  {
    id: 8,
    category: 'Transportation Services',
    title: 'Regular bookings for taxis or chauffeur services',
    description: 'Reliable transportation services with regular taxi and chauffeur bookings.',
    priceRange: '¥3,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Car',
    features: ['Regular scheduling', 'English-speaking drivers', 'Premium vehicles']
  },
  {
    id: 9,
    category: 'Transportation Services',
    title: 'Leasing arrangements for private cars or electric bicycles',
    description: 'Flexible car and electric bicycle rental services for independent travel.',
    priceRange: '¥5,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Bike',
    features: ['Short and long-term rentals', 'Insurance included', 'Delivery service']
  },
  {
    id: 10,
    category: 'Transportation Services',
    title: 'Driver arrangement / rental car coordination',
    description: 'Professional driver services and rental car coordination for your needs.',
    priceRange: '¥8,000 - ¥20,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Navigation',
    features: ['Professional drivers', 'Flexible scheduling', 'Multi-language support']
  },
  {
    id: 11,
    category: 'Transportation Services',
    title: 'Refrigerator stocking service (drinks, groceries, daily necessities prepared in advance)',
    description: 'Pre-arrival grocery and beverage stocking service for your convenience.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Package',
    features: ['Pre-arrival setup', 'Custom grocery lists', 'Fresh local products']
  },

  // Safety & Healthcare
  {
    id: 12,
    category: 'Safety & Healthcare',
    title: 'Insurance support tailored for second homes',
    description: 'Specialized insurance solutions for second home ownership in Japan.',
    priceRange: '¥50,000 - ¥200,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Shield',
    features: ['Comprehensive coverage', 'English documentation', 'Expert consultation']
  },
  {
    id: 13,
    category: 'Safety & Healthcare',
    title: 'Introduction and accompaniment to English-speaking clinics',
    description: 'Access to English-speaking medical professionals and clinic accompaniment.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Heart',
    features: ['English-speaking doctors', 'Appointment scheduling', 'Medical interpretation']
  },
  {
    id: 14,
    category: 'Safety & Healthcare',
    title: 'Hospital appointments and accompaniment with English interpretation',
    description: 'Hospital visit support with professional English interpretation services.',
    priceRange: '¥8,000 - ¥20,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Activity',
    features: ['Medical interpretation', 'Appointment coordination', 'Follow-up support']
  },
  {
    id: 15,
    category: 'Safety & Healthcare',
    title: 'Emergency assistance',
    description: '24/7 emergency support services for urgent situations.',
    priceRange: '¥10,000 - ¥50,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'AlertTriangle',
    features: ['24/7 availability', 'Multilingual support', 'Rapid response']
  },
  {
    id: 16,
    category: 'Safety & Healthcare',
    title: 'Interpreter arrangements during your stay (online or on-site)',
    description: 'Professional interpretation services available online or on-site.',
    priceRange: '¥3,000 - ¥12,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'MessageCircle',
    features: ['Real-time interpretation', 'Online and on-site', 'Specialized knowledge']
  },
  {
    id: 17,
    category: 'Safety & Healthcare',
    title: 'Japanese emergency & medical support hotline',
    description: 'Dedicated emergency hotline with Japanese medical support.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Phone',
    features: ['24/7 hotline', 'Medical coordination', 'Emergency response']
  },

  // Pets & Housekeeping
  {
    id: 18,
    category: 'Pets & Housekeeping',
    title: 'Pet care services',
    description: 'Comprehensive pet care services including walking, feeding, and veterinary visits.',
    priceRange: '¥3,000 - ¥10,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Heart',
    features: ['Pet walking', 'Feeding services', 'Veterinary coordination']
  },
  {
    id: 19,
    category: 'Pets & Housekeeping',
    title: 'Bilingual housekeeper',
    description: 'Professional bilingual housekeeping services for your home.',
    priceRange: '¥4,000 - ¥12,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'User',
    features: ['Bilingual communication', 'Flexible scheduling', 'Comprehensive cleaning']
  },

  // Children & Education
  {
    id: 20,
    category: 'Children & Education',
    title: 'Access to international schools accepting short-term students',
    description: 'Connections to international schools that welcome short-term enrollment.',
    priceRange: '¥20,000 - ¥100,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'GraduationCap',
    features: ['Short-term enrollment', 'International curriculum', 'Flexible scheduling']
  },
  {
    id: 21,
    category: 'Children & Education',
    title: 'Introduction to local children\'s exchange events',
    description: 'Access to local children\'s cultural exchange programs and events.',
    priceRange: '¥2,000 - ¥8,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Users',
    features: ['Cultural exchange', 'Local integration', 'Educational activities']
  },
  {
    id: 22,
    category: 'Children & Education',
    title: 'Arrangement of kids\' camps and workshops',
    description: 'Curated selection of children\'s camps and educational workshops.',
    priceRange: '¥5,000 - ¥25,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Tent',
    features: ['Educational camps', 'Cultural workshops', 'Outdoor activities']
  },
  {
    id: 23,
    category: 'Children & Education',
    title: 'Bilingual babysitter service',
    description: 'Professional bilingual babysitting services for your children.',
    priceRange: '¥2,000 - ¥8,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Baby',
    features: ['Bilingual care', 'Background checked', 'Flexible hours']
  },

  // Food & Culinary Experiences
  {
    id: 24,
    category: 'Food & Culinary Experiences',
    title: 'English-speaking private chef / cooking classes',
    description: 'Private chef services and Japanese cooking classes with English instruction.',
    priceRange: '¥8,000 - ¥30,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'ChefHat',
    features: ['Private chef service', 'Cooking classes', 'Traditional recipes']
  },
  {
    id: 25,
    category: 'Food & Culinary Experiences',
    title: 'Setup of food delivery services (including organic options)',
    description: 'Arrangement of food delivery services with organic and local options.',
    priceRange: '¥3,000 - ¥10,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Truck',
    features: ['Organic options', 'Local delivery', 'Subscription service']
  },
  {
    id: 26,
    category: 'Food & Culinary Experiences',
    title: 'Japanese culinary experiences (soba-making, sushi-making)',
    description: 'Authentic Japanese culinary experiences including soba and sushi making.',
    priceRange: '¥5,000 - ¥20,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Fish',
    features: ['Traditional techniques', 'Hands-on learning', 'Cultural immersion']
  },

  // Cultural & Outdoor Experiences
  {
    id: 27,
    category: 'Cultural & Outdoor Experiences',
    title: 'Private tea ceremony, flower arrangement, and kimono-dressing sessions',
    description: 'Authentic Japanese cultural experiences including tea ceremony and kimono dressing.',
    priceRange: '¥8,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Flower',
    features: ['Traditional tea ceremony', 'Ikebana lessons', 'Kimono experience']
  },
  {
    id: 28,
    category: 'Cultural & Outdoor Experiences',
    title: 'Hunting and game-meat experience (licensed tours)',
    description: 'Licensed hunting experiences with professional guides and game meat preparation.',
    priceRange: '¥15,000 - ¥50,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Target',
    features: ['Licensed guides', 'Safety equipment', 'Game preparation']
  },
  {
    id: 29,
    category: 'Cultural & Outdoor Experiences',
    title: 'Stargazing and telescope sessions',
    description: 'Professional stargazing experiences with high-quality telescopes and expert guidance.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Star',
    features: ['Professional telescopes', 'Expert guidance', 'Dark sky locations']
  },
  {
    id: 30,
    category: 'Cultural & Outdoor Experiences',
    title: 'Private boating / canoe tours at Lake Haruna or Lake Akaya',
    description: 'Private boat and canoe tours on Gunma\'s beautiful lakes.',
    priceRange: '¥8,000 - ¥20,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Anchor',
    features: ['Private tours', 'Beautiful lake views', 'Professional guides']
  },
  {
    id: 31,
    category: 'Cultural & Outdoor Experiences',
    title: 'Curated selection of Gunma\'s premium sake',
    description: 'Exclusive access to Gunma\'s finest sake breweries and premium selections.',
    priceRange: '¥5,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Wine',
    features: ['Premium sake tasting', 'Brewery visits', 'Expert curation']
  },
  {
    id: 32,
    category: 'Cultural & Outdoor Experiences',
    title: 'Private glamping in the snowfields of Kusatsu or Manza',
    description: 'Luxurious glamping experiences in Gunma\'s pristine snowfields.',
    priceRange: '¥20,000 - ¥60,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Tent',
    features: ['Luxury accommodations', 'Snow activities', 'Private locations']
  },
  {
    id: 33,
    category: 'Cultural & Outdoor Experiences',
    title: 'Farm-stay experiences in rural villages',
    description: 'Authentic farm-stay experiences in traditional Japanese rural villages.',
    priceRange: '¥10,000 - ¥30,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'TreePine',
    features: ['Rural immersion', 'Farm activities', 'Traditional living']
  },
  {
    id: 34,
    category: 'Cultural & Outdoor Experiences',
    title: 'Artisan studio visits and cultural immersion tours',
    description: 'Exclusive visits to traditional artisan studios and cultural immersion experiences.',
    priceRange: '¥8,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Palette',
    features: ['Master craftsmen', 'Hands-on learning', 'Cultural heritage']
  },
  {
    id: 35,
    category: 'Cultural & Outdoor Experiences',
    title: 'Assistance with accommodations in Kusatsu or Shima Onsen',
    description: 'Expert assistance with onsen accommodation bookings and arrangements.',
    priceRange: '¥5,000 - ¥15,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'MapPin',
    features: ['Premium onsen access', 'Expert recommendations', 'Booking assistance']
  },
  {
    id: 36,
    category: 'Cultural & Outdoor Experiences',
    title: 'Day-trip onsen visits',
    description: 'Curated day-trip onsen experiences to Gunma\'s finest hot springs.',
    priceRange: '¥8,000 - ¥20,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Waves',
    features: ['Multiple onsen visits', 'Transportation included', 'Cultural guidance']
  },
  {
    id: 37,
    category: 'Cultural & Outdoor Experiences',
    title: 'Day-trip onsen tour arrangements',
    description: 'Comprehensive onsen tour arrangements with transportation and guidance.',
    priceRange: '¥10,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Route',
    features: ['Multiple destinations', 'Full-day experience', 'Cultural insights']
  },
  {
    id: 38,
    category: 'Cultural & Outdoor Experiences',
    title: 'English-supported yoga / Pilates classes',
    description: 'Yoga and Pilates classes with English-speaking instructors.',
    priceRange: '¥3,000 - ¥8,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Activity',
    features: ['English instruction', 'Flexible scheduling', 'Group or private']
  },
  {
    id: 39,
    category: 'Cultural & Outdoor Experiences',
    title: 'Local farm exchange and harvest experiences (e.g., Wagyu ranch, organic vegetable picking)',
    description: 'Authentic farm experiences including Wagyu ranches and organic vegetable harvesting.',
    priceRange: '¥8,000 - ¥25,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'TreePine',
    features: ['Wagyu ranch visits', 'Organic farming', 'Seasonal activities']
  },
  {
    id: 40,
    category: 'Cultural & Outdoor Experiences',
    title: 'Spa, massage, osteopathy, golf course, and ski resort arrangements',
    description: 'Premium wellness and recreational activity arrangements.',
    priceRange: '¥10,000 - ¥40,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Sparkles',
    features: ['Premium wellness', 'Golf course access', 'Ski resort arrangements']
  },

  // Lifestyle & Leisure
  {
    id: 41,
    category: 'Lifestyle & Leisure',
    title: 'Seasonal flower arrangement deliveries',
    description: 'Beautiful seasonal flower arrangements delivered to your home.',
    priceRange: '¥3,000 - ¥12,000',
    availability: 'seasonal',
    languages: ['English', 'Japanese'],
    icon: 'Flower',
    features: ['Seasonal varieties', 'Regular delivery', 'Expert arrangement']
  },
  {
    id: 42,
    category: 'Lifestyle & Leisure',
    title: 'VIP personal gym & private trainer service',
    description: 'Exclusive access to premium gym facilities with private trainers.',
    priceRange: '¥8,000 - ¥25,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Dumbbell',
    features: ['Private facilities', 'Personal trainers', 'Flexible scheduling']
  },
  {
    id: 43,
    category: 'Lifestyle & Leisure',
    title: 'Restaurant reservations',
    description: 'Expert restaurant reservation services for Gunma\'s finest dining.',
    priceRange: '¥2,000 - ¥8,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Utensils',
    features: ['Exclusive restaurants', 'Prime time slots', 'Special occasions']
  },
  {
    id: 44,
    category: 'Lifestyle & Leisure',
    title: 'Traditional Japanese confectionery making & sake pairing events',
    description: 'Authentic Japanese confectionery making workshops with sake pairing experiences.',
    priceRange: '¥8,000 - ¥20,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Cookie',
    features: ['Traditional techniques', 'Sake pairing', 'Cultural learning']
  },
  {
    id: 45,
    category: 'Lifestyle & Leisure',
    title: 'Full travel coordination within Japan, based from Kusatsu or Tsumagoi',
    description: 'Comprehensive travel coordination services for Japan-wide exploration.',
    priceRange: '¥15,000 - ¥50,000',
    availability: 'always',
    languages: ['English', 'Japanese'],
    icon: 'Map',
    features: ['Full Japan coverage', 'Custom itineraries', 'Premium experiences']
  }
];

export const serviceCategories = [
  'Daily Living & Home Care',
  'Transportation Services', 
  'Safety & Healthcare',
  'Pets & Housekeeping',
  'Children & Education',
  'Food & Culinary Experiences',
  'Cultural & Outdoor Experiences',
  'Lifestyle & Leisure'
];

export const getServicesByCategory = (category: string): GunmaService[] => {
  return gunmaServices.filter(service => service.category === category);
};

export const getServiceById = (id: number): GunmaService | undefined => {
  return gunmaServices.find(service => service.id === id);
};
