// Integración con JNI Properties Co., Ltd.
// Licencia Inmobiliaria Oficial (Ministro de Tierra, Infraestructura, Transporte y Turismo (2) No. 9062)

export interface JNIProperty {
  id: string;
  propertyCode: string;
  title: string;
  description: string;
  type: 'akiya' | 'mansion' | 'land' | 'commercial';
  location: {
    prefecture: string;
    city: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearestStation?: string;
    walkTimeToStation?: number; // minutes
  };
  details: {
    area: number; // m²
    landArea?: number; // m²
    yearBuilt?: number;
    structure: string; // 'wood', 'steel', 'concrete'
    floors: number;
    rooms: number;
    condition: 'excellent' | 'good' | 'fair' | 'needs_renovation' | 'demolition';
  };
  pricing: {
    askingPrice: number;
    currency: 'JPY';
    pricePerSqm: number;
    estimatedRenovationCost?: {
      basic: number;
      premium: number;
      luxury: number;
    };
  };
  features: string[];
  images: string[];
  documents: string[];
  status: 'available' | 'under_contract' | 'sold' | 'withdrawn';
  jniListingDate: Date;
  lastUpdated: Date;
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  legal: {
    ownership: 'private' | 'government' | 'corporation';
    restrictions: string[];
    taxes: {
      annual: number;
      transfer: number;
    };
  };
}

export interface JNIAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialization: string[];
  experience: number; // years
  languages: string[];
  isActive: boolean;
}

export interface JNITransaction {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  type: 'sale' | 'rental' | 'consultation';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
  currency: 'JPY' | 'USD';
  commission: number;
  startDate: Date;
  expectedCompletionDate: Date;
  actualCompletionDate?: Date;
  documents: string[];
  notes: string;
}

export class JNIIntegrationService {
  private static baseUrl = process.env.JNI_API_BASE_URL || 'https://api.jni-properties.jp';
  private static apiKey = process.env.JNI_API_KEY || '';
  private static licenseNumber = '9062'; // Licencia oficial JNI

  /**
   * Obtiene propiedades disponibles de JNI Properties
   */
  static async getAvailableProperties(filters?: {
    prefecture?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    condition?: string;
  }): Promise<JNIProperty[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.prefecture) queryParams.append('prefecture', filters.prefecture);
      if (filters?.city) queryParams.append('city', filters.city);
      if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
      if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
      if (filters?.propertyType) queryParams.append('type', filters.propertyType);
      if (filters?.condition) queryParams.append('condition', filters.condition);

      const response = await fetch(`${this.baseUrl}/properties?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.properties || [];
    } catch (error) {
      console.error('Error fetching JNI properties:', error);
      // Retornar datos de ejemplo para desarrollo
      return this.getMockProperties();
    }
  }

  /**
   * Obtiene una propiedad específica por ID
   */
  static async getPropertyById(propertyId: string): Promise<JNIProperty | null> {
    try {
      const response = await fetch(`${this.baseUrl}/properties/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.property || null;
    } catch (error) {
      console.error('Error fetching JNI property:', error);
      return this.getMockProperty(propertyId);
    }
  }

  /**
   * Inicia una transacción con JNI Properties
   */
  static async initiateTransaction(transactionData: {
    propertyId: string;
    clientId: string;
    agentId: string;
    type: 'sale' | 'rental' | 'consultation';
    amount: number;
    currency: string;
    clientInfo: {
      name: string;
      email: string;
      phone: string;
      nationality: string;
      visaStatus?: string;
    };
  }): Promise<JNITransaction> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transactionData,
          startDate: new Date().toISOString(),
          expectedCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
        }),
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.transaction;
    } catch (error) {
      console.error('Error initiating JNI transaction:', error);
      throw new Error('Failed to initiate transaction with JNI Properties');
    }
  }

  /**
   * Obtiene agentes disponibles de JNI Properties
   */
  static async getAvailableAgents(): Promise<JNIAgent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/agents`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      console.error('Error fetching JNI agents:', error);
      return this.getMockAgents();
    }
  }

  /**
   * Obtiene el estado de una transacción
   */
  static async getTransactionStatus(transactionId: string): Promise<JNITransaction | null> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.transaction || null;
    } catch (error) {
      console.error('Error fetching JNI transaction:', error);
      return null;
    }
  }

  /**
   * Valida una propiedad con JNI Properties
   */
  static async validateProperty(propertyId: string): Promise<{
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/properties/${propertyId}/validate`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-License-Number': this.licenseNumber,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`JNI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.validation || { isValid: false, issues: [], recommendations: [] };
    } catch (error) {
      console.error('Error validating JNI property:', error);
      return { isValid: false, issues: ['Validation service unavailable'], recommendations: [] };
    }
  }

  /**
   * Obtiene datos de ejemplo para desarrollo
   */
  private static getMockProperties(): JNIProperty[] {
    return [
      {
        id: 'jni_001',
        propertyCode: 'JNI-GM-2024-001',
        title: 'Traditional Akiya in Kusatsu',
        description: 'Beautiful traditional Japanese house in the heart of Kusatsu, perfect for renovation and investment.',
        type: 'akiya',
        location: {
          prefecture: 'Gunma',
          city: 'Kusatsu',
          address: 'Kusatsu, Agatsuma District, Gunma',
          coordinates: { lat: 36.6209, lng: 138.5969 },
          nearestStation: 'Kusatsu Station',
          walkTimeToStation: 15,
        },
        details: {
          area: 85,
          landArea: 120,
          yearBuilt: 1985,
          structure: 'wood',
          floors: 2,
          rooms: 5,
          condition: 'needs_renovation',
        },
        pricing: {
          askingPrice: 15000000,
          currency: 'JPY',
          pricePerSqm: 176471,
          estimatedRenovationCost: {
            basic: 8000000,
            premium: 12000000,
            luxury: 20000000,
          },
        },
        features: ['Onsen nearby', 'Mountain view', 'Traditional architecture', 'Large garden'],
        images: ['/images/properties/jni_001_1.jpg', '/images/properties/jni_001_2.jpg'],
        documents: ['/documents/jni_001_survey.pdf'],
        status: 'available',
        jniListingDate: new Date('2024-01-15'),
        lastUpdated: new Date('2024-01-20'),
        agent: {
          id: 'agent_001',
          name: 'Toshinori Shibusawa',
          phone: '+81-279-88-0001',
          email: 'toshinori@jni-properties.jp',
        },
        legal: {
          ownership: 'private',
          restrictions: ['Residential use only', 'No commercial activities'],
          taxes: {
            annual: 45000,
            transfer: 150000,
          },
        },
      },
      // Más propiedades de ejemplo...
    ];
  }

  private static getMockProperty(propertyId: string): JNIProperty | null {
    const properties = this.getMockProperties();
    return properties.find(p => p.id === propertyId) || null;
  }

  private static getMockAgents(): JNIAgent[] {
    return [
      {
        id: 'agent_001',
        name: 'Toshinori Shibusawa',
        email: 'toshinori@jni-properties.jp',
        phone: '+81-279-88-0001',
        licenseNumber: '9062',
        specialization: ['akiya', 'investment properties', 'international clients'],
        experience: 15,
        languages: ['Japanese', 'English', 'Spanish'],
        isActive: true,
      },
      {
        id: 'agent_002',
        name: 'Yuki Tanaka',
        email: 'yuki@jni-properties.jp',
        phone: '+81-279-88-0002',
        licenseNumber: '9063',
        specialization: ['mansion', 'new construction', 'luxury properties'],
        experience: 8,
        languages: ['Japanese', 'English', 'Chinese'],
        isActive: true,
      },
    ];
  }
}

export default JNIIntegrationService;

