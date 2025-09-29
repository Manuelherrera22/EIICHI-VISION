'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'
import { 
  User, Settings, LogOut, Home, TrendingUp, Users, Calendar, 
  Globe, MapPin, Building, DollarSign, Star, ArrowRight, 
  CheckCircle, Clock, Target, Briefcase, Heart, Zap,
  Crown, Shield, Award, Compass, Lightbulb, Rocket,
  BarChart3, PieChart, Activity, Eye, Camera, Video,
  MousePointer, Layers, Grid3X3, Maximize2, RotateCcw,
  Play, Pause, Volume2, Download, Share2, Bookmark,
  MessageSquare, Phone, Mail, FileText, Calculator,
  Search, Filter, SortAsc, MoreHorizontal, ChevronRight,
  ChevronLeft, Plus, Minus, X, Check, AlertCircle,
  Info, ExternalLink, Monitor, Smartphone, Tablet,
  Wifi, Battery, Signal, Bluetooth, Headphones,
  Mic, MicOff, VideoOff, VolumeX, Bell, BellOff, Send
} from 'lucide-react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [userProfile, setUserProfile] = useState({
    investmentLevel: '',
    migrationInterest: '',
    businessGoals: '',
    currentAssets: '',
    timeline: '',
    experience: '',
    targetMarket: '' // Nuevo campo para segmentación por mercado
  })
  
  // Estados para componentes avanzados
  const [activeTab, setActiveTab] = useState('overview')
  const [show3DViewer, setShow3DViewer] = useState(false)
  const [showARViewer, setShowARViewer] = useState(false)
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false)
  const [showPropertyComparison, setShowPropertyComparison] = useState(false)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 2000000],
    location: 'all',
    propertyType: 'all',
    roi: [0, 20]
  })
  const [sortBy, setSortBy] = useState('price')
  const [viewMode, setViewMode] = useState('grid') // grid, list, map
  const [favorites, setFavorites] = useState([])
  const [notifications, setNotifications] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('es')
  const [currency, setCurrency] = useState('USD')
  const [timezone, setTimezone] = useState('UTC-5')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [autoSave, setAutoSave] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  
  // Estados para elementos de conversión
  const [showLeadMagnet, setShowLeadMagnet] = useState(false)
  const [showTestimonials, setShowTestimonials] = useState(false)
  const [showLimitedOffer, setShowLimitedOffer] = useState(false)
  const [showSuccessMetrics, setShowSuccessMetrics] = useState(false)
  const [showMarketSegmentation, setShowMarketSegmentation] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showCookies, setShowCookies] = useState(false)
  const [showGDPR, setShowGDPR] = useState(false)
  const [showCCPA, setShowCCPA] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [showVoice, setShowVoice] = useState(false)
  const [showGesture, setShowGesture] = useState(false)
  const [showEyeTracking, setShowEyeTracking] = useState(false)
  const [showHaptic, setShowHaptic] = useState(false)
  const [showSpatial, setShowSpatial] = useState(false)
  const [showQuantum, setShowQuantum] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showML, setShowML] = useState(false)
  const [showBlockchain, setShowBlockchain] = useState(false)
  const [showIoT, setShowIoT] = useState(false)
  const [show5G, setShow5G] = useState(false)
  const [showEdge, setShowEdge] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
  const [showServerless, setShowServerless] = useState(false)
  const [showMicroservices, setShowMicroservices] = useState(false)
  const [showContainers, setShowContainers] = useState(false)
  const [showKubernetes, setShowKubernetes] = useState(false)
  const [showDocker, setShowDocker] = useState(false)
  const [showGit, setShowGit] = useState(false)
  const [showCI, setShowCI] = useState(false)
  const [showCD, setShowCD] = useState(false)
  const [showDevOps, setShowDevOps] = useState(false)
  const [showAgile, setShowAgile] = useState(false)
  const [showScrum, setShowScrum] = useState(false)
  const [showKanban, setShowKanban] = useState(false)
  const [showLean, setShowLean] = useState(false)
  const [showSixSigma, setShowSixSigma] = useState(false)
  const [showTQM, setShowTQM] = useState(false)
  const [showISO, setShowISO] = useState(false)
  const [showGDPRCompliance, setShowGDPRCompliance] = useState(false)
  const [showSOX, setShowSOX] = useState(false)
  const [showHIPAA, setShowHIPAA] = useState(false)
  const [showPCI, setShowPCI] = useState(false)
  const [showSOC, setShowSOC] = useState(false)
  const [showCOBIT, setShowCOBIT] = useState(false)
  const [showITIL, setShowITIL] = useState(false)
  const [showPMBOK, setShowPMBOK] = useState(false)
  const [showPRINCE2, setShowPRINCE2] = useState(false)
  const [showPMP, setShowPMP] = useState(false)
  const [showCAPM, setShowCAPM] = useState(false)
  const [showPBA, setShowPBA] = useState(false)
  const [showPgMP, setShowPgMP] = useState(false)
  const [showPfMP, setShowPfMP] = useState(false)
  const [showRMP, setShowRMP] = useState(false)
  const [showSP, setShowSP] = useState(false)
  const [showACP, setShowACP] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      document.title = 'Dashboard - Tabiji House | Mi Panel de Control';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Accede a tu panel de control personalizado en Tabiji House. Gestiona tus inversiones, propiedades y servicios.');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'dashboard, panel de control, inversiones, propiedades japonesas, Tabiji House');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('tabiji-onboarding-completed')
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem('tabiji-onboarding-completed', 'true')
    setShowOnboarding(false)
  }

  const investmentProfiles = [
    {
      id: 'luxury-family',
      name: 'Inversión Familiar Premium',
      description: 'Propiedades espaciosas con amenidades exclusivas para familias',
      features: ['Onsen privado', 'Espacios amplios', 'Servicios de migración', 'Asesoría legal'],
      color: 'from-emerald-500 to-teal-600',
      icon: Crown,
      target: 'Familias que buscan lujo y comodidad'
    },
    {
      id: 'sustainable-investment',
      name: 'Inversión Sostenible',
      description: 'Propiedades eco-friendly con enfoque en responsabilidad ambiental',
      features: ['Certificación verde', 'ROI optimizado', 'Gestión profesional', 'Residencia temporal'],
      color: 'from-blue-500 to-indigo-600',
      icon: Shield,
      target: 'Inversores conscientes del medio ambiente'
    },
    {
      id: 'migration-opportunity',
      name: 'Oportunidad de Migración',
      description: 'Inversiones que facilitan la residencia y establecimiento en Japón',
      features: ['Visa de inversor', 'Asesoría legal', 'Red de contactos', 'Soporte cultural'],
      color: 'from-orange-500 to-red-600',
      icon: Heart,
      target: 'Personas interesadas en vivir en Japón'
    },
    {
      id: 'expatriate-strategy',
      name: 'Estrategia Expatriada',
      description: 'Propiedades ideales para profesionales internacionales',
      features: ['Ubicación estratégica', 'Servicios expatriados', 'Gestión remota', 'Renta garantizada'],
      color: 'from-purple-500 to-pink-600',
      icon: Compass,
      target: 'Expatriados y profesionales globales'
    }
  ]

  const stats = [
    {
      title: 'Propiedades Favoritas',
      value: '3',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Consultas Realizadas',
      value: '7',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Citas Programadas',
      value: '2',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Contactos del Equipo',
      value: '5',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Nueva propiedad disponible en Kusatsu',
      description: 'Casa tradicional con onsen privado',
      time: 'Hace 2 horas',
      type: 'property'
    },
    {
      id: 2,
      title: 'Consulta respondida por el equipo',
      description: 'Información sobre proceso de migración',
      time: 'Hace 1 día',
      type: 'support'
    },
    {
      id: 3,
      title: 'Cita confirmada para el 15 de marzo',
      description: 'Tour virtual de propiedades en Gunma',
      time: 'Hace 3 días',
      type: 'appointment'
    }
  ]

  // Datos de segmentación por mercado
  const marketSegments = [
    {
      id: 'arab',
      name: 'Mercado Árabe',
      flag: '🇸🇦',
      description: 'Propiedades de lujo con privacidad familiar y onsen privado',
      features: ['Privacidad familiar', 'Onsen privado', 'Espacios amplios', 'Servicios halal'],
      testimonials: [
        {
          name: 'Ahmed Al-Rashid',
          location: 'Dubai, UAE',
          investment: '$750,000',
          roi: '12%',
          quote: 'La privacidad y el onsen privado fueron perfectos para mi familia.'
        }
      ],
      cta: 'Reservar Consulta Exclusiva para Familias Árabes',
      offer: 'Solo 3 propiedades disponibles este mes'
    },
    {
      id: 'european',
      name: 'Mercado Europeo',
      flag: '🇪🇺',
      description: 'Inversión estratégica con beneficios fiscales y diversificación',
      features: ['Beneficios fiscales', 'Diversificación', 'Estabilidad política', 'Acceso a Asia'],
      testimonials: [
        {
          name: 'Klaus Mueller',
          location: 'Frankfurt, Germany',
          investment: '$650,000',
          roi: '15%',
          quote: 'Excelente diversificación y beneficios fiscales en Japón.'
        }
      ],
      cta: 'Obtener Análisis Fiscal Personalizado',
      offer: 'Consulta gratuita con especialista en impuestos'
    },
    {
      id: 'latin',
      name: 'Mercado Latino',
      flag: '🇲🇽',
      description: 'Oportunidades de migración y emprendimiento en Japón',
      features: ['Facilidades de migración', 'Red de contactos', 'Servicios en español', 'Emprendimiento'],
      testimonials: [
        {
          name: 'María González',
          location: 'México City, Mexico',
          investment: '$450,000',
          roi: '18%',
          quote: 'El proceso de migración fue más fácil de lo esperado.'
        }
      ],
      cta: 'Acceder a Red de Emprendedores Latinos',
      offer: 'Únete a 200+ emprendedores latinos exitosos'
    },
    {
      id: 'australian',
      name: 'Mercado Australiano',
      flag: '🇦🇺',
      description: 'Acuerdos comerciales y oportunidades de exportación',
      features: ['Acuerdos comerciales', 'Exportación', 'Tecnología', 'Turismo de negocios'],
      testimonials: [
        {
          name: 'James Thompson',
          location: 'Sydney, Australia',
          investment: '$850,000',
          roi: '14%',
          quote: 'Perfecto para expandir mi negocio a Asia.'
        }
      ],
      cta: 'Explorar Oportunidades de Exportación',
      offer: 'Acceso exclusivo a acuerdos comerciales'
    }
  ]

  // Métricas de éxito
  const successMetrics = {
    totalClients: '500+',
    totalInvested: '$50M+',
    averageROI: '12%',
    successRate: '95%',
    countries: '25+',
    properties: '150+'
  }

  // Testimonios destacados
  const featuredTestimonials = [
    {
      name: 'Ahmed Al-Rashid',
      location: 'Dubai, UAE',
      investment: '$750,000',
      roi: '12%',
      quote: 'La privacidad y el onsen privado fueron perfectos para mi familia. El proceso fue impecable.',
      market: 'arab',
      property: 'Casa Tradicional Kusatsu'
    },
    {
      name: 'Klaus Mueller',
      location: 'Frankfurt, Germany',
      investment: '$650,000',
      roi: '15%',
      quote: 'Excelente diversificación y beneficios fiscales en Japón. ROI superior a mis expectativas.',
      market: 'european',
      property: 'Villa Moderna Tokyo'
    },
    {
      name: 'María González',
      location: 'México City, Mexico',
      investment: '$450,000',
      roi: '18%',
      quote: 'El proceso de migración fue más fácil de lo esperado. Ahora tengo mi negocio en Japón.',
      market: 'latin',
      property: 'Casa de Lujo Kyoto'
    },
    {
      name: 'James Thompson',
      location: 'Sydney, Australia',
      investment: '$850,000',
      roi: '14%',
      quote: 'Perfecto para expandir mi negocio a Asia. Los acuerdos comerciales me abrieron muchas puertas.',
      market: 'australian',
      property: 'Villa Premium Osaka'
    }
  ]

  // Onboarding Modal
  const OnboardingModal = () => {
    if (!showOnboarding) return null

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-white/20">
          {onboardingStep === 0 && (
            <div className="relative p-12 text-center overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-5 w-16 h-16 bg-primary/5 rounded-full animate-bounce delay-500"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
                  <Rocket className="w-12 h-12 text-white animate-bounce" />
                </div>
                
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 animate-fade-in">
                  ¡Bienvenido a Tabiji House!
                </h2>
                
                <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
                  Descubre tu camino hacia el éxito en Japón. Una experiencia única que combina tradición, innovación y oportunidades ilimitadas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-spin">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-emerald-800 text-lg mb-2">Inversión Inmobiliaria</h3>
                    <p className="text-sm text-emerald-600">Propiedades de lujo con onsen privado en las mejores ubicaciones de Japón</p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-blue-800 text-lg mb-2">Servicios de Migración</h3>
                    <p className="text-sm text-blue-600">Visa de inversor, residencia permanente y establecimiento completo en Japón</p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-purple-800 text-lg mb-2">Oportunidades de Negocio</h3>
                    <p className="text-sm text-purple-600">Franquicias, emprendimiento y oportunidades de inversión en negocios japoneses</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setOnboardingStep(1)}
                    className="group bg-gradient-to-r from-primary to-accent text-white px-12 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Star className="w-5 h-5 group-hover:animate-spin" />
                      Comenzar Mi Viaje Personalizado
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="text-sm text-secondary/70">
                    ✨ Experiencia personalizada • 🎯 Análisis inteligente • 🚀 Resultados garantizados
                  </p>
                </div>
              </div>
            </div>
          )}

          {onboardingStep === 1 && (
            <div className="relative p-12 overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-transparent"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-primary/5 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-20 left-20 w-28 h-28 bg-accent/5 rounded-full animate-bounce delay-700"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Target className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
                    🎯 Evaluación Inteligente de Perfil
                  </h2>
                  <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    Nuestro sistema de IA analizará tus respuestas para crear una experiencia única y personalizada
                  </p>
                </div>
              
                <div className="space-y-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary">💰 Nivel de Inversión Actual</h3>
                        <p className="text-secondary">Selecciona el rango que mejor describe tu situación financiera</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { 
                          value: 'aspirante', 
                          label: '🌟 Aspirante (0-50K USD)', 
                          desc: 'Buscando oportunidades para crecer y aprender',
                          icon: '🌱',
                          color: 'from-green-500 to-emerald-500'
                        },
                        { 
                          value: 'intermedio', 
                          label: '🚀 Intermedio (50K-200K USD)', 
                          desc: 'Listo para inversiones significativas y estratégicas',
                          icon: '⚡',
                          color: 'from-blue-500 to-indigo-500'
                        },
                        { 
                          value: 'avanzado', 
                          label: '💎 Avanzado (200K-500K USD)', 
                          desc: 'Experiencia en inversiones internacionales y diversificadas',
                          icon: '🎯',
                          color: 'from-purple-500 to-pink-500'
                        },
                        { 
                          value: 'premium', 
                          label: '👑 Premium (500K+ USD)', 
                          desc: 'Inversor experimentado y sofisticado con visión global',
                          icon: '🏆',
                          color: 'from-orange-500 to-red-500'
                        }
                      ].map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setUserProfile(prev => ({ ...prev, investmentLevel: option.value }))}
                          className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                            userProfile.investmentLevel === option.value
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg'
                              : 'border-border hover:border-primary/50 bg-white/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-2xl group-hover:animate-bounce`}>
                              {option.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-primary text-lg mb-2">{option.label}</h4>
                              <p className="text-sm text-secondary leading-relaxed">{option.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary">🌏 Interés en Migración a Japón</h3>
                        <p className="text-secondary">¿Te interesa establecerte permanentemente en Japón?</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          value: 'si', 
                          label: '🇯🇵 Sí, definitivamente', 
                          desc: 'Busco residencia permanente y establecerme en Japón',
                          icon: '🏠',
                          color: 'from-green-500 to-emerald-500'
                        },
                        { 
                          value: 'talvez', 
                          label: '🤔 Tal vez', 
                          desc: 'Evaluando opciones y considerando la posibilidad',
                          icon: '⚖️',
                          color: 'from-yellow-500 to-orange-500'
                        },
                        { 
                          value: 'no', 
                          label: '💼 Solo inversión', 
                          desc: 'Enfocado únicamente en oportunidades de inversión',
                          icon: '📈',
                          color: 'from-blue-500 to-purple-500'
                        }
                      ].map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setUserProfile(prev => ({ ...prev, migrationInterest: option.value }))}
                          className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                            userProfile.migrationInterest === option.value
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg'
                              : 'border-border hover:border-primary/50 bg-white/50'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4 group-hover:animate-pulse`}>
                              {option.icon}
                            </div>
                            <h4 className="font-bold text-primary text-lg mb-2">{option.label}</h4>
                            <p className="text-sm text-secondary leading-relaxed">{option.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary">🎯 Objetivos Principales</h3>
                        <p className="text-secondary">¿Cuál es tu principal motivación para invertir en Japón?</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { 
                          value: 'inversion', 
                          label: '💰 Inversión y ROI', 
                          desc: 'Maximizar retorno de inversión y crecimiento patrimonial',
                          icon: '📊',
                          color: 'from-green-500 to-emerald-500'
                        },
                        { 
                          value: 'migracion', 
                          label: '🏠 Migración y Residencia', 
                          desc: 'Establecerse permanentemente en Japón',
                          icon: '🇯🇵',
                          color: 'from-blue-500 to-indigo-500'
                        },
                        { 
                          value: 'negocio', 
                          label: '🚀 Oportunidades de Negocio', 
                          desc: 'Franquicias, emprendimiento y desarrollo empresarial',
                          icon: '💼',
                          color: 'from-purple-500 to-pink-500'
                        },
                        { 
                          value: 'lifestyle', 
                          label: '✨ Estilo de Vida Premium', 
                          desc: 'Experiencia de lujo, bienestar y calidad de vida',
                          icon: '🌟',
                          color: 'from-orange-500 to-red-500'
                        }
                      ].map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setUserProfile(prev => ({ ...prev, businessGoals: option.value }))}
                          className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                            userProfile.businessGoals === option.value
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg'
                              : 'border-border hover:border-primary/50 bg-white/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-2xl group-hover:animate-spin`}>
                              {option.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-primary text-lg mb-2">{option.label}</h4>
                              <p className="text-sm text-secondary leading-relaxed">{option.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-12">
                <button
                  onClick={() => setOnboardingStep(0)}
                  className="group flex items-center gap-2 px-6 py-3 text-secondary hover:text-primary transition-all duration-300 rounded-full hover:bg-white/50"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Volver</span>
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                </div>
                
                <button
                  onClick={() => setOnboardingStep(2)}
                  disabled={!userProfile.investmentLevel || !userProfile.migrationInterest || !userProfile.businessGoals}
                  className="group bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Crear Mi Perfil</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  ¡Perfil Personalizado Creado!
                </h2>
                <p className="text-secondary mb-8">
                  Hemos creado un plan personalizado basado en tu perfil de inversión
                </p>
              </div>

              {/* Resumen del Perfil */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">Tu Perfil de Inversión</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-primary">Nivel de Inversión</h4>
                    <p className="text-sm text-secondary capitalize">{userProfile.investmentLevel}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-primary">Interés en Migración</h4>
                    <p className="text-sm text-secondary capitalize">{userProfile.migrationInterest}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-primary">Objetivos Principales</h4>
                    <p className="text-sm text-secondary capitalize">{userProfile.businessGoals}</p>
                  </div>
                </div>
              </div>

              {/* Roadmap Personalizado */}
              <div className="bg-white rounded-xl p-6 border border-border mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">Tu Roadmap Personalizado</h3>
                <div className="space-y-4">
                  {userProfile.investmentLevel === 'aspirante' && (
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-primary">Programa de Preparación</h4>
                        <p className="text-sm text-secondary">Acceso a cursos, mentorías y oportunidades de inversión inicial</p>
                      </div>
                    </div>
                  )}
                  
                  {userProfile.migrationInterest === 'si' && (
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-primary">Servicios de Migración</h4>
                        <p className="text-sm text-secondary">Asesoría legal, visa de inversor, y establecimiento en Japón</p>
                      </div>
                    </div>
                  )}
                  
                  {userProfile.businessGoals === 'negocio' && (
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-primary">Oportunidades de Negocio</h4>
                        <p className="text-sm text-secondary">Franquicias, emprendimiento y oportunidades de inversión en negocios</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium text-primary">Propiedades Premium</h4>
                      <p className="text-sm text-secondary">Acceso exclusivo a propiedades de lujo con onsen privado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setOnboardingStep(1)}
                  className="px-6 py-2 text-secondary hover:text-primary transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={completeOnboarding}
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
                >
                  Acceder al Dashboard Personalizado
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Componentes avanzados modales
  const Advanced3DViewer = () => {
    if (!show3DViewer) return null
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-primary">Visor 3D Avanzado</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShow3DViewer(false)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl h-96 flex items-center justify-center mb-6">
              <div className="text-center">
                <Eye className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Visor 3D Interactivo</h3>
                <p className="text-secondary mb-4">Explora la propiedad en 3D con controles avanzados</p>
                <div className="flex gap-2 justify-center">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <RotateCcw className="w-4 h-4 inline mr-2" />
                    Rotar
                  </button>
                  <button className="bg-white border border-border text-primary px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Zoom className="w-4 h-4 inline mr-2" />
                    Zoom
                  </button>
                  <button className="bg-white border border-border text-primary px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Layers className="w-4 h-4 inline mr-2" />
                    Capas
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Controles</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Click y arrastrar para rotar</div>
                  <div>• Rueda del mouse para zoom</div>
                  <div>• Shift + click para pan</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Mediciones</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Área total: 250m²</div>
                  <div>• Habitaciones: 4</div>
                  <div>• Baños: 3</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Materiales</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Madera: Cedro japonés</div>
                  <div>• Piedra: Granito local</div>
                  <div>• Techos: Tejas tradicionales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AdvancedROICalculator = () => {
    if (!showROICalculator) return null
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-primary">Calculadora ROI Avanzada</h2>
            <button
              onClick={() => setShowROICalculator(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Precio de Compra</label>
                  <input
                    type="number"
                    placeholder="450,000"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Ingresos Mensuales</label>
                  <input
                    type="number"
                    placeholder="3,500"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Gastos Mensuales</label>
                  <input
                    type="number"
                    placeholder="800"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Años de Inversión</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Resultados del Análisis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary">ROI Anual:</span>
                      <span className="font-semibold text-green-600">8.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">ROI Total (10 años):</span>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Valor Futuro:</span>
                      <span className="font-semibold text-primary">$832,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Ganancia Neta:</span>
                      <span className="font-semibold text-green-600">$382,500</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Análisis de Riesgo</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary">Riesgo de Mercado:</span>
                      <span className="font-semibold text-yellow-600">Medio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Liquidez:</span>
                      <span className="font-semibold text-green-600">Alta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Estabilidad:</span>
                      <span className="font-semibold text-green-600">Alta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                Generar Reporte
              </button>
              <button className="flex-1 bg-white border border-border text-primary py-3 px-6 rounded-lg hover:bg-muted/50 transition-colors">
                Exportar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AdvancedMarketAnalysis = () => {
    if (!showMarketAnalysis) return null
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-primary">Análisis de Mercado Avanzado</h2>
            <button
              onClick={() => setShowMarketAnalysis(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Tendencias de Precios</h3>
                  <div className="h-64 bg-white rounded-lg flex items-center justify-center border border-border">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                      <p className="text-secondary">Gráfico de tendencias de precios</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Análisis de Demanda</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary">Demanda Actual:</span>
                      <span className="font-semibold text-green-600">Alta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Crecimiento Proyectado:</span>
                      <span className="font-semibold text-green-600">+12% anual</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Competencia:</span>
                      <span className="font-semibold text-yellow-600">Media</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Comparación de Mercados</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-secondary">Kusatsu</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-secondary">Tokyo</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-secondary">Osaka</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-yellow-600">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Recomendaciones</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm text-secondary">Invertir en propiedades con onsen privado</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-sm text-secondary">Considerar ubicaciones cerca de estaciones de tren</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <p className="text-sm text-secondary">Diversificar en diferentes prefecturas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Chat Modal
  const ChatModal = () => {
    if (!showChat) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Chat con el Equipo</h2>
                <p className="text-sm text-secondary">Asistencia especializada en tiempo real</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex h-[60vh]">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">¡Hola! ¿En qué puedo ayudarte?</h3>
                    <p className="text-secondary">Nuestro equipo está listo para asistirte con tus consultas sobre inversiones en Japón.</p>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-primary'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-primary px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="w-80 border-l border-border p-6">
              <h3 className="font-semibold text-primary mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-primary">Consultar Propiedades</p>
                      <p className="text-xs text-secondary">Ver catálogo completo</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-primary">Calcular ROI</p>
                      <p className="text-xs text-secondary">Análisis de inversión</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-primary">Servicios de Migración</p>
                      <p className="text-xs text-secondary">Asesoría legal</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-primary">Oportunidades de Negocio</p>
                      <p className="text-xs text-secondary">Franquicias y emprendimiento</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-secondary hover:text-primary transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Notifications Modal
  const NotificationsModal = () => {
    if (!showNotifications) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Notificaciones</h2>
                <p className="text-sm text-secondary">Mantente al día con tus inversiones</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotifications(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">No hay notificaciones</h3>
                <p className="text-secondary">Te notificaremos cuando tengas actualizaciones importantes.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-primary mb-1">{notification.title}</h4>
                        <p className="text-sm text-secondary mb-2">{notification.message}</p>
                        <p className="text-xs text-muted">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Settings Modal
  const SettingsModal = () => {
    if (!showSettings) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Configuración</h2>
                <p className="text-sm text-secondary">Personaliza tu experiencia</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Perfil */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-primary">Perfil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Nombre</label>
                    <input
                      type="text"
                      defaultValue={user?.user_metadata?.full_name || ''}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Idioma</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Preferencias */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-primary">Preferencias</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">Notificaciones por Email</p>
                      <p className="text-sm text-secondary">Recibe actualizaciones por correo</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        emailNotifications ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">Notificaciones Push</p>
                      <p className="text-sm text-secondary">Alertas en tiempo real</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        pushNotifications ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">Tema Oscuro</p>
                      <p className="text-sm text-secondary">Interfaz con tema oscuro</p>
                    </div>
                    <button
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        theme === 'dark' ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-2 text-secondary hover:text-primary transition-colors"
              >
                Cancelar
              </button>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // AR Viewer
  const ARViewer = () => {
    if (!showARViewer) return null
    
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Visor AR</h2>
                <p className="text-sm text-secondary">Visualiza propiedades en realidad aumentada</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowARViewer(false)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl h-96 flex items-center justify-center mb-6 border-2 border-dashed border-orange-200">
              <div className="text-center">
                <Camera className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Experiencia AR Inmersiva</h3>
                <p className="text-secondary mb-4">Coloca la propiedad en tu espacio real</p>
                <div className="flex gap-2 justify-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Activar Cámara
                  </button>
                  <button className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Descargar Modelo
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Controles AR</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Mueve el dispositivo para explorar</div>
                  <div>• Toca para colocar objetos</div>
                  <div>• Pellizca para escalar</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Mediciones</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Área: 250m²</div>
                  <div>• Habitaciones: 4</div>
                  <div>• Baños: 3</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Características</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Onsen privado</div>
                  <div>• Jardín tradicional</div>
                  <div>• Vista a montañas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Virtual Tour
  const VirtualTour = () => {
    if (!showVirtualTour) return null
    
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Tour Virtual</h2>
                <p className="text-sm text-secondary">Explora la propiedad en 360°</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowVirtualTour(false)}
                className="p-2 text-secondary hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl h-96 flex items-center justify-center mb-6 border-2 border-dashed border-purple-200">
              <div className="text-center">
                <Video className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Tour Virtual 360°</h3>
                <p className="text-secondary mb-4">Navega por cada habitación de la propiedad</p>
                <div className="flex gap-2 justify-center">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    <Play className="w-4 h-4 inline mr-2" />
                    Iniciar Tour
                  </button>
                  <button className="bg-white border border-purple-200 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Controles</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Click y arrastrar</div>
                  <div>• Rueda para zoom</div>
                  <div>• Flechas para navegar</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Habitaciones</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Sala principal</div>
                  <div>• Cocina moderna</div>
                  <div>• Dormitorios</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Exteriores</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Jardín japonés</div>
                  <div>• Onsen privado</div>
                  <div>• Vista panorámica</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Información</h4>
                <div className="space-y-2 text-sm text-secondary">
                  <div>• Duración: 5 min</div>
                  <div>• Calidad: 4K</div>
                  <div>• Audio: Incluido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Property Comparison
  const PropertyComparison = () => {
    if (!showPropertyComparison) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Comparación de Propiedades</h2>
                <p className="text-sm text-secondary">Analiza y compara diferentes opciones</p>
              </div>
            </div>
            <button
              onClick={() => setShowPropertyComparison(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Propiedad 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Casa Tradicional Kusatsu</h3>
                  <p className="text-sm text-secondary">Gunma, Japón</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Precio:</span>
                    <span className="font-semibold text-primary">$450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Área:</span>
                    <span className="font-semibold text-primary">250m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Habitaciones:</span>
                    <span className="font-semibold text-primary">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">ROI Estimado:</span>
                    <span className="font-semibold text-green-600">12%</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Ver Detalles
                </button>
              </div>
              
              {/* Propiedad 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Villa Moderna Tokyo</h3>
                  <p className="text-sm text-secondary">Tokyo, Japón</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Precio:</span>
                    <span className="font-semibold text-primary">$650,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Área:</span>
                    <span className="font-semibold text-primary">180m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Habitaciones:</span>
                    <span className="font-semibold text-primary">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">ROI Estimado:</span>
                    <span className="font-semibold text-green-600">15%</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                  Ver Detalles
                </button>
              </div>
              
              {/* Propiedad 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Casa de Lujo Kyoto</h3>
                  <p className="text-sm text-secondary">Kyoto, Japón</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Precio:</span>
                    <span className="font-semibold text-primary">$850,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Área:</span>
                    <span className="font-semibold text-primary">320m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">Habitaciones:</span>
                    <span className="font-semibold text-primary">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary">ROI Estimado:</span>
                    <span className="font-semibold text-green-600">18%</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
            
            {/* Comparación de Métricas */}
            <div className="mt-8 bg-muted/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Comparación de Métricas</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-secondary">Precio Promedio</p>
                  <p className="font-semibold text-primary">$650,000</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-secondary">ROI Promedio</p>
                  <p className="font-semibold text-primary">15%</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-secondary">Área Promedio</p>
                  <p className="font-semibold text-primary">250m²</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-secondary">Calificación</p>
                  <p className="font-semibold text-primary">4.8/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Market Segmentation Modal
  const MarketSegmentation = () => {
    if (!showMarketSegmentation) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Segmentación por Mercado</h2>
                <p className="text-sm text-secondary">Experiencia personalizada para tu región</p>
              </div>
            </div>
            <button
              onClick={() => setShowMarketSegmentation(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketSegments.map((market) => (
                <div key={market.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{market.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{market.name}</h3>
                      <p className="text-sm text-secondary">{market.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {market.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">Oferta Especial:</p>
                    <p className="text-sm text-blue-800">{market.offer}</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setUserProfile(prev => ({ ...prev, targetMarket: market.id }))
                      setShowMarketSegmentation(false)
                    }}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    {market.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Success Metrics Component
  const SuccessMetrics = () => {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.totalClients}</p>
            <p className="text-xs text-secondary">Clientes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.totalInvested}</p>
            <p className="text-xs text-secondary">Invertido</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.averageROI}</p>
            <p className="text-xs text-secondary">ROI Promedio</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.successRate}</p>
            <p className="text-xs text-secondary">Tasa de Éxito</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.countries}</p>
            <p className="text-xs text-secondary">Países</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Building className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-primary">{successMetrics.properties}</p>
            <p className="text-xs text-secondary">Propiedades</p>
          </div>
        </div>
      </div>
    )
  }

  // Testimonials Modal
  const TestimonialsModal = () => {
    if (!showTestimonials) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Testimonios de Éxito</h2>
                <p className="text-sm text-secondary">Historias reales de inversores exitosos</p>
              </div>
            </div>
            <button
              onClick={() => setShowTestimonials(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                        <span className="text-sm text-secondary">• {testimonial.location}</span>
                      </div>
                      <p className="text-sm text-secondary mb-3 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-600 font-medium">ROI: {testimonial.roi}</span>
                        <span className="text-blue-600 font-medium">Inversión: {testimonial.investment}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {testimonial.property}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Lead Magnet Modal
  const LeadMagnetModal = () => {
    if (!showLeadMagnet) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Guía Gratuita Exclusiva</h2>
                <p className="text-sm text-secondary">Descarga tu guía personalizada</p>
              </div>
            </div>
            <button
              onClick={() => setShowLeadMagnet(false)}
              className="p-2 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                "Guía Completa: Cómo Invertir en Propiedades de Lujo en Japón"
              </h3>
              <p className="text-secondary text-sm">
                Incluye: Análisis de mercado, proceso de migración, beneficios fiscales, y casos de éxito
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-secondary">Análisis completo del mercado inmobiliario japonés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-secondary">Proceso paso a paso para visa de inversor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-secondary">Beneficios fiscales por país de origen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-secondary">15 casos de éxito con ROI reales</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-medium text-center">
                ⚡ Oferta Limitada: Solo disponible para los primeros 100 descargas
              </p>
            </div>
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Tu email para recibir la guía"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-medium">
                <Download className="w-4 h-4 inline mr-2" />
                Descargar Guía Gratuita
              </button>
              <p className="text-xs text-secondary text-center">
                Al descargar, aceptas recibir contenido exclusivo sobre inversiones en Japón
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <OnboardingModal />
        <Advanced3DViewer />
        <AdvancedROICalculator />
        <AdvancedMarketAnalysis />
        <ChatModal />
        <NotificationsModal />
        <SettingsModal />
        <ARViewer />
        <VirtualTour />
        <PropertyComparison />
        <MarketSegmentation />
        <TestimonialsModal />
        <LeadMagnetModal />
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Actions */}
            <div className="mb-8 pt-4">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-3 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setShowChat(true)}
                  className="relative p-3 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  <MessageSquare className="w-5 h-5" />
                  {chatMessages.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chatMessages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Cerrar Sesión</span>
                </button>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">
                      ¡Bienvenido, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Inversor'}!
                    </h1>
                    <p className="text-white/90 text-lg mb-4">
                      Tu centro de control para inversiones en Japón
                    </p>
                    {userProfile.investmentLevel && (
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          Nivel: {userProfile.investmentLevel}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          Migración: {userProfile.migrationInterest}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          Objetivo: {userProfile.businessGoals}
                        </span>
                        {userProfile.targetMarket && (
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            Mercado: {marketSegments.find(m => m.id === userProfile.targetMarket)?.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block">
                    <TrendingUp className="w-24 h-24 text-white/20" />
                  </div>
                </div>
              </div>
            </div>


            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary">{stat.title}</p>
                      <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Investment Opportunities */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary">Oportunidades de Inversión</h2>
                  <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                    Ver todas <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Propiedades Premium</h3>
                        <p className="text-sm text-secondary">ROI: 8-12% anual</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary mb-3">Casas tradicionales con onsen privado en Gunma</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                      Explorar
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Fondos de Inversión</h3>
                        <p className="text-sm text-secondary">ROI: 6-10% anual</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary mb-3">Portfolio diversificado de propiedades japonesas</p>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                      Invertir
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Servicios Legales</h3>
                        <p className="text-sm text-secondary">Visa de inversor</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary mb-3">Asesoría completa para residencia en Japón</p>
                    <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                      Consultar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-xl">
                {[
                  { id: 'overview', label: 'Resumen', icon: Home },
                  { id: 'properties', label: 'Propiedades', icon: Building },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'market', label: 'Mercado', icon: TrendingUp },
                  { id: 'tools', label: 'Herramientas', icon: Calculator },
                  { id: 'portfolio', label: 'Portfolio', icon: PieChart },
                  { id: 'reports', label: 'Reportes', icon: FileText },
                  { id: 'settings', label: 'Configuración', icon: Settings }
                ].map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-secondary hover:text-primary hover:bg-white/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:block">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Search and Tools Bar */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-border">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar propiedades, ubicaciones, características..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterOptions(prev => ({ ...prev, showAdvanced: !prev.showAdvanced }))}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:block">Filtros</span>
                  </button>
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {viewMode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                    <span className="hidden sm:block">{viewMode === 'grid' ? 'Cuadrícula' : 'Lista'}</span>
                  </button>
                  <button
                    onClick={() => setShowMarketAnalysis(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:block">Análisis</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Market Segmentation Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-primary">Experiencia por Mercado</h2>
                    <button
                      onClick={() => setShowMarketSegmentation(true)}
                      className="p-2 text-secondary hover:text-primary transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {marketSegments.map((market) => (
                      <div key={market.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                           onClick={() => setShowMarketSegmentation(true)}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{market.flag}</span>
                          <div>
                            <h4 className="font-semibold text-primary text-sm">{market.name}</h4>
                            <p className="text-xs text-secondary">{market.description}</p>
                          </div>
                        </div>
                        <div className="space-y-1 mb-3">
                          {market.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-secondary">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full bg-primary text-white py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors text-xs font-medium">
                          {market.cta}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary">¿No ves tu mercado?</h4>
                        <p className="text-sm text-secondary">Tenemos experiencia en 25+ países</p>
                      </div>
                      <button 
                        onClick={() => setShowMarketSegmentation(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        Ver Todos los Mercados
                      </button>
                    </div>
                  </div>
                </div>

                {/* Investment Opportunities */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-primary">Oportunidades de Inversión</h2>
                    <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                      Ver todas <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">Propiedades Premium</h3>
                          <p className="text-sm text-secondary">ROI: 8-12% anual</p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary mb-3">Casas tradicionales con onsen privado en Gunma</p>
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        Explorar
                      </button>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">Fondos de Inversión</h3>
                          <p className="text-sm text-secondary">ROI: 6-10% anual</p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary mb-3">Portfolio diversificado de propiedades japonesas</p>
                      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                        Explorar
                      </button>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">Servicios de Migración</h3>
                          <p className="text-sm text-secondary">Visa de inversor</p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary mb-3">Asesoría completa para residencia en Japón</p>
                      <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                        Consultar
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Assistant */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Asistente Cultural AI</h3>
                        <p className="text-sm text-secondary">Personalizado para tu mercado</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowChat(true)}
                        className="p-2 text-secondary hover:text-primary transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowVoice(true)}
                        className="p-2 text-secondary hover:text-primary transition-colors"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-secondary">
                      "Hola! Soy tu asistente especializado en {userProfile.investmentLevel ? `${userProfile.investmentLevel} - ${userProfile.businessGoals}` : 'inversiones japonesas'}. 
                      ¿En qué puedo ayudarte hoy?"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                      Consulta Rápida
                    </button>
                    <button className="bg-white border border-border text-primary py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors text-sm">
                      Chat Completo
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowROICalculator(true)}
                      className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-xs"
                    >
                      <Calculator className="w-3 h-3 inline mr-1" />
                      ROI
                    </button>
                    <button
                      onClick={() => setShow3DViewer(true)}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-xs"
                    >
                      <Eye className="w-3 h-3 inline mr-1" />
                      3D
                    </button>
                    <button
                      onClick={() => setShowARViewer(true)}
                      className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors text-xs"
                    >
                      <Camera className="w-3 h-3 inline mr-1" />
                      AR
                    </button>
                    <button
                      onClick={() => setShowVirtualTour(true)}
                      className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg hover:bg-purple-600 transition-colors text-xs"
                    >
                      <Video className="w-3 h-3 inline mr-1" />
                      Tour
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-semibold text-primary mb-6">Acciones Rápidas</h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="font-medium">Explorar Propiedades</span>
                      <ArrowRight className="w-4 h-4 text-secondary/50 ml-auto" />
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium">Programar Consulta</span>
                      <ArrowRight className="w-4 h-4 text-secondary/50 ml-auto" />
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium">Contactar Equipo</span>
                      <ArrowRight className="w-4 h-4 text-secondary/50 ml-auto" />
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20">
                      <Settings className="w-5 h-5 text-primary" />
                      <span className="font-medium">Configuración</span>
                      <ArrowRight className="w-4 h-4 text-secondary/50 ml-auto" />
                    </button>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-semibold text-primary mb-6">Actividad Reciente</h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20">
                        <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium text-primary">{activity.title}</h3>
                          <p className="text-sm text-secondary mt-1">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-secondary/70" />
                            <p className="text-xs text-secondary/70">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Insights del Mercado</h2>
                <button
                  onClick={() => setShowMarketAnalysis(true)}
                  className="p-2 text-secondary hover:text-primary transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Tendencia del Mercado</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">+15%</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Las propiedades con onsen privado han aumentado 15% en valor este año
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-blue-600">75%</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Oportunidad</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Hot</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Nueva zona de desarrollo en Kusatsu con potencial de crecimiento
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-xs text-green-600">90%</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Recomendación</span>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Tip</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Considera invertir en propiedades cerca de estaciones de tren
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-xs text-orange-600">60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Testimonios de Éxito</h2>
                <button
                  onClick={() => setShowTestimonials(true)}
                  className="p-2 text-secondary hover:text-primary transition-colors"
                >
                  <Star className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {featuredTestimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-primary text-sm">{testimonial.name}</h4>
                          <span className="text-xs text-secondary">• {testimonial.location}</span>
                        </div>
                        <p className="text-xs text-secondary mb-2 italic">"{testimonial.quote}"</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600 font-medium">ROI: {testimonial.roi}</span>
                          <span className="text-blue-600 font-medium">Inversión: {testimonial.investment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setShowTestimonials(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
              >
                <Star className="w-4 h-4 inline mr-2" />
                Ver Todos los Testimonios
              </button>
            </div>

            {/* Lead Magnet Section */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 mb-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  "Guía Gratuita: Cómo Invertir en Propiedades de Lujo en Japón"
                </h3>
                <p className="text-secondary text-sm mb-4">
                  Incluye: Análisis de mercado, proceso de migración, beneficios fiscales, y casos de éxito
                </p>
                <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800 font-medium">
                    ⚡ Oferta Limitada: Solo disponible para los primeros 100 descargas
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Tu email para recibir la guía"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button 
                  onClick={() => setShowLeadMagnet(true)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Descargar Guía Gratuita
                </button>
                <p className="text-xs text-secondary text-center">
                  Al descargar, aceptas recibir contenido exclusivo sobre inversiones en Japón
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-primary mb-6">Información del Usuario</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">
                      {user?.user_metadata?.full_name || 'Usuario'}
                    </p>
                    <p className="text-sm text-secondary">{user?.email}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Miembro desde:</span>
                    <span className="text-primary font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-secondary">Nivel de inversión:</span>
                    <span className="text-primary font-medium capitalize">
                      {userProfile.investmentLevel || 'No evaluado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-secondary">Interés en migración:</span>
                    <span className="text-primary font-medium capitalize">
                      {userProfile.migrationInterest || 'No evaluado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-secondary">Objetivos principales:</span>
                    <span className="text-primary font-medium capitalize">
                      {userProfile.businessGoals || 'No evaluado'}
                    </span>
                  </div>
                  {userProfile.targetMarket && (
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-secondary">Mercado objetivo:</span>
                      <span className="text-primary font-medium capitalize">
                        {marketSegments.find(m => m.id === userProfile.targetMarket)?.name || 'No seleccionado'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowOnboarding(true)}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Personalizar Experiencia
                  </button>
                  <button 
                    onClick={() => setShowMarketSegmentation(true)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  >
                    <Globe className="w-4 h-4 inline mr-2" />
                    Seleccionar Mercado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
