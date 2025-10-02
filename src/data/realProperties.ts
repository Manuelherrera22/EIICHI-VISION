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
    id: 'property-a-traditional-villa',
    name: 'Property A - Traditional Japanese Villa',
    price: 15000000, // ¥15,000,000
    layout: '2LDK',
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
          distance: '23km',
          timeByCar: '36min by car'
        },
        {
          name: 'JR Agatsuma Line "Omae Station"',
          distance: '8km',
          timeByCar: '15min by car'
        }
      ]
    },
    completion: {
      month: 'October',
      year: 1989,
      era: 'Heisei 1'
    },
    structure: 'Traditional Architecture',
    parking: {
      spaces: 1,
      description: '1 vehicle'
    },
    highlights: [
      'Traditional Architecture',
      'Mountain Views',
      'Private Garden',
      'Renovated 2025'
    ],
    renovations: {
      date: '2025',
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
      '/Property A/33239_1.jpg',
      '/Property A/33239_2.gif',
      '/Property A/33239_3.jpg',
      '/Property A/33239_4.jpg',
      '/Property A/33239_5.jpg',
      '/Property A/33239_6.jpg',
      '/Property A/33239_7.jpg',
      '/Property A/33239_8.jpg',
      '/Property A/33239_9.jpg',
      '/Property A/33239_10.jpg'
    ],
    features: [
      'Traditional Architecture',
      'Mountain Views',
      'Private Garden',
      'Renovated 2025'
    ],
    status: 'available',
    category: 'villa',
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
    id: 'property-b-modern-retreat',
    name: 'Property B - Modern Mountain Retreat',
    price: 10000000, // ¥10,000,000
    layout: '2LDK',
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
          distance: '20km',
          timeByCar: '50min by car'
        }
      ]
    },
    completion: {
      month: 'October',
      year: 1989,
      era: 'Heisei 1'
    },
    structure: 'Modern Design',
    parking: {
      spaces: 2,
      description: '2 vehicles'
    },
    highlights: [
      'Modern Design',
      'Mountain Views',
      'Large Windows',
      'Energy Efficient'
    ],
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
      '/Property B/33250_1.jpg',
      '/Property B/33250_2.gif',
      '/Property B/33250_3.jpg',
      '/Property B/33250_4.jpg',
      '/Property B/33250_5.jpg',
      '/Property B/33250_6.jpg',
      '/Property B/33250_7.jpg',
      '/Property B/33250_9.jpg',
      '/Property B/33250_10.jpg'
    ],
    features: [
      'Modern Design',
      'Mountain Views',
      'Large Windows',
      'Energy Efficient'
    ],
    status: 'available',
    category: 'villa',
    investment: {
      roi: 7.2,
      rentalPotential: 'Good - modern design appeals to tourists',
      appreciation: 'Moderate - stable area with growth potential'
    },
    lifestyle: {
      community: ['Villa community', 'Landscape regulations', 'Building ordinances'],
      amenities: ['Double parking', 'Modern structure', 'Mountain location'],
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




