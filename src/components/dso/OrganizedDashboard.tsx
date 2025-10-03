'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import OrganizedNavigation from './OrganizedNavigation';
import RealtimeMetrics from './RealtimeMetrics';
import SmartAlertsSystem from './SmartAlertsSystem';
import AIPredictions from './AIPredictions';
import ReportExport from './ReportExport';
import Chatbot from './Chatbot';
import GlobalSearch from '../GlobalSearch';
import FavoritesManager from '../FavoritesManager';
import CustomizableDashboard from '../CustomizableDashboard';
import PWAManager from '../PWAManager';
import AdvancedAI from '../AdvancedAI';
import SecurityManager from '../SecurityManager';
import QuickAccess from '../QuickAccess';
import TabijiExportIntegration from '../TabijiExportIntegration';
import PropertyOpportunities from './PropertyOpportunities';
import JNIPartnership from './JNIPartnership';
import {
  BarChart3,
  Bell,
  Brain,
  Download,
  MessageCircle,
  Home,
  TrendingUp,
  Target,
  Shield,
  Users,
  Settings,
  Eye,
  EyeOff,
  Star,
  Zap,
  Activity,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Maximize2,
  Minimize2,
  Layout,
  Grid,
  List,
  Columns,
  Map as MapIcon,
  Building2,
  ArrowLeft,
  Handshake
} from 'lucide-react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  isVisible: boolean;
  order: number;
}

interface OrganizedDashboardProps {
  analysis: any;
  userName: string;
  userEmail: string;
}

const OrganizedDashboard: React.FC<OrganizedDashboardProps> = ({
  analysis,
  userName,
  userEmail
}) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'columns'>('grid');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showFavoritesManager, setShowFavoritesManager] = useState(false);
  const [showCustomizableDashboard, setShowCustomizableDashboard] = useState(false);
  const [showPWAManager, setShowPWAManager] = useState(false);
  const [showAdvancedAI, setShowAdvancedAI] = useState(false);
  const [showSecurityManager, setShowSecurityManager] = useState(false);
  const [showTopoExport, setShowTopoExport] = useState(false);

  const sections: Section[] = [
    // === GRUPO PRINCIPAL: ANÁLISIS CORE ===
    {
      id: 'overview',
      title: t('dashboard.intelligent.title'),
      icon: Home,
      description: t('dashboard.sections.overview.description'),
      color: 'bg-blue-600',
      isVisible: true,
      order: 1
    },
    {
      id: 'metrics',
      title: t('dashboard.intelligent.viewMetrics'),
      icon: BarChart3,
      description: t('dashboard.sections.metrics.description'),
      color: 'bg-green-600',
      isVisible: true,
      order: 2
    },
    {
      id: 'alerts',
      title: t('dashboard.intelligent.alerts'),
      icon: Bell,
      description: t('dashboard.sections.alerts.description'),
      color: 'bg-orange-600',
      isVisible: true,
      order: 3
    },
    {
      id: 'predictions',
      title: t('dashboard.intelligent.predictions'),
      icon: Brain,
      description: t('dashboard.sections.predictions.description'),
      color: 'bg-purple-600',
      isVisible: true,
      order: 4
    },

    // === GRUPO HERRAMIENTAS: PRODUCTIVIDAD ===
    {
      id: 'properties',
      title: t('propertyOpportunities.title'),
      icon: Building2,
      description: t('propertyOpportunities.subtitle'),
      color: 'bg-emerald-600',
      isVisible: true,
      order: 5
    },
    {
      id: 'jni-partnership',
      title: t('jni.partnershipTitle'),
      icon: Handshake,
      description: t('jni.partnershipDescription'),
      color: 'bg-blue-600',
      isVisible: true,
      order: 6
    },
    {
      id: 'search',
      title: t('dashboard.intelligent.openGlobalSearch'),
      icon: Search,
      description: t('quickAccess.searchDescription'),
      color: 'bg-teal-600',
      isVisible: true,
      order: 7
    },
    {
      id: 'favorites',
      title: t('dashboard.intelligent.openFavoritesManager'),
      icon: Star,
      description: t('quickAccess.favoritesDescription'),
      color: 'bg-yellow-600',
      isVisible: true,
      order: 8
    },
    {
      id: 'topoexport',
      title: t('dashboard.intelligent.tabijiExport'),
      icon: MapIcon,
      description: t('dashboard.sections.topoexport.description'),
      color: 'bg-green-600',
      isVisible: true,
      order: 9
    },
    {
      id: 'export',
      title: t('quickAccess.export'),
      icon: Download,
      description: t('quickAccess.exportDescription'),
      color: 'bg-indigo-600',
      isVisible: true,
      order: 10
    },

    // === GRUPO AVANZADO: CONFIGURACIÓN ===
    {
      id: 'customize',
      title: t('dashboard.intelligent.customizeDashboard'),
      icon: Layout,
      description: t('quickAccess.customizeDescription'),
      color: 'bg-pink-600',
      isVisible: false,
      order: 11
    },
    {
      id: 'advanced-ai',
      title: t('dashboard.intelligent.openAdvancedAI'),
      icon: Zap,
      description: t('quickAccess.advancedAIDescription'),
      color: 'bg-violet-600',
      isVisible: false,
      order: 12
    },
    {
      id: 'pwa',
      title: t('dashboard.intelligent.openPWAManager'),
      icon: Shield,
      description: t('dashboard.progressiveApp'),
      color: 'bg-cyan-600',
      isVisible: false,
      order: 12
    },
    {
      id: 'security',
      title: t('dashboard.intelligent.openSecurityCenter'),
      icon: Shield,
      description: t('dashboard.securityMonitoring'),
      color: 'bg-red-600',
      isVisible: false,
      order: 13
    }
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleToggleSection = (sectionId: string) => {
    // Esta función se implementaría para mostrar/ocultar secciones
    console.log('Toggle section:', sectionId);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('dashboard.intelligent.welcome', { userName })}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {t('dashboard.intelligent.description')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {analysis.profileCompleteness}%
                  </div>
                  <div className="text-sm text-gray-600">{t('dashboard.intelligent.profileCompleteness')}</div>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analysis.investmentReadiness.score}%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('dashboard.intelligent.ivi')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.intelligent.iviDescription')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analysis.migrationReadiness.score}%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('dashboard.intelligent.ivm')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.intelligent.ivmDescription')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analysis.lifestyleAlignment.score}%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('dashboard.intelligent.ise')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.intelligent.iseDescription')}</p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.intelligent.quickActions')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <button
                  onClick={() => setActiveSection('metrics')}
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{t('dashboard.intelligent.viewMetrics')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('alerts')}
                  className="flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">{t('dashboard.intelligent.alerts')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('predictions')}
                  className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">{t('dashboard.intelligent.predictions')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('properties')}
                  className="flex items-center space-x-3 p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t('propertyOpportunities.title')}</span>
                </button>
                <button
                  onClick={() => setShowTopoExport(true)}
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <MapIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{t('dashboard.intelligent.tabijiExport')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        );

      case 'metrics':
        return <RealtimeMetrics userId="demo-user" analysis={analysis} />;

      case 'alerts':
        return <SmartAlertsSystem userId="demo-user" analysis={analysis} />;

      case 'predictions':
        return <AIPredictions userId="demo-user" analysis={analysis} />;

      case 'properties':
        return <PropertyOpportunities />;

      case 'jni-partnership':
        return <JNIPartnership />;

      case 'topoexport':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowTopoExport(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <MapIcon className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openTabijiExport')}</span>
            </button>
          </div>
        );

      case 'export':
        return (
          <ReportExport 
            userId="demo-user" 
            analysis={analysis}
            metrics={[]}
            alerts={[]}
            predictions={[]}
            userName={userName}
            userEmail={userEmail}
          />
        );

      case 'search':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowGlobalSearch(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openGlobalSearch')}</span>
            </button>
          </div>
        );

      case 'favorites':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowFavoritesManager(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openFavoritesManager')}</span>
            </button>
          </div>
        );

      case 'customize':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowCustomizableDashboard(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Layout className="w-5 h-5" />
              <span>{t('dashboard.intelligent.customizeDashboard')}</span>
            </button>
          </div>
        );

      case 'pwa':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowPWAManager(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openPWAManager')}</span>
            </button>
          </div>
        );

      case 'advanced-ai':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowAdvancedAI(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openAdvancedAI')}</span>
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="flex items-center justify-center h-96">
            <button
              onClick={() => setShowSecurityManager(true)}
              className="px-6 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>{t('dashboard.intelligent.openSecurityCenter')}</span>
            </button>
          </div>
        );

      default:
        return <div>{t('dashboard.intelligent.sectionNotFound')}</div>;
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Header Responsive */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{t('common.backToHome')}</span>
            </Link>
          </div>
          
          {/* Center Logo - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Image
                  src="/tabijihouse-removebg-preview.png"
                  alt="Tabiji House"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto"
                  priority
                />
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Tabiji House</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{t('dashboard.intelligent.title')} • {userName}</p>
            </div>
            <div className="sm:hidden">
              <div className="flex items-center space-x-2">
                <Image
                  src="/tabijihouse-removebg-preview.png"
                  alt="Tabiji House"
                  width={120}
                  height={45}
                  className="h-8 w-auto"
                  priority
                />
                <h1 className="text-sm font-semibold text-gray-900">Tabiji House</h1>
              </div>
            </div>
          </div>
          
          {/* User Info - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs sm:text-sm font-semibold text-blue-600">
                {userName?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Navigation Sidebar - Responsive */}
        <div className={`
          fixed lg:relative lg:translate-x-0 transition-transform duration-300 z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          w-80 lg:w-80 h-full lg:h-auto
          bg-white lg:bg-transparent
          p-4 lg:p-6
        `}>
          <OrganizedNavigation
            activeSection={activeSection}
            onSectionChange={(sectionId) => {
              handleSectionChange(sectionId);
              setIsMobileMenuOpen(false); // Close mobile menu when section is selected
            }}
            onToggleSection={handleToggleSection}
            sections={sections}
          />
        </div>

        {/* Content Area - Responsive */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot userId="demo-user" analysis={analysis} userName={userName} />

      {/* Quick Access */}
      <QuickAccess
        onOpenSearch={() => setShowGlobalSearch(true)}
        onOpenFavorites={() => setShowFavoritesManager(true)}
        onOpenTabijiExport={() => setShowTopoExport(true)}
        onOpenExport={() => setActiveSection('export')}
        onOpenCustomize={() => setShowCustomizableDashboard(true)}
        onOpenAdvancedAI={() => setShowAdvancedAI(true)}
        onOpenPWA={() => setShowPWAManager(true)}
        onOpenSecurity={() => setShowSecurityManager(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />

      {/* Modals */}
      <GlobalSearch
        isOpen={showGlobalSearch}
        onClose={() => setShowGlobalSearch(false)}
        onNavigate={(url) => {
          console.log('Navigate to:', url);
          setShowGlobalSearch(false);
        }}
      />

      <FavoritesManager
        isOpen={showFavoritesManager}
        onClose={() => setShowFavoritesManager(false)}
        onNavigate={(url) => {
          console.log('Navigate to:', url);
          setShowFavoritesManager(false);
        }}
      />

      <CustomizableDashboard
        isOpen={showCustomizableDashboard}
        onClose={() => setShowCustomizableDashboard(false)}
        onSave={(layout) => {
          console.log('Layout saved:', layout);
          setShowCustomizableDashboard(false);
        }}
      />

      <PWAManager
        isOpen={showPWAManager}
        onClose={() => setShowPWAManager(false)}
      />

      <AdvancedAI
        isOpen={showAdvancedAI}
        onClose={() => setShowAdvancedAI(false)}
        onPredictionSelect={(prediction) => {
          console.log('Prediction selected:', prediction);
          setShowAdvancedAI(false);
        }}
      />

      <SecurityManager
        isOpen={showSecurityManager}
        onClose={() => setShowSecurityManager(false)}
        onSecurityEvent={(event) => {
          console.log('Security event:', event);
        }}
      />

      <TabijiExportIntegration
        isOpen={showTopoExport}
        onClose={() => setShowTopoExport(false)}
        onDataImport={(data) => {
          console.log('TabijiExport data imported:', data);
          // Aquí se integrarían los datos con el sistema principal
        }}
      />
    </div>
  );
};

export default OrganizedDashboard;
