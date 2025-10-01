// Sistema de scoring inteligente avanzado para DSO

export interface EnhancedOnboardingData {
  // Datos básicos del onboarding
  investmentGoals: string[];
  lifestyle: string[];
  architecturalStyle: string[];
  location: string[];
  budget: string;
  timeline: string;
  
  // Datos adicionales para análisis inteligente
  profession?: string;
  educationLevel?: string;
  familySize?: number;
  interests?: string[];
  experienceInJapan?: boolean;
  languageLevel?: string;
  age?: number;
  nationality?: string;
  workExperience?: number;
  currentIncome?: string;
  riskProfile?: string;
  investmentExperience?: string;
  
  // Datos de actividad y comportamiento
  lastLogin?: Date;
  pagesVisited?: string[];
  timeSpentOnSite?: number;
  propertiesViewed?: string[];
  documentsUploaded?: string[];
  questionsAnswered?: number;
  
  // Preferencias específicas
  preferredPropertyTypes?: string[];
  maxBudget?: number;
  minROI?: number;
  preferredLocations?: string[];
  renovationBudget?: string;
  rentalGoals?: boolean;
  vacationUse?: boolean;
  familyRelocation?: boolean;
}

export interface IntelligentProfileAnalysis {
  // Análisis general del perfil
  profileCompleteness: number;
  engagementLevel: 'low' | 'medium' | 'high' | 'excellent';
  riskCategory: 'conservative' | 'moderate' | 'aggressive' | 'speculative';
  
  // Métricas específicas por área
  investmentReadiness: {
    score: number;
    factors: {
      capitalAdequacy: number;
      riskTolerance: number;
      marketKnowledge: number;
      diversificationStrategy: number;
      investmentExperience: number;
      financialStability: number;
    };
    recommendations: string[];
    nextSteps: string[];
  };
  
  migrationReadiness: {
    score: number;
    factors: {
      professionDemand: number;
      educationRecognition: number;
      languageProficiency: number;
      documentationComplete: number;
      financialProof: number;
      accommodationPlan: number;
      culturalAdaptation: number;
      familySupport: number;
    };
    visaEligibility: {
      workVisa: number;
      investorVisa: number;
      spouseVisa: number;
      studentVisa: number;
    };
    recommendations: string[];
    urgentActions: string[];
    timelineEstimate: string;
  };
  
  lifestyleAlignment: {
    score: number;
    factors: {
      designPreference: number;
      culturalFit: number;
      locationPreference: number;
      budgetAlignment: number;
      familyNeeds: number;
      longTermGoals: number;
    };
    recommendations: string[];
    lifestyleOptimization: string[];
  };
  
  // Análisis predictivo
  successProbability: {
    investment: number;
    migration: number;
    lifestyle: number;
    overall: number;
  };
  
  // Oportunidades personalizadas
  personalizedOpportunities: {
    properties: Array<{
      id: string;
      name: string;
      matchScore: number;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    businesses: Array<{
      id: string;
      name: string;
      matchScore: number;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    services: Array<{
      id: string;
      name: string;
      matchScore: number;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
  
  // Alertas inteligentes
  smartAlerts: Array<{
    type: 'opportunity' | 'deadline' | 'risk' | 'recommendation';
    priority: 'high' | 'medium' | 'low';
    title: string;
    message: string;
    actionRequired: boolean;
    deadline?: Date;
  }>;
  
  // Scores específicos para dashboards
  ivi: {
    percentage: number;
    category: 'investment';
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    capitalAdequacy: number;
    riskTolerance: number;
    marketKnowledge: number;
    diversificationStrategy: number;
  };
  
  ivm: {
    percentage: number;
    category: 'migration';
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    documentationComplete: number;
    professionDemand: number;
    educationLevel: number;
    accommodationPlan: number;
    visaEligibility?: { type: string; score: number; status: string }[];
    timelineEstimate?: string;
  };
  
  ise: {
    percentage: number;
    category: 'lifestyle';
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    designPreference: number;
    renovationBudget: number;
    propertySelection: number;
    culturalExperiences: number;
  };
}

// Función principal de análisis inteligente
export function analyzeIntelligentProfile(data: EnhancedOnboardingData): IntelligentProfileAnalysis {
  return {
    profileCompleteness: calculateProfileCompleteness(data),
    engagementLevel: calculateEngagementLevel(data),
    riskCategory: determineRiskCategory(data),
    investmentReadiness: analyzeInvestmentReadiness(data),
    migrationReadiness: analyzeMigrationReadiness(data),
    lifestyleAlignment: analyzeLifestyleAlignment(data),
    successProbability: calculateSuccessProbability(data),
    personalizedOpportunities: generatePersonalizedOpportunities(data),
    smartAlerts: generateSmartAlerts(data),
    ivi: calculateIVIScore(data),
    ivm: calculateIVMScore(data),
    ise: calculateISEScore(data)
  };
}

// Función para calcular completitud del perfil
function calculateProfileCompleteness(data: EnhancedOnboardingData): number {
  let completeness = 0;
  let totalFields = 0;
  
  // Campos básicos (peso 1)
  const basicFields = [
    'investmentGoals', 'lifestyle', 'architecturalStyle', 'location', 
    'budget', 'timeline', 'profession', 'educationLevel'
  ];
  
  basicFields.forEach(field => {
    totalFields += 1;
    if (data[field as keyof EnhancedOnboardingData]) completeness += 1;
  });
  
  // Campos avanzados (peso 2)
  const advancedFields = [
    'experienceInJapan', 'languageLevel', 'familySize', 'age', 
    'workExperience', 'riskProfile', 'investmentExperience'
  ];
  
  advancedFields.forEach(field => {
    totalFields += 2;
    if (data[field as keyof EnhancedOnboardingData]) completeness += 2;
  });
  
  // Campos de comportamiento (peso 3)
  const behaviorFields = [
    'propertiesViewed', 'documentsUploaded', 'questionsAnswered'
  ];
  
  behaviorFields.forEach(field => {
    totalFields += 3;
    const value = data[field as keyof EnhancedOnboardingData];
    if (value && Array.isArray(value) && value.length > 0) {
      completeness += 3;
    } else if (value && typeof value === 'number' && value > 0) {
      completeness += 3;
    }
  });
  
  return Math.round((completeness / totalFields) * 100);
}

// Función para calcular nivel de engagement
function calculateEngagementLevel(data: EnhancedOnboardingData): 'low' | 'medium' | 'high' | 'excellent' {
  let engagementScore = 0;
  
  // Tiempo en el sitio
  if (data.timeSpentOnSite) {
    if (data.timeSpentOnSite > 3600) engagementScore += 40; // 1+ hora
    else if (data.timeSpentOnSite > 1800) engagementScore += 30; // 30+ min
    else if (data.timeSpentOnSite > 600) engagementScore += 20; // 10+ min
    else engagementScore += 10;
  }
  
  // Páginas visitadas
  if (data.pagesVisited && data.pagesVisited.length > 5) engagementScore += 30;
  else if (data.pagesVisited && data.pagesVisited.length > 2) engagementScore += 20;
  else if (data.pagesVisited && data.pagesVisited.length > 0) engagementScore += 10;
  
  // Propiedades vistas
  if (data.propertiesViewed && data.propertiesViewed.length > 3) engagementScore += 20;
  else if (data.propertiesViewed && data.propertiesViewed.length > 1) engagementScore += 15;
  else if (data.propertiesViewed && data.propertiesViewed.length > 0) engagementScore += 10;
  
  // Documentos subidos
  if (data.documentsUploaded && data.documentsUploaded.length > 2) engagementScore += 10;
  else if (data.documentsUploaded && data.documentsUploaded.length > 0) engagementScore += 5;
  
  if (engagementScore >= 80) return 'excellent';
  if (engagementScore >= 60) return 'high';
  if (engagementScore >= 40) return 'medium';
  return 'low';
}

// Función para determinar categoría de riesgo
function determineRiskCategory(data: EnhancedOnboardingData): 'conservative' | 'moderate' | 'aggressive' | 'speculative' {
  let riskScore = 0;
  
  // Presupuesto vs experiencia
  if (data.budget === '300k-plus' && data.investmentExperience === 'beginner') riskScore += 3;
  else if (data.budget === '200k-300k' && data.investmentExperience === 'intermediate') riskScore += 2;
  else if (data.budget === '100k-200k' && data.investmentExperience === 'advanced') riskScore += 1;
  
  // Objetivos de inversión
  if (data.investmentGoals.includes('roi')) riskScore += 2;
  if (data.investmentGoals.includes('rental')) riskScore += 1;
  if (data.investmentGoals.includes('speculation')) riskScore += 3;
  
  // Timeline
  if (data.timeline === '6-months') riskScore += 2;
  else if (data.timeline === 'flexible') riskScore -= 1;
  
  // Perfil de riesgo explícito
  if (data.riskProfile === 'aggressive') riskScore += 3;
  else if (data.riskProfile === 'moderate') riskScore += 1;
  else if (data.riskProfile === 'conservative') riskScore -= 1;
  
  if (riskScore >= 6) return 'speculative';
  if (riskScore >= 3) return 'aggressive';
  if (riskScore >= 0) return 'moderate';
  return 'conservative';
}

// Análisis de readiness de inversión
function analyzeInvestmentReadiness(data: EnhancedOnboardingData) {
  const capitalAdequacy = calculateCapitalAdequacy(data);
  const riskTolerance = calculateRiskTolerance(data);
  const marketKnowledge = calculateMarketKnowledge(data);
  const diversificationStrategy = calculateDiversificationStrategy(data);
  const investmentExperience = calculateInvestmentExperience(data);
  const financialStability = calculateFinancialStability(data);
  
  const score = Math.round(
    (capitalAdequacy * 0.25 + riskTolerance * 0.20 + marketKnowledge * 0.20 + 
     diversificationStrategy * 0.15 + investmentExperience * 0.10 + financialStability * 0.10)
  );
  
  return {
    score,
    factors: {
      capitalAdequacy,
      riskTolerance,
      marketKnowledge,
      diversificationStrategy,
      investmentExperience,
      financialStability
    },
    recommendations: generateInvestmentRecommendations(data, {
      capitalAdequacy, riskTolerance, marketKnowledge, 
      diversificationStrategy, investmentExperience, financialStability
    }),
    nextSteps: generateInvestmentNextSteps(data, score)
  };
}

// Análisis de readiness de migración (MÁS INTELIGENTE)
function analyzeMigrationReadiness(data: EnhancedOnboardingData) {
  const professionDemand = calculateProfessionDemand(data);
  const educationRecognition = calculateEducationRecognition(data);
  const languageProficiency = calculateLanguageProficiency(data);
  const documentationComplete = calculateDocumentationComplete(data);
  const financialProof = calculateFinancialProof(data);
  const accommodationPlan = calculateAccommodationPlan(data);
  const culturalAdaptation = calculateCulturalAdaptation(data);
  const familySupport = calculateFamilySupport(data);
  
  const score = Math.round(
    (professionDemand * 0.20 + educationRecognition * 0.15 + languageProficiency * 0.15 +
     documentationComplete * 0.15 + financialProof * 0.15 + accommodationPlan * 0.10 +
     culturalAdaptation * 0.05 + familySupport * 0.05)
  );
  
  return {
    score,
    factors: {
      professionDemand,
      educationRecognition,
      languageProficiency,
      documentationComplete,
      financialProof,
      accommodationPlan,
      culturalAdaptation,
      familySupport
    },
    visaEligibility: calculateVisaEligibility(data, {
      professionDemand, educationRecognition, languageProficiency,
      documentationComplete, financialProof, accommodationPlan
    }),
    recommendations: generateMigrationRecommendations(data, {
      professionDemand, educationRecognition, languageProficiency,
      documentationComplete, financialProof, accommodationPlan, culturalAdaptation, familySupport
    }),
    urgentActions: generateUrgentMigrationActions(data, score),
    timelineEstimate: estimateMigrationTimeline(data, score)
  };
}

// Funciones específicas de cálculo (implementaciones detalladas)

function calculateCapitalAdequacy(data: EnhancedOnboardingData): number {
  let score = 0;
  
  switch (data.budget) {
    case '300k-plus':
      score = 95;
      break;
    case '200k-300k':
      score = 85;
      break;
    case '100k-200k':
      score = 70;
      break;
    case '50k-100k':
      score = 55;
      break;
    default:
      score = 40;
  }
  
  // Ajustes basados en ingresos actuales
  if (data.currentIncome === 'high') score += 10;
  else if (data.currentIncome === 'medium') score += 5;
  
  return Math.min(100, score);
}

function calculateProfessionDemand(data: EnhancedOnboardingData): number {
  if (!data.profession) return 0;
  
  const highDemandProfessions = [
    'engineer', 'software', 'developer', 'programmer', 'it', 'tech',
    'doctor', 'nurse', 'medical', 'healthcare',
    'teacher', 'education', 'professor', 'instructor',
    'designer', 'architect', 'creative'
  ];
  
  const mediumDemandProfessions = [
    'marketing', 'sales', 'finance', 'consultant', 'business',
    'translator', 'interpreter', 'language'
  ];
  
  const professionLower = data.profession.toLowerCase();
  
  if (highDemandProfessions.some(p => professionLower.includes(p))) {
    return 90;
  } else if (mediumDemandProfessions.some(p => professionLower.includes(p))) {
    return 70;
  } else {
    return 50; // Profesiones generales
  }
}

function calculateLanguageProficiency(data: EnhancedOnboardingData): number {
  if (!data.languageLevel) return 0;
  
  switch (data.languageLevel) {
    case 'native':
      return 100;
    case 'advanced':
      return 85;
    case 'intermediate':
      return 65;
    case 'basic':
      return 40;
    case 'beginner':
      return 20;
    default:
      return 30;
  }
}

function calculateDocumentationComplete(data: EnhancedOnboardingData): number {
  let score = 20; // Base
  
  // Documentos básicos
  if (data.educationLevel) score += 15;
  if (data.profession) score += 15;
  if (data.languageLevel) score += 10;
  if (data.experienceInJapan) score += 10;
  if (data.workExperience && data.workExperience > 3) score += 10;
  
  // Documentos subidos
  if (data.documentsUploaded) {
    score += Math.min(20, data.documentsUploaded.length * 5);
  }
  
  return Math.min(100, score);
}

function calculateVisaEligibility(data: EnhancedOnboardingData, factors: any) {
  const workVisa = Math.round(
    (factors.professionDemand * 0.4 + factors.educationRecognition * 0.3 + 
     factors.languageProficiency * 0.2 + factors.financialProof * 0.1)
  );
  
  const investorVisa = Math.round(
    (factors.financialProof * 0.5 + factors.accommodationPlan * 0.3 + 
     factors.documentationComplete * 0.2)
  );
  
  const spouseVisa = Math.round(
    (factors.financialProof * 0.4 + factors.accommodationPlan * 0.4 + 
     factors.documentationComplete * 0.2)
  );
  
  const studentVisa = Math.round(
    (factors.educationRecognition * 0.4 + factors.languageProficiency * 0.3 + 
     factors.financialProof * 0.3)
  );
  
  return { workVisa, investorVisa, spouseVisa, studentVisa };
}

function generateSmartAlerts(data: EnhancedOnboardingData) {
  const alerts = [];
  
  // Alertas basadas en completitud del perfil
  if (data.professionDemand && data.professionDemand < 60) {
    alerts.push({
      type: 'risk' as const,
      priority: 'high' as const,
      title: 'Profesión con baja demanda',
      message: 'Tu profesión actual tiene baja demanda en Japón. Considera especialización o certificaciones.',
      actionRequired: true
    });
  }
  
  // Alertas de timeline
  if (data.timeline === '6-months' && data.documentationComplete && data.documentationComplete < 50) {
    alerts.push({
      type: 'deadline' as const,
      priority: 'high' as const,
      title: 'Timeline agresivo',
      message: 'Tu timeline de 6 meses requiere documentación completa inmediatamente.',
      actionRequired: true,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
    });
  }
  
  // Alertas de oportunidades
  if (data.budget === '300k-plus' && data.investmentExperience === 'beginner') {
    alerts.push({
      type: 'recommendation' as const,
      priority: 'medium' as const,
      title: 'Oportunidad de asesoría',
      message: 'Con tu presupuesto, te recomendamos una sesión de asesoría personalizada.',
      actionRequired: false
    });
  }
  
  return alerts;
}

// Funciones auxiliares (implementaciones simplificadas)
function calculateRiskTolerance(data: EnhancedOnboardingData): number {
  let score = 50;
  if (data.investmentGoals.includes('roi')) score += 20;
  if (data.investmentGoals.includes('rental')) score += 15;
  if (data.riskProfile === 'aggressive') score += 25;
  if (data.riskProfile === 'conservative') score -= 15;
  return Math.min(100, Math.max(0, score));
}

function calculateMarketKnowledge(data: EnhancedOnboardingData): number {
  let score = 30;
  if (data.experienceInJapan) score += 30;
  if (data.languageLevel === 'advanced') score += 20;
  if (data.workExperience && data.workExperience > 5) score += 20;
  return Math.min(100, score);
}

function calculateDiversificationStrategy(data: EnhancedOnboardingData): number {
  return Math.min(100, data.investmentGoals.length * 25);
}

function calculateInvestmentExperience(data: EnhancedOnboardingData): number {
  switch (data.investmentExperience) {
    case 'advanced': return 90;
    case 'intermediate': return 70;
    case 'beginner': return 40;
    default: return 30;
  }
}

function calculateFinancialStability(data: EnhancedOnboardingData): number {
  let score = 50;
  if (data.currentIncome === 'high') score += 30;
  else if (data.currentIncome === 'medium') score += 15;
  if (data.workExperience && data.workExperience > 3) score += 20;
  return Math.min(100, score);
}

// Funciones para generar recomendaciones
function generateInvestmentRecommendations(data: EnhancedOnboardingData, factors: any): string[] {
  const recommendations = [];
  
  if (factors.marketKnowledge < 60) {
    recommendations.push('Completar curso de mercado inmobiliario japonés');
  }
  if (factors.diversificationStrategy < 50) {
    recommendations.push('Desarrollar estrategia de diversificación de portafolio');
  }
  if (factors.investmentExperience < 50) {
    recommendations.push('Comenzar con inversiones de menor riesgo para ganar experiencia');
  }
  
  return recommendations;
}

function generateMigrationRecommendations(data: EnhancedOnboardingData, factors: any): string[] {
  const recommendations = [];
  
  if (factors.languageProficiency < 70) {
    recommendations.push('Mejorar nivel de japonés antes de la migración');
  }
  if (factors.documentationComplete < 60) {
    recommendations.push('Completar documentación requerida para visa');
  }
  if (factors.professionDemand < 70) {
    recommendations.push('Considerar certificaciones adicionales para tu profesión');
  }
  
  return recommendations;
}

function generateUrgentMigrationActions(data: EnhancedOnboardingData, score: number): string[] {
  const actions = [];
  
  if (score < 60) {
    actions.push('Apostillar documentos educativos');
    actions.push('Obtener certificado de antecedentes penales');
    actions.push('Preparar evidencia financiera');
  }
  
  return actions;
}

function estimateMigrationTimeline(data: EnhancedOnboardingData, score: number): string {
  if (score >= 80) return '3-6 meses';
  if (score >= 60) return '6-12 meses';
  if (score >= 40) return '12-18 meses';
  return '18+ meses';
}

// Funciones adicionales (implementaciones simplificadas)
function analyzeLifestyleAlignment(data: EnhancedOnboardingData) {
  return {
    score: 75,
    factors: {
      designPreference: 80,
      culturalFit: 70,
      locationPreference: 75,
      budgetAlignment: 85,
      familyNeeds: 60,
      longTermGoals: 80
    },
    recommendations: ['Refinar preferencias de ubicación', 'Evaluar necesidades familiares'],
    lifestyleOptimization: ['Optimizar presupuesto para renovación', 'Explorar opciones culturales']
  };
}

function calculateSuccessProbability(data: EnhancedOnboardingData) {
  return {
    investment: 78,
    migration: 65,
    lifestyle: 82,
    overall: 75
  };
}

function generatePersonalizedOpportunities(data: EnhancedOnboardingData) {
  return {
    properties: [
      {
        id: 'prop-1',
        name: 'Casa Tradicional Kusatsu',
        matchScore: 85,
        reason: 'Perfecta para tu presupuesto y preferencias de diseño',
        priority: 'high' as const
      }
    ],
    businesses: [
      {
        id: 'biz-1',
        name: 'Franquicia de Café',
        matchScore: 78,
        reason: 'Alta demanda en la región y buen ROI',
        priority: 'medium' as const
      }
    ],
    services: [
      {
        id: 'svc-1',
        name: 'Asesoría Migratoria Premium',
        matchScore: 92,
        reason: 'Crítico para tu timeline de migración',
        priority: 'high' as const
      }
    ]
  };
}

function generateInvestmentNextSteps(data: EnhancedOnboardingData, score: number): string[] {
  if (score >= 80) {
    return ['Revisar portafolio de propiedades', 'Programar visita virtual'];
  } else if (score >= 60) {
    return ['Completar análisis de mercado', 'Definir estrategia de inversión'];
  } else {
    return ['Tomar curso de inversión básica', 'Consultar con asesor financiero'];
  }
}

function calculateEducationRecognition(data: EnhancedOnboardingData): number {
  switch (data.educationLevel) {
    case 'doctorate': return 95;
    case 'masters': return 85;
    case 'bachelors': return 75;
    case 'associate': return 60;
    default: return 40;
  }
}

function calculateFinancialProof(data: EnhancedOnboardingData): number {
  let score = 0;
  switch (data.budget) {
    case '300k-plus': score = 95; break;
    case '200k-300k': score = 80; break;
    case '100k-200k': score = 65; break;
    case '50k-100k': score = 50; break;
    default: score = 30;
  }
  
  if (data.currentIncome === 'high') score += 10;
  return Math.min(100, score);
}

function calculateAccommodationPlan(data: EnhancedOnboardingData): number {
  let score = 0;
  if (data.investmentGoals.includes('family')) score += 30;
  if (data.investmentGoals.includes('heritage')) score += 25;
  if (data.investmentGoals.includes('vacation')) score += 20;
  if (data.location.length > 0) score += 25;
  return Math.min(100, score);
}

function calculateCulturalAdaptation(data: EnhancedOnboardingData): number {
  let score = 50;
  if (data.experienceInJapan) score += 30;
  if (data.languageLevel === 'advanced') score += 20;
  if (data.interests && data.interests.some(i => 
    ['onsen', 'tea-ceremony', 'gardening', 'cooking'].some(c => i.toLowerCase().includes(c))
  )) {
    score += 20;
  }
  return Math.min(100, score);
}

function calculateFamilySupport(data: EnhancedOnboardingData): number {
  if (!data.familySize) return 50;
  if (data.familySize === 1) return 80; // Individual más fácil
  if (data.familySize <= 3) return 70; // Familia pequeña
  return 60; // Familia grande
}

// Funciones para calcular scores IVI, IVM, ISE
function calculateIVIScore(data: EnhancedOnboardingData) {
  let percentage = 0;
  const strengths: string[] = [];
  const opportunities: string[] = [];
  
  // Capital adequacy
  let capitalAdequacy = 0;
  switch (data.budget) {
    case '300k-plus': capitalAdequacy = 95; break;
    case '200k-300k': capitalAdequacy = 80; break;
    case '100k-200k': capitalAdequacy = 65; break;
    case '50k-100k': capitalAdequacy = 50; break;
    default: capitalAdequacy = 30;
  }
  
  // Risk tolerance
  let riskTolerance = 50;
  if (data.riskProfile === 'aggressive') riskTolerance = 85;
  else if (data.riskProfile === 'moderate') riskTolerance = 70;
  else if (data.riskProfile === 'conservative') riskTolerance = 40;
  
  // Market knowledge
  let marketKnowledge = 40;
  if (data.experienceInJapan) marketKnowledge += 30;
  if (data.investmentExperience === 'extensive') marketKnowledge += 30;
  else if (data.investmentExperience === 'moderate') marketKnowledge += 20;
  else if (data.investmentExperience === 'beginner') marketKnowledge += 10;
  
  // Diversification strategy
  let diversificationStrategy = 30;
  if (data.investmentGoals.length > 2) diversificationStrategy += 40;
  if (data.preferredPropertyTypes && data.preferredPropertyTypes.length > 1) diversificationStrategy += 30;
  
  percentage = Math.round((capitalAdequacy + riskTolerance + marketKnowledge + diversificationStrategy) / 4);
  
  // Strengths and opportunities
  if (capitalAdequacy >= 70) strengths.push('Capital adecuado para tus objetivos');
  else opportunities.push('Considera aumentar capital disponible');
  
  if (riskTolerance >= 70) strengths.push('Tolerancia al riesgo bien definida');
  else opportunities.push('Definir mejor tu perfil de riesgo');
  
  if (marketKnowledge >= 70) strengths.push('Buen conocimiento del mercado');
  else opportunities.push('Mejorar conocimiento del mercado inmobiliario');
  
  if (diversificationStrategy >= 60) strengths.push('Estrategia de diversificación clara');
  else opportunities.push('Desarrollar estrategia de diversificación');
  
  return {
    percentage,
    category: 'investment' as const,
    strengths: strengths.length > 0 ? strengths : ['Perfil de inversión básico'],
    opportunities: opportunities.length > 0 ? opportunities : ['Explorar más opciones'],
    lastUpdated: new Date(),
    trend: percentage >= 70 ? 'up' as const : 'stable' as const,
    capitalAdequacy,
    riskTolerance,
    marketKnowledge,
    diversificationStrategy
  };
}

function calculateIVMScore(data: EnhancedOnboardingData) {
  let percentage = 0;
  const strengths: string[] = [];
  const opportunities: string[] = [];
  
  // Documentation complete
  let documentationComplete = 0;
  if (data.documentsUploaded) {
    documentationComplete = Math.min(100, (data.documentsUploaded.length / 7) * 100);
  }
  
  // Profession demand
  let professionDemand = 50;
  const highDemandProfessions = ['IT', 'Healthcare', 'Engineering', 'Education', 'Finance'];
  if (data.profession && highDemandProfessions.some(p => data.profession!.toLowerCase().includes(p.toLowerCase()))) {
    professionDemand = 85;
  }
  
  // Education level
  let educationLevel = 40;
  switch (data.educationLevel) {
    case 'doctorate': educationLevel = 95; break;
    case 'masters': educationLevel = 85; break;
    case 'bachelors': educationLevel = 75; break;
    case 'associate': educationLevel = 60; break;
    default: educationLevel = 40;
  }
  
  // Accommodation plan
  let accommodationPlan = 30;
  if (data.investmentGoals.includes('family')) accommodationPlan += 40;
  if (data.location.length > 0) accommodationPlan += 30;
  
  percentage = Math.round((documentationComplete + professionDemand + educationLevel + accommodationPlan) / 4);
  
  // Strengths and opportunities
  if (professionDemand >= 80) strengths.push('Profesión en alta demanda en Japón');
  else opportunities.push('Explorar demanda de tu profesión en Japón');
  
  if (educationLevel >= 75) strengths.push('Nivel educativo cumple requisitos');
  else opportunities.push('Considerar reconocimiento de estudios');
  
  if (documentationComplete >= 70) strengths.push('Documentación casi completa');
  else opportunities.push(`Documentación faltante (${7 - (data.documentsUploaded?.length || 0)} de 7)`);
  
  if (accommodationPlan >= 60) strengths.push('Plan de alojamiento definido');
  else opportunities.push('Definir plan de alojamiento a largo plazo');
  
  // Visa eligibility
  const visaEligibility = [
    { type: 'Work Visa', score: Math.min(100, percentage + 5), status: percentage >= 60 ? 'Eligible' : 'Requires improvement' },
    { type: 'Investor Visa', score: Math.min(100, percentage - 10), status: percentage >= 70 ? 'Eligible' : 'Requires more capital' },
    { type: 'Student Visa', score: Math.min(100, percentage + 10), status: percentage >= 50 ? 'Eligible' : 'Requires documents' },
    { type: 'Spouse Visa', score: Math.min(100, percentage + 20), status: 'N/A' }
  ];
  
  // Timeline estimate
  const timelineEstimate = `${Math.max(3, Math.floor(12 - (percentage / 10)))} meses`;
  
  return {
    percentage,
    category: 'migration' as const,
    strengths: strengths.length > 0 ? strengths : ['Proceso migratorio iniciado'],
    opportunities: opportunities.length > 0 ? opportunities : ['Optimizar proceso migratorio'],
    lastUpdated: new Date(),
    trend: percentage >= 70 ? 'up' as const : 'stable' as const,
    documentationComplete,
    professionDemand,
    educationLevel,
    accommodationPlan,
    visaEligibility,
    timelineEstimate
  };
}

function calculateISEScore(data: EnhancedOnboardingData) {
  let percentage = 0;
  const strengths: string[] = [];
  const opportunities: string[] = [];
  
  // Design preference
  let designPreference = 60;
  if (data.architecturalStyle && data.architecturalStyle.length > 0) designPreference += 30;
  if (data.lifestyle && data.lifestyle.includes('traditional')) designPreference += 10;
  
  // Renovation budget
  let renovationBudget = 40;
  if (data.renovationBudget) {
    switch (data.renovationBudget) {
      case 'over-100k': renovationBudget = 90; break;
      case '50k-100k': renovationBudget = 70; break;
      case '20k-50k': renovationBudget = 50; break;
      default: renovationBudget = 30;
    }
  }
  
  // Property selection
  let propertySelection = 30;
  if (data.preferredPropertyTypes && data.preferredPropertyTypes.length > 0) propertySelection += 40;
  if (data.location && data.location.length > 0) propertySelection += 30;
  
  // Cultural experiences
  let culturalExperiences = 50;
  if (data.experienceInJapan) culturalExperiences += 30;
  if (data.interests && data.interests.some(i => 
    ['onsen', 'tea-ceremony', 'gardening', 'cooking', 'culture'].some(c => i.toLowerCase().includes(c))
  )) {
    culturalExperiences += 20;
  }
  
  percentage = Math.round((designPreference + renovationBudget + propertySelection + culturalExperiences) / 4);
  
  // Strengths and opportunities
  if (designPreference >= 80) strengths.push('Preferencias de diseño muy claras');
  else opportunities.push('Definir mejor preferencias de diseño');
  
  if (renovationBudget >= 70) strengths.push('Presupuesto de renovación definido');
  else opportunities.push('Establecer presupuesto de renovación');
  
  if (propertySelection >= 60) strengths.push('Propiedades de interés identificadas');
  else opportunities.push('Explorar más opciones de propiedades');
  
  if (culturalExperiences >= 70) strengths.push('Experiencias culturales planificadas');
  else opportunities.push('Planificar experiencias culturales clave');
  
  return {
    percentage,
    category: 'lifestyle' as const,
    strengths: strengths.length > 0 ? strengths : ['Estilo de vida básico definido'],
    opportunities: opportunities.length > 0 ? opportunities : ['Optimizar estilo de vida'],
    lastUpdated: new Date(),
    trend: percentage >= 70 ? 'up' as const : 'stable' as const,
    designPreference,
    renovationBudget,
    propertySelection,
    culturalExperiences
  };
}
