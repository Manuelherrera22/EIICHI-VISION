// Maps Configuration
export const MAPS_CONFIG = {
  // Google Maps API Key - Production key
  GOOGLE_API_KEY: 'AIzaSyA_kEDkDa7p3AxxgNw5JRq00acmAINY50c',
  
  // Mapbox Configuration (Disabled - using Google Maps only)
  MAPBOX_TOKEN: null,
  
  // Map Styles
  STYLES: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c9c9c9' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#424242' }]
    }
  ],
  
  // Default Locations (Google Maps format)
  LOCATIONS: {
    KUSATSU: { lat: 36.6167, lng: 138.5333 },
    TOKYO: { lat: 35.6762, lng: 139.6503 },
    NAGANO: { lat: 36.6514, lng: 138.1811 }
  },
  
  // Mapbox Locations (longitude, latitude format)
  MAPBOX_LOCATIONS: {
    KUSATSU: [138.5333, 36.6167] as [number, number],
    TOKYO: [139.6503, 35.6762] as [number, number],
    NAGANO: [138.1811, 36.6514] as [number, number]
  }
};
