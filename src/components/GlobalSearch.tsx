'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Search,
  X,
  Clock,
  Star,
  TrendingUp,
  Bell,
  Brain,
  Download,
  Home,
  BarChart3,
  Target,
  Shield,
  Users,
  Calendar,
  FileText,
  MessageCircle,
  Settings,
  ArrowRight,
  Filter,
  SortAsc,
  SortDesc,
  History,
  Bookmark,
  Tag,
  Hash,
  AtSign
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'section' | 'metric' | 'alert' | 'prediction' | 'action' | 'setting';
  title: string;
  description: string;
  category: string;
  url?: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  lastAccessed?: Date;
  isFavorite?: boolean;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'sections' | 'metrics' | 'alerts' | 'predictions'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'alphabetical' | 'recent'>('relevance');
  const inputRef = useRef<HTMLInputElement>(null);

  // Datos de búsqueda simulados
  const searchData: SearchResult[] = [
    {
      id: 'overview',
      type: 'section',
      title: 'Resumen Ejecutivo',
      description: 'Vista general del análisis con métricas principales',
      category: 'Dashboard',
      url: '/dashboard#overview',
      icon: Home,
      priority: 'high',
      tags: ['dashboard', 'resumen', 'métricas', 'análisis'],
      lastAccessed: new Date(),
      isFavorite: true
    },
    {
      id: 'metrics',
      type: 'section',
      title: 'Métricas en Tiempo Real',
      description: 'Gráficos interactivos y análisis temporal',
      category: 'Analytics',
      url: '/dashboard#metrics',
      icon: BarChart3,
      priority: 'high',
      tags: ['métricas', 'gráficos', 'tiempo real', 'analytics'],
      lastAccessed: new Date(Date.now() - 5 * 60 * 1000),
      isFavorite: true
    },
    {
      id: 'alerts',
      type: 'section',
      title: 'Alertas Inteligentes',
      description: 'Notificaciones y acciones requeridas',
      category: 'Notificaciones',
      url: '/dashboard#alerts',
      icon: Bell,
      priority: 'high',
      tags: ['alertas', 'notificaciones', 'acciones', 'prioridad'],
      lastAccessed: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: 'predictions',
      type: 'section',
      title: 'Predicciones de IA',
      description: 'Análisis predictivo avanzado con machine learning',
      category: 'IA',
      url: '/dashboard#predictions',
      icon: Brain,
      priority: 'medium',
      tags: ['ia', 'predicciones', 'machine learning', 'análisis'],
      lastAccessed: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 'export',
      type: 'section',
      title: 'Exportar Reportes',
      description: 'Generar documentos en PDF, Excel e imagen',
      category: 'Herramientas',
      url: '/dashboard#export',
      icon: Download,
      priority: 'medium',
      tags: ['exportar', 'reportes', 'pdf', 'excel'],
      lastAccessed: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 'ivi-metric',
      type: 'metric',
      title: 'IVI - Índice de Viabilidad de Inversión',
      description: 'Métrica principal para evaluar oportunidades de inversión',
      category: 'Métricas',
      url: '/dashboard#metrics#ivi',
      icon: TrendingUp,
      priority: 'high',
      tags: ['ivi', 'inversión', 'viabilidad', 'métrica'],
      lastAccessed: new Date(Date.now() - 2 * 60 * 1000),
      isFavorite: true
    },
    {
      id: 'ivm-metric',
      type: 'metric',
      title: 'IVM - Índice de Viabilidad Migratoria',
      description: 'Evaluación de la preparación para migración',
      category: 'Métricas',
      url: '/dashboard#metrics#ivm',
      icon: Users,
      priority: 'high',
      tags: ['ivm', 'migración', 'viabilidad', 'métrica'],
      lastAccessed: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: 'ise-metric',
      type: 'metric',
      title: 'ISE - Índice de Sincronización de Estilo de Vida',
      description: 'Alineación con el estilo de vida japonés',
      category: 'Métricas',
      url: '/dashboard#metrics#ise',
      icon: Target,
      priority: 'medium',
      tags: ['ise', 'estilo de vida', 'japón', 'métrica'],
      lastAccessed: new Date(Date.now() - 4 * 60 * 1000)
    },
    {
      id: 'opportunity-alert',
      type: 'alert',
      title: 'Nueva Oportunidad en Kusatsu',
      description: 'Propiedad tradicional con ROI potencial del 15%',
      category: 'Alertas',
      url: '/dashboard#alerts#opportunity',
      icon: Bell,
      priority: 'high',
      tags: ['oportunidad', 'kusatsu', 'propiedad', 'roi'],
      lastAccessed: new Date(Date.now() - 1 * 60 * 1000)
    },
    {
      id: 'market-trend',
      type: 'alert',
      title: 'Tendencia de Mercado Favorable',
      description: 'Precios en Gunma subieron 2.3% esta semana',
      category: 'Alertas',
      url: '/dashboard#alerts#market',
      icon: TrendingUp,
      priority: 'medium',
      tags: ['mercado', 'tendencia', 'gunma', 'precios'],
      lastAccessed: new Date(Date.now() - 6 * 60 * 1000)
    },
    {
      id: 'investment-prediction',
      type: 'prediction',
      title: 'Optimización de Portfolio',
      description: 'Predicción de aumento del 15% en IVI en 30 días',
      category: 'Predicciones',
      url: '/dashboard#predictions#investment',
      icon: Brain,
      priority: 'high',
      tags: ['portfolio', 'optimización', 'predicción', 'ivi'],
      lastAccessed: new Date(Date.now() - 7 * 60 * 1000),
      isFavorite: true
    },
    {
      id: 'market-prediction',
      type: 'prediction',
      title: 'Tendencia Regional Gunma',
      description: 'Análisis predictivo de crecimiento 2-3% mensual',
      category: 'Predicciones',
      url: '/dashboard#predictions#market',
      icon: BarChart3,
      priority: 'medium',
      tags: ['gunma', 'regional', 'crecimiento', 'predicción'],
      lastAccessed: new Date(Date.now() - 8 * 60 * 1000)
    },
    {
      id: 'chatbot',
      type: 'action',
      title: 'Chatbot Inteligente',
      description: 'Asistente especializado en inversiones japonesas',
      category: 'Herramientas',
      url: '/dashboard#chatbot',
      icon: MessageCircle,
      priority: 'medium',
      tags: ['chatbot', 'asistente', 'ia', 'ayuda'],
      lastAccessed: new Date(Date.now() - 12 * 60 * 1000)
    },
    {
      id: 'settings',
      type: 'setting',
      title: 'Configuración del Dashboard',
      description: 'Personalizar tema, notificaciones y preferencias',
      category: 'Configuración',
      url: '/dashboard#settings',
      icon: Settings,
      priority: 'low',
      tags: ['configuración', 'tema', 'notificaciones', 'preferencias'],
      lastAccessed: new Date(Date.now() - 20 * 60 * 1000)
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    let filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      item.category.toLowerCase().includes(searchTerm)
    );

    // Aplicar filtro por tipo
    if (activeFilter !== 'all') {
      const typeMap = {
        'sections': 'section',
        'metrics': 'metric',
        'alerts': 'alert',
        'predictions': 'prediction'
      };
      filtered = filtered.filter(item => item.type === typeMap[activeFilter]);
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        filtered.sort((a, b) => (b.lastAccessed?.getTime() || 0) - (a.lastAccessed?.getTime() || 0));
        break;
      case 'relevance':
      default:
        filtered.sort((a, b) => {
          // Priorizar favoritos
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          
          // Priorizar por prioridad
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        break;
    }

    setFilteredResults(filtered);
    setSelectedIndex(0);
  }, [query, activeFilter, sortBy]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  const handleSelect = (result: SearchResult) => {
    // Agregar a historial
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
    }
    
    // Navegar
    if (result.url) {
      onNavigate(result.url);
    }
    
    onClose();
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('search.placeholder')}
              className="flex-1 text-lg border-none outline-none placeholder-gray-400"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Filters and Sort */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {[
                { id: 'all', label: t('search.filters.all') },
                { id: 'sections', label: t('search.filters.sections') },
                { id: 'metrics', label: t('search.filters.metrics') },
                { id: 'alerts', label: t('search.filters.alerts') },
                { id: 'predictions', label: t('search.filters.predictions') }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{t('search.sortBy')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="relevance">{t('search.sortBy.relevance')}</option>
                <option value="alphabetical">{t('search.sortBy.alphabetical')}</option>
                <option value="recent">{t('search.sortBy.recent')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            /* Search History */
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <History className="w-4 h-4" />
                  <span>{t('search.recentSearches')}</span>
                </h3>
                {searchHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {t('search.clearHistory')}
                  </button>
                )}
              </div>
              
              {searchHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">{t('search.noRecentSearches')}</p>
              ) : (
                <div className="space-y-2">
                  {searchHistory.map((historyQuery, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(historyQuery)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{historyQuery}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Search Results */
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {filteredResults.length} {filteredResults.length === 1 ? t('search.results') : t('search.resultsPlural')}
                </h3>
                <span className="text-sm text-gray-500">
                  {query.length > 0 && `${t('search.for')} "${query}"`}
                </span>
              </div>

              {filteredResults.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t('search.noResults')}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {t('search.tryDifferentTerms')}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredResults.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <motion.button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                          index === selectedIndex
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          result.priority === 'high' ? 'bg-red-100 text-red-600' :
                          result.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {result.title}
                            </h4>
                            {result.isFavorite && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {result.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {result.category}
                            </span>
                            {result.lastAccessed && (
                              <span className="text-xs text-gray-400">
                                {result.lastAccessed.toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{t('search.navigation.navigate')}</span>
              <span>{t('search.navigation.select')}</span>
              <span>{t('search.navigation.close')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="w-3 h-3" />
              <span>{t('search.globalSearch')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GlobalSearch;
