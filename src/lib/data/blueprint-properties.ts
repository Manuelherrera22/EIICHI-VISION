// Propiedades reales del Blueprint de Tabiji House
// Estas son las propiedades que ya tienes definidas en el sistema

export interface BlueprintProperty {
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
  isBlueprintProperty: boolean; // Marca para identificar propiedades del blueprint
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

// Propiedades reales del Blueprint
export const blueprintProperties: BlueprintProperty[] = [
  {
    id: 'blueprint-prop-001',
    name: 'Traditional House in Kusatsu',
    description: 'Casa tradicional japonesa en Kusatsu con onsen privado y jardín tradicional. Transformación completa en casa de lujo con diseño wabi-sabi.',
    location: {
      lat: 36.6188, // Kusatsu, Gunma
      lng: 138.5905,
      address: 'Kusatsu, Gunma',
      prefecture: 'Gunma',
      city: 'Kusatsu',
      district: 'Agatsuma'
    },
    price: 45000000, // ¥45M
    currency: 'JPY',
    size: 150,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1985,
    bedrooms: 3,
    bathrooms: 2,
    features: ['Private onsen', 'Traditional garden', '3 bedrooms', 'Wabi-sabi design potential', 'Cultural heritage'],
    condition: 'good',
    views: 2847,
    likes: 89,
    isSponsored: true,
    isFeatured: true,
    isBlueprintProperty: true,
    contactInfo: {
      agent: 'Tabiji House Blueprint',
      phone: '+81-279-88-0001',
      email: 'blueprint@tabiji-house.com'
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
    id: 'blueprint-prop-002',
    name: 'Akiya in Minakami',
    description: 'Akiya (casa vacía) en Minakami cerca de ski resorts con vista a montañas. Casa moderna-japonesa con acceso a deportes de invierno.',
    location: {
      lat: 36.6769, // Minakami, Gunma
      lng: 139.0315,
      address: 'Minakami, Gunma',
      prefecture: 'Gunma',
      city: 'Minakami',
      district: 'Tone'
    },
    price: 32000000, // ¥32M
    currency: 'JPY',
    size: 120,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1975,
    bedrooms: 2,
    bathrooms: 1,
    features: ['Near ski resorts', 'Mountain view', '2 bedrooms', 'Winter sports access', 'Modern Japanese potential'],
    condition: 'needs_renovation',
    views: 1234,
    likes: 67,
    isSponsored: true,
    isFeatured: true,
    isBlueprintProperty: true,
    contactInfo: {
      agent: 'Tabiji House Blueprint',
      phone: '+81-278-72-1234',
      email: 'blueprint@tabiji-house.com'
    },
    legalInfo: {
      ownership: 'freehold'
    },
    investment: {
      rentalPotential: 120000, // ¥120K/mes
      roi: 4.5,
      appreciation: 5.8
    }
  },
  {
    id: 'blueprint-prop-003',
    name: 'Heritage Property in Takasaki',
    description: 'Propiedad Heritage en Takasaki con patrimonio cultural y arquitectura tradicional. Excelente ubicación en el centro de la ciudad.',
    location: {
      lat: 36.3229, // Takasaki, Gunma
      lng: 139.0030,
      address: 'Takasaki, Gunma',
      prefecture: 'Gunma',
      city: 'Takasaki',
      district: 'Takasaki'
    },
    price: 38000000, // ¥38M
    currency: 'JPY',
    size: 180,
    type: 'akiya',
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format'
    ],
    builtYear: 1920,
    bedrooms: 4,
    bathrooms: 2,
    features: ['Cultural heritage', 'Traditional architecture', 'City center location', 'Historical significance', 'Renovation potential'],
    condition: 'needs_renovation',
    views: 3456,
    likes: 134,
    isSponsored: true,
    isFeatured: true,
    isBlueprintProperty: true,
    contactInfo: {
      agent: 'Tabiji House Blueprint',
      phone: '+81-27-327-8901',
      email: 'blueprint@tabiji-house.com'
    },
    legalInfo: {
      ownership: 'freehold',
      restrictions: ['Heritage protection']
    },
    investment: {
      rentalPotential: 150000, // ¥150K/mes
      roi: 4.7,
      appreciation: 6.5
    }
  }
];

// Función para obtener todas las propiedades del blueprint
export function getBlueprintProperties(): BlueprintProperty[] {
  return blueprintProperties;
}

// Función para obtener propiedad del blueprint por ID
export function getBlueprintPropertyById(id: string): BlueprintProperty | undefined {
  return blueprintProperties.find(property => property.id === id);
}

// Función para combinar propiedades del blueprint con otras propiedades
export function getAllPropertiesWithBlueprint(): BlueprintProperty[] {
  // Importar propiedades generales
  const { getAllRealProperties } = require('./real-properties');
  const generalProperties = getAllRealProperties();
  
  // Convertir propiedades generales al formato de BlueprintProperty
  const convertedGeneralProperties: BlueprintProperty[] = generalProperties.map((prop: any) => ({
    ...prop,
    isBlueprintProperty: false
  }));
  
  // Combinar propiedades del blueprint con propiedades generales
  return [...blueprintProperties, ...convertedGeneralProperties];
}

// Función para obtener solo propiedades del blueprint
export function getBlueprintOnlyProperties(): BlueprintProperty[] {
  return blueprintProperties;
}

// Función para filtrar propiedades del blueprint por estado
export function getBlueprintPropertiesByStatus(status: BlueprintProperty['status']): BlueprintProperty[] {
  return blueprintProperties.filter(property => property.status === status);
}

// Función para obtener estadísticas de propiedades del blueprint
export const blueprintPropertiesStats = {
  total: blueprintProperties.length,
  totalValue: blueprintProperties.reduce((sum, property) => sum + property.price, 0),
  averagePrice: Math.round(blueprintProperties.reduce((sum, property) => sum + property.price, 0) / blueprintProperties.length),
  totalSize: blueprintProperties.reduce((sum, property) => sum + property.size, 0),
  averageSize: Math.round(blueprintProperties.reduce((sum, property) => sum + property.size, 0) / blueprintProperties.length),
  byType: {
    akiya: blueprintProperties.filter(p => p.type === 'akiya').length,
    mansion: blueprintProperties.filter(p => p.type === 'mansion').length,
    apartment: blueprintProperties.filter(p => p.type === 'apartment').length,
    land: blueprintProperties.filter(p => p.type === 'land').length,
    commercial: blueprintProperties.filter(p => p.type === 'commercial').length,
    renovation: blueprintProperties.filter(p => p.type === 'renovation').length
  },
  byPrefecture: {
    Gunma: blueprintProperties.filter(p => p.location.prefecture === 'Gunma').length,
    Tokyo: blueprintProperties.filter(p => p.location.prefecture === 'Tokyo').length,
    Nagano: blueprintProperties.filter(p => p.location.prefecture === 'Nagano').length
  },
  investment: {
    totalRentalPotential: blueprintProperties.reduce((sum, property) => sum + (property.investment.rentalPotential || 0), 0),
    averageROI: blueprintProperties.reduce((sum, property) => sum + (property.investment.roi || 0), 0) / blueprintProperties.length,
    totalAppreciation: blueprintProperties.reduce((sum, property) => sum + (property.investment.appreciation || 0), 0) / blueprintProperties.length
  }
};

