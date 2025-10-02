// src/types/userProfiles.ts

export interface InvestorProfile {
  // Datos financieros
  investmentBudget: {
    min: number;
    max: number;
    currency: string;
    liquidity: 'high' | 'medium' | 'low';
  };
  
  // Experiencia de inversión
  investmentExperience: {
    realEstate: 'beginner' | 'intermediate' | 'expert';
    international: boolean;
    japanSpecific: boolean;
    previousInvestments: Investment[];
  };
  
  // Objetivos financieros
  financialGoals: {
    targetROI: number;
    timeline: 'short' | 'medium' | 'long';
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    incomeType: 'rental' | 'appreciation' | 'both';
  };
  
  // Preferencias de inversión
  investmentPreferences: {
    propertyTypes: string[];
    locations: string[];
    propertySize: { min: number; max: number };
    renovationLevel: 'none' | 'minor' | 'major' | 'luxury';
  };
}

export interface MigrantProfile {
  // Situación familiar
  familySituation: {
    familySize: number;
    children: { count: number; ages: number[] };
    spouse: { hasSpouse: boolean; workStatus: string };
    dependents: number;
  };
  
  // Situación profesional
  professionalSituation: {
    currentJob: string;
    industry: string;
    experience: number;
    education: string;
    languageSkills: { japanese: string; english: string };
  };
  
  // Objetivos de migración
  migrationGoals: {
    timeline: string;
    visaType: string;
    workIntent: boolean;
    studyIntent: boolean;
    permanentIntent: boolean;
  };
  
  // Necesidades específicas
  specificNeeds: {
    housing: 'rent' | 'buy' | 'temporary';
    education: 'children' | 'adult' | 'none';
    healthcare: 'family' | 'individual' | 'none';
    cultural: 'integration' | 'community' | 'language';
  };
}

export interface ResidentProfile {
  // Situación actual
  currentSituation: {
    visaStatus: string;
    workStatus: string;
    currentLocation: string;
    durationInJapan: number;
  };
  
  // Necesidades de vivienda
  housingNeeds: {
    duration: 'short' | 'medium' | 'long';
    type: 'apartment' | 'house' | 'shared';
    budget: { min: number; max: number };
    location: string[];
    amenities: string[];
  };
  
  // Estilo de vida
  lifestyle: {
    workSchedule: string;
    hobbies: string[];
    socialNeeds: 'high' | 'medium' | 'low';
    culturalIntegration: 'high' | 'medium' | 'low';
  };
  
  // Servicios necesarios
  requiredServices: {
    banking: boolean;
    insurance: boolean;
    healthcare: boolean;
    education: boolean;
    transportation: boolean;
  };
}

export interface Investment {
  id: string;
  type: string;
  location: string;
  amount: number;
  roi: number;
  duration: number;
}

export type UserProfile = InvestorProfile | MigrantProfile | ResidentProfile;
export type UserIntent = 'invest' | 'migrate' | 'live';
