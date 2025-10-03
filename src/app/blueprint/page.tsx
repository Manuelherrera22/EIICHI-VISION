'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import BlueprintPortal from '@/components/BlueprintPortal';
import ARPropertyViewer from '@/components/ARPropertyViewer';
import InteractiveDesignTable from '@/components/InteractiveDesignTable';
import ProjectControlCenter from '@/components/ProjectControlCenter';
import ClientOnly from '@/components/ClientOnly';
import { useSafeLanguage } from '@/hooks/useSafeLanguage';
import { 
  Sparkles, 
  Camera, 
  Home as HomeIcon, 
  Settings, 
  Eye, 
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share,
  Bell,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Image,
  Video,
  MessageSquare,
  Wrench,
  Hammer,
  Paintbrush,
  TreePine,
  Zap,
  Shield,
  Star,
  Maximize2,
  Minimize2,
  RefreshCw,
  Layers,
  Grid,
  Lightbulb,
  Waves,
  Mountain,
  Wand2,
  MousePointer,
  Square,
  Circle,
  Triangle,
  Minus,
  Plus,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Copy,
  Trash2,
  Lock,
  Unlock,
  EyeOff,
  Check,
  X,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

type BlueprintPhase = 'portal' | 'ar' | 'design' | 'control';

const BlueprintEcosystem = () => {
  const [currentPhase, setCurrentPhase] = useState<BlueprintPhase>('portal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useSafeLanguage();

  const phases = [
    {
      id: 'portal',
      title: t('blueprint.visionPortal'),
      subtitle: t('blueprint.coCreateVision'),
      description: t('blueprint.interactiveOnboarding'),
      icon: Sparkles,
      color: 'from-accent to-accent/80',
      bgColor: 'bg-muted'
    },
    {
      id: 'ar',
      title: t('blueprint.augmentedReality'),
      subtitle: t('blueprint.propertyVisits20'),
      description: t('blueprint.arDescription'),
      icon: Camera,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-muted'
    },
    {
      id: 'design',
      title: t('blueprint.designTable'),
      subtitle: t('blueprint.realTimeCoDesign'),
      description: t('blueprint.designDescription'),
      icon: Settings,
      color: 'from-accent to-accent/80',
      bgColor: 'bg-muted'
    },
    {
      id: 'control',
      title: t('blueprint.controlCenter'),
      subtitle: t('blueprint.totalProjectControl'),
      description: t('blueprint.controlDescription'),
      icon: HomeIcon,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-muted'
    }
  ];

  const currentPhaseData = phases.find(phase => phase.id === currentPhase);

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'portal':
        return <BlueprintPortal />;
      case 'ar':
        return (
          <ARPropertyViewer 
            property={{
              id: 'demo-property',
              title: t('blueprint.traditionalJapaneseHouse'),
              location: 'Kusatsu, Gunma',
              currentImages: ['/api/placeholder/400/300'],
              renderOptions: [
                {
                  id: 'original',
                  name: t('blueprint.originalState'),
                  description: 'Vista actual de la propiedad',
                  image: '/api/placeholder/400/300',
                  features: ['Estructura original', 'Materiales tradicionales']
                },
                {
                  id: 'renovated',
                  name: t('blueprint.modernRenovation'),
                  description: 'Propiedad renovada con comodidades modernas',
                  image: '/api/placeholder/400/300',
                  features: ['Cocina moderna', 'Baño actualizado', 'Aislamiento mejorado']
                },
                {
                  id: 'luxury',
                  name: t('blueprint.traditionalLuxury'),
                  description: 'Renovación de lujo manteniendo la tradición',
                  image: '/api/placeholder/400/300',
                  features: ['Materiales premium', 'Diseño exclusivo', 'Tecnología integrada']
                }
              ]
            }}
            onClose={() => setCurrentPhase('portal')}
          />
        );
      case 'design':
        return <InteractiveDesignTable />;
      case 'control':
        return <ProjectControlCenter />;
      default:
        return <BlueprintPortal />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-border p-3 sm:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link href="/" className="text-primary hover:text-accent transition-colors font-medium text-sm">
                <ClientOnly fallback="← Back">
                  ← {t('common.back')}
                </ClientOnly>
              </Link>
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                <Link href="/projects" className="text-secondary hover:text-primary transition-colors">
                  {t('navigation.projects')}
                </Link>
                <Link href="/process" className="text-secondary hover:text-primary transition-colors">
                  {t('navigation.process')}
                </Link>
                <Link href="/journal" className="text-secondary hover:text-primary transition-colors">
                  {t('navigation.journal')}
                </Link>
                <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
                  {t('navigation.contact')}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 bg-accent/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-primary text-xs sm:text-sm">{t('blueprint.activeSystem')}</span>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-primary">
                {t('blueprint.title')}
              </h1>
              <p className="text-secondary text-xs sm:text-sm">
                Ecosistema Tabiji House
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id as BlueprintPhase)}
                className={`flex items-center space-x-2 sm:space-x-3 py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap min-w-0 ${
                  currentPhase === phase.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                <phase.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{phase.title}</p>
                  <p className="text-xs opacity-70 truncate hidden sm:block">{phase.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Phase Description */}
      <div className="bg-muted border-b border-border p-3 sm:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`p-2 sm:p-3 rounded-full bg-gradient-to-r ${currentPhaseData?.color} flex-shrink-0`}>
              {currentPhaseData?.icon && <currentPhaseData.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-primary">
                {currentPhaseData?.title}
              </h2>
              <p className="text-secondary text-sm sm:text-base">
                {currentPhaseData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPhase()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          {phases.map((phase, index) => (
            <motion.button
              key={phase.id}
              onClick={() => setCurrentPhase(phase.id as BlueprintPhase)}
              className={`p-3 sm:p-4 rounded-full shadow-lg transition-all ${
                currentPhase === phase.id
                  ? 'bg-yellow-400 text-black shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-xl'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <phase.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-border p-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-secondary text-sm">
            &copy; {new Date().getFullYear()} Tabiji House. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlueprintEcosystem;