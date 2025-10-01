// Sistema de cálculo de puntuaciones DSO basado en datos del onboarding

export interface OnboardingData {
  investmentGoals: string[];
  lifestyle: string[];
  architecturalStyle: string[];
  location: string[];
  budget: string;
  timeline: string;
  // Datos adicionales que pueden venir del onboarding
  profession?: string;
  educationLevel?: string;
  familySize?: number;
  interests?: string[];
  experienceInJapan?: boolean;
  languageLevel?: string;
}

export interface IVIScore {
  percentage: number;
  category: 'investment';
  strengths: string[];
  opportunities: string[];
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
  // Detalles específicos del IVI
  capitalAdequacy: number;
  riskTolerance: number;
  marketKnowledge: number;
  diversificationStrategy: number;
}

export interface IVMScore {
  percentage: number;
  category: 'migration';
  strengths: string[];
  opportunities: string[];
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
  // Detalles específicos del IVM
  documentationComplete: number;
  professionDemand: number;
  educationLevel: number;
  accommodationPlan: number;
}

export interface ISEScore {
  percentage: number;
  category: 'lifestyle';
  strengths: string[];
  opportunities: string[];
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
  // Detalles específicos del ISE
  designPreference: number;
  renovationBudget: number;
  propertySelection: number;
  culturalExperiences: number;
}

// Función principal para calcular todas las puntuaciones
export function calculateDSOScores(onboardingData: OnboardingData): {
  ivi: IVIScore;
  ivm: IVMScore;
  ise: ISEScore;
} {
  return {
    ivi: calculateIVI(onboardingData),
    ivm: calculateIVM(onboardingData),
    ise: calculateISE(onboardingData)
  };
}

// Cálculo del Índice de Viabilidad de Inversión (IVI)
function calculateIVI(data: OnboardingData): IVIScore {
  // Capital Adequacy - basado en budget
  let capitalAdequacy = 0;
  switch (data.budget) {
    case '300k-plus':
      capitalAdequacy = 95;
      break;
    case '200k-300k':
      capitalAdequacy = 85;
      break;
    case '100k-200k':
      capitalAdequacy = 70;
      break;
    case '50k-100k':
      capitalAdequacy = 55;
      break;
    default:
      capitalAdequacy = 40;
  }

  // Risk Tolerance - basado en investment goals
  let riskTolerance = 0;
  if (data.investmentGoals.includes('roi')) riskTolerance += 25;
  if (data.investmentGoals.includes('rental')) riskTolerance += 20;
  if (data.investmentGoals.includes('heritage')) riskTolerance += 15;
  if (data.investmentGoals.includes('vacation')) riskTolerance += 10;
  if (data.investmentGoals.includes('family')) riskTolerance += 10;
  riskTolerance = Math.min(100, riskTolerance);

  // Market Knowledge - basado en timeline y experiencia
  let marketKnowledge = 0;
  switch (data.timeline) {
    case 'flexible':
      marketKnowledge = 80;
      break;
    case '18-months':
      marketKnowledge = 70;
      break;
    case '12-months':
      marketKnowledge = 60;
      break;
    case '6-months':
      marketKnowledge = 45;
      break;
    default:
      marketKnowledge = 30;
  }
  
  // Bonus por experiencia previa
  if (data.experienceInJapan) marketKnowledge += 15;
  if (data.languageLevel === 'advanced') marketKnowledge += 10;
  marketKnowledge = Math.min(100, marketKnowledge);

  // Diversification Strategy - basado en número de goals
  const diversificationStrategy = Math.min(100, data.investmentGoals.length * 20);

  // Cálculo del porcentaje final
  const percentage = Math.round(
    (capitalAdequacy * 0.3 + riskTolerance * 0.2 + marketKnowledge * 0.25 + diversificationStrategy * 0.25)
  );

  // Generar strengths y opportunities
  const strengths: string[] = [];
  const opportunities: string[] = [];

  if (capitalAdequacy >= 70) strengths.push('Capital inicial adecuado para tus objetivos');
  if (riskTolerance >= 70) strengths.push('Tolerancia al riesgo claramente definida');
  if (marketKnowledge >= 70) strengths.push('Conocimiento sólido del mercado inmobiliario');
  if (diversificationStrategy >= 70) strengths.push('Estrategia de diversificación bien definida');

  if (diversificationStrategy < 50) opportunities.push('Estrategia de diversificación por definir');
  if (marketKnowledge < 50) opportunities.push('Conocimiento del mercado inmobiliario de Gunma: Básico');
  if (capitalAdequacy < 60) opportunities.push('Evaluar opciones de financiamiento adicional');
  if (riskTolerance < 50) opportunities.push('Definir mejor tu perfil de riesgo');

  return {
    percentage,
    category: 'investment',
    strengths,
    opportunities,
    lastUpdated: new Date(),
    trend: 'stable',
    capitalAdequacy,
    riskTolerance,
    marketKnowledge,
    diversificationStrategy
  };
}

// Cálculo del Índice de Viabilidad Migratoria (IVM)
function calculateIVM(data: OnboardingData): IVMScore {
  // Documentation Complete - simulado basado en datos disponibles
  let documentationComplete = 30; // Base
  if (data.educationLevel) documentationComplete += 15;
  if (data.profession) documentationComplete += 15;
  if (data.languageLevel) documentationComplete += 10;
  if (data.experienceInJapan) documentationComplete += 10;
  documentationComplete = Math.min(100, documentationComplete);

  // Profession Demand - basado en profesión
  let professionDemand = 0;
  const highDemandProfessions = ['engineer', 'doctor', 'teacher', 'it', 'designer', 'business'];
  const mediumDemandProfessions = ['marketing', 'sales', 'finance', 'consultant'];
  
  if (data.profession && highDemandProfessions.some(p => data.profession?.toLowerCase().includes(p))) {
    professionDemand = 90;
  } else if (data.profession && mediumDemandProfessions.some(p => data.profession?.toLowerCase().includes(p))) {
    professionDemand = 70;
  } else if (data.profession) {
    professionDemand = 50;
  }

  // Education Level - basado en nivel educativo
  let educationScore = 0;
  switch (data.educationLevel) {
    case 'doctorate':
      educationScore = 95;
      break;
    case 'masters':
      educationScore = 85;
      break;
    case 'bachelors':
      educationScore = 75;
      break;
    case 'associate':
      educationScore = 60;
      break;
    default:
      educationScore = 40;
  }

  // Accommodation Plan - basado en si tiene plan de alojamiento
  let accommodationPlan = 0;
  if (data.investmentGoals.includes('family') || data.investmentGoals.includes('heritage')) {
    accommodationPlan = 80;
  } else if (data.investmentGoals.includes('vacation')) {
    accommodationPlan = 60;
  } else {
    accommodationPlan = 30;
  }

  // Cálculo del porcentaje final
  const percentage = Math.round(
    (documentationComplete * 0.25 + professionDemand * 0.3 + educationScore * 0.25 + accommodationPlan * 0.2)
  );

  // Generar strengths y opportunities
  const strengths: string[] = [];
  const opportunities: string[] = [];

  if (professionDemand >= 70) strengths.push('Profesión en alta demanda en Japón');
  if (educationScore >= 70) strengths.push('Nivel educativo cumple los requisitos');
  if (documentationComplete >= 60) strengths.push('Documentación parcialmente completa');
  if (accommodationPlan >= 60) strengths.push('Plan de alojamiento definido');

  if (documentationComplete < 50) opportunities.push('Documentación clave faltante');
  if (accommodationPlan < 50) opportunities.push('Plan de alojamiento a largo plazo no definido');
  if (professionDemand < 50) opportunities.push('Evaluar oportunidades de especialización');
  if (educationScore < 60) opportunities.push('Considerar certificaciones adicionales');

  return {
    percentage,
    category: 'migration',
    strengths,
    opportunities,
    lastUpdated: new Date(),
    trend: 'stable',
    documentationComplete,
    professionDemand,
    educationLevel: educationScore,
    accommodationPlan
  };
}

// Cálculo del Índice de Sincronización de Estilo de Vida (ISE)
function calculateISE(data: OnboardingData): ISEScore {
  // Design Preference - basado en architectural style
  let designPreference = 0;
  if (data.architecturalStyle.includes('traditional')) designPreference += 30;
  if (data.architecturalStyle.includes('modern')) designPreference += 25;
  if (data.architecturalStyle.includes('minimalist')) designPreference += 20;
  if (data.architecturalStyle.includes('wabi-sabi')) designPreference += 25;
  designPreference = Math.min(100, designPreference);

  // Renovation Budget - basado en budget
  let renovationBudget = 0;
  switch (data.budget) {
    case '300k-plus':
      renovationBudget = 95;
      break;
    case '200k-300k':
      renovationBudget = 85;
      break;
    case '100k-200k':
      renovationBudget = 70;
      break;
    case '50k-100k':
      renovationBudget = 55;
      break;
    default:
      renovationBudget = 40;
  }

  // Property Selection - basado en si tiene preferencias claras
  let propertySelection = 0;
  if (data.location.length > 0) propertySelection += 30;
  if (data.architecturalStyle.length > 0) propertySelection += 25;
  if (data.investmentGoals.length > 0) propertySelection += 25;
  if (data.lifestyle.length > 0) propertySelection += 20;

  // Cultural Experiences - basado en lifestyle e interests
  let culturalExperiences = 0;
  const culturalActivities = ['onsen', 'tea-ceremony', 'gardening', 'cooking', 'art', 'nature'];
  culturalExperiences = data.lifestyle.filter(style => 
    culturalActivities.some(activity => style.toLowerCase().includes(activity))
  ).length * 20;
  
  if (data.interests) {
    culturalExperiences += data.interests.filter(interest => 
      culturalActivities.some(activity => interest.toLowerCase().includes(activity))
    ).length * 15;
  }
  
  culturalExperiences = Math.min(100, culturalExperiences);

  // Cálculo del porcentaje final
  const percentage = Math.round(
    (designPreference * 0.25 + renovationBudget * 0.25 + propertySelection * 0.3 + culturalExperiences * 0.2)
  );

  // Generar strengths y opportunities
  const strengths: string[] = [];
  const opportunities: string[] = [];

  if (designPreference >= 70) strengths.push('Preferencia de diseño muy clara');
  if (renovationBudget >= 70) strengths.push('Presupuesto de renovación definido');
  if (propertySelection >= 70) strengths.push('Criterios de selección bien definidos');
  if (culturalExperiences >= 60) strengths.push('Intereses culturales identificados');

  if (propertySelection < 50) opportunities.push('Propiedad ideal aún por seleccionar');
  if (culturalExperiences < 50) opportunities.push('Experiencias culturales clave no definidas');
  if (designPreference < 60) opportunities.push('Refinar preferencias de diseño');
  if (renovationBudget < 60) opportunities.push('Evaluar opciones de financiamiento');

  return {
    percentage,
    category: 'lifestyle',
    strengths,
    opportunities,
    lastUpdated: new Date(),
    trend: 'stable',
    designPreference,
    renovationBudget,
    propertySelection,
    culturalExperiences
  };
}

// Función para obtener recomendaciones específicas basadas en las puntuaciones
export function getPersonalizedRecommendations(scores: {
  ivi: IVIScore;
  ivm: IVMScore;
  ise: ISEScore;
}) {
  const recommendations = [];

  // Recomendaciones basadas en IVI
  if (scores.ivi.opportunities.length > 0) {
    recommendations.push({
      dashboard: 'investment',
      priority: scores.ivi.percentage < 70 ? 'high' : 'medium',
      action: 'Mejorar estrategia de inversión',
      modules: ['Eleva tu Estrategia', 'Simulador de Mercado IA']
    });
  }

  // Recomendaciones basadas en IVM
  if (scores.ivm.opportunities.length > 0) {
    recommendations.push({
      dashboard: 'migration',
      priority: scores.ivm.percentage < 60 ? 'high' : 'medium',
      action: 'Acelerar proceso migratorio',
      modules: ['Acelera tu Documentación', 'Define tu Hogar Base']
    });
  }

  // Recomendaciones basadas en ISE
  if (scores.ise.opportunities.length > 0) {
    recommendations.push({
      dashboard: 'lifestyle',
      priority: scores.ise.percentage < 80 ? 'high' : 'medium',
      action: 'Perfeccionar estilo de vida',
      modules: ['Descubre tu Propiedad Ideal', 'Diseña tu Espacio']
    });
  }

  return recommendations;
}


