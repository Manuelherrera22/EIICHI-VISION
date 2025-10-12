'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const TourismAttractions = () => {
  const { t } = useLanguage();

  const attractions = [
    {
      id: 1,
      name: t('tourism.kusatsuOnsen'),
      description: t('tourism.kusatsuOnsenDescription'),
      image: "/images/onsen.jpg",
      fallbackImage: "/images/kouji-tsuru-KdkXttOEaYg-unsplash.jpg",
      type: t('tourism.onsen'),
      rating: 4.9,
      distance: "5 min",
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 2,
      name: t('tourism.mountShirane'),
      description: t('tourism.mountShiraneDescription'),
      image: "/images/monte-shirane.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: t('tourism.mountain'),
      rating: 4.8,
      distance: "30 min",
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 3,
      name: t('tourism.zenkojiTemple'),
      description: t('tourism.templeDescription'),
      image: "/images/templo.jpg",
      fallbackImage: "/images/templo.jpg",
      type: t('tourism.temple'),
      rating: 4.7,
      distance: "15 min",
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 4,
      name: t('tourism.joshinetsukogenPark'),
      description: t('tourism.joshinetsukogenParkDescription'),
      image: "/images/parque-nacional.jpg",
      fallbackImage: "/images/ikarovski-rld1TAi9gpc-unsplash.jpg",
      type: t('tourism.nature'),
      rating: 4.9,
      distance: "45 min",
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {attractions.map((attraction) => (
        <div key={attraction.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative h-64 overflow-hidden">
            {attraction.link ? (
              <a 
                href={attraction.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <OptimizedImage 
                  src={attraction.image} 
                  fallbackSrc={attraction.fallbackImage}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  fill
                />
              </a>
            ) : (
              <OptimizedImage 
                src={attraction.image} 
                fallbackSrc={attraction.fallbackImage}
                alt={attraction.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                fill
              />
            )}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
              {attraction.type}
            </div>
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span>{attraction.rating}</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-serif font-bold text-primary mb-3">{attraction.name}</h3>
            <p className="text-gray-600 mb-4 text-base leading-relaxed">{attraction.description}</p>
            <div className="flex items-center justify-end space-x-2 text-primary mb-4">
              <MapPin size={16} className="text-accent" />
              <span className="text-sm font-semibold text-accent">{attraction.distance}</span>
            </div>
            <a 
              href={attraction.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/btn flex items-center space-x-1 text-gray-800 hover:text-primary transition-colors duration-200 font-medium"
            >
              <span>Explorar</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourismAttractions;
