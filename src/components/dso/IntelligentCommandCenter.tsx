'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Users, User, TrendingUp, ArrowRight, BookOpen, Building, 
  DollarSign, Calendar, CheckCircle, MessageCircle, Plus, Search, 
  Filter, Heart, Target, Zap, Clock, Star, Home, Coffee, 
  ShoppingBag, AlertTriangle, TrendingDown, Award, BarChart3,
  FileText, Plane, Home as HomeIcon, AlertCircle, CheckCircle2,
  XCircle, Info, ExternalLink, Download, Share2, Settings
} from 'lucide-react';
import { 
  EnhancedOnboardingData, 
  IntelligentProfileAnalysis, 
  analyzeIntelligentProfile 
} from '@/utils/intelligentScoring';
import { executeAction, getHighPriorityActions } from '@/utils/dashboardActions';
import { useModal } from '@/contexts/ModalContext';
import InvestorDashboardV2 from './InvestorDashboardV2';
import MigrationDashboardV2 from './MigrationDashboardV2';
import LifestyleDashboardV2 from './LifestyleDashboardV2';

interface IntelligentCommandCenterProps {
  onboardingData: EnhancedOnboardingData;
  userName?: string;
  userEmail?: string;
}

const IntelligentCommandCenter: React.FC<IntelligentCommandCenterProps> = ({ 
  onboardingData, 
  userName = "Manuel Felipe Herrera",
  userEmail = "albumcova123@gmail.com"
}) => {
  const [analysis, setAnalysis] = useState<IntelligentProfileAnalysis | null>(null);
  const [simulatedDays, setSimulatedDays] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [lastActivity] = useState(new Date('2025-09-30T13:14:11'));
  const [selectedTab, setSelectedTab] = useState<'overview' | 'investment' | 'migration' | 'lifestyle'>('overview');

  // Análisis inteligente en tiempo real
  useEffect(() => {
    const intelligentAnalysis = analyzeIntelligentProfile(onboardingData);
    setAnalysis(intelligentAnalysis);
  }, [onboardingData]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-primary mb-2">Analizando tu Perfil...</h2>
          <p className="text-gray-600">Generando recomendaciones personalizadas</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-5 h-5" />;
    if (score >= 60) return <BarChart3 className="w-5 h-5" />;
    if (score >= 40) return <AlertTriangle className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'high': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Inteligente */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Centro de Mando Inteligente</h1>
              <p className="text-sm text-gray-500">Análisis en tiempo real • IA Avanzada</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Alertas Inteligentes */}
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {analysis.smartAlerts.filter(alert => alert.priority === 'high').length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {analysis.smartAlerts.filter(alert => alert.priority === 'high').length}
                </span>
              )}
            </div>
            
            {/* Nivel de Engagement */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getEngagementColor(analysis.engagementLevel)}`}>
              {analysis.engagementLevel.toUpperCase()}
            </div>
            
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Users className="w-5 h-5" />
              <span className="text-sm">Mi Equipo</span>
            </button>
            
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message Inteligente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Buenos días, {userName}
                </h2>
                <p className="text-white/90 text-lg mb-4">
                  Tu perfil ha sido analizado por nuestra IA avanzada. 
                  Completitud: <span className="font-bold">{analysis.profileCompleteness}%</span> • 
                  Probabilidad de Éxito: <span className="font-bold">{analysis.successProbability.overall}%</span>
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-white/80">
                    Perfil: <span className="font-medium capitalize">{analysis.riskCategory}</span>
                  </span>
                  <span className="text-sm text-white/80">
                    Engagement: <span className="font-medium capitalize">{analysis.engagementLevel}</span>
                  </span>
                </div>
              </div>
              
              {/* Métricas Principales */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{analysis.investmentReadiness.score}%</div>
                  <div className="text-xs text-white/80">IVI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{analysis.migrationReadiness.score}%</div>
                  <div className="text-xs text-white/80">IVM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{analysis.lifestyleAlignment.score}%</div>
                  <div className="text-xs text-white/80">ISE</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alertas Inteligentes */}
        {analysis.smartAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Alertas Inteligentes</h3>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                  {analysis.smartAlerts.length} alertas
                </span>
              </div>
              
              <div className="space-y-3">
                {analysis.smartAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                      alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {alert.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        {alert.deadline && (
                          <p className="text-xs text-gray-500">
                            Vence: {alert.deadline.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {alert.actionRequired && (
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors text-sm">
                          Acción Requerida
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs de Navegación */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            {[
              { id: 'overview', label: 'Vista General', icon: BarChart3 },
              { id: 'investment', label: 'Inversión', icon: DollarSign },
              { id: 'migration', label: 'Migración', icon: Plane },
              { id: 'lifestyle', label: 'Estilo de Vida', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido según Tab Seleccionado */}
        {selectedTab === 'overview' && (
          <OverviewTab analysis={analysis} />
        )}
        
        {selectedTab === 'investment' && (
          <InvestorDashboardV2 iviScore={analysis.ivi} />
        )}
        
        {selectedTab === 'migration' && (
          <MigrationDashboardV2 ivmScore={analysis.ivm} />
        )}
        
        {selectedTab === 'lifestyle' && (
          <LifestyleDashboardV2 iseScore={analysis.ise} />
        )}
      </div>
    </div>
  );
};

// Componente para Vista General
const OverviewTab: React.FC<{ analysis: IntelligentProfileAnalysis }> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Métricas Principales */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Métricas de Rendimiento</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(analysis.investmentReadiness.score)}`}>
                {getScoreIcon(analysis.investmentReadiness.score)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{analysis.investmentReadiness.score}%</div>
              <div className="text-sm text-gray-600">Índice de Viabilidad de Inversión</div>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(analysis.migrationReadiness.score)}`}>
                {getScoreIcon(analysis.migrationReadiness.score)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{analysis.migrationReadiness.score}%</div>
              <div className="text-sm text-gray-600">Índice de Viabilidad Migratoria</div>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(analysis.lifestyleAlignment.score)}`}>
                {getScoreIcon(analysis.lifestyleAlignment.score)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{analysis.lifestyleAlignment.score}%</div>
              <div className="text-sm text-gray-600">Índice de Sincronización de Estilo de Vida</div>
            </div>
          </div>
        </div>

        {/* Oportunidades Personalizadas */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Oportunidades Personalizadas</h3>
          
          <div className="space-y-4">
            {analysis.personalizedOpportunities.properties.map((opp, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{opp.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.priority === 'high' ? 'bg-red-100 text-red-700' :
                    opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {opp.matchScore}% Match
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opp.reason}</p>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors text-sm">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Lateral */}
      <div className="space-y-6">
        {/* Completitud del Perfil */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completitud del Perfil</h3>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progreso General</span>
              <span className="text-sm font-medium text-gray-900">{analysis.profileCompleteness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${analysis.profileCompleteness}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Datos Básicos</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Preferencias</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Documentos</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Verificación</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>

        {/* Probabilidades de Éxito */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Probabilidades de Éxito</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Inversión</span>
                <span className="text-sm font-medium text-gray-900">{analysis.successProbability.investment}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${analysis.successProbability.investment}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Migración</span>
                <span className="text-sm font-medium text-gray-900">{analysis.successProbability.migration}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${analysis.successProbability.migration}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Estilo de Vida</span>
                <span className="text-sm font-medium text-gray-900">{analysis.successProbability.lifestyle}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${analysis.successProbability.lifestyle}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para Tab de Inversión
const InvestmentTab: React.FC<{ analysis: IntelligentProfileAnalysis }> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Análisis Detallado de Inversión</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analysis.investmentReadiness.factors).map(([factor, score]) => (
            <div key={factor} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreColor(score)}`}>
                {getScoreIcon(score)}
              </div>
              <div className="text-lg font-bold text-gray-900">{score}%</div>
              <div className="text-sm text-gray-600 capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Recomendaciones</h4>
          <ul className="space-y-2">
            {analysis.investmentReadiness.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Componente para Tab de Migración
const MigrationTab: React.FC<{ analysis: IntelligentProfileAnalysis }> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Análisis Detallado de Migración</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {Object.entries(analysis.migrationReadiness.factors).map(([factor, score]) => (
            <div key={factor} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreColor(score)}`}>
                {getScoreIcon(score)}
              </div>
              <div className="text-lg font-bold text-gray-900">{score}%</div>
              <div className="text-sm text-gray-600 capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
        
        {/* Elegibilidad de Visas */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Elegibilidad de Visas</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysis.migrationReadiness.visaEligibility).map(([visa, score]) => (
              <div key={visa} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreColor(score)}`}>
                  {getScoreIcon(score)}
                </div>
                <div className="text-sm font-medium text-gray-900">{score}%</div>
                <div className="text-xs text-gray-600 capitalize">{visa.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timeline Estimado */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Timeline Estimado</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900 font-medium">{analysis.migrationReadiness.timelineEstimate}</span>
            </div>
          </div>
        </div>
        
        {/* Acciones Urgentes */}
        {analysis.migrationReadiness.urgentActions.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Acciones Urgentes</h4>
            <ul className="space-y-2">
              {analysis.migrationReadiness.urgentActions.map((action, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para Tab de Estilo de Vida
const LifestyleTab: React.FC<{ analysis: IntelligentProfileAnalysis }> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Análisis Detallado de Estilo de Vida</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analysis.lifestyleAlignment.factors).map(([factor, score]) => (
            <div key={factor} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreColor(score)}`}>
                {getScoreIcon(score)}
              </div>
              <div className="text-lg font-bold text-gray-900">{score}%</div>
              <div className="text-sm text-gray-600 capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Optimizaciones de Estilo de Vida</h4>
          <ul className="space-y-2">
            {analysis.lifestyleAlignment.lifestyleOptimization.map((opt, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Funciones auxiliares
function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-100';
  if (score >= 60) return 'text-yellow-600 bg-yellow-100';
  if (score >= 40) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
}

function getScoreIcon(score: number) {
  if (score >= 80) return <TrendingUp className="w-5 h-5" />;
  if (score >= 60) return <BarChart3 className="w-5 h-5" />;
  if (score >= 40) return <AlertTriangle className="w-5 h-5" />;
  return <TrendingDown className="w-5 h-5" />;
}

function getEngagementColor(level: string) {
  switch (level) {
    case 'excellent': return 'text-green-600 bg-green-100';
    case 'high': return 'text-blue-600 bg-blue-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-red-600 bg-red-100';
  }
}

export default IntelligentCommandCenter;
