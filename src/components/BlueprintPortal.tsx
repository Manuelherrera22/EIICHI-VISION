'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Target, 
  Home, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Heart,
  Mountain,
  Waves,
  TreePine,
  Building,
  Camera,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Users,
  Award,
  Zap
} from 'lucide-react';

interface InvestorProfile {
  investmentGoals: string[];
  lifestyle: string[];
  architecturalStyle: string[];
  location: string[];
  budget: string;
  timeline: string;
}

interface PropertyMatch {
  id: string;
  title: string;
  location: string;
  price: number;
  matchScore: number;
  images: string[];
  features: string[];
  potential: string;
  render: string;
}

const BlueprintPortal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<InvestorProfile>({
    investmentGoals: [],
    lifestyle: [],
    architecturalStyle: [],
    location: [],
    budget: '',
    timeline: ''
  });
  const [matches, setMatches] = useState<PropertyMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: 'goals',
      title: 'Metas de Inversión',
      subtitle: '¿Qué buscas lograr con tu inversión?',
      icon: Target,
      options: [
        { id: 'roi', label: 'ROI a Corto Plazo', icon: TrendingUp, description: 'Maximizar retorno en 2-3 años' },
        { id: 'vacation', label: 'Casa de Vacaciones', icon: Heart, description: 'Lugar para escapar y relajarse' },
        { id: 'residence', label: 'Residencia Principal', icon: Home, description: 'Mudarse a Japón permanentemente' },
        { id: 'rental', label: 'Propiedad de Alquiler', icon: Building, description: 'Generar ingresos pasivos' },
        { id: 'heritage', label: 'Preservar Patrimonio', icon: Award, description: 'Restaurar y conservar tradición' }
      ]
    },
    {
      id: 'lifestyle',
      title: 'Estilo de Vida',
      subtitle: '¿Cómo te gustaría vivir en Japón?',
      icon: User,
      options: [
        { id: 'tranquil', label: 'Tranquilidad y Silencio', icon: TreePine, description: 'Ambiente rural y pacífico' },
        { id: 'active', label: 'Cerca de Ski Resorts', icon: Mountain, description: 'Acceso a deportes de invierno' },
        { id: 'cultural', label: 'Vida Cultural', icon: Users, description: 'Eventos, festivales y tradiciones' },
        { id: 'onsen', label: 'Experiencia Onsen', icon: Waves, description: 'Aguas termales y relajación' },
        { id: 'modern', label: 'Conveniencia Moderna', icon: Zap, description: 'Servicios y tecnología actual' }
      ]
    },
    {
      id: 'architecture',
      title: 'Diseño Arquitectónico',
      subtitle: 'Selecciona los estilos que te inspiran',
      icon: Palette,
      options: [
        { id: 'minimalist', label: 'Minimalista', icon: Home, description: 'Líneas limpias y espacios abiertos' },
        { id: 'wabi-sabi', label: 'Wabi-Sabi', icon: TreePine, description: 'Belleza en la imperfección' },
        { id: 'traditional', label: 'Tradicional Japonés', icon: Building, description: 'Elementos clásicos auténticos' },
        { id: 'modern-japanese', label: 'Moderno-Japonés', icon: Star, description: 'Fusión de tradición y modernidad' },
        { id: 'contemporary', label: 'Contemporáneo', icon: Zap, description: 'Diseño vanguardista' }
      ]
    },
    {
      id: 'location',
      title: 'Ubicación Preferida',
      subtitle: '¿Dónde te gustaría estar?',
      icon: MapPin,
      options: [
        { id: 'gunma-mountains', label: 'Montañas de Gunma', icon: Mountain, description: 'Vistas panorámicas y naturaleza' },
        { id: 'hot-springs', label: 'Zona de Aguas Termales', icon: Waves, description: 'Acceso a onsens tradicionales' },
        { id: 'cultural-heritage', label: 'Patrimonio Cultural', icon: Award, description: 'Cerca de templos y sitios históricos' },
        { id: 'ski-resorts', label: 'Cerca de Estaciones de Ski', icon: Mountain, description: 'Acceso a deportes de invierno' },
        { id: 'rural-village', label: 'Pueblo Rural Auténtico', icon: TreePine, description: 'Vida tradicional japonesa' }
      ]
    },
    {
      id: 'budget',
      title: 'Presupuesto',
      subtitle: '¿Cuál es tu rango de inversión?',
      icon: TrendingUp,
      options: [
        { id: '50k-100k', label: '$50K - $100K USD', description: 'Proyecto de renovación básica' },
        { id: '100k-200k', label: '$100K - $200K USD', description: 'Renovación completa con acabados premium' },
        { id: '200k-300k', label: '$200K - $300K USD', description: 'Transformación total con diseño personalizado' },
        { id: '300k-plus', label: '$300K+ USD', description: 'Proyecto de lujo con todas las comodidades' }
      ]
    },
    {
      id: 'timeline',
      title: 'Cronograma',
      subtitle: '¿Cuándo te gustaría completar el proyecto?',
      icon: Clock,
      options: [
        { id: '6-months', label: '6 Meses', description: 'Proyecto acelerado' },
        { id: '12-months', label: '12 Meses', description: 'Cronograma estándar' },
        { id: '18-months', label: '18 Meses', description: 'Proyecto detallado' },
        { id: 'flexible', label: 'Flexible', description: 'Sin prisa, calidad primero' }
      ]
    }
  ];

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setProfile(prev => ({
      ...prev,
      [stepId]: prev[stepId as keyof InvestorProfile].includes(optionId) 
        ? (prev[stepId as keyof InvestorProfile] as string[]).filter(id => id !== optionId)
        : [...(prev[stepId as keyof InvestorProfile] as string[]), optionId]
    }));
  };

  const handleSingleSelect = (stepId: string, optionId: string) => {
    setProfile(prev => ({
      ...prev,
      [stepId]: optionId
    }));
  };

  const generateMatches = async () => {
    setIsLoading(true);
    
    // Simular procesamiento con IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockMatches: PropertyMatch[] = [
      {
        id: '1',
        title: 'Casa Tradicional en Kusatsu',
        location: 'Kusatsu, Gunma',
        price: 85000,
        matchScore: 95,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: ['Onsen privado', 'Jardín tradicional', '3 habitaciones'],
        potential: 'Transformación completa en casa de lujo con diseño wabi-sabi',
        render: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: '2',
        title: 'Akiya en Minakami',
        location: 'Minakami, Gunma',
        price: 65000,
        matchScore: 88,
        images: ['https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: ['Cerca de ski resorts', 'Vista a montañas', '2 habitaciones'],
        potential: 'Casa moderna-japonesa con acceso a deportes de invierno',
        render: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: '3',
        title: 'Propiedad Heritage en Takasaki',
        location: 'Takasaki, Gunma',
        price: 120000,
        matchScore: 92,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
        features: ['Patrimonio cultural', 'Arquitectura tradicional', '4 habitaciones'],
        potential: 'Restauración auténtica con comodidades modernas',
        render: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ];
    
    setMatches(mockMatches);
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateMatches();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (stepId: string) => {
    const value = profile[stepId as keyof InvestorProfile];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-primary font-medium">Blueprint Digital</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
                Portal de Visión
              </h1>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Co-crea tu visión personal antes de poner un pie en Japón
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">Paso {currentStep + 1} de {steps.length}</span>
                <span className="text-sm text-secondary">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isLoading && matches.length === 0 && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 border border-border shadow-sm"
              >
                {/* Step Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full mb-4">
                    {currentStepData.icon && <currentStepData.icon className="w-8 h-8 text-white" />}
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                    {currentStepData.title}
                  </h2>
                  <p className="text-lg text-secondary">
                    {currentStepData.subtitle}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentStepData.options.map((option) => {
                    const isSelected = Array.isArray(profile[currentStepData.id as keyof InvestorProfile])
                      ? (profile[currentStepData.id as keyof InvestorProfile] as string[]).includes(option.id)
                      : profile[currentStepData.id as keyof InvestorProfile] === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => {
                          if (Array.isArray(profile[currentStepData.id as keyof InvestorProfile])) {
                            handleOptionSelect(currentStepData.id, option.id);
                          } else {
                            handleSingleSelect(currentStepData.id, option.id);
                          }
                        }}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                          isSelected
                            ? 'border-accent bg-accent/10 shadow-lg shadow-accent/25'
                            : 'border-border bg-muted hover:border-accent hover:bg-accent/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${
                            isSelected ? 'bg-accent text-white' : 'bg-primary/10 text-primary/60'
                          }`}>
                            {option.icon && <option.icon className="w-6 h-6" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-primary mb-1">
                              {option.label}
                            </h3>
                            <p className="text-sm text-secondary">
                              {option.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-accent" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3 rounded-full border border-border text-primary hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Anterior
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStepData.id)}
                    className="px-8 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>
                      {currentStep === steps.length - 1 ? 'Generar Matches' : 'Siguiente'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-12 border border-border shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent to-accent/80 rounded-full mb-6">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Procesando tu Perfil
                </h3>
                <p className="text-lg text-secondary mb-6">
                  Nuestra IA está analizando tus preferencias para encontrar las propiedades perfectas...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {!isLoading && matches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                    Tu Portafolio Preliminar
                  </h2>
                  <p className="text-lg text-secondary">
                    Propiedades seleccionadas especialmente para ti
                  </p>
                </div>

                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 border border-border shadow-sm"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Images */}
                      <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                          <img
                            src={match.render}
                            alt={match.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex space-x-2">
                          {match.images.map((image, i) => (
                            <div key={i} className="w-20 h-20 bg-muted rounded-xl overflow-hidden">
                              <img
                                src={image}
                                alt={`${match.title} ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-serif font-bold text-primary">
                              {match.title}
                            </h3>
                            <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-full">
                              <Star className="w-4 h-4 text-accent" />
                              <span className="text-accent font-semibold">
                                {match.matchScore}% Match
                              </span>
                            </div>
                          </div>
                          <p className="text-secondary flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{match.location}</span>
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Características</h4>
                          <div className="flex flex-wrap gap-2">
                            {match.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-muted text-secondary rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Potencial</h4>
                          <p className="text-secondary">{match.potential}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-accent">
                              ${match.price.toLocaleString()} USD
                            </p>
                            <p className="text-secondary text-sm">Precio base + renovación</p>
                          </div>
                          <a
                            href={`/property/${match.id}`}
                            className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 inline-block"
                          >
                            Ver Detalles
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="text-center">
                  <a
                    href="/kusatsu-project"
                    className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 text-lg font-semibold inline-block"
                  >
                    Continuar al Proyecto Kusatsu
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BlueprintPortal;
