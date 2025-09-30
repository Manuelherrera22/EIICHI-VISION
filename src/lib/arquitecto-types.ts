// Tipos para El Arquitecto de Oportunidades
export interface UserProfile {
  // Información básica
  primaryGoal: 'invertir' | 'migrar' | 'vivir' | null;
  name?: string;
  email?: string;
  
  // Campos específicos para INVERTIR
  investmentLevel?: 'alto' | 'medio' | 'bajo';
  businessType?: 'franquicia' | 'inmuebles' | 'startup' | 'otros';
  investmentRange?: '50k-100k' | '100k-500k' | '500k-1m' | '1m+';
  investmentObjective?: 'flujo-caja' | 'valorizacion' | 'diversificacion';
  
  // Campos específicos para MIGRAR
  migrationInterest?: 'si' | 'no';
  migrationStatus?: 'nomada' | 'inversionista' | 'empleado' | 'emprendedor';
  familySize?: 'solo' | 'pareja' | 'familia';
  professionalField?: 'tecnologia' | 'negocios' | 'arte' | 'otros';
  
  // Campos específicos para VIVIR
  businessGoals?: 'negocio' | 'empleo' | 'estudio';
  propertyQuality?: 'privacidad' | 'naturaleza' | 'diseno' | 'ubicacion';
  propertyUse?: 'ski' | 'verano' | 'tiempo-parcial' | 'permanente';
  
  // Estado del onboarding
  onboardingCompleted: boolean;
  onboardingStep: number;
  blueprintGenerated: boolean;
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
