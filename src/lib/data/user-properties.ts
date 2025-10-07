// Propiedades específicas del usuario para Tabiji House
// Sistema para integrar propiedades reales del usuario

export interface UserProperty {
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
  isUserProperty: boolean; // Marca para identificar propiedades del usuario
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
  // Información adicional del usuario
  userNotes?: string;
  acquisitionDate?: Date;
  renovationHistory?: string[];
  tenantInfo?: {
    hasTenant: boolean;
    monthlyRent?: number;
    leaseEndDate?: Date;
  };
}

// Propiedades específicas del usuario
export const userProperties: UserProperty[] = [
  {
    id: 'user-prop-001',
    name: 'Propiedad 1 - Casa Tradicional en Gunma',
    description: 'Primera propiedad del usuario en Japón. Casa tradicional japonesa con gran potencial de renovación y ubicación estratégica cerca de estación de tren.',
    location: {
      lat: 36.3911, // Maebashi, Gunma como ubicación de ejemplo
      lng: 139.0608,
      address: 'Maebashi, Gunma Prefecture',
      prefecture: 'Gunma',
      city: 'Maebashi',
      district: 'Chuo'
    },
    price: 28000000, // ¥28M - Precio de ejemplo
    currency: 'JPY',
    size: 120,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1985,
    bedrooms: 3,
    bathrooms: 1,
    features: ['Traditional Architecture', 'Near Station', 'Garden Space', 'Renovation Potential', 'Quiet Neighborhood'],
    condition: 'needs_renovation',
    views: 1250,
    likes: 45,
    isSponsored: true,
    isFeatured: true,
    isUserProperty: true,
    contactInfo: {
      agent: 'Tabiji House User',
      phone: '+81-XX-XXXX-XXXX',
      email: 'user@tabiji-house.com'
    },
    legalInfo: {
      ownership: 'freehold'
    },
    investment: {
      rentalPotential: 120000, // ¥120K/mes
      roi: 5.1,
      appreciation: 6.8
    },
    userNotes: 'Primera adquisición en Japón. Excelente ubicación para inversión a largo plazo.',
    acquisitionDate: new Date('2023-06-15'),
    renovationHistory: ['Structural inspection completed', 'Roof repair needed'],
    tenantInfo: {
      hasTenant: false,
      monthlyRent: 0,
      leaseEndDate: undefined
    }
  },
  {
    id: 'user-prop-002',
    name: 'Propiedad 2 - Apartamento Moderno en Tokyo',
    description: 'Segunda propiedad del usuario. Apartamento moderno en ubicación premium de Tokyo con excelente conectividad y potencial de renta alta.',
    location: {
      lat: 35.6762, // Shibuya, Tokyo como ubicación de ejemplo
      lng: 139.6503,
      address: 'Shibuya, Tokyo',
      prefecture: 'Tokyo',
      city: 'Shibuya',
      district: 'Shibuya'
    },
    price: 85000000, // ¥85M - Precio de ejemplo
    currency: 'JPY',
    size: 65,
    type: 'mansion',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 2015,
    bedrooms: 2,
    bathrooms: 1,
    features: ['Modern Design', 'Prime Location', 'High Floor', 'City View', 'Security System', 'Near Station'],
    condition: 'excellent',
    views: 3450,
    likes: 128,
    isSponsored: true,
    isFeatured: true,
    isUserProperty: true,
    contactInfo: {
      agent: 'Tabiji House User',
      phone: '+81-XX-XXXX-XXXX',
      email: 'user@tabiji-house.com'
    },
    legalInfo: {
      ownership: 'freehold'
    },
    investment: {
      rentalPotential: 280000, // ¥280K/mes
      roi: 3.9,
      appreciation: 4.2
    },
    userNotes: 'Inversión premium en Tokyo. Excelente ROI y ubicación estratégica.',
    acquisitionDate: new Date('2023-09-20'),
    renovationHistory: ['Minor cosmetic updates completed', 'Appliances upgraded'],
    tenantInfo: {
      hasTenant: true,
      monthlyRent: 280000,
      leaseEndDate: new Date('2024-12-31')
    }
  }
];

// Función para obtener todas las propiedades del usuario
export function getUserProperties(): UserProperty[] {
  return userProperties;
}

// Función para obtener propiedad del usuario por ID
export function getUserPropertyById(id: string): UserProperty | undefined {
  return userProperties.find(property => property.id === id);
}

// Función para combinar propiedades del usuario con otras propiedades
export function getAllPropertiesWithUser(): UserProperty[] {
  // Importar propiedades generales
  const { getAllRealProperties } = require('./real-properties');
  const generalProperties = getAllRealProperties();
  
  // Convertir propiedades generales al formato de UserProperty
  const convertedGeneralProperties: UserProperty[] = generalProperties.map((prop: any) => ({
    ...prop,
    isUserProperty: false,
    userNotes: undefined,
    acquisitionDate: undefined,
    renovationHistory: undefined,
    tenantInfo: undefined
  }));
  
  // Combinar propiedades del usuario con propiedades generales
  return [...userProperties, ...convertedGeneralProperties];
}

// Función para obtener solo propiedades del usuario
export function getUserOnlyProperties(): UserProperty[] {
  return userProperties;
}

// Función para filtrar propiedades del usuario por estado
export function getUserPropertiesByStatus(status: UserProperty['status']): UserProperty[] {
  return userProperties.filter(property => property.status === status);
}

// Función para obtener estadísticas de propiedades del usuario
export const userPropertiesStats = {
  total: userProperties.length,
  totalValue: userProperties.reduce((sum, property) => sum + property.price, 0),
  averagePrice: Math.round(userProperties.reduce((sum, property) => sum + property.price, 0) / userProperties.length),
  totalSize: userProperties.reduce((sum, property) => sum + property.size, 0),
  averageSize: Math.round(userProperties.reduce((sum, property) => sum + property.size, 0) / userProperties.length),
  byType: {
    akiya: userProperties.filter(p => p.type === 'akiya').length,
    mansion: userProperties.filter(p => p.type === 'mansion').length,
    apartment: userProperties.filter(p => p.type === 'apartment').length,
    land: userProperties.filter(p => p.type === 'land').length,
    commercial: userProperties.filter(p => p.type === 'commercial').length,
    renovation: userProperties.filter(p => p.type === 'renovation').length
  },
  byPrefecture: {
    Gunma: userProperties.filter(p => p.location.prefecture === 'Gunma').length,
    Tokyo: userProperties.filter(p => p.location.prefecture === 'Tokyo').length,
    Nagano: userProperties.filter(p => p.location.prefecture === 'Nagano').length
  },
  investment: {
    totalRentalPotential: userProperties.reduce((sum, property) => sum + (property.investment.rentalPotential || 0), 0),
    averageROI: userProperties.reduce((sum, property) => sum + (property.investment.roi || 0), 0) / userProperties.length,
    totalAppreciation: userProperties.reduce((sum, property) => sum + (property.investment.appreciation || 0), 0) / userProperties.length
  }
};

