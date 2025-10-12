'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const TourismEvents = () => {
  const { t } = useLanguage();

  const culturalEvents = [
    {
      id: 1,
      name: t('tourism.kusatsuOnsenFestival'),
      date: t('tourism.august'),
      description: t('tourism.kusatsuOnsenFestivalDescription'),
      image: "/images/onsen.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1550951109-c317990b7e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.festival'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 2,
      name: t('tourism.teaCeremony'),
      description: t('tourism.teaCeremonyDescription'),
      image: "/images/TeaCeremony-v2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.culture'),
      date: t('tourism.allYear'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 3,
      name: t('tourism.traditionalMarket'),
      description: t('tourism.traditionalMarketDescription'),
      image: "/images/TraditionalMarket-v2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.market'),
      date: t('tourism.weekends'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {culturalEvents.map((event) => (
        <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            {event.link ? (
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <OptimizedImage 
                  src={event.image} 
                  fallbackSrc={event.fallbackImage}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  fill
                />
              </a>
            ) : (
              <OptimizedImage 
                src={event.image} 
                fallbackSrc={event.fallbackImage}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                fill
              />
            )}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
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
            <a 
              href={event.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/btn flex items-center space-x-1 text-gray-800 hover:text-primary transition-colors duration-200 font-medium"
            >
              <span>More information</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourismEvents;
