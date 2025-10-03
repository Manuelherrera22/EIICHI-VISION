'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Users,
  Shield,
  Zap,
  Star,
  Target,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  Search,
  MoreVertical,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

interface SmartAlert {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'info' | 'urgent' | 'market' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  category: string;
  actionRequired: boolean;
  actionText?: string;
  actionUrl?: string;
  isRead: boolean;
  isArchived: boolean;
  metadata?: {
    propertyId?: string;
    marketTrend?: string;
    riskLevel?: string;
    estimatedValue?: number;
    deadline?: Date;
  };
}

interface SmartAlertsSystemProps {
  userId: string;
  analysis: any;
}

const SmartAlertsSystem: React.FC<SmartAlertsSystemProps> = ({ userId, analysis }) => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<SmartAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<SmartAlert[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'high' | 'opportunity' | 'warning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Generar alertas inteligentes basadas en el análisis
  useEffect(() => {
    const generateSmartAlerts = (): SmartAlert[] => {
      const baseAlerts: SmartAlert[] = [
        {
          id: '1',
          type: 'opportunity',
          priority: 'high',
          title: t('alerts.newOpportunityDetected'),
          message: t('alerts.traditionalPropertyKusatsu'),
          timestamp: new Date(),
          category: t('alerts.tags.properties'),
          actionRequired: true,
          actionText: t('alerts.viewProperty'),
          actionUrl: '/properties/kusatsu-traditional',
          isRead: false,
          isArchived: false,
          metadata: {
            propertyId: 'kusatsu-001',
            estimatedValue: 45000000,
            riskLevel: 'Low'
          }
        },
        {
          id: '2',
          type: 'market',
          priority: 'medium',
          title: t('alerts.favorableMarketTrend'),
          message: t('alerts.gunmaPricesRisen'),
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          category: t('alerts.tags.market'),
          actionRequired: false,
          isRead: false,
          isArchived: false,
          metadata: {
            marketTrend: '+2.3%',
            riskLevel: 'Low'
          }
        },
        {
          id: '3',
          type: 'warning',
          priority: 'medium',
          title: t('alerts.pendingDocumentation'),
          message: t('alerts.profileIncomplete'),
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          category: t('alerts.tags.profile'),
          actionRequired: true,
          actionText: t('alerts.completeProfile'),
          actionUrl: '/onboarding',
          isRead: false,
          isArchived: false
        },
        {
          id: '4',
          type: 'success',
          priority: 'low',
          title: t('alerts.analysisCompleted'),
          message: t('alerts.migrationAnalysisUpdated'),
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          category: 'Sistema',
          actionRequired: false,
          isRead: true,
          isArchived: false
        },
        {
          id: '5',
          type: 'urgent',
          priority: 'critical',
          title: 'Oportunidad Limitada',
          message: 'Propiedad en Takasaki con descuento del 20% - Solo 48 horas restantes.',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          category: 'Propiedades',
          actionRequired: true,
          actionText: 'Actuar Ahora',
          actionUrl: '/properties/takasaki-limited',
          isRead: false,
          isArchived: false,
          metadata: {
            propertyId: 'takasaki-001',
            estimatedValue: 32000000,
            deadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
            riskLevel: 'Medium'
          }
        },
        {
          id: '6',
          type: 'info',
          priority: 'low',
          title: 'Nuevo Contenido Disponible',
          message: 'Guía actualizada sobre inversión en propiedades tradicionales japonesas.',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          category: 'Educación',
          actionRequired: false,
          actionText: t('alerts.readGuide'),
          actionUrl: '/guides/traditional-properties',
          isRead: true,
          isArchived: false
        }
      ];

      return baseAlerts;
    };

    setAlerts(generateSmartAlerts());
  }, [analysis]);

  // Filtrar alertas
  useEffect(() => {
    let filtered = alerts;

    // Filtrar por tipo
    if (activeFilter !== 'all') {
      if (activeFilter === 'unread') {
        filtered = filtered.filter(alert => !alert.isRead);
      } else if (activeFilter === 'high') {
        filtered = filtered.filter(alert => alert.priority === 'high' || alert.priority === 'critical');
      } else if (activeFilter === 'opportunity') {
        filtered = filtered.filter(alert => alert.type === 'opportunity');
      } else if (activeFilter === 'warning') {
        filtered = filtered.filter(alert => alert.type === 'warning' || alert.type === 'urgent');
      }
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(alert => 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar archivadas
    if (!showArchived) {
      filtered = filtered.filter(alert => !alert.isArchived);
    }

    setFilteredAlerts(filtered);
  }, [alerts, activeFilter, searchQuery, showArchived]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      case 'urgent': return <XCircle className="w-5 h-5" />;
      case 'market': return <TrendingUp className="w-5 h-5" />;
      case 'system': return <Shield className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (priority === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'high') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (priority === 'low') return 'bg-blue-100 text-blue-700 border-blue-200';
    
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-700 border-green-200';
      case 'warning': return 'bg-red-100 text-red-700 border-red-200';
      case 'success': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'market': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'system': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const archiveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isArchived: true } : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead && !alert.isArchived).length;
  const highPriorityCount = alerts.filter(alert => 
    (alert.priority === 'high' || alert.priority === 'critical') && !alert.isArchived
  ).length;

  const filters = [
    { id: 'all', label: t('alerts.filters.all'), count: filteredAlerts.length },
    { id: 'unread', label: t('alerts.filters.unread'), count: unreadCount },
    { id: 'high', label: t('alerts.filters.highPriority'), count: highPriorityCount },
    { id: 'opportunity', label: t('alerts.filters.opportunities'), count: alerts.filter(a => a.type === 'opportunity' && !a.isArchived).length },
    { id: 'warning', label: t('alerts.filters.warnings'), count: alerts.filter(a => (a.type === 'warning' || a.type === 'urgent') && !a.isArchived).length }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header - Responsive */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('alerts.intelligentAlerts')}</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {t('alerts.unreadCount', { count: String(unreadCount) })} • {t('alerts.highPriorityCount', { count: String(highPriorityCount) })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            
            {/* Archive Toggle */}
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`p-2 rounded-lg transition-colors ${
                showArchived 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <Archive className="w-4 h-4" />
            </button>
            
            {/* Mark All Read */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-2 sm:px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">{t('alerts.markAllAsRead')}</span>
                <span className="sm:hidden">Marcar</span>
              </button>
            )}
            
            {/* Expand Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filters - Responsive */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('alerts.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 min-w-max">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter.label}
                  {filter.count > 0 && (
                    <span className={`ml-1 px-1 sm:px-1.5 py-0.5 text-xs rounded-full ${
                      activeFilter === filter.id ? 'bg-blue-200' : 'bg-gray-200'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay alertas que coincidan con los filtros</p>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !alert.isRead ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {/* Icon */}
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${getAlertColor(alert.type, alert.priority)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 space-y-1 sm:space-y-0">
                      <h4 className={`font-medium text-sm sm:text-base ${!alert.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {alert.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{alert.message}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {alert.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          alert.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          alert.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.priority === 'critical' ? t('alerts.critical') :
                           alert.priority === 'high' ? 'Alta' :
                           alert.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        {alert.actionRequired && alert.actionText && (
                          <button className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                            {alert.actionText}
                          </button>
                        )}
                        
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => archiveAlert(alert.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Archive className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartAlertsSystem;
