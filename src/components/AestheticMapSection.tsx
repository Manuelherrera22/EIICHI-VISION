'use client';

import React from 'react';
import { MapPin, Clock, Train, Mountain } from 'lucide-react';
import SimpleGoogleMap from './SimpleGoogleMap';
import { MAPS_CONFIG } from '@/config/maps';
import { useLanguage } from '@/contexts/LanguageContext';

const AestheticMapSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-muted via-white to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <MapPin size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">{t('map.strategicLocation')}</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
            {t('map.inTheHeartOf')}
          </h2>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('map.gunmaDescription')}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Map */}
          <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/20">
            <SimpleGoogleMap
              center={MAPS_CONFIG.LOCATIONS.KUSATSU}
              zoom={9}
              markers={[
                {
                  position: MAPS_CONFIG.LOCATIONS.KUSATSU,
                  title: t('map.kusatsuOnsen'),
                  info: t('map.kusatsuOnsenInfo')
                },
                {
                  position: MAPS_CONFIG.LOCATIONS.TOKYO,
                  title: t('map.tokyo'),
                  info: t('map.tokyoInfo')
                },
                {
                  position: MAPS_CONFIG.LOCATIONS.NAGANO,
                  title: t('map.nagano'),
                  info: t('map.naganoInfo')
                }
              ]}
              className="h-full"
            />
            
            {/* Map Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Info Cards - Hidden on mobile */}
          <div className="hidden lg:block absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mountain size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary">{t('map.gunmaPrefecture')}</h3>
                <p className="text-sm text-secondary">{t('map.prefectureMountains')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-accent" />
                <span className="text-sm text-secondary">{t('map.threeHoursTokyo')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Train size={16} className="text-accent" />
                <span className="text-sm text-secondary">{t('map.directTrainAccess')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm text-secondary">{t('map.centerHonshu')}</span>
              </div>
            </div>
          </div>

          {/* Distance Info - Hidden on mobile */}
          <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/20">
            <h3 className="font-serif font-bold text-primary mb-4">{t('map.keyDistances')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-secondary">{t('map.tokyo')}</span>
                </div>
                <span className="font-semibold text-primary">3h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-secondary">{t('map.nagano')}</span>
                </div>
                <span className="font-semibold text-primary">1h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-secondary">{t('map.osaka')}</span>
                </div>
                <span className="font-semibold text-primary">4h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mountain size={32} className="text-primary" />
            </div>
            <h3 className="font-serif font-bold text-primary mb-2">{t('map.sacredMountains')}</h3>
            <p className="text-secondary">
              {t('map.sacredMountainsDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Train size={32} className="text-accent" />
            </div>
            <h3 className="font-serif font-bold text-primary mb-2">{t('map.perfectConnectivity')}</h3>
            <p className="text-secondary">
              {t('map.perfectConnectivityDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-green-500" />
            </div>
            <h3 className="font-serif font-bold text-primary mb-2">{t('map.strategicLocationTitle')}</h3>
            <p className="text-secondary">
              {t('map.strategicLocationDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AestheticMapSection;
