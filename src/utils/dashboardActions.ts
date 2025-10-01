// Sistema de acciones reales para los dashboards

export interface DashboardAction {
  id: string;
  title: string;
  description: string;
  type: 'navigation' | 'modal' | 'external' | 'api';
  action: string;
  icon: string;
  category: 'investment' | 'migration' | 'lifestyle';
  priority: 'high' | 'medium' | 'low';
}

export const DASHBOARD_ACTIONS: DashboardAction[] = [
  // Acciones de Inversión
  {
    id: 'view-properties',
    title: 'Ver Propiedades Disponibles',
    description: 'Explora propiedades reales en Gunma con análisis de ROI',
    type: 'navigation',
    action: '/projects',
    icon: 'Home',
    category: 'investment',
    priority: 'high'
  },
  {
    id: 'investment-calculator',
    title: 'Calculadora de Inversión',
    description: 'Calcula ROI, flujo de caja y proyecciones financieras',
    type: 'modal',
    action: 'open-investment-calculator',
    icon: 'Calculator',
    category: 'investment',
    priority: 'high'
  },
  {
    id: 'market-analysis',
    title: 'Análisis de Mercado',
    description: 'Reporte detallado del mercado inmobiliario en Gunma',
    type: 'modal',
    action: 'open-market-analysis',
    icon: 'BarChart3',
    category: 'investment',
    priority: 'medium'
  },
  {
    id: 'schedule-consultation',
    title: 'Agendar Consultoría',
    description: 'Reserva una sesión con nuestros expertos en inversión',
    type: 'external',
    action: 'https://calendly.com/tabiji-house/investment-consultation',
    icon: 'Calendar',
    category: 'investment',
    priority: 'medium'
  },

  // Acciones de Migración
  {
    id: 'visa-assessment',
    title: 'Evaluación de Visa',
    description: 'Análisis detallado de tu elegibilidad para diferentes tipos de visa',
    type: 'modal',
    action: 'open-visa-assessment',
    icon: 'FileText',
    category: 'migration',
    priority: 'high'
  },
  {
    id: 'document-checklist',
    title: 'Lista de Documentos',
    description: 'Checklist personalizado de documentos requeridos',
    type: 'modal',
    action: 'open-document-checklist',
    icon: 'CheckCircle',
    category: 'migration',
    priority: 'high'
  },
  {
    id: 'language-courses',
    title: 'Cursos de Japonés',
    description: 'Recomendaciones de cursos según tu nivel actual',
    type: 'external',
    action: 'https://www.nihongo-center.com/',
    icon: 'BookOpen',
    category: 'migration',
    priority: 'medium'
  },
  {
    id: 'migration-timeline',
    title: 'Timeline de Migración',
    description: 'Cronograma personalizado para tu proceso migratorio',
    type: 'modal',
    action: 'open-migration-timeline',
    icon: 'Clock',
    category: 'migration',
    priority: 'medium'
  },

  // Acciones de Estilo de Vida
  {
    id: 'property-finder',
    title: 'Buscador de Propiedades',
    description: 'Encuentra tu propiedad ideal según tus preferencias',
    type: 'navigation',
    action: '/projects',
    icon: 'Search',
    category: 'lifestyle',
    priority: 'high'
  },
  {
    id: 'cultural-experiences',
    title: 'Experiencias Culturales',
    description: 'Descubre actividades culturales en Gunma',
    type: 'navigation',
    action: '/services',
    icon: 'Heart',
    category: 'lifestyle',
    priority: 'medium'
  },
  {
    id: 'design-consultation',
    title: 'Consultoría de Diseño',
    description: 'Planifica la renovación de tu propiedad',
    type: 'modal',
    action: 'open-design-consultation',
    icon: 'Palette',
    category: 'lifestyle',
    priority: 'medium'
  },
  {
    id: 'community-connect',
    title: 'Conectar con Comunidad',
    description: 'Únete a nuestra comunidad de expatriados en Japón',
    type: 'external',
    action: 'https://discord.gg/tabiji-house',
    icon: 'Users',
    category: 'lifestyle',
    priority: 'low'
  }
];

export const executeAction = (action: DashboardAction) => {
  switch (action.type) {
    case 'navigation':
      window.location.href = action.action;
      break;
    case 'modal':
      // Abrir modal específico
      const event = new CustomEvent('openModal', { 
        detail: { modalType: action.action } 
      });
      window.dispatchEvent(event);
      break;
    case 'external':
      window.open(action.action, '_blank');
      break;
    case 'api':
      // Ejecutar acción de API
      console.log('Ejecutando acción de API:', action.action);
      break;
  }
};

export const getActionsByCategory = (category: 'investment' | 'migration' | 'lifestyle') => {
  return DASHBOARD_ACTIONS.filter(action => action.category === category);
};

export const getHighPriorityActions = (category: 'investment' | 'migration' | 'lifestyle') => {
  return DASHBOARD_ACTIONS.filter(action => 
    action.category === category && action.priority === 'high'
  );
};


