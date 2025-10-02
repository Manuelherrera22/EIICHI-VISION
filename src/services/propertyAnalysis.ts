// 🏠 SERVICIO DE ANÁLISIS IA PARA PROPIEDADES REALES
// Analiza Property A y Property B con IA avanzada

import { UserProfile } from '@/lib/arquitecto-types';

export interface PropertyAnalysis {
  propertyId: string;
  propertyName: string;
  investmentScore: number;
  culturalFit: number;
  lifestyleScore: number;
  overallScore: number;
  recommendations: string[];
  risks: string[];
  opportunities: string[];
  marketAnalysis: {
    priceTrend: 'rising' | 'stable' | 'declining';
    demandLevel: 'high' | 'medium' | 'low';
    competitionLevel: 'high' | 'medium' | 'low';
  };
  userCompatibility: {
    score: number;
    factors: {
      budgetMatch: number;
      culturalAlignment: number;
      lifestyleFit: number;
      investmentGoals: number;
    };
  };
  financialProjections: {
    expectedROI: number;
    rentalYield: number;
    appreciationRate: number;
    breakEvenYears: number;
  };
}

export interface PropertyData {
  id: string;
  name: string;
  location: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  images: string[];
  features: string[];
  description: string;
  propertyType: 'traditional' | 'modern' | 'mixed';
  yearBuilt?: number;
  condition: 'excellent' | 'good' | 'fair' | 'needs_renovation';
}

// Datos de las propiedades reales
export const REAL_PROPERTIES: PropertyData[] = [
  {
    id: 'property-a',
    name: 'Property A - Traditional Japanese Villa',
    location: 'Gunma Prefecture, Japan',
    price: 45000000, // 45M JPY
    currency: 'JPY',
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    areaUnit: 'm²',
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
      'Traditional Japanese Architecture',
      'Mountain Views',
      'Private Garden',
      'Tatami Rooms',
      'Natural Materials',
      'Peaceful Location',
      'Cultural Heritage',
      'Authentic Experience'
    ],
    description: 'A beautiful traditional Japanese villa in Gunma Prefecture, perfect for those seeking authentic Japanese living experience with modern comforts.',
    propertyType: 'traditional',
    yearBuilt: 1985,
    condition: 'good'
  },
  {
    id: 'property-b',
    name: 'Property B - Modern Mountain Retreat',
    location: 'Gunma Prefecture, Japan',
    price: 38000000, // 38M JPY
    currency: 'JPY',
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    areaUnit: 'm²',
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
      'Open Plan Living',
      'Energy Efficient',
      'Contemporary Style',
      'Smart Home Ready',
      'Low Maintenance'
    ],
    description: 'A modern mountain retreat offering contemporary living with stunning natural surroundings and energy-efficient design.',
    propertyType: 'modern',
    yearBuilt: 2015,
    condition: 'excellent'
  }
];

// Función para analizar una propiedad con IA
export async function analyzePropertyWithAI(
  property: PropertyData,
  userProfile: UserProfile
): Promise<PropertyAnalysis> {
  try {
    // Simular llamada a API de IA (en producción esto sería real)
    const analysis = await simulateAIAnalysis(property, userProfile);
    return analysis;
  } catch (error) {
    console.error('Error analyzing property with AI:', error);
    throw error;
  }
}

// Simulación de análisis IA (en producción esto vendría de Claude/GPT/Gemini)
async function simulateAIAnalysis(
  property: PropertyData,
  userProfile: UserProfile
): Promise<PropertyAnalysis> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Calcular scores basados en datos reales
  const investmentScore = calculateInvestmentScore(property, userProfile);
  const culturalFit = calculateCulturalFit(property, userProfile);
  const lifestyleScore = calculateLifestyleScore(property, userProfile);
  const overallScore = Math.round((investmentScore + culturalFit + lifestyleScore) / 3);

  // Generar recomendaciones específicas
  const recommendations = generateRecommendations(property, userProfile, {
    investmentScore,
    culturalFit,
    lifestyleScore
  });

  // Generar riesgos específicos
  const risks = generateRisks(property, userProfile);

  // Generar oportunidades específicas
  const opportunities = generateOpportunities(property, userProfile);

  // Análisis de mercado
  const marketAnalysis = generateMarketAnalysis(property);

  // Compatibilidad con usuario
  const userCompatibility = calculateUserCompatibility(property, userProfile);

  // Proyecciones financieras
  const financialProjections = calculateFinancialProjections(property, userProfile);

  return {
    propertyId: property.id,
    propertyName: property.name,
    investmentScore,
    culturalFit,
    lifestyleScore,
    overallScore,
    recommendations,
    risks,
    opportunities,
    marketAnalysis,
    userCompatibility,
    financialProjections
  };
}

// Calcular score de inversión
function calculateInvestmentScore(property: PropertyData, userProfile: UserProfile): number {
  let score = 70; // Base score

  // Factor precio vs presupuesto
  const userBudget = userProfile.budgetMax || 50000000;
  const priceRatio = property.price / userBudget;
  
  if (priceRatio <= 0.8) score += 15; // Dentro del presupuesto
  else if (priceRatio <= 1.0) score += 10; // En el límite
  else if (priceRatio <= 1.2) score += 5; // Ligeramente por encima
  else score -= 10; // Muy por encima

  // Factor tipo de propiedad
  if (property.propertyType === 'traditional') {
    score += 8; // Tradicional tiene valor cultural
  } else if (property.propertyType === 'modern') {
    score += 12; // Moderno tiene mejor ROI
  }

  // Factor condición
  if (property.condition === 'excellent') score += 10;
  else if (property.condition === 'good') score += 5;
  else if (property.condition === 'fair') score -= 5;
  else score -= 15;

  // Factor experiencia del usuario
  if (userProfile.financialExperience === 'avanzada') score += 8;
  else if (userProfile.financialExperience === 'intermedia') score += 5;
  else if (userProfile.financialExperience === 'basica') score += 2;

  return Math.min(100, Math.max(0, Math.round(score)));
}

// Calcular compatibilidad cultural
function calculateCulturalFit(property: PropertyData, userProfile: UserProfile): number {
  let score = 75; // Base score

  // Factor conocimiento cultural
  if (userProfile.culturalAffinity?.japanKnowledge === 'avanzado') score += 15;
  else if (userProfile.culturalAffinity?.japanKnowledge === 'intermedio') score += 10;
  else if (userProfile.culturalAffinity?.japanKnowledge === 'basico') score += 5;

  // Factor nivel de japonés
  if (userProfile.culturalAffinity?.japaneseLevel === 'avanzado') score += 12;
  else if (userProfile.culturalAffinity?.japaneseLevel === 'intermedio') score += 8;
  else if (userProfile.culturalAffinity?.japaneseLevel === 'principiante') score += 4;

  // Factor tipo de propiedad vs preferencias culturales
  if (property.propertyType === 'traditional') {
    // Usuarios con alta afinidad cultural prefieren tradicional
    const culturalValues = userProfile.culturalAffinity?.personalValues;
    if (culturalValues?.harmony && culturalValues.harmony >= 8) score += 10;
    if (culturalValues?.respect && culturalValues.respect >= 8) score += 8;
  } else if (property.propertyType === 'modern') {
    // Usuarios más occidentales prefieren moderno
    if (userProfile.culturalAffinity?.japanKnowledge === 'basico' || 
        userProfile.culturalAffinity?.japanKnowledge === 'ninguno') score += 8;
  }

  // Factor experiencia previa en Japón
  if (userProfile.previousExperience === 'extensa') score += 10;
  else if (userProfile.previousExperience === 'moderada') score += 6;
  else if (userProfile.previousExperience === 'limitada') score += 3;

  return Math.min(100, Math.max(0, Math.round(score)));
}

// Calcular score de estilo de vida
function calculateLifestyleScore(property: PropertyData, userProfile: UserProfile): number {
  let score = 70; // Base score

  // Factor tamaño de familia
  const familySize = userProfile.familySituation?.size;
  if (familySize === 'familia-grande' && property.bedrooms >= 4) score += 15;
  else if (familySize === 'familia-pequena' && property.bedrooms >= 3) score += 10;
  else if (familySize === 'pareja' && property.bedrooms >= 2) score += 8;
  else if (familySize === 'solo' && property.bedrooms >= 1) score += 5;

  // Factor intereses culturales
  const culturalInterests = userProfile.culturalAffinity?.culturalInterests || [];
  if (culturalInterests.includes('arquitectura') && property.propertyType === 'traditional') score += 12;
  if (culturalInterests.includes('naturaleza') && property.features.includes('Mountain Views')) score += 10;
  if (culturalInterests.includes('tradicion') && property.propertyType === 'traditional') score += 8;

  // Factor motivaciones
  const motivations = userProfile.motivationExpectations?.mainMotivations;
  if (motivations?.lifestyle && motivations.lifestyle >= 8) score += 8;
  if (motivations?.culture && motivations.culture >= 8) score += 6;

  // Factor ubicación (Gunma es buena para estilo de vida tranquilo)
  if (userProfile.motivationExpectations?.mainMotivations?.lifestyle >= 7) score += 10;

  return Math.min(100, Math.max(0, Math.round(score)));
}

// Generar recomendaciones específicas
function generateRecommendations(
  property: PropertyData,
  userProfile: UserProfile,
  scores: { investmentScore: number; culturalFit: number; lifestyleScore: number }
): string[] {
  const recommendations: string[] = [];

  // Recomendaciones basadas en scores
  if (scores.investmentScore >= 85) {
    recommendations.push('Excellent investment opportunity with strong ROI potential');
  } else if (scores.investmentScore >= 75) {
    recommendations.push('Good investment with solid fundamentals');
  }

  if (scores.culturalFit >= 85) {
    recommendations.push('Perfect cultural match for your background and interests');
  } else if (scores.culturalFit >= 75) {
    recommendations.push('Good cultural compatibility with room for growth');
  }

  if (scores.lifestyleScore >= 85) {
    recommendations.push('Ideal lifestyle fit for your family situation');
  } else if (scores.lifestyleScore >= 75) {
    recommendations.push('Good lifestyle match with minor adjustments needed');
  }

  // Recomendaciones específicas por propiedad
  if (property.id === 'property-a') {
    recommendations.push('Traditional architecture offers unique cultural value');
    recommendations.push('Consider renovation potential for modern amenities');
    recommendations.push('Strong appeal to cultural tourism market');
  } else if (property.id === 'property-b') {
    recommendations.push('Modern design appeals to international buyers');
    recommendations.push('Energy-efficient features reduce long-term costs');
    recommendations.push('Contemporary style has broad market appeal');
  }

  // Recomendaciones basadas en perfil de usuario
  if (userProfile.primaryGoal === 'invertir') {
    recommendations.push('Consider rental income potential in Gunma tourism market');
    recommendations.push('Property offers diversification in Japanese real estate');
  } else if (userProfile.primaryGoal === 'migrar') {
    recommendations.push('Property provides excellent base for family relocation');
    recommendations.push('Location offers good balance of culture and convenience');
  } else if (userProfile.primaryGoal === 'vivir') {
    recommendations.push('Perfect for seasonal living and cultural immersion');
    recommendations.push('Ideal for retirement or second home purposes');
  }

  return recommendations.slice(0, 6); // Máximo 6 recomendaciones
}

// Generar riesgos específicos
function generateRisks(property: PropertyData, userProfile: UserProfile): string[] {
  const risks: string[] = [];

  // Riesgos generales de Gunma
  risks.push('Remote location may limit accessibility to major cities');
  risks.push('Seasonal weather conditions require maintenance planning');
  risks.push('Limited English-speaking services in local area');

  // Riesgos específicos por propiedad
  if (property.id === 'property-a') {
    risks.push('Traditional features may require specialized maintenance');
    risks.push('Older construction may need structural updates');
    risks.push('Cultural authenticity may limit modernization options');
  } else if (property.id === 'property-b') {
    risks.push('Modern design may not appeal to traditional buyers');
    risks.push('Higher initial investment compared to traditional properties');
    risks.push('Contemporary features may require tech-savvy maintenance');
  }

  // Riesgos basados en perfil de usuario
  if (userProfile.culturalAffinity?.japaneseLevel === 'ninguno' || 
      userProfile.culturalAffinity?.japaneseLevel === 'principiante') {
    risks.push('Language barrier may complicate property management');
  }

  if (userProfile.previousExperience === 'ninguna') {
    risks.push('First-time Japan property ownership requires careful planning');
  }

  return risks.slice(0, 5); // Máximo 5 riesgos
}

// Generar oportunidades específicas
function generateOpportunities(property: PropertyData, userProfile: UserProfile): string[] {
  const opportunities: string[] = [];

  // Oportunidades generales de Gunma
  opportunities.push('Growing tourism industry in Gunma Prefecture');
  opportunities.push('Increasing foreign interest in Japanese rural properties');
  opportunities.push('Government incentives for rural property investment');
  opportunities.push('Strong cultural heritage value appreciation');

  // Oportunidades específicas por propiedad
  if (property.id === 'property-a') {
    opportunities.push('Traditional architecture has unique market appeal');
    opportunities.push('Potential for cultural tourism rental income');
    opportunities.push('Heritage value likely to appreciate over time');
    opportunities.push('Authentic Japanese living experience for international buyers');
  } else if (property.id === 'property-b') {
    opportunities.push('Modern design appeals to younger international buyers');
    opportunities.push('Energy-efficient features reduce operational costs');
    opportunities.push('Contemporary style has broad market appeal');
    opportunities.push('Low maintenance design reduces long-term costs');
  }

  // Oportunidades basadas en perfil de usuario
  if (userProfile.primaryGoal === 'invertir') {
    opportunities.push('Property offers portfolio diversification in Japanese market');
    opportunities.push('Potential for both rental income and capital appreciation');
  } else if (userProfile.primaryGoal === 'migrar') {
    opportunities.push('Property provides excellent foundation for family relocation');
    opportunities.push('Location offers good balance of culture and modern amenities');
  }

  return opportunities.slice(0, 6); // Máximo 6 oportunidades
}

// Generar análisis de mercado
function generateMarketAnalysis(property: PropertyData) {
  return {
    priceTrend: 'rising' as const,
    demandLevel: 'medium' as const,
    competitionLevel: 'low' as const
  };
}

// Calcular compatibilidad con usuario
function calculateUserCompatibility(property: PropertyData, userProfile: UserProfile) {
  const budgetMatch = calculateBudgetMatch(property, userProfile);
  const culturalAlignment = calculateCulturalAlignment(property, userProfile);
  const lifestyleFit = calculateLifestyleFit(property, userProfile);
  const investmentGoals = calculateInvestmentGoalsMatch(property, userProfile);

  const overallScore = Math.round((budgetMatch + culturalAlignment + lifestyleFit + investmentGoals) / 4);

  return {
    score: overallScore,
    factors: {
      budgetMatch,
      culturalAlignment,
      lifestyleFit,
      investmentGoals
    }
  };
}

// Funciones auxiliares para compatibilidad
function calculateBudgetMatch(property: PropertyData, userProfile: UserProfile): number {
  const userBudget = userProfile.budgetMax || 50000000;
  const priceRatio = property.price / userBudget;
  
  if (priceRatio <= 0.8) return 95;
  if (priceRatio <= 1.0) return 85;
  if (priceRatio <= 1.2) return 70;
  if (priceRatio <= 1.5) return 50;
  return 25;
}

function calculateCulturalAlignment(property: PropertyData, userProfile: UserProfile): number {
  let score = 70;
  
  if (userProfile.culturalAffinity?.japanKnowledge === 'avanzado') score += 20;
  else if (userProfile.culturalAffinity?.japanKnowledge === 'intermedio') score += 15;
  else if (userProfile.culturalAffinity?.japanKnowledge === 'basico') score += 10;
  
  if (property.propertyType === 'traditional' && 
      userProfile.culturalAffinity?.personalValues?.harmony >= 8) score += 10;
  
  return Math.min(100, score);
}

function calculateLifestyleFit(property: PropertyData, userProfile: UserProfile): number {
  let score = 70;
  
  const familySize = userProfile.familySituation?.size;
  if (familySize === 'familia-grande' && property.bedrooms >= 4) score += 20;
  else if (familySize === 'familia-pequena' && property.bedrooms >= 3) score += 15;
  else if (familySize === 'pareja' && property.bedrooms >= 2) score += 10;
  
  return Math.min(100, score);
}

function calculateInvestmentGoalsMatch(property: PropertyData, userProfile: UserProfile): number {
  let score = 70;
  
  if (userProfile.primaryGoal === 'invertir') {
    if (property.condition === 'excellent') score += 20;
    else if (property.condition === 'good') score += 15;
    else if (property.condition === 'fair') score += 10;
  }
  
  return Math.min(100, score);
}

// Calcular proyecciones financieras
function calculateFinancialProjections(property: PropertyData, userProfile: UserProfile) {
  const baseROI = property.propertyType === 'modern' ? 6.5 : 5.8;
  const rentalYield = property.propertyType === 'modern' ? 4.2 : 3.8;
  const appreciationRate = property.propertyType === 'traditional' ? 3.5 : 3.0;
  
  return {
    expectedROI: baseROI + (Math.random() * 2 - 1), // ±1% variation
    rentalYield: rentalYield + (Math.random() * 1 - 0.5), // ±0.5% variation
    appreciationRate: appreciationRate + (Math.random() * 1 - 0.5), // ±0.5% variation
    breakEvenYears: Math.round(property.price / (property.price * rentalYield / 100))
  };
}

// Función para obtener todas las propiedades
export function getAllProperties(): PropertyData[] {
  return REAL_PROPERTIES;
}

// Función para obtener una propiedad por ID
export function getPropertyById(id: string): PropertyData | undefined {
  return REAL_PROPERTIES.find(property => property.id === id);
}

// Función para comparar propiedades
export async function compareProperties(
  propertyIds: string[],
  userProfile: UserProfile
): Promise<PropertyAnalysis[]> {
  const analyses: PropertyAnalysis[] = [];
  
  for (const propertyId of propertyIds) {
    const property = getPropertyById(propertyId);
    if (property) {
      const analysis = await analyzePropertyWithAI(property, userProfile);
      analyses.push(analysis);
    }
  }
  
  return analyses.sort((a, b) => b.overallScore - a.overallScore);
}
