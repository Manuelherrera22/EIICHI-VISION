export interface RealProperty {
  id: string;
  name: string;
  price: number;
  layout: string;
  landArea: number; // m²
  landAreaTsubo: number; // tsubo
  floorArea: number; // m²
  floorAreaTsubo: number; // tsubo
  age: number; // years
  location: {
    address: string;
    prefecture: string;
    district: string;
    village: string;
    area: string;
  };
  access: {
    stations: {
      name: string;
      distance: string;
      timeByCar: string;
    }[];
  };
  completion: {
    month: string;
    year: number;
    era: string;
  };
  structure: string;
  parking: {
    spaces: number;
    description: string;
  };
  highlights?: string[];
  renovations?: {
    date: string;
    items: string[];
  };
  restrictions?: string[];
  notes?: string[];
  services?: string[];
  images?: string[];
  features: string[];
  status: 'available' | 'under_negotiation' | 'sold';
  category: 'villa' | 'traditional' | 'renovated' | 'luxury';
  investment: {
    roi?: number;
    rentalPotential?: string;
    appreciation?: string;
  };
  lifestyle: {
    community?: string[];
    amenities?: string[];
    nearby?: string[];
  };
}

export const realProperties: RealProperty[] = [
  {
    id: 'kambara-property-a',
    name: 'Kambara Villa A - Tsumagoi Village',
    price: 15000000, // ¥15,000,000
    layout: '2LDK (2 Bedrooms + Spacious Living/Dining/Kitchen)',
    landArea: 471,
    landAreaTsubo: 142.47,
    floorArea: 74.14,
    floorAreaTsubo: 22.42,
    age: 36,
    location: {
      address: 'Kambara, Tsumagoi Village, Agatsuma District, Gunma Prefecture',
      prefecture: 'Gunma',
      district: 'Agatsuma',
      village: 'Tsumagoi',
      area: 'Kambara'
    },
    access: {
      stations: [
        {
          name: 'Shinano Railway "Naka-Karuizawa Station"',
          distance: 'Approx. 23 km',
          timeByCar: 'about 36 minutes by car'
        },
        {
          name: 'JR Agatsuma Line "Omae Station"',
          distance: 'Approx. 8 km',
          timeByCar: 'about 15 minutes by car'
        }
      ]
    },
    completion: {
      month: 'October',
      year: 1989,
      era: 'Heisei 1'
    },
    structure: 'Charming single-story wooden residence with slate roof',
    parking: {
      spaces: 1,
      description: 'On-site car space for 1 vehicle'
    },
    highlights: [
      'Newly upgraded in May 2025: modern system kitchen, premium bidet toilet, roof refurbishment, new water heater and faucets, tatami renewal in the main Japanese room, plus a newly built deck and exterior stairs',
      'Residents enjoy access to private tennis courts within the villa community',
      'Community association rules in place for well-managed surroundings'
    ],
    renovations: {
      date: 'May 2025',
      items: [
        'Modern system kitchen',
        'Premium bidet toilet',
        'Roof refurbishment',
        'New water heater and faucets',
        'Tatami renewal in main Japanese room',
        'Newly built deck and exterior stairs'
      ]
    },
    restrictions: [
      'Ownership transfer fees may apply',
      'Community management fees',
      'Costs incidental to purchase procedures',
      'Villa and resort properties subject to local management regulations'
    ],
    services: [
      'Selection of ancillary services available',
      'Each service provided with dedicated fee'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Recently renovated',
      'Private tennis courts access',
      'Community management',
      'Traditional Japanese elements',
      'Modern amenities',
      'Mountain views',
      'Peaceful location'
    ],
    status: 'available',
    category: 'renovated',
    investment: {
      roi: 8.5,
      rentalPotential: 'High - popular vacation rental area',
      appreciation: 'Strong - Tsumagoi is a premium location'
    },
    lifestyle: {
      community: ['Villa community', 'Tennis courts', 'Well-managed surroundings'],
      amenities: ['Private parking', 'Modern kitchen', 'Premium bathroom'],
      nearby: ['Naka-Karuizawa Station', 'Omae Station', 'Mountain areas']
    }
  },
  {
    id: 'kambara-property-b',
    name: 'Kambara Villa B - Tsumagoi Village',
    price: 10000000, // ¥10,000,000
    layout: '2LDK (2 Bedrooms + Living/Dining/Kitchen)',
    landArea: 307,
    landAreaTsubo: 92.86,
    floorArea: 55.48,
    floorAreaTsubo: 16.78,
    age: 36,
    location: {
      address: 'Kambara, Tsumagoi Village, Agatsuma District, Gunma Prefecture',
      prefecture: 'Gunma',
      district: 'Agatsuma',
      village: 'Tsumagoi',
      area: 'Kambara'
    },
    access: {
      stations: [
        {
          name: 'Shinano Railway "Naka-Karuizawa Station"',
          distance: 'Approx. 20 km',
          timeByCar: 'about 50 minutes by car'
        }
      ]
    },
    completion: {
      month: 'October',
      year: 1989,
      era: 'Heisei 1'
    },
    structure: 'Wooden, single-story residence with roofing',
    parking: {
      spaces: 2,
      description: 'On-site car space (2 vehicles)'
    },
    restrictions: [
      'Subject to villa district landscape regulations of Tsumagoi Village',
      'Subject to building ordinances of Tsumagoi Village',
      'Ownership transfer fees may apply',
      'Community management fees',
      'Costs incidental to purchase procedures',
      'Villa and resort properties subject to local management regulations'
    ],
    services: [
      'Selection of ancillary services available',
      'Each service provided with dedicated fee'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Traditional Japanese structure',
      'Spacious parking for 2 vehicles',
      'Villa district location',
      'Mountain setting',
      'Privacy and tranquility',
      'Access to community amenities'
    ],
    status: 'available',
    category: 'traditional',
    investment: {
      roi: 7.2,
      rentalPotential: 'Good - traditional charm appeals to tourists',
      appreciation: 'Moderate - stable area with growth potential'
    },
    lifestyle: {
      community: ['Villa community', 'Landscape regulations', 'Building ordinances'],
      amenities: ['Double parking', 'Traditional structure', 'Mountain location'],
      nearby: ['Naka-Karuizawa Station', 'Tsumagoi Village center', 'Natural areas']
    }
  }
];

export const getPropertyById = (id: string): RealProperty | undefined => {
  return realProperties.find(property => property.id === id);
};

export const getPropertiesByCategory = (category: string): RealProperty[] => {
  return realProperties.filter(property => property.category === category);
};

export const getAvailableProperties = (): RealProperty[] => {
  return realProperties.filter(property => property.status === 'available');
};

export const getPropertiesByPriceRange = (min: number, max: number): RealProperty[] => {
  return realProperties.filter(property => property.price >= min && property.price <= max);
};

export const getPropertiesByLocation = (village: string): RealProperty[] => {
  return realProperties.filter(property => property.location.village === village);
};

// Helper function to format price in Japanese Yen
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString('ja-JP')}`;
};

// Helper function to convert m² to tsubo
export const m2ToTsubo = (m2: number): number => {
  return Math.round((m2 / 3.30578) * 100) / 100;
};

// Helper function to get property summary
export const getPropertySummary = (property: RealProperty): string => {
  return `${property.layout} • ${property.landArea}m² (${property.landAreaTsubo}坪) • ¥${(property.price / 1000000).toFixed(0)}M`;
};


