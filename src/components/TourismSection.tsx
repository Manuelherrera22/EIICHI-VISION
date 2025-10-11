'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  const attractions = [
    {
      id: 1,
      name: t('tourism.kusatsuOnsen'),
      description: t('tourism.kusatsuOnsenDescription'),
      image: "/images/kouji-tsuru-KdkXttOEaYg-unsplash.jpg", // Real onsen image
      fallbackImage: "/images/kouji-tsuru-TSzPcfyZd_M-unsplash.jpg",
      type: t('tourism.onsen'),
      rating: 4.9,
      distance: "5 min"
    },
    {
      id: 2,
      name: t('tourism.mountShirane'),
      description: t('tourism.mountShiraneDescription'),
      image: "/images/monte shirane.jpg", // Real Monte Shirane with snow
      fallbackImage: "/images/geoff-oliver-6KNPp4ifLn4-unsplash.jpg",
      type: t('tourism.nature'),
      rating: 4.8,
      distance: "30 min"
    },
    {
      id: 3,
      name: t('tourism.zenkojiTemple'),
      description: t('tourism.zenkojiTempleDescription'),
      image: "/images/cheung-gnaiq-GXXSL9dkwis-unsplash.jpg", // Traditional Japanese architecture
      fallbackImage: "/images/cheung-gnaiq-GXXSL9dkwis-unsplash.jpg",
      type: t('tourism.culture'),
      rating: 4.7,
      distance: "15 min"
    },
    {
      id: 4,
      name: t('tourism.joshinetsukogenPark'),
      description: t('tourism.joshinetsukogenParkDescription'),
      image: "/images/parque nacional.jpg", // Real Parque Nacional Joshinetsu Kogen
      fallbackImage: "/images/ikarovski-rld1TAi9gpc-unsplash.jpg",
      type: t('tourism.nature'),
      rating: 4.9,
      distance: "45 min"
    }
  ];

  const culturalEvents = [
    {
      id: 1,
      name: t('tourism.kusatsuOnsenFestival'),
      date: t('tourism.august'),
      description: t('tourism.kusatsuOnsenFestivalDescription'),
      image: "https://images.unsplash.com/photo-1550951109-c317990b7e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1550951109-c317990b7e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.festival')
    },
    {
      id: 2,
      name: t('tourism.teaCeremony'),
      description: t('tourism.teaCeremonyDescription'),
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.culture'),
      date: t('tourism.allYear')
    },
    {
      id: 3,
      name: t('tourism.traditionalMarket'),
      description: t('tourism.traditionalMarketDescription'),
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.market'),
      date: t('tourism.weekends')
    }
  ];

  const localCuisine = [
    {
      id: 1,
      name: t('tourism.gunmaSoba'),
      description: t('tourism.gunmaSobaDescription'),
      image: "https://images.unsplash.com/photo-1582210256130-6d2f001f7d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1582210256130-6d2f001f7d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.mainDish')
    },
    {
      id: 2,
      name: t('tourism.kusatsuManju'),
      description: t('tourism.kusatsuManjuDescription'),
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.dessert')
    },
    {
      id: 3,
      name: t('tourism.localSake'),
      description: t('tourism.localSakeDescription'),
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.drink')
    }
  ];

  const tabs = [
    { id: 'attractions', label: t('tourism.attractions'), icon: Mountain },
    { id: 'events', label: t('tourism.events'), icon: Calendar },
    { id: 'cuisine', label: t('tourism.cuisine'), icon: Utensils }
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
                    <span className="font-semibold">{t('tourism.explore')}</span>
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
                    <span className="font-semibold text-sm">{t('tourism.moreInformation')}</span>
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
                    <span className="font-semibold text-sm">{t('tourism.try')}</span>
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
            <span className="text-sm font-medium text-primary">{t('tourism.discoverGunma')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {t('tourism.tourismInGunma')}
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('tourism.tourismDescription')}
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
                    ? 'bg-primary text-black shadow-lg'
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
              {t('tourism.readyToLiveInGunma')}
            </h3>
            <p className="text-lg text-secondary mb-6 leading-relaxed">
              {t('tourism.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="group bg-primary text-black px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold text-lg flex items-center space-x-2 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>{t('tourism.startMyProject')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <Link 
                href="/projects" 
                className="group border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-all duration-300 font-semibold text-lg flex items-center space-x-2 justify-center"
              >
                <span>{t('tourism.viewProperties')}</span>
                <MapPin size={20} className="group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
