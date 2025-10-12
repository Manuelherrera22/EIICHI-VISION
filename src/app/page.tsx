'use client';

import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import VideoHero from '@/components/VideoHero';
import LegacySection from '@/components/LegacySection';
import FeaturedProjects from '@/components/FeaturedProjects';
import AestheticMapSection from '@/components/AestheticMapSection';
import PhilosophySection from '@/components/PhilosophySection';
import TourismSection from '@/components/TourismSection';
import AnimatedSection from '@/components/AnimatedSection';
import DebugModelViewer from '@/components/DebugModelViewer';
import RealPropertiesSection from '@/components/RealPropertiesSection';
import JNIStrategicAlliance from '@/components/JNIStrategicAlliance';
import QASection from '@/components/QASection';
import { Sparkles, Camera, Settings, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load heavy components
const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  loading: () => <div className="h-96 bg-muted rounded-2xl animate-pulse"></div>
});

const VirtualTour = dynamic(() => import('@/components/VirtualTour'), {
  loading: () => <div className="h-96 bg-muted rounded-2xl animate-pulse"></div>
});

const AIChat = dynamic(() => import('@/components/AIChat'), {
  loading: () => <div className="h-32 bg-muted rounded-2xl animate-pulse"></div>
});


export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero con Video Cinematográfico */}
      <VideoHero />
      
      {/* Alianza Estratégica JNI Properties */}
      <AnimatedSection delay={0.2}>
        <JNIStrategicAlliance />
      </AnimatedSection>
      
      {/* Sección Legacy con Animaciones */}
      <AnimatedSection delay={0.4}>
        <LegacySection />
      </AnimatedSection>
      
      {/* Propiedades Reales con Análisis IA */}
      <AnimatedSection delay={0.6}>
        <RealPropertiesSection />
      </AnimatedSection>
      
      {/* Calculadora de ROI */}
      <AnimatedSection delay={0.8}>
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                {t('roi.title')}
              </h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                {t('roi.subtitle')}
              </p>
            </div>
            <ROICalculator />
          </div>
        </section>
      </AnimatedSection>
      
      {/* Experiencia 3D Premium */}
      <AnimatedSection delay={1.0}>
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium text-primary">✨ {t('3d.premium')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-3 sm:mb-4">
                {t('3d.title')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto px-4">
                {t('3d.subtitle')}
              </p>
            </div>
            
            <DebugModelViewer />
            
            {/* CTA después del visualizador */}
            <div className="mt-8 sm:mt-10 md:mt-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/20">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary mb-3 sm:mb-4">
                  {t('3d.likeWhatYouSee')}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-secondary mb-4 sm:mb-6 max-w-3xl mx-auto px-4">
                  {t('3d.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
                  <a 
                    href="/contact" 
                    className="bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-base sm:text-lg flex items-center space-x-2 justify-center min-h-[48px] sm:min-h-[56px]"
                  >
                    <span>{t('3d.startProject')}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <Link 
                    href="/projects" 
                    className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary hover:text-black transition-colors duration-300 font-semibold text-base sm:text-lg justify-center min-h-[48px] sm:min-h-[56px] flex items-center"
                  >
                    {t('3d.viewMoreProjects')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Sección de Turismo */}
      <AnimatedSection delay={1.2}>
        <TourismSection />
      </AnimatedSection>
      
      {/* Mapa Estético */}
      <AnimatedSection delay={1.4}>
        <AestheticMapSection />
      </AnimatedSection>
      
      {/* Filosofía */}
      <AnimatedSection delay={1.6}>
        <PhilosophySection />
      </AnimatedSection>
      
      {/* Chat de IA */}
      <AIChat />
      
      {/* Blueprint Digital Ecosystem */}
      <AnimatedSection delay={1.8}>
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-primary font-medium">Blueprint Digital</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                {t('blueprint.title')}
              </h2>
              <p className="text-xl text-secondary max-w-4xl mx-auto mb-8">
                {t('blueprint.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: t('blueprint.visionPortal'),
                  description: t('blueprint.visionDescription'),
                  icon: Sparkles,
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  title: t('blueprint.augmentedReality'),
                  description: t('blueprint.arDescription'),
                  icon: Camera,
                  color: 'from-blue-600 to-blue-700'
                },
                {
                  title: t('blueprint.designTable'),
                  description: t('blueprint.designDescription'),
                  icon: Settings,
                  color: 'from-purple-600 to-purple-700'
                },
                {
                  title: t('blueprint.controlCenter'),
                  description: t('blueprint.controlDescription'),
                  icon: HomeIcon,
                  color: 'from-green-600 to-green-700'
                }
              ].map((feature, index) => (
                <motion.a
                  key={index}
                  href="/blueprint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 group shadow-lg cursor-pointer block hover:scale-105"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-full mb-4 shadow-lg ring-2 ring-white/20`}>
                    <feature.icon className="w-7 h-7 text-black drop-shadow-lg filter brightness-110" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-secondary text-sm">
                    {feature.description}
                  </p>
                </motion.a>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm max-w-4xl mx-auto">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  {t('blueprint.readyForFuture')}
                </h3>
                <p className="text-secondary mb-6">
                  {t('blueprint.futureDescription')}
                </p>
                <a
                  href="/blueprint"
                  className="inline-flex items-center space-x-2 bg-primary text-black px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 font-semibold text-lg"
                >
                  <span>{t('blueprint.exploreBlueprint')}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Q&A Section */}
      <QASection />
    </Layout>
  );
}