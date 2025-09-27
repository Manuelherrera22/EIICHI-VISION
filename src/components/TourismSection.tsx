'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Mountain, 
  Waves, 
  Camera, 
  MapPin, 
  Calendar, 
  Utensils, 
  Heart,
  Star,
  ArrowRight,
  Play,
  Users,
  Clock
} from 'lucide-react';

// Componente de imagen optimizada con fallback
const OptimizedImage = ({ src, fallbackSrc, alt, className, ...props }: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <Camera size={24} className="text-gray-400" />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
};

const TourismSection = () => {
  const [activeTab, setActiveTab] = useState('attractions');

  const attractions = [
    {
      id: 1,
      name: "Kusatsu Onsen",
      description: "Uno de los onsen más famosos de Japón, con aguas termales de 95°C",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Onsen",
      rating: 4.9,
      distance: "5 min"
    },
    {
      id: 2,
      name: "Monte Shirane",
      description: "Volcán activo con cráter de azufre y vistas espectaculares",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1464822759844-d150baec5b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Naturaleza",
      rating: 4.8,
      distance: "30 min"
    },
    {
      id: 3,
      name: "Templo Zenko-ji",
      description: "Templo budista histórico con arquitectura tradicional",
      image: "https://images.unsplash.com/photo-1542640244-a3d2c4b0a0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Cultura",
      rating: 4.7,
      distance: "15 min"
    },
    {
      id: 4,
      name: "Parque Nacional Joshin'etsukogen",
      description: "Reserva natural con senderos, cascadas y fauna local",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Naturaleza",
      rating: 4.9,
      distance: "45 min"
    }
  ];

  const culturalEvents = [
    {
      id: 1,
      name: "Festival de Kusatsu Onsen",
      date: "Agosto",
      description: "Celebración tradicional con danzas, música y comida local",
      image: "https://images.unsplash.com/photo-1550951109-c317990b7e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1550951109-c317990b7e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Festival"
    },
    {
      id: 2,
      name: "Ceremonia del Té",
      description: "Experiencia auténtica de ceremonia del té japonesa",
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Cultura",
      date: "Todo el año"
    },
    {
      id: 3,
      name: "Mercado Tradicional",
      description: "Productos locales, artesanías y delicias regionales",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Mercado",
      date: "Fines de semana"
    }
  ];

  const localCuisine = [
    {
      id: 1,
      name: "Soba de Gunma",
      description: "Fideos de trigo sarraceno tradicionales de la región",
      image: "https://images.unsplash.com/photo-1582210256130-6d2f001f7d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1582210256130-6d2f001f7d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Plato Principal"
    },
    {
      id: 2,
      name: "Manju de Kusatsu",
      description: "Dulces tradicionales rellenos de pasta de frijol rojo",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Postre"
    },
    {
      id: 3,
      name: "Sake Local",
      description: "Sake artesanal elaborado con agua pura de montaña",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: "Bebida"
    }
  ];

  const tabs = [
    { id: 'attractions', label: 'Atracciones', icon: Mountain },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'cuisine', label: 'Gastronomía', icon: Utensils }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attractions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage 
                    src={attraction.image} 
                    fallbackSrc={attraction.fallbackImage}
                    alt={attraction.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {attraction.type}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span>{attraction.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-serif font-bold text-primary">{attraction.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{attraction.distance}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{attraction.description}</p>
                  <button className="group/btn flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200">
                    <span className="font-semibold">Explorar</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'events':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalEvents.map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-40 overflow-hidden">
                  <OptimizedImage 
                    src={event.image} 
                    fallbackSrc={event.fallbackImage}
                    alt={event.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar size={16} className="text-accent" />
                    <span className="text-sm font-semibold text-accent">{event.date}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-primary mb-3">{event.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
                  <button className="group/btn flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200">
                    <span className="font-semibold text-sm">Más información</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'cuisine':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localCuisine.map((food) => (
              <div key={food.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-40 overflow-hidden">
                  <OptimizedImage 
                    src={food.image} 
                    fallbackSrc={food.fallbackImage}
                    alt={food.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {food.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-primary mb-3">{food.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{food.description}</p>
                  <button className="group/btn flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200">
                    <span className="font-semibold text-sm">Probar</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Mountain size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Descubre Gunma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Turismo en Gunma
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Explora la rica cultura, naturaleza espectacular y experiencias únicas que hacen de Gunma un destino incomparable para vivir e invertir.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-primary hover:bg-primary/10 border border-primary/20'
                }`}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mb-12">
          {renderContent()}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">
              ¿Listo para vivir en Gunma?
            </h3>
            <p className="text-lg text-secondary mb-6 leading-relaxed">
              Descubre cómo puedes ser parte de esta comunidad única mientras inviertes en el futuro de Japón.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="group bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold text-lg flex items-center space-x-2 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Iniciar mi Proyecto</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a 
                href="/projects" 
                className="group border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-lg flex items-center space-x-2 justify-center"
              >
                <span>Ver Propiedades</span>
                <MapPin size={20} className="group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
