'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  Download,
  Layout,
  Zap,
  Shield,
  Settings,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Grid,
  List,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  Maximize2,
  Minimize2,
  Map as MapIcon
} from 'lucide-react';

interface QuickAccessProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenTabijiExport: () => void;
  onOpenExport: () => void;
  onOpenCustomize: () => void;
  onOpenAdvancedAI: () => void;
  onOpenPWA: () => void;
  onOpenSecurity: () => void;
  viewMode: 'grid' | 'list' | 'columns';
  onViewModeChange: (mode: 'grid' | 'list' | 'columns') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({
  onOpenSearch,
  onOpenFavorites,
  onOpenTabijiExport,
  onOpenExport,
  onOpenCustomize,
  onOpenAdvancedAI,
  onOpenPWA,
  onOpenSecurity,
  viewMode,
  onViewModeChange,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickActions = [
    {
      id: 'search',
      title: 'Búsqueda',
      icon: Search,
      color: 'bg-teal-500',
      action: onOpenSearch,
      description: 'Buscar en todo el dashboard'
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      icon: Star,
      color: 'bg-yellow-500',
      action: onOpenFavorites,
      description: 'Elementos marcados'
    },
    {
      id: 'topoexport',
      title: 'TabijiExport',
      icon: MapIcon,
      color: 'bg-green-500',
      action: onOpenTabijiExport,
      description: 'Análisis topográfico'
    },
    {
      id: 'export',
      title: 'Exportar',
      icon: Download,
      color: 'bg-indigo-500',
      action: onOpenExport,
      description: 'Generar reportes'
    }
  ];

  const advancedActions = [
    {
      id: 'customize',
      title: 'Personalizar',
      icon: Layout,
      color: 'bg-pink-500',
      action: onOpenCustomize,
      description: 'Configurar layout'
    },
    {
      id: 'advanced-ai',
      title: 'IA Avanzada',
      icon: Zap,
      color: 'bg-violet-500',
      action: onOpenAdvancedAI,
      description: 'Predicciones avanzadas'
    },
    {
      id: 'pwa',
      title: 'PWA',
      icon: Shield,
      color: 'bg-cyan-500',
      action: onOpenPWA,
      description: 'Gestión de app'
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Shield,
      color: 'bg-red-500',
      action: onOpenSecurity,
      description: 'Centro de seguridad'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Actions Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mb-4 w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Acceso Rápido</h3>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showAdvanced ? 'Básico' : 'Avanzado'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Acciones Principales</div>
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Advanced Actions */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="text-xs font-medium text-gray-500 mb-2">Funciones Avanzadas</div>
                  <div className="space-y-2">
                    {advancedActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.id}
                          onClick={action.action}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{action.title}</div>
                            <div className="text-xs text-gray-500">{action.description}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View Controls */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-2">Vista</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => onViewModeChange('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onViewModeChange('list')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-3 h-3" />
                  </button>
                </div>
                
                <button
                  onClick={onToggleFullscreen}
                  className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default QuickAccess;
