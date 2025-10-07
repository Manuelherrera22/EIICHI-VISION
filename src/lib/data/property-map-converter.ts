// Convertir las propiedades reales al formato del mapa
import { realProperties, type RealProperty } from '@/data/realProperties';

// Coordenadas exactas de Tsumagoi Village, Gunma
const TSUMAGOI_COORDINATES = {
  lat: 36.5208,
  lng: 138.5317
};

// Función para convertir RealProperty a formato del mapa
export function convertRealPropertyToMapProperty(property: RealProperty) {
  // Coordenadas específicas para cada propiedad
  let coordinates;
  
  if (property.id === 'property-a-traditional-villa') {
    // Property A - Traditional Japanese Villa
    coordinates = {
      lat: 36.5210, // Ligeramente al norte de Tsumagoi
      lng: 138.5320  // Ligeramente al este de Tsumagoi
    };
  } else if (property.id === 'property-b-modern-retreat') {
    // Property B - Modern Mountain Retreat  
    coordinates = {
      lat: 36.5205, // Ligeramente al sur de Tsumagoi
      lng: 138.5315  // Ligeramente al oeste de Tsumagoi
    };
  } else {
    // Coordenadas por defecto cerca de Tsumagoi
    coordinates = {
      lat: TSUMAGOI_COORDINATES.lat,
      lng: TSUMAGOI_COORDINATES.lng
    };
  }

  return {
    id: property.id,
    name: property.name,
    description: `${property.layout} • ${property.landArea}m² • Construida en ${property.completion.year}`,
    location: {
      lat: coordinates.lat,
      lng: coordinates.lng,
      address: property.location.address,
      prefecture: property.location.prefecture,
      city: property.location.village,
      district: property.location.district
    },
    price: property.price,
    currency: 'JPY' as const,
    size: property.landArea,
    type: 'villa' as const,
    status: property.status === 'available' ? 'available' as const : 'under_contract' as const,
    images: property.images || ['https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&h=600&fit=crop&auto=format'],
    builtYear: property.completion.year,
    bedrooms: 2, // Asumiendo 2LDK
    bathrooms: 1,
    features: property.features,
    condition: 'good' as const,
    views: Math.floor(Math.random() * 5000) + 1000,
    likes: Math.floor(Math.random() * 500) + 50,
    isSponsored: true,
    isFeatured: true,
    contactInfo: {
      agent: 'Tabiji House',
      phone: '+81-279-88-0001',
      email: 'info@tabiji-house.com'
    },
    legalInfo: {
      ownership: 'freehold' as const,
      restrictions: property.restrictions
    },
    investment: {
      rentalPotential: property.price * 0.01, // 1% del precio como renta mensual estimada
      roi: property.investment.roi,
      appreciation: 5.0
    }
  };
}

// Obtener todas las propiedades convertidas para el mapa
export function getMapProperties() {
  return realProperties.map(convertRealPropertyToMapProperty);
}
