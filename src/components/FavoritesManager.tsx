'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Star,
  Heart,
  Bookmark,
  Plus,
  X,
  Filter,
  Search,
  Grid,
  List,
  Tag,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  MoreVertical,
  Folder,
  FolderOpen,
  Star as StarIcon,
  TrendingUp,
  Bell,
  Brain,
  Download,
  Home,
  BarChart3,
  Target,
  Users,
  Settings,
  MessageCircle,
  FileText,
  ArrowRight,
  SortAsc,
  SortDesc
} from 'lucide-react';

interface FavoriteItem {
  id: string;
  type: 'section' | 'metric' | 'alert' | 'prediction' | 'action' | 'custom';
  title: string;
  description: string;
  category: string;
  url?: string;
  icon: React.ComponentType<any>;
  tags: string[];
  createdAt: Date;
  lastAccessed?: Date;
  accessCount: number;
  priority: 'high' | 'medium' | 'low';
  isPinned: boolean;
  folder?: string;
  customData?: any;
}

interface FavoritesManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'access' | 'priority'>('recent');
  const [showFolders, setShowFolders] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState<string[]>(['Dashboard', 'Métricas', 'Alertas', 'IA', 'Herramientas']);

  // Datos de favoritos simulados
  const defaultFavorites: FavoriteItem[] = [
    {
      id: 'overview',
      type: 'section',
      title: 'Resumen Ejecutivo',
      description: 'Vista general del análisis con métricas principales',
      category: 'Dashboard',
      url: '/dashboard#overview',
      icon: Home,
      tags: ['dashboard', 'resumen', 'métricas'],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(),
      accessCount: 45,
      priority: 'high',
      isPinned: true,
      folder: 'Dashboard'
    },
    {
      id: 'ivi-metric',
      type: 'metric',
      title: 'IVI - Índice de Viabilidad de Inversión',
      description: 'Métrica principal para evaluar oportunidades de inversión',
      category: 'Métricas',
      url: '/dashboard#metrics#ivi',
      icon: TrendingUp,
      tags: ['ivi', 'inversión', 'viabilidad'],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(Date.now() - 2 * 60 * 1000),
      accessCount: 32,
      priority: 'high',
      isPinned: true,
      folder: 'Métricas'
    },
    {
      id: 'opportunity-alert',
      type: 'alert',
      title: 'Nueva Oportunidad en Kusatsu',
      description: 'Propiedad tradicional con ROI potencial del 15%',
      category: 'Alertas',
      url: '/dashboard#alerts#opportunity',
      icon: Bell,
      tags: ['oportunidad', 'kusatsu', 'propiedad'],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(Date.now() - 1 * 60 * 1000),
      accessCount: 18,
      priority: 'high',
      isPinned: false,
      folder: 'Alertas'
    },
    {
      id: 'investment-prediction',
      type: 'prediction',
      title: 'Optimización de Portfolio',
      description: 'Predicción de aumento del 15% en IVI en 30 días',
      category: 'Predicciones',
      url: '/dashboard#predictions#investment',
      icon: Brain,
      tags: ['portfolio', 'optimización', 'predicción'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(Date.now() - 7 * 60 * 1000),
      accessCount: 25,
      priority: 'high',
      isPinned: true,
      folder: 'IA'
    },
    {
      id: 'chatbot',
      type: 'action',
      title: 'Chatbot Inteligente',
      description: 'Asistente especializado en inversiones japonesas',
      category: 'Herramientas',
      url: '/dashboard#chatbot',
      icon: MessageCircle,
      tags: ['chatbot', 'asistente', 'ia'],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(Date.now() - 12 * 60 * 1000),
      accessCount: 8,
      priority: 'medium',
      isPinned: false,
      folder: 'Herramientas'
    }
  ];

  useEffect(() => {
    // Cargar favoritos desde localStorage o usar datos por defecto
    const savedFavorites = localStorage.getItem('dashboard-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites(defaultFavorites);
    }
  }, []);

  useEffect(() => {
    // Guardar favoritos en localStorage
    localStorage.setItem('dashboard-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let filtered = [...favorites];

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Ordenar
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'access':
        filtered.sort((a, b) => b.accessCount - a.accessCount);
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => {
          const dateA = a.lastAccessed instanceof Date ? a.lastAccessed : (a.lastAccessed ? new Date(a.lastAccessed) : null);
          const dateB = b.lastAccessed instanceof Date ? b.lastAccessed : (b.lastAccessed ? new Date(b.lastAccessed) : null);
          return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
        });
        break;
    }

    setFilteredFavorites(filtered);
  }, [favorites, searchQuery, selectedCategory, sortBy]);

  const addToFavorites = (item: Omit<FavoriteItem, 'id' | 'createdAt' | 'accessCount'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `custom-${Date.now()}`,
      createdAt: new Date(),
      accessCount: 0
    };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const togglePin = (id: string) => {
    setFavorites(prev => prev.map(item =>
      item.id === id ? { ...item, isPinned: !item.isPinned } : item
    ));
  };

  const updateAccess = (id: string) => {
    setFavorites(prev => prev.map(item =>
      item.id === id
        ? { ...item, accessCount: item.accessCount + 1, lastAccessed: new Date() }
        : item
    ));
  };

  const handleSelect = (item: FavoriteItem) => {
    updateAccess(item.id);
    if (item.url) {
      onNavigate(item.url);
    }
    onClose();
  };

  const createFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName)) {
      setFolders(prev => [...prev, newFolderName]);
      setNewFolderName('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dashboard': return Home;
      case 'Métricas': return BarChart3;
      case 'Alertas': return Bell;
      case 'Predicciones': return Brain;
      case 'Herramientas': return Settings;
      default: return StarIcon;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] sm:h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Responsive */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t('favorites.title')}</h2>
              <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                {favorites.length} {t('favorites.elements')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          {/* Search and Filters - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('favorites.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">{t('favorites.allCategories')}</option>
                {Array.from(new Set(favorites.map(f => f.category))).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="recent">{t('favorites.sortBy.recent')}</option>
                <option value="alphabetical">{t('favorites.sortBy.alphabetical')}</option>
                <option value="access">{t('favorites.sortBy.access')}</option>
                <option value="priority">{t('favorites.sortBy.priority')}</option>
              </select>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Responsive */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row">
            {/* Sidebar - Responsive */}
            <div className="w-full lg:w-64 border-r border-gray-200 p-3 sm:p-4 overflow-y-auto lg:block hidden lg:block">
              <div className="space-y-4">
                {/* Folders */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{t('favorites.folders')}</h3>
                    <button
                      onClick={() => setShowFolders(!showFolders)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {showFolders ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {showFolders && (
                    <div className="space-y-1">
                      {folders.map(folder => {
                        const folderCount = favorites.filter(f => f.folder === folder).length;
                        const FolderIcon = folderCount > 0 ? FolderOpen : Folder;
                        return (
                          <div
                            key={folder}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                          >
                            <div className="flex items-center space-x-2">
                              <FolderIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{folder}</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {folderCount}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('favorites.statistics')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('favorites.total')}</span>
                      <span className="font-medium">{favorites.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('favorites.pinned')}</span>
                      <span className="font-medium">{favorites.filter(f => f.isPinned).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('favorites.accessToday')}</span>
                      <span className="font-medium">
                        {favorites.filter(f => 
                          f.lastAccessed && 
                          f.lastAccessed.toDateString() === new Date().toDateString()
                        ).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Responsive */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
              {filteredFavorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? t('favorites.noResults') : t('favorites.noFavoritesYet')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    {searchQuery 
                      ? t('favorites.tryDifferentTerms')
                      : t('favorites.addImportantElements')
                    }
                  </p>
                  {!searchQuery && (
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                      {t('favorites.exploreDashboard')}
                    </button>
                  )}
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'
                  : 'space-y-2 sm:space-y-3'
                }>
                  {filteredFavorites.map((item) => {
                    const Icon = item.icon;
                    const CategoryIcon = getCategoryIcon(item.category);
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer ${
                          item.isPinned ? 'ring-2 ring-yellow-200' : ''
                        }`}
                        onClick={() => handleSelect(item)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                              item.priority === 'high' ? 'bg-red-100 text-red-600' :
                              item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                                {item.title}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <CategoryIcon className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{item.category}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {item.isPinned && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(item.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            {item.folder && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {item.folder}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{item.accessCount} {t('favorites.accesses')}</span>
                          </div>
                        </div>

                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{item.tags.length - 3} {t('favorites.more')}
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Responsive */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-xs sm:text-sm text-gray-500">
              {filteredFavorites.length} {t('favorites.of')} {favorites.length} {t('favorites.elementsCount')}
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800">
                {t('favorites.export')}
              </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800">
                {t('favorites.import')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FavoritesManager;
