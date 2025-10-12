'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mountain, Calendar, Utensils, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import TourismAttractions from './TourismAttractions';
import TourismEvents from './TourismEvents';
import TourismCuisine from './TourismCuisine';

const TourismSection = () => {
  const [activeTab, setActiveTab] = useState('attractions');
  const { t } = useLanguage();

  const tabs = [
    { id: 'attractions', label: t('tourism.attractions'), icon: Mountain },
    { id: 'events', label: t('tourism.events'), icon: Calendar },
    { id: 'cuisine', label: t('tourism.cuisine'), icon: Utensils }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attractions':
        return <TourismAttractions />;
      case 'events':
        return <TourismEvents />;
      case 'cuisine':
        return <TourismCuisine />;
      default:
        return <TourismAttractions />;
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