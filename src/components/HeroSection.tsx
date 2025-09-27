'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>
                {/* Video Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Japanese Characters */}
        <div className="mb-8">
          <div className="text-6xl sm:text-8xl font-serif text-white/20 mb-4">
            間
          </div>
          <div className="text-sm text-white/60 font-mono tracking-wider">
            MA - The Space Between
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          Build Your Future.
          <br />
          <span className="text-accent">Honor The Past.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Invest in Japan's heritage homes, guided by the legacy of a visionary. 
          Transform akiya properties in Gunma into valuable assets and dream homes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/projects"
            className="group bg-white text-primary px-8 py-4 rounded-full hover:bg-accent hover:text-white transition-all duration-300 font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Descubre los Proyectos</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <button className="group flex items-center space-x-2 text-white hover:text-accent transition-colors duration-300">
            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <Play size={16} className="ml-1" />
            </div>
            <span className="font-medium">Ver Nuestra Historia</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-white/20 font-serif text-2xl animate-pulse">
        論語
      </div>
      <div className="absolute top-32 right-16 text-white/20 font-serif text-2xl animate-pulse delay-1000">
        算盤
      </div>
      <div className="absolute bottom-32 left-20 text-white/20 font-serif text-xl animate-pulse delay-2000">
        合本主義
      </div>
    </section>
  );
};

export default HeroSection;
