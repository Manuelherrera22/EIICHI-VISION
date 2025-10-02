'use client';

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Star, 
  Heart, 
  Share, 
  Download,
  Calendar,
  Users,
  User,
  Camera,
  Video,
  Eye,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Building,
  TreePine,
  Waves,
  X,
  Mountain,
  Zap,
  Award,
  Phone,
  Mail,
  MessageSquare,
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

interface PropertyDetails {
  id: string;
  title: string;
  location: string;
  price: number;
  matchScore: number;
  images: string[];
  features: string[];
  potential: string;
  description: string;
  specifications: {
    rooms: number;
    bathrooms: number;
    area: number;
    year: number;
    condition: string;
  };
  locationDetails: {
    prefecture: string;
    city: string;
    neighborhood: string;
    nearby: string[];
  };
  investment: {
    roi: number;
    rentalYield: number;
    appreciation: number;
    timeline: string;
  };
  renovation: {
    estimated: number;
    timeline: string;
    phases: string[];
  };
}

const PropertyDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'investment' | 'renovation'>('overview');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data - en producción vendría de una API
  const property: PropertyDetails = {
    id: resolvedParams.id,
    title: t('blueprint.property1.title'),
    location: t('blueprint.property1.location'),
    price: 85000,
    matchScore: 95,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: [t('blueprint.property1.feature1'), t('blueprint.property1.feature2'), t('blueprint.property1.feature3'), 'Arquitectura auténtica'],
    potential: t('blueprint.property1.potential'),
    description: 'Esta encantadora casa tradicional japonesa en Kusatsu ofrece una oportunidad única de poseer una propiedad auténtica en una de las zonas de aguas termales más famosas de Japón. Con su arquitectura tradicional preservada y ubicación privilegiada, representa una inversión excepcional.',
    specifications: {
      rooms: 3,
      bathrooms: 1,
      area: 120,
      year: 1985,
      condition: 'Buen estado, requiere renovación'
    },
    locationDetails: {
      prefecture: 'Gunma',
      city: 'Kusatsu',
      neighborhood: 'Yubatake',
      nearby: ['Estación de Kusatsu Onsen', 'Yubatake (Campo de aguas termales)', 'Parque Nacional Joshinetsu Kogen']
    },
    investment: {
      roi: 12.5,
      rentalYield: 8.2,
      appreciation: 15.3,
      timeline: '18-24 meses'
    },
    renovation: {
      estimated: 45000,
      timeline: '6-8 meses',
      phases: ['Demolición y preparación', 'Estructura y techado', 'Instalaciones', 'Acabados interiores', 'Jardín y exteriores']
    }
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Home },
    { id: 'specs', label: 'Especificaciones', icon: Building },
    { id: 'investment', label: 'Inversión', icon: TrendingUp },
    { id: 'renovation', label: 'Renovación', icon: Zap }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-border p-4">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="flex flex-col space-y-4 md:hidden">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                  </button>
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Share className="w-5 h-5 text-primary" />
                  </button>
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Download className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-xl font-serif font-bold text-primary mb-2">
                  {property.title}
                </h1>
                <p className="text-secondary flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-accent font-semibold">
                    {property.matchScore}% Match
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-primary">
                    {property.title}
                  </h1>
                  <p className="text-secondary flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-accent font-semibold">
                    {property.matchScore}% Match
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                  </button>
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Share className="w-5 h-5 text-primary" />
                  </button>
                  <button className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                    <Download className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
                  <img
                    src={property.images[selectedImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Maximize2 className="w-5 h-5 text-primary" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-lg">
                    <span className="text-primary text-sm font-medium">
                      {selectedImage + 1} / {property.images.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-accent' : 'border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Price and Match */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                    ${property.price.toLocaleString()} USD
                  </div>
                  <p className="text-secondary text-xs sm:text-sm">Precio base + renovación estimada</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary text-sm">Match Score:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 sm:w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full"
                          style={{ width: `${property.matchScore}%` }}
                        />
                      </div>
                      <span className="text-accent font-semibold text-sm">{property.matchScore}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-secondary text-sm">ROI Estimado:</span>
                    <span className="text-accent font-semibold text-sm">{property.investment.roi}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-secondary text-sm">Timeline:</span>
                    <span className="text-primary font-semibold text-sm">{property.investment.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Características</h3>
                <div className="space-y-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-secondary text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Acciones</h3>
                <div className="space-y-2 sm:space-y-3">
                  <button 
                    onClick={() => setShowPurchaseModal(true)}
                    className="w-full bg-primary text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm sm:text-base"
                  >
                    Iniciar Proceso de Compra
                  </button>
                  <button 
                    onClick={() => setShowVisitModal(true)}
                    className="w-full border border-border text-primary py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
                  >
                    Agendar Visita Virtual
                  </button>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="w-full border border-border text-primary py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
                  >
                    Contactar Asesor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 sm:mt-8">
            <div className="bg-white border-b border-border overflow-x-auto">
              <div className="flex space-x-4 sm:space-x-8 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-accent text-accent'
                        : 'border-transparent text-secondary hover:text-primary'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm mt-4">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">Descripción</h3>
                      <p className="text-secondary leading-relaxed text-sm sm:text-base">{property.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">Potencial</h3>
                      <p className="text-secondary leading-relaxed text-sm sm:text-base">{property.potential}</p>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">Ubicación</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <p className="text-secondary text-xs sm:text-sm">Prefectura</p>
                          <p className="text-primary font-semibold text-sm sm:text-base">{property.locationDetails.prefecture}</p>
                        </div>
                        <div>
                          <p className="text-secondary text-xs sm:text-sm">Ciudad</p>
                          <p className="text-primary font-semibold text-sm sm:text-base">{property.locationDetails.city}</p>
                        </div>
                        <div>
                          <p className="text-secondary text-xs sm:text-sm">Barrio</p>
                          <p className="text-primary font-semibold text-sm sm:text-base">{property.locationDetails.neighborhood}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">Cerca de</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.locationDetails.nearby.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 sm:px-3 py-1 bg-muted text-secondary rounded-full text-xs sm:text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specs' && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <Home className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                        </div>
                        <p className="text-secondary text-xs sm:text-sm">Habitaciones</p>
                        <p className="text-primary font-semibold text-lg sm:text-xl">{property.specifications.rooms}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <p className="text-secondary text-xs sm:text-sm">Baños</p>
                        <p className="text-primary font-semibold text-lg sm:text-xl">{property.specifications.bathrooms}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <Building className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                        </div>
                        <p className="text-secondary text-xs sm:text-sm">Área (m²)</p>
                        <p className="text-primary font-semibold text-lg sm:text-xl">{property.specifications.area}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <p className="text-secondary text-xs sm:text-sm">Año</p>
                        <p className="text-primary font-semibold text-lg sm:text-xl">{property.specifications.year}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">Estado</h3>
                      <p className="text-secondary text-sm sm:text-base">{property.specifications.condition}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'investment' && (
                  <motion.div
                    key="investment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <TrendingUp className="w-8 h-8 text-green-400" />
                          <div>
                            <p className="text-white/70 text-sm">ROI Anual</p>
                            <p className="text-2xl font-bold text-green-400">{property.investment.roi}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <DollarSign className="w-8 h-8 text-yellow-400" />
                          <div>
                            <p className="text-white/70 text-sm">Rental Yield</p>
                            <p className="text-2xl font-bold text-yellow-400">{property.investment.rentalYield}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Award className="w-8 h-8 text-blue-400" />
                          <div>
                            <p className="text-white/70 text-sm">Apreciación</p>
                            <p className="text-2xl font-bold text-blue-400">{property.investment.appreciation}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Timeline de Inversión</h3>
                      <p className="text-white/80">{property.investment.timeline}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'renovation' && (
                  <motion.div
                    key="renovation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Costo Estimado</h3>
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                          ${property.renovation.estimated.toLocaleString()} USD
                        </div>
                        <p className="text-white/70 text-sm">Incluye materiales y mano de obra</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {property.renovation.timeline}
                        </div>
                        <p className="text-white/70 text-sm">Desde el inicio hasta la entrega</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Fases de Renovación</h3>
                      <div className="space-y-3">
                        {property.renovation.phases.map((phase, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                            <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                              <span className="text-yellow-400 font-semibold text-sm">{index + 1}</span>
                            </div>
                            <span className="text-white/80">{phase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            >
              <div className="relative max-w-7xl max-h-full p-4">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Purchase Modal */}
        <AnimatePresence>
          {showPurchaseModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPurchaseModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 w-full max-w-xs max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-1">
                    Iniciar Proceso de Compra
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-tight">
                    ¿Estás listo para comenzar el proceso de adquisición de esta propiedad?
                  </p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Propiedad</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{property.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{property.location}</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Inversión Total</h4>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${property.price.toLocaleString()} USD</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Incluye compra + renovación estimada</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowPurchaseModal(false)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setShowPurchaseModal(false);
                      // Aquí se conectaría con el sistema de compras
                      alert('Proceso de compra iniciado. Te contactaremos pronto.');
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Virtual Visit Modal */}
        <AnimatePresence>
          {showVisitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6"
              onClick={() => setShowVisitModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-[98vw] sm:max-w-[95vw] md:max-w-md w-full max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif font-bold text-primary mb-2">
                    Agendar Visita Virtual
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-secondary leading-relaxed">
                    Programa una visita virtual en tiempo real con nuestro equipo
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Fecha preferida
                    </label>
                    <input
                      type="date"
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Hora preferida
                    </label>
                    <select className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Comentarios adicionales
                    </label>
                    <textarea
                      rows={3}
                      placeholder="¿Hay algo específico que te gustaría ver?"
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 lg:space-x-3">
                  <button
                    onClick={() => setShowVisitModal(false)}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-border text-primary rounded-lg hover:bg-muted transition-colors text-xs sm:text-sm md:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setShowVisitModal(false);
                      alert('Visita virtual agendada. Te enviaremos los detalles por email.');
                    }}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-xs sm:text-sm md:text-base"
                  >
                    Agendar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-[98vw] sm:max-w-[95vw] md:max-w-md w-full max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-accent" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif font-bold text-primary mb-2">
                    Contactar Asesor
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-secondary leading-relaxed">
                    Nuestro equipo de expertos está listo para ayudarte
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder={t('property.namePlaceholder')}
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 lg:space-x-3">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-border text-primary rounded-lg hover:bg-muted transition-colors text-xs sm:text-sm md:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      alert('Mensaje enviado. Te contactaremos en las próximas 24 horas.');
                    }}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-xs sm:text-sm md:text-base"
                  >
                    Enviar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
