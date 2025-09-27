'use client';

import React from 'react';
import { MapPin, Clock, Train, Mountain } from 'lucide-react';
import SimpleGoogleMap from './SimpleGoogleMap';
import { MAPS_CONFIG } from '@/config/maps';

const AestheticMapSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted via-white to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <MapPin size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Ubicación Estratégica</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
            En el Corazón de
            <br />
            <span className="text-accent">Japón</span>
          </h2>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Gunma Prefecture, donde la tradición se encuentra con la modernidad. 
            Una ubicación privilegiada que conecta el pasado con el futuro.
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
                  title: 'Kusatsu Onsen',
                  info: 'Famosos baños termales de Kusatsu, reconocidos mundialmente por sus propiedades curativas.'
                },
                {
                  position: MAPS_CONFIG.LOCATIONS.TOKYO,
                  title: 'Tokio',
                  info: 'Capital de Japón - 3 horas en tren desde Kusatsu'
                },
                {
                  position: MAPS_CONFIG.LOCATIONS.NAGANO,
                  title: 'Nagano',
                  info: 'Ciudad histórica - 1 hora en tren desde Kusatsu'
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
                <h3 className="font-serif font-bold text-primary">Gunma Prefecture</h3>
                <p className="text-sm text-secondary">Prefectura de montañas y aguas termales</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-accent" />
                <span className="text-sm text-secondary">3 horas a Tokio</span>
              </div>
              <div className="flex items-center space-x-3">
                <Train size={16} className="text-accent" />
                <span className="text-sm text-secondary">Acceso directo en tren</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm text-secondary">Centro de Honshu</span>
              </div>
            </div>
          </div>

          {/* Distance Info - Hidden on mobile */}
          <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/20">
            <h3 className="font-serif font-bold text-primary mb-4">Distancias Clave</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-secondary">Tokio</span>
                </div>
                <span className="font-semibold text-primary">3h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-secondary">Nagano</span>
                </div>
                <span className="font-semibold text-primary">1h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-secondary">Osaka</span>
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
            <h3 className="font-serif font-bold text-primary mb-2">Montañas Sagradas</h3>
            <p className="text-secondary">
              Rodeado por las montañas de Gunma, un paisaje que inspira tranquilidad y conexión con la naturaleza.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Train size={32} className="text-accent" />
            </div>
            <h3 className="font-serif font-bold text-primary mb-2">Conectividad Perfecta</h3>
            <p className="text-secondary">
              Acceso directo a las principales ciudades de Japón a través de la red ferroviaria de alta velocidad.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-green-500" />
            </div>
            <h3 className="font-serif font-bold text-primary mb-2">Ubicación Estratégica</h3>
            <p className="text-secondary">
              En el centro de Honshu, equidistante de las principales metrópolis y regiones turísticas de Japón.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AestheticMapSection;
