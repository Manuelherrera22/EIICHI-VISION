// Dashboard de Sincronización de Objetivos (DSO) - Tipos base

export interface IVPScore {
  percentage: number;
  category: 'investment' | 'migration' | 'lifestyle';
  strengths: string[];
  opportunities: string[];
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

export interface IVI extends IVPScore {
  category: 'investment';
  capitalAdequacy: number; // 0-100
  riskTolerance: number; // 0-100
  marketKnowledge: number; // 0-100
  diversificationStrategy: number; // 0-100
}

export interface IVM extends IVPScore {
  category: 'migration';
  documentationComplete: number; // 0-100
  professionDemand: number; // 0-100
  educationLevel: number; // 0-100
  accommodationPlan: number; // 0-100
}

export interface ISE extends IVPScore {
  category: 'lifestyle';
  designPreference: number; // 0-100
  renovationBudget: number; // 0-100
  propertySelection: number; // 0-100
  culturalExperiences: number; // 0-100
}

export type DashboardType = 'investment' | 'migration' | 'lifestyle';

export interface StrategicModule {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
  impactOnScore: number; // Cómo afecta al IVP (positivo o negativo)
  category: DashboardType;
  technologies: string[];
  actions: ModuleAction[];
}

export interface ModuleAction {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  impact: number; // Impacto en el puntaje
  deadline?: Date;
  dependencies?: string[]; // IDs de otras acciones que deben completarse primero
}

export interface DashboardState {
  currentIVP: IVPScore;
  strategicModules: StrategicModule[];
  recentActivity: Activity[];
  nextActions: ModuleAction[];
  insights: AIInsight[];
}

export interface Activity {
  id: string;
  type: 'action_completed' | 'score_updated' | 'module_unlocked' | 'insight_generated';
  title: string;
  description: string;
  timestamp: Date;
  impact: number;
  category: DashboardType;
}

export interface AIInsight {
  id: string;
  type: 'market_analysis' | 'recommendation' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number; // 0-100
  actionable: boolean;
  category: DashboardType;
  relatedModules: string[];
}

// Funciones de cálculo del IVP
export const calculateIVI = (data: Partial<IVI>): IVI => {
  const capitalAdequacy = data.capitalAdequacy || 0;
  const riskTolerance = data.riskTolerance || 0;
  const marketKnowledge = data.marketKnowledge || 0;
  const diversificationStrategy = data.diversificationStrategy || 0;
  
  const percentage = Math.round(
    (capitalAdequacy * 0.3 + riskTolerance * 0.2 + marketKnowledge * 0.25 + diversificationStrategy * 0.25)
  );
  
  return {
    percentage,
    category: 'investment',
    capitalAdequacy,
    riskTolerance,
    marketKnowledge,
    diversificationStrategy,
    strengths: generateStrengths('investment', data),
    opportunities: generateOpportunities('investment', data),
    lastUpdated: new Date(),
    trend: 'stable'
  };
};

export const calculateIVM = (data: Partial<IVM>): IVM => {
  const documentationComplete = data.documentationComplete || 0;
  const professionDemand = data.professionDemand || 0;
  const educationLevel = data.educationLevel || 0;
  const accommodationPlan = data.accommodationPlan || 0;
  
  const percentage = Math.round(
    (documentationComplete * 0.4 + professionDemand * 0.2 + educationLevel * 0.2 + accommodationPlan * 0.2)
  );
  
  return {
    percentage,
    category: 'migration',
    documentationComplete,
    professionDemand,
    educationLevel,
    accommodationPlan,
    strengths: generateStrengths('migration', data),
    opportunities: generateOpportunities('migration', data),
    lastUpdated: new Date(),
    trend: 'stable'
  };
};

export const calculateISE = (data: Partial<ISE>): ISE => {
  const designPreference = data.designPreference || 0;
  const renovationBudget = data.renovationBudget || 0;
  const propertySelection = data.propertySelection || 0;
  const culturalExperiences = data.culturalExperiences || 0;
  
  const percentage = Math.round(
    (designPreference * 0.25 + renovationBudget * 0.25 + propertySelection * 0.3 + culturalExperiences * 0.2)
  );
  
  return {
    percentage,
    category: 'lifestyle',
    designPreference,
    renovationBudget,
    propertySelection,
    culturalExperiences,
    strengths: generateStrengths('lifestyle', data),
    opportunities: generateOpportunities('lifestyle', data),
    lastUpdated: new Date(),
    trend: 'stable'
  };
};

// Funciones auxiliares para generar fortalezas y oportunidades
const generateStrengths = (category: DashboardType, data: any): string[] => {
  const strengths: string[] = [];
  
  switch (category) {
    case 'investment':
      if (data.capitalAdequacy >= 70) strengths.push('Capital inicial adecuado para tus objetivos');
      if (data.riskTolerance >= 70) strengths.push('Tolerancia al riesgo claramente definida');
      if (data.marketKnowledge >= 70) strengths.push('Conocimiento sólido del mercado inmobiliario');
      break;
    case 'migration':
      if (data.professionDemand >= 70) strengths.push('Profesión en alta demanda en Japón');
      if (data.educationLevel >= 70) strengths.push('Nivel educativo cumple los requisitos');
      break;
    case 'lifestyle':
      if (data.designPreference >= 70) strengths.push('Preferencia de diseño muy clara (Wabi-Sabi)');
      if (data.renovationBudget >= 70) strengths.push('Presupuesto de renovación definido');
      break;
  }
  
  return strengths;
};

const generateOpportunities = (category: DashboardType, data: any): string[] => {
  const opportunities: string[] = [];
  
  switch (category) {
    case 'investment':
      if (data.diversificationStrategy < 50) opportunities.push('Estrategia de diversificación por definir');
      if (data.marketKnowledge < 50) opportunities.push('Conocimiento del mercado inmobiliario de Gunma: Básico');
      break;
    case 'migration':
      if (data.documentationComplete < 50) opportunities.push('Documentación clave faltante (3 de 7)');
      if (data.accommodationPlan < 50) opportunities.push('Plan de alojamiento a largo plazo no definido');
      break;
    case 'lifestyle':
      if (data.propertySelection < 50) opportunities.push('Propiedad ideal aún por seleccionar');
      if (data.culturalExperiences < 50) opportunities.push('Experiencias culturales clave no definidas');
      break;
  }
  
  return opportunities;
};




