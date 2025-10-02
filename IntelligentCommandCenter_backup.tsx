'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Users, User, TrendingUp, ArrowRight, BookOpen, Building, 
  DollarSign, Calendar, CheckCircle, MessageCircle, Plus, Search, 
  Filter, Heart, Target, Zap, Clock, Star, Home, Coffee, 
  ShoppingBag, AlertTriangle, TrendingDown, Award, BarChart3,
  FileText, Plane, Home as HomeIcon, AlertCircle, CheckCircle2,
  XCircle, Info, ExternalLink, Download, Share2, Settings,
  Brain, Activity, Globe, Shield, Rocket, Crown, Sparkles,
  Eye, MousePointer, RefreshCw, Maximize2, Minimize2,
  Play, Pause, Volume2, VolumeX, Wifi, WifiOff, Battery,
  Thermometer, Droplets, Wind, Sun, Moon, CloudRain, MapPin
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
  
  // Nuevos estados para funcionalidades avanzadas
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 1247,
    marketTrend: '+2.3%',
    opportunitiesFound: 8,
    riskLevel: 'Low',
    weather: 'Sunny',
    temperature: 22
  });
  const [userEngagement, setUserEngagement] = useState({
    sessionTime: 0,
    clicks: 0,
    scrollDepth: 0,
    focusTime: 0
  });

  // Análisis inteligente en tiempo real
  useEffect(() => {
    const intelligentAnalysis = analyzeIntelligentProfile(onboardingData);
    setAnalysis(intelligentAnalysis);
    
    // Generar insights de IA
    const insights = [
      {
        id: 1,
        type: 'opportunity',
        title: 'Nueva Oportunidad Detectada',
        message: 'Propiedad en Kusatsu con ROI potencial del 15%',
        priority: 'high',
        timestamp: new Date(),
        icon: Sparkles
      },
      {
        id: 2,
        type: 'market',
        title: 'Tendencia de Mercado',
        message: 'Precios en Gunma subieron 2.3% esta semana',
        priority: 'medium',
        timestamp: new Date(),
        icon: TrendingUp
      },
      {
        id: 3,
        type: 'recommendation',
        title: 'Recomendación Personalizada',
        message: 'Tu perfil sugiere considerar propiedades tradicionales',
        priority: 'low',
        timestamp: new Date(),
        icon: Brain
      }
    ];
    setAiInsights(insights);
  }, [onboardingData]);

  // Simulación de métricas en tiempo real
  useEffect(() => {
    if (!isLiveMode) return;
    
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        marketTrend: `+${(Math.random() * 5).toFixed(1)}%`,
        opportunitiesFound: prev.opportunitiesFound + Math.floor(Math.random() * 3 - 1),
        temperature: prev.temperature + Math.floor(Math.random() * 3 - 1)
      }));
      
      setUserEngagement(prev => ({
        ...prev,
        sessionTime: prev.sessionTime + 1,
        clicks: prev.clicks + Math.floor(Math.random() * 2),
        scrollDepth: Math.min(100, prev.scrollDepth + Math.random() * 2),
        focusTime: prev.focusTime + 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

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
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 ${fullscreenMode ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header Ultra Avanzado */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary via-purple-600 to-accent rounded-xl flex items-center justify-center shadow-lg"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <span>Centro de Mando Inteligente</span>
                {isLiveMode && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                )}
              </h1>
              <p className="text-sm text-gray-500 flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>IA Avanzada • Análisis en Tiempo Real</span>
                <span className="text-green-600 font-medium">{realTimeMetrics.activeUsers} usuarios activos</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Controles de Sistema */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`p-2 rounded-md transition-colors ${
                  isLiveMode ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
                title={isLiveMode ? 'Modo Live Activo' : 'Activar Modo Live'}
              >
                {isLiveMode ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-2 rounded-md transition-colors ${
                  notificationsEnabled ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
                title={notificationsEnabled ? 'Notificaciones Activadas' : 'Activar Notificaciones'}
              >
                {notificationsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setFullscreenMode(!fullscreenMode)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
                title={fullscreenMode ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
              >
                {fullscreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Métricas en Tiempo Real */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <Activity className="w-4 h-4" />
                <span className="font-medium">{realTimeMetrics.marketTrend}</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <Thermometer className="w-4 h-4" />
                <span className="font-medium">{realTimeMetrics.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-600">
                <Shield className="w-4 h-4" />
                <span className="font-medium">{realTimeMetrics.riskLevel}</span>
              </div>
            </div>
            
            {/* Alertas Inteligentes Mejoradas */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-6 h-6" />
                {analysis.smartAlerts.filter(alert => alert.priority === 'high').length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {analysis.smartAlerts.filter(alert => alert.priority === 'high').length}
                  </motion.span>
                )}
              </motion.button>
            </div>
            
            {/* Nivel de Engagement Mejorado */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 ${getEngagementColor(analysis.engagementLevel)}`}
            >
              <Star className="w-4 h-4" />
              <span>{analysis.engagementLevel.toUpperCase()}</span>
            </motion.div>
            
            {/* Perfil de Usuario */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message Ultra Avanzado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/10 rounded-full"
            />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-3 mb-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Rocket className="w-5 h-5" />
                    </motion.div>
                    <h2 className="text-3xl font-bold">
                      Buenos días, {userName}
                    </h2>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-lg mb-6"
                  >
                    <p className="mb-4 text-white">
                      Tu perfil ha sido analizado por nuestra IA avanzada con algoritmos de machine learning.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-base">
                      <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                        <span className="font-bold text-yellow-300">Completitud:</span>
                        <span className="font-bold text-yellow-300">{analysis.profileCompleteness}%</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                        <span className="font-bold text-green-300">Probabilidad de Éxito:</span>
                        <span className="font-bold text-green-300">{analysis.successProbability.overall}%</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-300" />
                      <span className="text-sm text-white/80">
                        Perfil: <span className="font-medium capitalize text-blue-300">{analysis.riskCategory}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-300" />
                      <span className="text-sm text-white/80">
                        Engagement: <span className="font-medium capitalize text-yellow-300">{analysis.engagementLevel}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-300" />
                      <span className="text-sm text-white/80">
                        Sesión: <span className="font-medium text-green-300">{Math.floor(userEngagement.sessionTime / 60)}m {userEngagement.sessionTime % 60}s</span>
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Métricas Principales Mejoradas */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full lg:w-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-2xl lg:text-3xl font-bold text-green-300 mb-1"
                    >
                      {analysis.investmentReadiness.score}%
                    </motion.div>
                    <div className="text-xs text-white/80 font-medium">IVI</div>
                    <div className="text-xs text-green-300 mt-1">Inversión</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="text-2xl lg:text-3xl font-bold text-blue-300 mb-1"
                    >
                      {analysis.migrationReadiness.score}%
                    </motion.div>
                    <div className="text-xs text-white/80 font-medium">IVM</div>
                    <div className="text-xs text-blue-300 mt-1">Migración</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="text-2xl lg:text-3xl font-bold text-purple-300 mb-1"
                    >
                      {analysis.lifestyleAlignment.score}%
                    </motion.div>
                    <div className="text-xs text-white/80 font-medium">ISE</div>
                    <div className="text-xs text-purple-300 mt-1">Estilo de Vida</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insights de IA en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <Brain className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">Insights de IA en Tiempo Real</h3>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Última actualización:</span>
                <span className="text-sm font-medium text-green-600">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl border-2 ${
                    insight.priority === 'high' ? 'border-red-200 bg-red-50' :
                    insight.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.priority === 'high' ? 'bg-red-100' :
                      insight.priority === 'medium' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <insight.icon className={`w-5 h-5 ${
                        insight.priority === 'high' ? 'text-red-600' :
                        insight.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{insight.message}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {insight.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {insight.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alertas Inteligentes Mejoradas */}
        {analysis.smartAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                >
                  <AlertCircle className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">Alertas Inteligentes</h3>
                <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold"
                >
                  {analysis.smartAlerts.length} alertas activas
                </motion.span>
              </div>
              
              <div className="space-y-4">
                {analysis.smartAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`p-5 rounded-2xl border-l-4 ${
                      alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                      alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {alert.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                        {alert.deadline && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Vence: {alert.deadline.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      {alert.actionRequired && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/80 transition-colors text-sm font-medium shadow-lg"
                        >
                          Acción Requerida
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs de Navegación Ultra Avanzados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Vista General', icon: BarChart3, color: 'blue' },
                { id: 'investment', label: 'Inversión', icon: DollarSign, color: 'green' },
                { id: 'migration', label: 'Migración', icon: Plane, color: 'purple' },
                { id: 'lifestyle', label: 'Estilo de Vida', icon: Heart, color: 'pink' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    selectedTab === tab.id
                      ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {selectedTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    animate={selectedTab === tab.id ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-2 rounded-lg ${
                      selectedTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${
                      selectedTab === tab.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </motion.div>
                  <div className="relative z-10">
                    <span className={`text-sm font-bold ${
                      selectedTab === tab.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {tab.label}
                    </span>
                    {selectedTab === tab.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenido según Tab Seleccionado con Animaciones Avanzadas */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <OverviewTab analysis={analysis} userEngagement={userEngagement} realTimeMetrics={realTimeMetrics} />
            </motion.div>
          )}
          
          {selectedTab === 'investment' && (
            <motion.div
              key="investment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <InvestorDashboardV2 iviScore={analysis.ivi} />
            </motion.div>
          )}
          
          {selectedTab === 'migration' && (
            <motion.div
              key="migration"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MigrationDashboardV2 ivmScore={analysis.ivm} />
            </motion.div>
          )}
          
          {selectedTab === 'lifestyle' && (
            <motion.div
              key="lifestyle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LifestyleDashboardV2 iseScore={analysis.ise} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Componente para Vista General Ultra Avanzado
const OverviewTab: React.FC<{ 
  analysis: IntelligentProfileAnalysis;
  userEngagement: any;
  realTimeMetrics: any;
}> = ({ analysis, userEngagement, realTimeMetrics }) => {
  return (
    <div className="space-y-8">
      {/* Métricas de Rendimiento Ultra Avanzadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Métricas de Rendimiento en Tiempo Real</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Actualizado cada 2 segundos</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(analysis.investmentReadiness.score)}`}
            >
              <Target className="w-10 h-10" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {analysis.investmentReadiness.score}%
            </motion.div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Índice de Viabilidad de Inversión</div>
            <div className="text-sm text-gray-600">Análisis de capital, riesgo y experiencia</div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+2.3% esta semana</span>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(analysis.migrationReadiness.score)}`}
            >
              <Plane className="w-10 h-10" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {analysis.migrationReadiness.score}%
            </motion.div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Índice de Viabilidad Migratoria</div>
            <div className="text-sm text-gray-600">Documentación, profesión y elegibilidad</div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Timeline: {analysis.migrationReadiness.timelineEstimate}</span>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(analysis.lifestyleAlignment.score)}`}
            >
              <Heart className="w-10 h-10" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {analysis.lifestyleAlignment.score}%
            </motion.div>
            <div className="text-lg font-semibold text-gray-700 mb-2">Índice de Sincronización de Estilo de Vida</div>
            <div className="text-sm text-gray-600">Preferencias, cultura y objetivos</div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">Excelente alineación</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Métricas de Engagement en Tiempo Real */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
            >
              <Eye className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Métricas de Engagement en Tiempo Real</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MousePointer className="w-4 h-4" />
            <span>Interacción del usuario</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
          >
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.floor(userEngagement.sessionTime / 60)}m {userEngagement.sessionTime % 60}s
            </div>
            <div className="text-sm font-semibold text-gray-700">Tiempo de Sesión</div>
            <div className="text-xs text-gray-500 mt-1">Tiempo activo en el dashboard</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          >
            <MousePointer className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userEngagement.clicks}</div>
            <div className="text-sm font-semibold text-gray-700">Clicks Totales</div>
            <div className="text-xs text-gray-500 mt-1">Interacciones registradas</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
          >
            <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userEngagement.scrollDepth.toFixed(0)}%</div>
            <div className="text-sm font-semibold text-gray-700">Profundidad de Scroll</div>
            <div className="text-xs text-gray-500 mt-1">Contenido explorado</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
          >
            <Target className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{userEngagement.focusTime}</div>
            <div className="text-sm font-semibold text-gray-700">Tiempo de Enfoque</div>
            <div className="text-xs text-gray-500 mt-1">Segundos de atención</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Oportunidades Personalizadas Mejoradas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Oportunidades Personalizadas por IA</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Brain className="w-4 h-4" />
            <span>Algoritmos de recomendación</span>
          </div>
        </div>
          
          <div className="space-y-6">
            {analysis.personalizedOpportunities.properties.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                      >
                        <Building className="w-5 h-5 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-gray-900">{opp.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{opp.reason}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">ROI Potencial: 12-15%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Kusatsu, Gunma</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        opp.priority === 'high' ? 'bg-red-100 text-red-700' :
                        opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}
                    >
                      {opp.matchScore}% Match
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-xl hover:from-primary/80 hover:to-purple-600/80 transition-all duration-300 text-sm font-medium shadow-lg"
                    >
                      Ver Análisis Completo
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
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
