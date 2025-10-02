'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import HydrationSafeMotion from '@/components/HydrationSafeMotion';
import { formatPrice } from '@/utils/numberFormat';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share,
  Camera,
  Video,
  Eye,
  Home,
  Building,
  TreePine,
  Waves,
  Mountain,
  Zap,
  Award,
  Phone,
  Mail,
  MessageSquare,
  BookOpen,
  Heart,
  Bell,
  Settings,
  User,
  DollarSign,
  TrendingUp,
  Globe,
  Plane,
  Car,
  Train,
  Hotel,
  Utensils,
  Coffee,
  Wifi,
  Shield,
  Lock,
  Unlock,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X
} from 'lucide-react';

const KusatsuProjectPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'accommodation' | 'booking'>('overview');
  const { t } = useLanguage();

  // Actualizar el título y metadatos de la página
  useEffect(() => {
    // Usar un pequeño delay para asegurar que se ejecute después de DynamicMetadata
    const timer = setTimeout(() => {
      // Actualizar título
        document.title = 'Proyecto Kusatsu - Taller de Inversión Inmersivo | Tabiji House';
      
      // Actualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Una experiencia única de 3 días en Kusatsu, Gunma, donde los inversores pueden experimentar de primera mano el potencial de las propiedades japonesas tradicionales.');
      }
      
      // Actualizar meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'inversión, Japón, Kusatsu, propiedades tradicionales, akiya, onsen, workshop, inversión inmobiliaria');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const projectDetails = {
    title: 'Proyecto Kusatsu',
    subtitle: 'Taller de Inversión Inmersivo de 3 Días',
    description: 'Una experiencia única de 3 días en Kusatsu, Gunma, donde los inversores pueden experimentar de primera mano el potencial de las propiedades japonesas tradicionales.',
    duration: '3 días / 2 noches',
    location: 'Kusatsu, Gunma, Japón',
    maxParticipants: 12,
    price: 2500,
    currency: 'USD',
    includes: [
      'Transporte desde/hacia Tokio',
      'Alojamiento en ryokan tradicional',
      'Todas las comidas',
      'Visitas a propiedades seleccionadas',
      'Sesiones con arquitectos y constructores',
      'Materiales y documentación',
      'Traducción profesional',
      'Seguro de viaje'
    ],
    highlights: [
      'Visitas a 8-10 propiedades akiya',
      'Sesiones de diseño con realidad aumentada',
      'Cenas tradicionales en ryokan',
      'Experiencia onsen auténtica',
      'Networking con otros inversores',
      'Sesión de cierre con expertos locales'
    ],
    culturalElements: {
      kanji: '温泉',
      meaning: 'ONSEN - Hot Spring Experience',
      philosophy: 'Wabi-Sabi: Encontrar belleza en la imperfección',
      tradition: 'Arquitectura tradicional preservada por generaciones',
      harmony: 'Armonía entre naturaleza y construcción humana'
    }
  };

  const schedule = {
    1: {
      title: 'Día 1: Llegada y Orientación',
      activities: [
        {
          time: '09:00',
          title: 'Recogida en Tokio',
          description: 'Transporte privado desde estación de Tokio',
          icon: Train,
          duration: '3 horas'
        },
        {
          time: '12:00',
          title: 'Llegada a Kusatsu',
          description: 'Check-in en ryokan tradicional',
          icon: Hotel,
          duration: '1 hora'
        },
        {
          time: '13:00',
          title: 'Almuerzo de bienvenida',
          description: 'Comida tradicional japonesa',
          icon: Utensils,
          duration: '1.5 horas'
        },
        {
          time: '14:30',
          title: 'Orientación del proyecto',
          description: 'Presentación del programa y objetivos',
          icon: BookOpen,
          duration: '2 horas'
        },
        {
          time: '16:30',
          title: 'Primera visita a propiedad',
          description: 'Introducción a las akiya con AR',
          icon: Home,
          duration: '2 horas'
        },
        {
          time: '18:30',
          title: 'Cena tradicional',
          description: 'Kaiseki en el ryokan',
          icon: Utensils,
          duration: '2 horas'
        },
        {
          time: '20:30',
          title: 'Experiencia onsen',
          description: 'Relajación en aguas termales',
          icon: Waves,
          duration: '1.5 horas'
        }
      ]
    },
    2: {
      title: 'Día 2: Exploración Intensiva',
      activities: [
        {
          time: '07:00',
          title: 'Desayuno tradicional',
          description: 'Comida japonesa tradicional',
          icon: Coffee,
          duration: '1 hora'
        },
        {
          time: '08:00',
          title: 'Visita a 3 propiedades',
          description: 'Tour guiado con tecnología AR',
          icon: Home,
          duration: '4 horas'
        },
        {
          time: '12:00',
          title: 'Almuerzo local',
          description: 'Comida en restaurante tradicional',
          icon: Utensils,
          duration: '1 hora'
        },
        {
          time: '13:00',
          title: 'Sesión de diseño',
          description: 'Mesa interactiva para co-diseño',
          icon: Settings,
          duration: '3 horas'
        },
        {
          time: '16:00',
          title: 'Visita a 2 propiedades más',
          description: 'Propiedades seleccionadas por participantes',
          icon: Home,
          duration: '2.5 horas'
        },
        {
          time: '18:30',
          title: 'Cena de networking',
          description: 'Cena con otros inversores y expertos',
          icon: Users,
          duration: '2.5 horas'
        },
        {
          time: '21:00',
          title: 'Sesión de preguntas',
          description: 'Q&A con expertos locales',
          icon: MessageSquare,
          duration: '1 hora'
        }
      ]
    },
    3: {
      title: 'Día 3: Decisión y Cierre',
      activities: [
        {
          time: '07:00',
          title: 'Desayuno',
          description: 'Última comida en el ryokan',
          icon: Coffee,
          duration: '1 hora'
        },
        {
          time: '08:00',
          title: 'Visita final a propiedad',
          description: 'Propiedad de mayor interés',
          icon: Home,
          duration: '2 horas'
        },
        {
          time: '10:00',
          title: 'Sesión de decisión',
          description: 'Análisis y toma de decisiones',
          icon: TrendingUp,
          duration: '2 horas'
        },
        {
          time: '12:00',
          title: 'Almuerzo de despedida',
          description: 'Comida final con el grupo',
          icon: Utensils,
          duration: '1.5 horas'
        },
        {
          time: '13:30',
          title: 'Sesión de cierre',
          description: 'Presentación de resultados y próximos pasos',
          icon: Award,
          duration: '1.5 horas'
        },
        {
          time: '15:00',
          title: 'Regreso a Tokio',
          description: 'Transporte de regreso',
          icon: Train,
          duration: '3 horas'
        }
      ]
    }
  };

  const accommodation = {
    name: 'Ryokan Yubatake',
    type: 'Ryokan Tradicional',
    rating: 4.8,
    description: 'Un ryokan auténtico ubicado en el corazón de Kusatsu, con acceso directo a las aguas termales y arquitectura tradicional preservada.',
    features: [
      'Habitaciones tradicionales con tatami',
      'Onsen privado y público',
      'Comidas kaiseki incluidas',
      'WiFi gratuito',
      'Servicio de conserjería 24/7',
      'Estacionamiento gratuito'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Home },
    { id: 'schedule', label: 'Cronograma', icon: Calendar },
    { id: 'accommodation', label: 'Alojamiento', icon: Hotel },
    { id: 'booking', label: 'Reserva', icon: BookOpen }
  ];

  const currentDay = schedule[selectedDay as keyof typeof schedule];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <HydrationSafeMotion
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 0 
                }}
                animate={{ 
                  y: -100,
                  opacity: [0, 0.6, 0],
                  x: 0
                }}
                transition={{
                  duration: 15 + (i * 2),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: '100%'
                }}
              >
                <div />
              </HydrationSafeMotion>
            ))}
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              {/* Japanese Kanji with Subtle Glow Effect */}
              <motion.div 
                className="text-8xl sm:text-9xl font-serif text-primary/15 mb-6 tracking-wider relative"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(26,54,93,0.05)",
                    "0 0 20px rgba(26,54,93,0.1)",
                    "0 0 10px rgba(26,54,93,0.05)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {projectDetails.culturalElements.kanji}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 blur-xl"></div>
              </motion.div>
              
              {/* Meaning with Typewriter Effect */}
              <motion.div 
                className="text-lg sm:text-xl text-secondary font-light tracking-widest uppercase mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {projectDetails.culturalElements.meaning}
              </motion.div>
              
              {/* Main Title with Staggered Animation */}
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {projectDetails.title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              {/* Subtitle */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                {projectDetails.subtitle}
              </h2>
              
              {/* Philosophy with Subtle Quote Animation */}
              <motion.div 
                className="text-lg text-secondary italic mb-8 max-w-3xl mx-auto relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <div className="absolute -left-4 -top-2 text-4xl text-secondary/30">"</div>
                {projectDetails.culturalElements.philosophy}
                <div className="absolute -right-4 -bottom-2 text-4xl text-secondary/30">"</div>
              </motion.div>
            </motion.div>

            {/* Refined Info Cards with Subtle Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { icon: Calendar, text: projectDetails.duration, color: "from-primary/10 to-primary/5" },
                { icon: MapPin, text: projectDetails.location, color: "from-accent/10 to-accent/5" },
                { icon: Users, text: `Máx. ${projectDetails.maxParticipants} participantes`, color: "from-secondary/10 to-secondary/5" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${item.color} backdrop-blur-sm border border-border rounded-full px-6 py-3 flex items-center space-x-2 hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-pointer`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Refined Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button 
                className="group bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-semibold text-lg flex items-center space-x-2 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Reservar Ahora</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button 
                className="group flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Play size={16} className="ml-1 relative z-10" />
                </div>
                <span className="font-medium">Ver Video Promocional</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Refined Navigation Tabs */}
        <div className="bg-background backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-3 py-4 px-4 border-b-2 transition-all duration-300 whitespace-nowrap relative group ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                      : 'border-transparent text-secondary hover:text-primary hover:bg-primary/5 rounded-t-lg'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className={`w-5 h-5 transition-colors duration-300 ${
                    activeTab === tab.id ? 'text-primary' : 'text-secondary group-hover:text-primary'
                  }`} />
                  <div className="text-left">
                    <p className={`font-medium transition-colors duration-300 ${
                      activeTab === tab.id ? 'text-primary' : 'text-secondary group-hover:text-primary'
                    }`}>{tab.label}</p>
                  </div>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="max-w-7xl mx-auto p-4 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Refined Cultural Introduction */}
                <motion.div 
                  className="bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm rounded-3xl p-8 border border-border relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Subtle Floating Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/5 rounded-full blur-xl"></div>
                  
                  <div className="text-center mb-8 relative z-10">
                    <motion.div 
                      className="text-6xl font-serif text-primary/20 mb-4"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(26,54,93,0.05)",
                          "0 0 15px rgba(26,54,93,0.1)",
                          "0 0 10px rgba(26,54,93,0.05)"
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      {projectDetails.culturalElements.kanji}
                    </motion.div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">Sobre el Proyecto</h2>
                    <p className="text-xl text-secondary leading-relaxed mb-6">{projectDetails.description}</p>
                    <div className="text-lg text-secondary/80 italic relative">
                      <div className="absolute -left-2 -top-1 text-2xl text-secondary/30">"</div>
                      {projectDetails.culturalElements.tradition}
                      <div className="absolute -right-2 -bottom-1 text-2xl text-secondary/30">"</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <motion.div 
                      className="bg-white rounded-2xl p-6 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold text-primary mb-4 flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </motion.div>
                        <span>Incluye</span>
                      </h3>
                      <div className="space-y-3">
                        {projectDetails.includes.map((item, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-3 group"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-primary/40 rounded-full group-hover:scale-150 transition-transform duration-300"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                            ></motion.div>
                            <span className="text-secondary group-hover:text-primary transition-colors duration-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-2xl p-6 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-primary mb-4 flex items-center space-x-2">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Star className="w-6 h-6 text-accent" />
                        </motion.div>
                        <span>Destacados</span>
                      </h3>
                      <div className="space-y-3">
                        {projectDetails.highlights.map((item, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center space-x-3 group"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-accent/40 rounded-full group-hover:scale-150 transition-transform duration-300"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                            ></motion.div>
                            <span className="text-secondary group-hover:text-primary transition-colors duration-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Refined Philosophy Section */}
                <motion.div 
                  className="bg-gradient-to-r from-muted to-background backdrop-blur-sm rounded-3xl p-8 border border-border relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {/* Zen Garden Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4 w-32 h-32 border border-border rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-24 h-24 border border-border rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-border rounded-full"></div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <motion.h3 
                      className="text-2xl font-serif font-bold text-primary mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      Filosofía Wabi-Sabi
                    </motion.h3>
                    <motion.div 
                      className="text-lg text-secondary italic mb-6 max-w-3xl mx-auto relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <div className="absolute -left-3 -top-2 text-3xl text-secondary/30">"</div>
                      <p className="mb-0">{projectDetails.culturalElements.philosophy}</p>
                      <div className="absolute -right-3 -bottom-2 text-3xl text-secondary/30">"</div>
                    </motion.div>
                    <motion.p 
                      className="text-base text-secondary/80 max-w-4xl mx-auto leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      En Kusatsu, cada propiedad cuenta una historia. Descubre cómo la arquitectura tradicional japonesa 
                      encuentra armonía perfecta con la naturaleza, creando espacios que no solo son funcionales, 
                      sino que también nutren el alma y conectan con la esencia de la vida japonesa.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Refined Price Card */}
                <motion.div 
                  className="bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 shadow-2xl shadow-primary/5 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Subtle Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <HydrationSafeMotion
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        initial={{ 
                          x: 0, 
                          y: 0,
                          opacity: 0 
                        }}
                        animate={{ 
                          y: [0, -20, 20],
                          opacity: [0, 0.4, 0],
                          x: 0
                        }}
                        transition={{
                          duration: 3 + (i * 0.5),
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                        style={{
                          left: `${(i * 10) % 100}%`,
                          top: `${(i * 20) % 100}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <h3 className="text-3xl font-serif font-bold text-primary mb-2">Inversión Total</h3>
                      <p className="text-secondary">Experiencia completa de 3 días</p>
                    </motion.div>
                    
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <motion.div 
                        className="text-6xl font-bold text-primary mb-2"
                        animate={{ 
                          textShadow: [
                            "0 0 10px rgba(26,54,93,0.1)",
                            "0 0 20px rgba(26,54,93,0.2)",
                            "0 0 10px rgba(26,54,93,0.1)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {formatPrice(projectDetails.price)}
                      </motion.div>
                      <div className="text-lg text-secondary">{projectDetails.currency} por participante</div>
                      <div className="text-sm text-secondary/70 mt-2">Todo incluido • Sin costos ocultos</div>
                    </motion.div>
                    
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="bg-white rounded-2xl p-4 mb-4 backdrop-blur-sm border border-border">
                        <div className="text-sm text-secondary mb-2">Incluye:</div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-secondary">
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            Transporte completo
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                            />
                            Alojamiento ryokan
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                            />
                            Todas las comidas
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            />
                            Visitas guiadas
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                            />
                            Materiales
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
                            />
                            Seguro de viaje
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.button 
                      className="bg-primary text-white px-12 py-4 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-semibold text-xl flex items-center space-x-3 mx-auto group relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Reservar Mi Lugar</span>
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <motion.div 
                      className="mt-4 text-sm text-secondary/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      Solo quedan 3 lugares disponibles
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Day Selector */}
                <div className="flex justify-center space-x-4 mb-8">
                  {[1, 2, 3].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-6 py-3 rounded-full transition-all ${
                        selectedDay === day
                          ? 'bg-accent text-white'
                          : 'bg-white text-secondary hover:bg-primary hover:text-white border border-border'
                      }`}
                    >
                      Día {day}
                    </button>
                  ))}
                </div>

                {/* Schedule Content */}
                <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
                    {currentDay.title}
                  </h2>
                  
                  <div className="space-y-6">
                    {currentDay.activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-muted rounded-xl hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                            <activity.icon className="w-6 h-6 text-accent" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-primary">{activity.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-secondary" />
                              <span className="text-secondary text-sm">{activity.time}</span>
                              <span className="text-secondary text-sm">•</span>
                              <span className="text-secondary text-sm">{activity.duration}</span>
                            </div>
                          </div>
                          <p className="text-secondary/80">{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'accommodation' && (
              <motion.div
                key="accommodation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-primary mb-4">{accommodation.name}</h2>
                      <p className="text-secondary mb-4">{accommodation.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(accommodation.rating)
                                  ? 'text-accent fill-current'
                                  : 'text-secondary/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-secondary text-sm">{accommodation.rating}/5</span>
                      </div>

                      <h3 className="text-xl font-semibold text-primary mb-4">Características</h3>
                      <div className="space-y-2">
                        {accommodation.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {accommodation.images.map((image, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-xl overflow-hidden">
                          <img
                            src={image}
                            alt={`${accommodation.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'booking' && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
                    Reserva tu Lugar
                  </h2>
                  
                  <div className="max-w-2xl mx-auto">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-secondary text-sm font-medium mb-2">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-muted border border-border rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-primary"
                            placeholder={t('kusatsu.fullNamePlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-secondary text-sm font-medium mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full p-3 bg-muted border border-border rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-primary"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-secondary text-sm font-medium mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            className="w-full p-3 bg-muted border border-border rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-primary"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-secondary text-sm font-medium mb-2">
                            País
                          </label>
                          <select className="w-full p-3 bg-muted border border-border rounded-lg text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                            <option value="">Selecciona tu país</option>
                            <option value="US">Estados Unidos</option>
                            <option value="MX">México</option>
                            <option value="CA">Canadá</option>
                            <option value="BR">Brasil</option>
                            <option value="AR">Argentina</option>
                            <option value="CO">Colombia</option>
                            <option value="CL">Chile</option>
                            <option value="PE">Perú</option>
                            <option value="EC">Ecuador</option>
                            <option value="VE">Venezuela</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-secondary text-sm font-medium mb-2">
                          Experiencia en Inversión
                        </label>
                        <select className="w-full p-3 bg-muted border border-border rounded-lg text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                          <option value="">Selecciona tu nivel</option>
                          <option value="beginner">Principiante</option>
                          <option value="intermediate">Intermedio</option>
                          <option value="advanced">Avanzado</option>
                          <option value="expert">Experto</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-secondary text-sm font-medium mb-2">
                          Presupuesto de Inversión
                        </label>
                        <select className="w-full p-3 bg-muted border border-border rounded-lg text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                          <option value="">Selecciona tu rango</option>
                          <option value="50k-100k">$50K - $100K USD</option>
                          <option value="100k-200k">$100K - $200K USD</option>
                          <option value="200k-300k">$200K - $300K USD</option>
                          <option value="300k-plus">$300K+ USD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-secondary text-sm font-medium mb-2">
                          Comentarios Adicionales
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-3 bg-muted border border-border rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-primary"
                          placeholder={t('kusatsu.investmentPlaceholder')}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-primary focus:ring-2"
                        />
                        <label htmlFor="terms" className="text-secondary text-sm">
                          Acepto los términos y condiciones y la política de privacidad
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-semibold text-lg"
                      >
                        Reservar Proyecto Kusatsu
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Refined Closing Section */}
        <motion.div 
          className="relative py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/20 to-transparent"></div>
          
          {/* Floating Kanji Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {['和', '美', '静', '雅'].map((kanji, index) => (
              <HydrationSafeMotion
                key={kanji}
                className="absolute text-primary/5 text-8xl font-serif"
                initial={{ 
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                animate={{ 
                  y: [0, -30, 30],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.05, 0.08, 0.05]
                }}
                transition={{
                  duration: 15 + (index * 5),
                  repeat: Infinity,
                  delay: index * 3
                }}
                style={{
                  left: `${(index * 25) % 100}%`,
                  top: `${(index * 20) % 100}%`
                }}
              >
                {kanji}
              </HydrationSafeMotion>
            ))}
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
                Únete a la Transformación
              </h2>
              <p className="text-xl text-secondary mb-8 leading-relaxed">
                Sé parte de una experiencia única que combina la sabiduría ancestral japonesa 
                con las oportunidades de inversión del futuro.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Reservar Ahora</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="text-secondary hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>Contactar Asesor</span>
              </motion.button>
            </motion.div>
            
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary/70 text-sm mb-4">
                Experiencia limitada • Solo 12 participantes por sesión
              </p>
              <div className="flex justify-center space-x-4 text-secondary/60">
                <span>•</span>
                <span>Certificación Internacional</span>
                <span>•</span>
                <span>Red de Inversores</span>
                <span>•</span>
                <span>Soporte Post-Viaje</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default KusatsuProjectPage;
