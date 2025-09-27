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
import { Sparkles, Camera, Settings, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

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
  return (
    <Layout>
      {/* Hero con Video Cinematográfico */}
      <VideoHero />
      
      {/* Sección Legacy con Animaciones */}
      <AnimatedSection delay={0.2}>
        <LegacySection />
      </AnimatedSection>
      
      {/* Proyectos Destacados */}
      <AnimatedSection delay={0.4}>
        <FeaturedProjects />
      </AnimatedSection>
      
      {/* Calculadora de ROI */}
      <AnimatedSection delay={0.6}>
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                Calcula tu Inversión
              </h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                Descubre el potencial de retorno de tu inversión en propiedades japonesas
              </p>
            </div>
            <ROICalculator />
          </div>
        </section>
      </AnimatedSection>
      
      {/* Experiencia 3D Premium */}
      <AnimatedSection delay={0.8}>
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium text-primary">✨ Experiencia Premium</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-3 sm:mb-4">
                Navegación 3D Interactiva
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto px-4">
                Explora cada detalle de nuestras casas tradicionales japonesas con tecnología 3D de última generación
              </p>
            </div>
            
            <DebugModelViewer />
            
            {/* CTA después del visualizador */}
            <div className="mt-8 sm:mt-10 md:mt-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/20">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary mb-3 sm:mb-4">
                  ¿Te gusta lo que ves?
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-secondary mb-4 sm:mb-6 max-w-3xl mx-auto px-4">
                  Esta es solo una muestra de lo que podemos crear juntos. Cada casa tiene su propia historia esperando ser contada.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
                  <a 
                    href="/contact" 
                    className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-base sm:text-lg flex items-center space-x-2 justify-center min-h-[48px] sm:min-h-[56px]"
                  >
                    <span>Iniciar mi Proyecto</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a 
                    href="/projects" 
                    className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 font-semibold text-base sm:text-lg justify-center min-h-[48px] sm:min-h-[56px] flex items-center"
                  >
                    Ver Más Proyectos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Sección de Turismo */}
      <AnimatedSection delay={1.0}>
        <TourismSection />
      </AnimatedSection>
      
      {/* Mapa Estético */}
      <AnimatedSection delay={1.2}>
        <AestheticMapSection />
      </AnimatedSection>
      
      {/* Filosofía */}
      <AnimatedSection delay={1.4}>
        <PhilosophySection />
      </AnimatedSection>
      
      {/* Chat de IA */}
      <AIChat />
      
      {/* Blueprint Digital Ecosystem */}
      <AnimatedSection delay={1.6}>
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-primary font-medium">Blueprint Digital</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                El Ecosistema del Futuro
              </h2>
              <p className="text-xl text-secondary max-w-4xl mx-auto mb-8">
                No es solo una página web con un tour. Es un ecosistema digital y físico integrado 
                que acompaña al inversor desde la primera chispa de curiosidad hasta que recibe las llaves y más allá.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: 'Portal de Visión',
                  description: 'Onboarding interactivo con matching con IA',
                  icon: Sparkles,
                  color: 'from-accent to-accent/80'
                },
                {
                  title: 'Realidad Aumentada',
                  description: 'Visitas a propiedades 2.0 con tecnología AR',
                  icon: Camera,
                  color: 'from-primary to-primary/80'
                },
                {
                  title: 'Mesa de Diseño',
                  description: 'Co-diseño en tiempo real durante las sesiones',
                  icon: Settings,
                  color: 'from-accent to-accent/80'
                },
                {
                  title: 'Centro de Control',
                  description: 'Control total del proyecto con cámaras en vivo',
                  icon: HomeIcon,
                  color: 'from-primary to-primary/80'
                }
              ].map((feature, index) => (
                <motion.a
                  key={index}
                  href="/blueprint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 group shadow-lg cursor-pointer block hover:scale-105"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-full mb-4 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white drop-shadow-sm" />
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
                  ¿Listo para experimentar el futuro?
                </h3>
                <p className="text-secondary mb-6">
                  Descubre cómo la tecnología de punta transforma la experiencia de inversión en propiedades japonesas
                </p>
                <a
                  href="/blueprint"
                  className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 font-semibold text-lg"
                >
                  <span>Explorar Blueprint Digital</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </Layout>
  );
}
