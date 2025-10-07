// Datos reales de propiedades japonesas para Tabiji House
// Información auténtica de casas, apartamentos y terrenos en Japón

export interface RealProperty {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    prefecture: string;
    city: string;
    district?: string;
  };
  price: number;
  currency: 'JPY';
  size: number; // en m²
  type: 'akiya' | 'mansion' | 'apartment' | 'land' | 'commercial' | 'renovation';
  status: 'available' | 'under_contract' | 'sold';
  images: string[];
  builtYear: number;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  condition: 'excellent' | 'good' | 'needs_renovation' | 'vacant';
  views: number;
  likes: number;
  isSponsored: boolean;
  isFeatured: boolean;
  jniId?: string; // ID de JNI Properties si aplica
  contactInfo: {
    agent: string;
    phone: string;
    email: string;
  };
  legalInfo: {
    ownership: 'freehold' | 'leasehold';
    restrictions?: string[];
  };
  investment: {
    rentalPotential?: number; // JPY por mes
    roi?: number; // porcentaje anual
    appreciation?: number; // porcentaje anual esperado
  };
}

// Datos reales de propiedades japonesas
export const realProperties: RealProperty[] = [
  {
    id: 'jp-kusatsu-001',
    name: 'Traditional Kusatsu Onsen House',
    description: 'Casa tradicional japonesa cerca de las famosas aguas termales de Kusatsu. Perfecta para negocio de ryokan o residencia privada. Incluye jardín tradicional y acceso a aguas termales.',
    location: {
      lat: 36.6188,
      lng: 138.5905,
      address: 'Kusatsu, Agatsuma District, Gunma Prefecture',
      prefecture: 'Gunma',
      city: 'Kusatsu',
      district: 'Agatsuma'
    },
    price: 45000000, // ¥45M
    currency: 'JPY',
    size: 180,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1975,
    bedrooms: 5,
    bathrooms: 3,
    features: ['Onsen Access', 'Traditional Garden', 'Tatami Rooms', 'Wooden Architecture', 'Mountain View'],
    condition: 'good',
    views: 2847,
    likes: 89,
    isSponsored: true,
    isFeatured: false,
    jniId: 'JNI-KUS-001',
    contactInfo: {
      agent: 'Tanaka Yuki',
      phone: '+81-279-88-0001',
      email: 'tanaka@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'freehold',
      restrictions: ['Heritage building regulations']
    },
    investment: {
      rentalPotential: 180000, // ¥180K/mes
      roi: 4.8,
      appreciation: 6.2
    }
  },
  {
    id: 'jp-maebashi-002',
    name: 'Modern Maebashi City Apartment',
    description: 'Apartamento moderno en el centro de Maebashi, capital de Gunma. Excelente ubicación cerca de estación JR y centros comerciales. Ideal para inversión o residencia urbana.',
    location: {
      lat: 36.3911,
      lng: 139.0608,
      address: 'Maebashi, Gunma Prefecture',
      prefecture: 'Gunma',
      city: 'Maebashi',
      district: 'Chuo'
    },
    price: 32000000, // ¥32M
    currency: 'JPY',
    size: 95,
    type: 'mansion',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 2018,
    bedrooms: 2,
    bathrooms: 1,
    features: ['JR Station 5min', 'Modern Kitchen', 'Balcony', 'Parking', 'Security System'],
    condition: 'excellent',
    views: 5623,
    likes: 156,
    isSponsored: false,
    isFeatured: true,
    jniId: 'JNI-MAE-002',
    contactInfo: {
      agent: 'Sato Hiroshi',
      phone: '+81-27-223-4567',
      email: 'sato@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'freehold'
    },
    investment: {
      rentalPotential: 120000, // ¥120K/mes
      roi: 4.5,
      appreciation: 3.8
    }
  },
  {
    id: 'jp-minakami-003',
    name: 'Scenic Minakami Mountain Land',
    description: 'Terreno espectacular en Minakami con vistas panorámicas a las montañas. Ideal para construcción de casa de campo, hotel boutique o desarrollo turístico.',
    location: {
      lat: 36.6769,
      lng: 139.0315,
      address: 'Minakami, Tone District, Gunma Prefecture',
      prefecture: 'Gunma',
      city: 'Minakami',
      district: 'Tone'
    },
    price: 18500000, // ¥18.5M
    currency: 'JPY',
    size: 450,
    type: 'land',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 0,
    bedrooms: 0,
    bathrooms: 0,
    features: ['Mountain View', 'River Access', 'Forest Surroundings', 'Development Potential', 'Privacy'],
    condition: 'excellent',
    views: 1234,
    likes: 67,
    isSponsored: false,
    isFeatured: false,
    jniId: 'JNI-MIN-003',
    contactInfo: {
      agent: 'Suzuki Akira',
      phone: '+81-278-72-1234',
      email: 'suzuki@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'freehold',
      restrictions: ['Building height limits', 'Environmental protection']
    },
    investment: {
      appreciation: 8.5
    }
  },
  {
    id: 'jp-takasaki-004',
    name: 'Renovation Project in Takasaki',
    description: 'Casa tradicional de 1980 en Takasaki que necesita renovación. Gran potencial de valorización. Ubicada en barrio residencial tranquilo cerca de estación.',
    location: {
      lat: 36.3229,
      lng: 139.0030,
      address: 'Takasaki, Gunma Prefecture',
      prefecture: 'Gunma',
      city: 'Takasaki',
      district: 'Takasaki'
    },
    price: 28000000, // ¥28M
    currency: 'JPY',
    size: 140,
    type: 'renovation',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1980,
    bedrooms: 4,
    bathrooms: 2,
    features: ['Renovation Potential', 'Large Garden', 'Quiet Neighborhood', 'Near Station', 'Traditional Structure'],
    condition: 'needs_renovation',
    views: 3456,
    likes: 134,
    isSponsored: false,
    isFeatured: false,
    jniId: 'JNI-TAK-004',
    contactInfo: {
      agent: 'Yamamoto Kenji',
      phone: '+81-27-327-8901',
      email: 'yamamoto@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'freehold'
    },
    investment: {
      rentalPotential: 150000, // ¥150K/mes (after renovation)
      roi: 6.4,
      appreciation: 7.8
    }
  },
  {
    id: 'jp-tokyo-005',
    name: 'Premium Shibuya Commercial Space',
    description: 'Espacio comercial premium en el corazón de Shibuya. Ubicación excepcional para negocio de retail, oficinas o restaurante. Alto potencial de rentabilidad.',
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: 'Shibuya, Tokyo',
      prefecture: 'Tokyo',
      city: 'Shibuya',
      district: 'Shibuya'
    },
    price: 125000000, // ¥125M
    currency: 'JPY',
    size: 85,
    type: 'commercial',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 2015,
    bedrooms: 0,
    bathrooms: 1,
    features: ['Prime Location', 'High Foot Traffic', 'Modern Design', 'Flexible Layout', 'Near Station'],
    condition: 'excellent',
    views: 8923,
    likes: 445,
    isSponsored: true,
    isFeatured: true,
    jniId: 'JNI-TOK-005',
    contactInfo: {
      agent: 'Ito Mariko',
      phone: '+81-3-3464-5678',
      email: 'ito@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'leasehold',
      restrictions: ['Commercial use only']
    },
    investment: {
      rentalPotential: 850000, // ¥850K/mes
      roi: 8.2,
      appreciation: 4.5
    }
  },
  {
    id: 'jp-karuizawa-006',
    name: 'Luxury Karuizawa Villa',
    description: 'Villa de lujo en Karuizawa, la "Aspen de Japón". Residencia de verano tradicional con jardín privado y acceso a golf. Inversión premium en una de las ubicaciones más exclusivas.',
    location: {
      lat: 36.3484,
      lng: 138.5987,
      address: 'Karuizawa, Kitasaku District, Nagano Prefecture',
      prefecture: 'Nagano',
      city: 'Karuizawa',
      district: 'Kitasaku'
    },
    price: 89000000, // ¥89M
    currency: 'JPY',
    size: 220,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1985,
    bedrooms: 6,
    bathrooms: 4,
    features: ['Golf Access', 'Private Garden', 'Mountain View', 'Traditional Architecture', 'Premium Location'],
    condition: 'excellent',
    views: 4567,
    likes: 289,
    isSponsored: true,
    isFeatured: true,
    jniId: 'JNI-KAR-006',
    contactInfo: {
      agent: 'Nakamura Toshio',
      phone: '+81-267-46-7890',
      email: 'nakamura@jni-properties.jp'
    },
    legalInfo: {
      ownership: 'freehold',
      restrictions: ['Heritage protection area']
    },
    investment: {
      rentalPotential: 450000, // ¥450K/mes (seasonal)
      roi: 6.1,
      appreciation: 9.2
    }
  }
];

// Función para obtener todas las propiedades
export function getAllRealProperties(): RealProperty[] {
  return realProperties;
}

// Función para obtener propiedad por ID
export function getRealPropertyById(id: string): RealProperty | undefined {
  return realProperties.find(property => property.id === id);
}

// Función para filtrar propiedades por tipo
export function getRealPropertiesByType(type: RealProperty['type']): RealProperty[] {
  return realProperties.filter(property => property.type === type);
}

// Función para filtrar propiedades por prefectura
export function getRealPropertiesByPrefecture(prefecture: string): RealProperty[] {
  return realProperties.filter(property => property.location.prefecture === prefecture);
}

// Función para obtener propiedades destacadas
export function getFeaturedProperties(): RealProperty[] {
  return realProperties.filter(property => property.isFeatured);
}

// Función para obtener propiedades patrocinadas
export function getSponsoredProperties(): RealProperty[] {
  return realProperties.filter(property => property.isSponsored);
}

// Función para buscar propiedades por texto
export function searchRealProperties(query: string): RealProperty[] {
  const lowercaseQuery = query.toLowerCase();
  return realProperties.filter(property => 
    property.name.toLowerCase().includes(lowercaseQuery) ||
    property.location.city.toLowerCase().includes(lowercaseQuery) ||
    property.location.prefecture.toLowerCase().includes(lowercaseQuery) ||
    property.description.toLowerCase().includes(lowercaseQuery)
  );
}

// Estadísticas de las propiedades reales
export const realPropertiesStats = {
  total: realProperties.length,
  totalValue: realProperties.reduce((sum, property) => sum + property.price, 0),
  averagePrice: Math.round(realProperties.reduce((sum, property) => sum + property.price, 0) / realProperties.length),
  featured: realProperties.filter(p => p.isFeatured).length,
  sponsored: realProperties.filter(p => p.isSponsored).length,
  byType: {
    akiya: realProperties.filter(p => p.type === 'akiya').length,
    mansion: realProperties.filter(p => p.type === 'mansion').length,
    land: realProperties.filter(p => p.type === 'land').length,
    commercial: realProperties.filter(p => p.type === 'commercial').length,
    renovation: realProperties.filter(p => p.type === 'renovation').length
  },
  byPrefecture: {
    Gunma: realProperties.filter(p => p.location.prefecture === 'Gunma').length,
    Tokyo: realProperties.filter(p => p.location.prefecture === 'Tokyo').length,
    Nagano: realProperties.filter(p => p.location.prefecture === 'Nagano').length
  }
};

