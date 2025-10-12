'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const TourismCuisine = () => {
  const { t } = useLanguage();

  const localCuisine = [
    {
      id: 1,
      name: t('tourism.gunmaSoba'),
      description: t('tourism.gunmaSobaDescription'),
      image: "/images/gunma-soba-v2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1582210256130-6d2f001f7d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.mainDish'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 2,
      name: t('tourism.kusatsuManju'),
      description: t('tourism.kusatsuManjuDescription'),
      image: "/images/kutasu-manju-v2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.dessert'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    },
    {
      id: 3,
      name: t('tourism.localSake'),
      description: t('tourism.localSakeDescription'),
      image: "/images/Localsake-v2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
      type: t('tourism.drink'),
      link: "https://www.hankyu-travel.com/guide/kanto/gunma/kusatsu.php"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {localCuisine.map((food) => (
        <div key={food.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            {food.link ? (
              <a 
                href={food.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <OptimizedImage 
                  src={food.image} 
                  fallbackSrc={food.fallbackImage}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  fill
                />
              </a>
            ) : (
              <OptimizedImage 
                src={food.image} 
                fallbackSrc={food.fallbackImage}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                fill
              />
            )}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
              {food.type}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-serif font-bold text-primary mb-3">{food.name}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{food.description}</p>
            <a 
              href={food.link} 
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

export default TourismCuisine;
