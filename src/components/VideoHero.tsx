'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import VideoBackground from './VideoBackground';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background HD */}
      <div className="absolute inset-0">
        <VideoBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
        {/* Japanese Characters */}
        <div className="mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-white/20 mb-2 sm:mb-4">
            間
          </div>
          <div className="text-xs sm:text-sm text-white/60 font-mono tracking-wider">
            {t('videoHero.maSpaceBetween')}
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl px-2">
          {t('videoHero.discoverTreasures')}
          <br className="block sm:hidden" />
          <br className="hidden sm:block" />
          <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            {t('videoHero.createLegacy')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-5xl mx-auto leading-relaxed font-light drop-shadow-lg px-4">
          {t('videoHero.transformHomes')}
          <br className="hidden sm:block" />
          {t('videoHero.experienceJapan')}
        </p>

        {/* CTA Buttons Premium */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4 max-w-2xl mx-auto">
          <a 
            href="/projects" 
            className="group bg-white/95 text-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-bold text-base sm:text-lg md:text-xl flex items-center space-x-2 sm:space-x-3 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-white/20 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[56px]"
          >
            <span>{t('videoHero.startJourney')}</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <button 
            onClick={() => {
              const element = document.querySelector('#legacy-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center space-x-2 sm:space-x-3 text-white hover:text-accent transition-all duration-300 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[56px]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300 backdrop-blur-sm bg-white/10">
              <Play size={14} className="ml-0.5 sm:ml-1 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-semibold text-sm sm:text-base md:text-lg">{t('videoHero.watchStory')}</span>
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

export default VideoHero;
