// Tipos para El Arquitecto de Oportunidades
export interface UserProfile {
  // Información básica
  primaryGoal: 'invertir' | 'migrar' | 'vivir' | null;
  name?: string;
  email?: string;
  
  // 🎯 DATOS FUNDAMENTALES REQUERIDOS
  // 1. Información Básica (Obligatoria)
  fullName?: string;
  phone?: string;
  nationality?: string;
  age?: number;
  gender?: 'masculino' | 'femenino' | 'otro' | 'prefiero-no-decir';
  currentCountry?: string;
  currentCity?: string;
  preferredLanguage?: 'es' | 'en' | 'ja' | 'ar';
  
  // 2. Intención Principal (Crítica)
  timeline?: 'inmediato' | '6-meses' | '1-ano' | 'explorando';
  motivation?: string; // Texto libre sobre por qué Japón
  previousExperience?: 'ninguna' | 'limitada' | 'moderada' | 'extensa';
  
  // 3. Datos Específicos por Intención
  // Para INVERSORES
  budgetMin?: number;
  budgetMax?: number;
  budgetCurrency?: 'USD' | 'EUR' | 'JPY' | 'MXN' | 'ARS' | 'COP';
  liquidity?: 'baja' | 'media' | 'alta';
  annualIncome?: number;
  incomeStability?: 'inestable' | 'moderada' | 'estable';
  financialExperience?: 'ninguna' | 'basica' | 'intermedia' | 'avanzada';
  riskTolerance?: 'conservador' | 'moderado' | 'agresivo';
  expectedROI?: number;
  propertyPreferences?: {
    type?: 'tradicional' | 'moderno' | 'mixto';
    location?: 'urbano' | 'rural' | 'mixto';
    size?: 'pequeno' | 'mediano' | 'grande';
  };
  
  // Para MIGRANTES
  familySituation?: {
    size?: 'solo' | 'pareja' | 'familia-pequena' | 'familia-grande';
    children?: number;
    spouse?: boolean;
  };
  professionalSituation?: {
    currentJob?: string;
    education?: 'basica' | 'media' | 'universitaria' | 'postgrado';
    skills?: string[];
  };
  visaObjectives?: string[];
  specialNeeds?: string[];
  migrationTimeline?: 'urgente' | '6-meses' | '1-ano' | '2-anos';
  
  // Para RESIDENTES
  currentJapanSituation?: {
    visa?: string;
    work?: string;
    location?: string;
  };
  housingNeeds?: {
    specific?: string;
    budget?: number;
    location?: string;
    duration?: 'temporal' | 'permanente';
  };
  
  // 4. Datos Psicológicos y Culturales
  culturalAffinity?: {
    japanKnowledge?: 'ninguno' | 'basico' | 'intermedio' | 'avanzado';
    japaneseLevel?: 'ninguno' | 'principiante' | 'intermedio' | 'avanzado';
    personalValues?: {
      harmony?: number; // 1-10
      respect?: number; // 1-10
      discipline?: number; // 1-10
    };
    culturalInterests?: string[];
  };
  
  motivationExpectations?: {
    mainMotivations?: {
      career?: number; // 1-10
      family?: number; // 1-10
      lifestyle?: number; // 1-10
      culture?: number; // 1-10
    };
    realisticExpectations?: boolean;
    perceivedChallenges?: string[];
    expectedBenefits?: string[];
  };
  
  // 5. Cálculos Inteligentes (Generados automáticamente)
  intelligentScores?: {
    IVI?: {
      score: number;
      factors: {
        budget: number;
        experience: number;
        liquidity: number;
        risk: number;
      };
    };
    IVM?: {
      score: number;
      factors: {
        family: number;
        culturalKnowledge: number;
        language: number;
        values: number;
      };
    };
    ISE?: {
      score: number;
      factors: {
        culturalAffinity: number;
        values: number;
        interests: number;
      };
    };
    overallScore?: number;
    recommendation?: 'excelente' | 'buena' | 'moderada' | 'riesgosa';
    successProbabilities?: {
      overall: number;
      byFactor: Record<string, number>;
    };
  };
  
  // Campos específicos para INVERTIR (mantener compatibilidad)
  investmentLevel?: 'alto' | 'medio' | 'bajo';
  businessType?: 'franquicia' | 'inmuebles' | 'startup' | 'otros';
  investmentRange?: '50k-100k' | '100k-500k' | '500k-1m' | '1m+';
  investmentObjective?: 'flujo-caja' | 'valorizacion' | 'diversificacion';
  
  // Campos específicos para MIGRAR (mantener compatibilidad)
  migrationInterest?: 'si' | 'no';
  migrationStatus?: 'nomada' | 'inversionista' | 'empleado' | 'emprendedor';
  familySize?: 'solo' | 'pareja' | 'familia';
  professionalField?: 'tecnologia' | 'negocios' | 'arte' | 'otros';
  
  // Campos específicos para VIVIR (mantener compatibilidad)
  businessGoals?: 'negocio' | 'empleo' | 'estudio';
  propertyQuality?: 'privacidad' | 'naturaleza' | 'diseno' | 'ubicacion';
  propertyUse?: 'ski' | 'verano' | 'tiempo-parcial' | 'permanente';
  
  // Estado del onboarding
  onboardingCompleted: boolean;
  onboardingStep: number;
  blueprintGenerated: boolean;
  fundamentalDataCompleted?: boolean; // Nuevo campo para datos fundamentales
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: string;
  required: boolean;
}

export interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabledFor: ('invertir' | 'migrar' | 'vivir')[];
  priority: number;
  component: string;
}

// Configuración de módulos del dashboard
export const DASHBOARD_MODULES: DashboardModule[] = [
  {
    id: 'propiedades',
    name: 'Propiedades',
    description: 'Explora propiedades con visores 3D y realidad aumentada',
    icon: 'Building',
    enabledFor: ['invertir', 'migrar', 'vivir'],
    priority: 1,
    component: 'PropertyModule'
  },
  {
    id: 'inversion',
    name: 'Centro de Inversión',
    description: 'Marketplace de oportunidades y calculadora ROI',
    icon: 'TrendingUp',
    enabledFor: ['invertir'],
    priority: 2,
    component: 'InvestmentModule'
  },
  {
    id: 'migracion',
    name: 'Centro Migratorio',
    description: 'Tracker de visa y gestión de documentos',
    icon: 'FileText',
    enabledFor: ['migrar'],
    priority: 2,
    component: 'MigrationModule'
  },
  {
    id: 'estilo-vida',
    name: 'Estilo de Vida',
    description: 'Concierge digital y experiencias curadas',
    icon: 'Heart',
    enabledFor: ['vivir'],
    priority: 2,
    component: 'LifestyleModule'
  }
];

// Preguntas dinámicas del onboarding con claves de traducción
export const ONBOARDING_QUESTIONS = {
  invertir: [
    {
      id: 'businessType',
      questionKey: 'onboarding.questions.invest.businessType.question',
      options: [
        { value: 'franquicia', labelKey: 'onboarding.questions.invest.businessType.franquicia', icon: 'Store' },
        { value: 'inmuebles', labelKey: 'onboarding.questions.invest.businessType.inmuebles', icon: 'Building' },
        { value: 'startup', labelKey: 'onboarding.questions.invest.businessType.startup', icon: 'Zap' },
        { value: 'otros', labelKey: 'onboarding.questions.invest.businessType.otros', icon: 'MoreHorizontal' }
      ]
    },
    {
      id: 'investmentRange',
      questionKey: 'onboarding.questions.invest.investmentRange.question',
      options: [
        { value: '50k-100k', labelKey: 'onboarding.questions.invest.investmentRange.50k-100k', icon: 'DollarSign' },
        { value: '100k-500k', labelKey: 'onboarding.questions.invest.investmentRange.100k-500k', icon: 'DollarSign' },
        { value: '500k-1m', labelKey: 'onboarding.questions.invest.investmentRange.500k-1m', icon: 'DollarSign' },
        { value: '1m+', labelKey: 'onboarding.questions.invest.investmentRange.1m+', icon: 'DollarSign' }
      ]
    },
    {
      id: 'investmentObjective',
      questionKey: 'onboarding.questions.invest.investmentObjective.question',
      options: [
        { value: 'flujo-caja', labelKey: 'onboarding.questions.invest.investmentObjective.flujo-caja', icon: 'TrendingUp' },
        { value: 'valorizacion', labelKey: 'onboarding.questions.invest.investmentObjective.valorizacion', icon: 'BarChart' },
        { value: 'diversificacion', labelKey: 'onboarding.questions.invest.investmentObjective.diversificacion', icon: 'PieChart' }
      ]
    }
  ],
  migrar: [
    {
      id: 'migrationStatus',
      questionKey: 'onboarding.questions.migrate.migrationStatus.question',
      options: [
        { value: 'nomada', labelKey: 'onboarding.questions.migrate.migrationStatus.nomada', icon: 'Laptop' },
        { value: 'inversionista', labelKey: 'onboarding.questions.migrate.migrationStatus.inversionista', icon: 'Briefcase' },
        { value: 'empleado', labelKey: 'onboarding.questions.migrate.migrationStatus.empleado', icon: 'Users' },
        { value: 'emprendedor', labelKey: 'onboarding.questions.migrate.migrationStatus.emprendedor', icon: 'Rocket' }
      ]
    },
    {
      id: 'familySize',
      questionKey: 'onboarding.questions.migrate.familySize.question',
      options: [
        { value: 'solo', labelKey: 'onboarding.questions.migrate.familySize.solo', icon: 'User' },
        { value: 'pareja', labelKey: 'onboarding.questions.migrate.familySize.pareja', icon: 'Heart' },
        { value: 'familia', labelKey: 'onboarding.questions.migrate.familySize.familia', icon: 'Users' }
      ]
    },
    {
      id: 'professionalField',
      questionKey: 'onboarding.questions.migrate.professionalField.question',
      options: [
        { value: 'tecnologia', labelKey: 'onboarding.questions.migrate.professionalField.tecnologia', icon: 'Code' },
        { value: 'negocios', labelKey: 'onboarding.questions.migrate.professionalField.negocios', icon: 'Briefcase' },
        { value: 'arte', labelKey: 'onboarding.questions.migrate.professionalField.arte', icon: 'Palette' },
        { value: 'otros', labelKey: 'onboarding.questions.migrate.professionalField.otros', icon: 'MoreHorizontal' }
      ]
    }
  ],
  vivir: [
    {
      id: 'propertyQuality',
      questionKey: 'onboarding.questions.live.propertyQuality.question',
      options: [
        { value: 'privacidad', labelKey: 'onboarding.questions.live.propertyQuality.privacidad', icon: 'Shield' },
        { value: 'naturaleza', labelKey: 'onboarding.questions.live.propertyQuality.naturaleza', icon: 'TreePine' },
        { value: 'diseno', labelKey: 'onboarding.questions.live.propertyQuality.diseno', icon: 'Palette' },
        { value: 'ubicacion', labelKey: 'onboarding.questions.live.propertyQuality.ubicacion', icon: 'MapPin' }
      ]
    },
    {
      id: 'familySize',
      questionKey: 'onboarding.questions.live.familySize.question',
      options: [
        { value: 'solo', labelKey: 'onboarding.questions.live.familySize.solo', icon: 'User' },
        { value: 'pareja', labelKey: 'onboarding.questions.live.familySize.pareja', icon: 'Heart' },
        { value: 'familia', labelKey: 'onboarding.questions.live.familySize.familia', icon: 'Users' }
      ]
    },
    {
      id: 'propertyUse',
      questionKey: 'onboarding.questions.live.propertyUse.question',
      options: [
        { value: 'ski', labelKey: 'onboarding.questions.live.propertyUse.ski', icon: 'Mountain' },
        { value: 'verano', labelKey: 'onboarding.questions.live.propertyUse.verano', icon: 'Sun' },
        { value: 'tiempo-parcial', labelKey: 'onboarding.questions.live.propertyUse.tiempo-parcial', icon: 'Clock' },
        { value: 'permanente', labelKey: 'onboarding.questions.live.propertyUse.permanente', icon: 'Home' }
      ]
    }
  ]
};

// Función para generar el blueprint del usuario
export function generateUserBlueprint(profile: UserProfile): string {
  const { primaryGoal } = profile;
  
  switch (primaryGoal) {
    case 'invertir':
      return `Blueprint de Inversión: ${profile.businessType} con rango ${profile.investmentRange} enfocado en ${profile.investmentObjective}`;
    case 'migrar':
      return `Blueprint Migratorio: ${profile.migrationStatus} ${profile.familySize} en el campo de ${profile.professionalField}`;
    case 'vivir':
      return `Blueprint de Estilo de Vida: ${profile.propertyQuality} para ${profile.familySize} con uso ${profile.propertyUse}`;
    default:
      return 'Blueprint personalizado generado';
  }
}

// Función para obtener módulos habilitados según el perfil
export function getEnabledModules(profile: UserProfile): DashboardModule[] {
  if (!profile.primaryGoal) return [];
  
  return DASHBOARD_MODULES
    .filter(module => module.enabledFor.includes(profile.primaryGoal!))
    .sort((a, b) => a.priority - b.priority);
}

// 🧮 FUNCIONES DE CÁLCULO INTELIGENTE
export function calculateIVI(profile: UserProfile): { score: number; factors: any } {
  if (profile.primaryGoal !== 'invertir') {
    return { score: 0, factors: { budget: 0, experience: 0, liquidity: 0, risk: 0 } };
  }

  // Factor Presupuesto (0-30 puntos)
  const budgetScore = calculateBudgetScore(profile.budgetMin, profile.budgetMax);
  
  // Factor Experiencia (0-25 puntos)
  const experienceScore = calculateExperienceScore(profile.financialExperience);
  
  // Factor Liquidez (0-20 puntos)
  const liquidityScore = calculateLiquidityScore(profile.liquidity, profile.annualIncome);
  
  // Factor Riesgo (0-25 puntos)
  const riskScore = calculateRiskScore(profile.riskTolerance, profile.incomeStability);

  const totalScore = budgetScore + experienceScore + liquidityScore + riskScore;

  return {
    score: Math.round(totalScore),
    factors: {
      budget: budgetScore,
      experience: experienceScore,
      liquidity: liquidityScore,
      risk: riskScore
    }
  };
}

export function calculateIVM(profile: UserProfile): { score: number; factors: any } {
  if (profile.primaryGoal !== 'migrar') {
    return { score: 0, factors: { family: 0, culturalKnowledge: 0, language: 0, values: 0 } };
  }

  // Factor Familia (0-30 puntos)
  const familyScore = calculateFamilyScore(profile.familySituation);
  
  // Factor Conocimiento Cultural (0-25 puntos)
  const culturalScore = calculateCulturalScore(profile.culturalAffinity?.japanKnowledge);
  
  // Factor Idioma (0-25 puntos)
  const languageScore = calculateLanguageScore(profile.culturalAffinity?.japaneseLevel);
  
  // Factor Valores (0-20 puntos)
  const valuesScore = calculateValuesScore(profile.culturalAffinity?.personalValues);

  const totalScore = familyScore + culturalScore + languageScore + valuesScore;

  return {
    score: Math.round(totalScore),
    factors: {
      family: familyScore,
      culturalKnowledge: culturalScore,
      language: languageScore,
      values: valuesScore
    }
  };
}

export function calculateISE(profile: UserProfile): { score: number; factors: any } {
  // Factor Afinidad Cultural (0-40 puntos)
  const culturalAffinityScore = calculateCulturalAffinityScore(profile.culturalAffinity);
  
  // Factor Valores (0-30 puntos)
  const valuesScore = calculateValuesScore(profile.culturalAffinity?.personalValues);
  
  // Factor Intereses (0-30 puntos)
  const interestsScore = calculateInterestsScore(profile.culturalAffinity?.culturalInterests);

  const totalScore = culturalAffinityScore + valuesScore + interestsScore;

  return {
    score: Math.round(totalScore),
    factors: {
      culturalAffinity: culturalAffinityScore,
      values: valuesScore,
      interests: interestsScore
    }
  };
}

// Funciones auxiliares de cálculo
function calculateBudgetScore(min?: number, max?: number): number {
  if (!min || !max) return 0;
  const avg = (min + max) / 2;
  if (avg >= 1000000) return 30;
  if (avg >= 500000) return 25;
  if (avg >= 100000) return 20;
  if (avg >= 50000) return 15;
  return 10;
}

function calculateExperienceScore(experience?: string): number {
  switch (experience) {
    case 'avanzada': return 25;
    case 'intermedia': return 20;
    case 'basica': return 15;
    case 'ninguna': return 5;
    default: return 0;
  }
}

function calculateLiquidityScore(liquidity?: string, income?: number): number {
  let score = 0;
  switch (liquidity) {
    case 'alta': score = 20; break;
    case 'media': score = 15; break;
    case 'baja': score = 10; break;
    default: score = 5;
  }
  
  if (income && income >= 100000) score += 5;
  return Math.min(score, 20);
}

function calculateRiskScore(tolerance?: string, stability?: string): number {
  let score = 0;
  switch (tolerance) {
    case 'conservador': score = 20; break;
    case 'moderado': score = 15; break;
    case 'agresivo': score = 10; break;
    default: score = 5;
  }
  
  switch (stability) {
    case 'estable': score += 5; break;
    case 'moderada': score += 3; break;
    case 'inestable': score += 1; break;
  }
  
  return Math.min(score, 25);
}

function calculateFamilyScore(familySituation?: any): number {
  if (!familySituation) return 0;
  
  let score = 0;
  switch (familySituation.size) {
    case 'solo': score = 30; break;
    case 'pareja': score = 25; break;
    case 'familia-pequena': score = 20; break;
    case 'familia-grande': score = 15; break;
    default: score = 10;
  }
  
  if (familySituation.children && familySituation.children > 0) {
    score -= familySituation.children * 2;
  }
  
  return Math.max(score, 0);
}

function calculateCulturalScore(knowledge?: string): number {
  switch (knowledge) {
    case 'avanzado': return 25;
    case 'intermedio': return 20;
    case 'basico': return 15;
    case 'ninguno': return 5;
    default: return 0;
  }
}

function calculateLanguageScore(level?: string): number {
  switch (level) {
    case 'avanzado': return 25;
    case 'intermedio': return 20;
    case 'principiante': return 15;
    case 'ninguno': return 5;
    default: return 0;
  }
}

function calculateValuesScore(values?: any): number {
  if (!values) return 0;
  
  const harmony = values.harmony || 0;
  const respect = values.respect || 0;
  const discipline = values.discipline || 0;
  
  const avg = (harmony + respect + discipline) / 3;
  return Math.round(avg * 2); // Escalar a 20 puntos máximo
}

function calculateCulturalAffinityScore(culturalAffinity?: any): number {
  if (!culturalAffinity) return 0;
  
  let score = 0;
  
  // Conocimiento de Japón
  switch (culturalAffinity.japanKnowledge) {
    case 'avanzado': score += 15; break;
    case 'intermedio': score += 12; break;
    case 'basico': score += 8; break;
    case 'ninguno': score += 3; break;
  }
  
  // Nivel de japonés
  switch (culturalAffinity.japaneseLevel) {
    case 'avanzado': score += 15; break;
    case 'intermedio': score += 12; break;
    case 'principiante': score += 8; break;
    case 'ninguno': score += 3; break;
  }
  
  // Intereses culturales
  const interestsCount = culturalAffinity.culturalInterests?.length || 0;
  score += Math.min(interestsCount * 2, 10);
  
  return Math.min(score, 40);
}

function calculateInterestsScore(interests?: string[]): number {
  if (!interests) return 0;
  return Math.min(interests.length * 3, 30);
}

// Función principal para calcular todos los scores
export function calculateIntelligentScores(profile: UserProfile): UserProfile['intelligentScores'] {
  const IVI = calculateIVI(profile);
  const IVM = calculateIVM(profile);
  const ISE = calculateISE(profile);
  
  // Calcular score general basado en el objetivo principal
  let overallScore = 0;
  switch (profile.primaryGoal) {
    case 'invertir':
      overallScore = IVI.score;
      break;
    case 'migrar':
      overallScore = IVM.score;
      break;
    case 'vivir':
      overallScore = ISE.score;
      break;
    default:
      overallScore = (IVI.score + IVM.score + ISE.score) / 3;
  }
  
  // Determinar recomendación
  let recommendation: 'excelente' | 'buena' | 'moderada' | 'riesgosa';
  if (overallScore >= 85) recommendation = 'excelente';
  else if (overallScore >= 70) recommendation = 'buena';
  else if (overallScore >= 50) recommendation = 'moderada';
  else recommendation = 'riesgosa';
  
  // Calcular probabilidades de éxito
  const successProbabilities = {
    overall: Math.round(overallScore),
    byFactor: {
      budget: IVI.factors.budget,
      experience: IVI.factors.experience,
      family: IVM.factors.family,
      cultural: IVM.factors.culturalKnowledge,
      language: IVM.factors.language,
      values: ISE.factors.values,
      interests: ISE.factors.interests
    }
  };
  
  return {
    IVI,
    IVM,
    ISE,
    overallScore: Math.round(overallScore),
    recommendation,
    successProbabilities
  };
}
