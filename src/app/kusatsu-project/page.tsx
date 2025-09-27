'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
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
    ]
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="text-6xl sm:text-8xl font-serif text-white/20 mb-4">
                温泉
              </div>
              <div className="text-sm text-white/60 font-mono tracking-wider">
                ONSEN - Hot Spring Experience
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {projectDetails.title}
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {projectDetails.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white">{projectDetails.duration}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-white">{projectDetails.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white">Máx. {projectDetails.maxParticipants} participantes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-primary px-8 py-4 rounded-full hover:bg-accent hover:text-white transition-all duration-300 font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Reservar Ahora</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group flex items-center space-x-2 text-white hover:text-accent transition-colors duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                  <Play size={16} className="ml-1" />
                </div>
                <span className="font-medium">Ver Video Promocional</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-3 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-white/70 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">{tab.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Description */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-6">Sobre el Proyecto</h2>
                  <p className="text-xl text-white/80 leading-relaxed mb-8">{projectDetails.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Incluye</h3>
                      <div className="space-y-2">
                        {projectDetails.includes.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-white/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Destacados</h3>
                      <div className="space-y-2">
                        {projectDetails.highlights.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-white/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Card */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">Inversión</h3>
                    <div className="text-5xl font-bold text-yellow-400 mb-2">
                      ${projectDetails.price.toLocaleString()} {projectDetails.currency}
                    </div>
                    <p className="text-white/80 mb-6">Por participante (todo incluido)</p>
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 font-semibold text-lg">
                      Reservar Ahora
                    </button>
                  </div>
                </div>
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
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Día {day}
                    </button>
                  ))}
                </div>

                {/* Schedule Content */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">
                    {currentDay.title}
                  </h2>
                  
                  <div className="space-y-6">
                    {currentDay.activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <activity.icon className="w-6 h-6 text-yellow-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span className="text-white/60 text-sm">{activity.time}</span>
                              <span className="text-white/60 text-sm">•</span>
                              <span className="text-white/60 text-sm">{activity.duration}</span>
                            </div>
                          </div>
                          <p className="text-white/80">{activity.description}</p>
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-white mb-4">{accommodation.name}</h2>
                      <p className="text-white/80 mb-4">{accommodation.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(accommodation.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">{accommodation.rating}/5</span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-4">Características</h3>
                      <div className="space-y-2">
                        {accommodation.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {accommodation.images.map((image, index) => (
                        <div key={index} className="aspect-video bg-white/10 rounded-xl overflow-hidden">
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">
                    Reserva tu Lugar
                  </h2>
                  
                  <div className="max-w-2xl mx-auto">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            País
                          </label>
                          <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400">
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
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Experiencia en Inversión
                        </label>
                        <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400">
                          <option value="">Selecciona tu nivel</option>
                          <option value="beginner">Principiante</option>
                          <option value="intermediate">Intermedio</option>
                          <option value="advanced">Avanzado</option>
                          <option value="expert">Experto</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Presupuesto de Inversión
                        </label>
                        <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400">
                          <option value="">Selecciona tu rango</option>
                          <option value="50k-100k">$50K - $100K USD</option>
                          <option value="100k-200k">$100K - $200K USD</option>
                          <option value="200k-300k">$200K - $300K USD</option>
                          <option value="300k-plus">$300K+ USD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Comentarios Adicionales
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                          placeholder="Cuéntanos sobre tus objetivos de inversión o cualquier pregunta específica..."
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 text-yellow-400 bg-white/10 border-white/20 rounded focus:ring-yellow-400 focus:ring-2"
                        />
                        <label htmlFor="terms" className="text-white/80 text-sm">
                          Acepto los términos y condiciones y la política de privacidad
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 font-semibold text-lg"
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
      </div>
    </Layout>
  );
};

export default KusatsuProjectPage;
