'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  Layout,
  Move,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Plus,
  X,
  Settings,
  BarChart3,
  Bell,
  Brain,
  Download,
  Home,
  TrendingUp,
  Users,
  Target,
  MessageCircle,
  FileText,
  Calendar,
  Shield,
  Star,
  Heart,
  Zap,
  Activity,
  Globe,
  Rocket,
  Crown,
  Sparkles,
  MousePointer,
  Maximize2,
  Minimize2,
  RefreshCw,
  Palette,
  Layers,
  Component,
  Box,
  Square,
  RectangleHorizontal,
  RectangleVertical
} from 'lucide-react';

interface Widget {
  id: string;
  type: 'metric' | 'chart' | 'alert' | 'prediction' | 'action' | 'custom';
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
  isVisible: boolean;
  isPinned: boolean;
  color: string;
  data?: any;
  customComponent?: React.ComponentType<any>;
}

interface DashboardLayout {
  id: string;
  name: string;
  widgets: Widget[];
  createdAt: Date;
  isDefault: boolean;
}

interface CustomizableDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (layout: DashboardLayout) => void;
}

const CustomizableDashboard: React.FC<CustomizableDashboardProps> = ({ isOpen, onClose, onSave }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [layouts, setLayouts] = useState<DashboardLayout[]>([]);
  const [activeLayout, setActiveLayout] = useState<string>('default');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [gridSize, setGridSize] = useState(12);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [animations, setAnimations] = useState(true);

  // Widgets disponibles
  const availableWidgets: Omit<Widget, 'id' | 'position'>[] = [
    {
      type: 'metric',
      title: 'IVI Score',
      description: 'Índice de Viabilidad de Inversión',
      icon: TrendingUp,
      size: 'small',
      isVisible: true,
      isPinned: false,
      color: 'blue',
      data: { value: 85, trend: '+5%' }
    },
    {
      type: 'metric',
      title: 'IVM Score',
      description: 'Índice de Viabilidad Migratoria',
      icon: Users,
      size: 'small',
      isVisible: true,
      isPinned: false,
      color: 'green',
      data: { value: 78, trend: '+3%' }
    },
    {
      type: 'metric',
      title: 'ISE Score',
      description: 'Índice de Sincronización de Estilo',
      icon: Target,
      size: 'small',
      isVisible: true,
      isPinned: false,
      color: 'purple',
      data: { value: 92, trend: '+7%' }
    },
    {
      type: 'chart',
      title: 'Métricas en Tiempo Real',
      description: 'Gráficos interactivos de rendimiento',
      icon: BarChart3,
      size: 'large',
      isVisible: true,
      isPinned: false,
      color: 'indigo',
      data: { type: 'line', points: 30 }
    },
    {
      type: 'alert',
      title: 'Alertas Inteligentes',
      description: 'Notificaciones y acciones requeridas',
      icon: Bell,
      size: 'medium',
      isVisible: true,
      isPinned: false,
      color: 'red',
      data: { count: 5, priority: 'high' }
    },
    {
      type: 'prediction',
      title: 'Predicciones de IA',
      description: 'Análisis predictivo avanzado',
      icon: Brain,
      size: 'large',
      isVisible: true,
      isPinned: false,
      color: 'pink',
      data: { confidence: 87, predictions: 3 }
    },
    {
      type: 'action',
      title: 'Exportar Reportes',
      description: 'Generar documentos en múltiples formatos',
      icon: Download,
      size: 'medium',
      isVisible: true,
      isPinned: false,
      color: 'orange',
      data: { formats: ['PDF', 'Excel', 'PNG'] }
    },
    {
      type: 'action',
      title: 'Chatbot Inteligente',
      description: 'Asistente especializado en inversiones',
      icon: MessageCircle,
      size: 'medium',
      isVisible: true,
      isPinned: false,
      color: 'teal',
      data: { status: 'online', responses: 156 }
    },
    {
      type: 'custom',
      title: 'Widget Personalizado',
      description: 'Crea tu propio widget',
      icon: Component,
      size: 'medium',
      isVisible: true,
      isPinned: false,
      color: 'gray',
      data: { custom: true }
    }
  ];

  useEffect(() => {
    // Cargar layouts guardados
    const savedLayouts = localStorage.getItem('dashboard-layouts');
    if (savedLayouts) {
      const parsed = JSON.parse(savedLayouts);
      setLayouts(parsed);
      
      // Cargar layout activo
      const active = parsed.find((l: DashboardLayout) => l.id === activeLayout);
      if (active) {
        setWidgets(active.widgets);
      }
    } else {
      // Layout por defecto
      const defaultLayout: DashboardLayout = {
        id: 'default',
        name: 'Layout por Defecto',
        widgets: availableWidgets.slice(0, 6).map((widget, index) => ({
          ...widget,
          id: `widget-${index}`,
          position: { x: (index % 3) * 4, y: Math.floor(index / 3) * 3 }
        })),
        createdAt: new Date(),
        isDefault: true
      };
      setLayouts([defaultLayout]);
      setWidgets(defaultLayout.widgets);
    }
  }, []);

  const addWidget = (widgetTemplate: Omit<Widget, 'id' | 'position'>) => {
    const newWidget: Widget = {
      ...widgetTemplate,
      id: `widget-${Date.now()}`,
      position: { x: 0, y: 0 }
    };
    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetPalette(false);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const updateWidgetPosition = (widgetId: string, position: { x: number; y: number }) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, position } : w
    ));
  };

  const updateWidgetSize = (widgetId: string, size: Widget['size']) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, size } : w
    ));
  };

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, isVisible: !w.isVisible } : w
    ));
  };

  const toggleWidgetPin = (widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, isPinned: !w.isPinned } : w
    ));
  };

  const saveLayout = () => {
    const layout: DashboardLayout = {
      id: `layout-${Date.now()}`,
      name: `Layout ${layouts.length + 1}`,
      widgets: widgets,
      createdAt: new Date(),
      isDefault: false
    };
    
    const updatedLayouts = [...layouts, layout];
    setLayouts(updatedLayouts);
    setActiveLayout(layout.id);
    localStorage.setItem('dashboard-layouts', JSON.stringify(updatedLayouts));
    onSave(layout);
  };

  const loadLayout = (layoutId: string) => {
    const layout = layouts.find(l => l.id === layoutId);
    if (layout) {
      setWidgets(layout.widgets);
      setActiveLayout(layoutId);
    }
  };

  const resetToDefault = () => {
    const defaultLayout = layouts.find(l => l.isDefault);
    if (defaultLayout) {
      setWidgets(defaultLayout.widgets);
      setActiveLayout(defaultLayout.id);
    }
  };

  const getSizeClasses = (size: Widget['size']) => {
    switch (size) {
      case 'small': return 'col-span-3 row-span-2';
      case 'medium': return 'col-span-6 row-span-3';
      case 'large': return 'col-span-9 row-span-4';
      case 'full': return 'col-span-12 row-span-5';
      default: return 'col-span-6 row-span-3';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      indigo: 'bg-indigo-500 text-white',
      red: 'bg-red-500 text-white',
      pink: 'bg-pink-500 text-white',
      orange: 'bg-orange-500 text-white',
      teal: 'bg-teal-500 text-white',
      gray: 'bg-gray-500 text-white'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500 text-white';
  };

  const renderWidget = (widget: Widget) => {
    const Icon = widget.icon;
    
    return (
      <motion.div
        key={widget.id}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`${getSizeClasses(widget.size)} ${getColorClasses(widget.color)} rounded-xl p-4 relative group ${
          isEditMode ? 'cursor-move' : 'cursor-pointer'
        } ${!widget.isVisible ? 'opacity-50' : ''}`}
        whileHover={{ scale: isEditMode ? 1.02 : 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Widget Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <h3 className="font-semibold text-sm">{widget.title}</h3>
            {widget.isPinned && (
              <Star className="w-4 h-4 fill-current" />
            )}
          </div>
          
          {isEditMode && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleWidgetVisibility(widget.id)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {widget.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
              <button
                onClick={() => toggleWidgetPin(widget.id)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <Star className={`w-3 h-3 ${widget.isPinned ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => removeWidget(widget.id)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Widget Content */}
        <div className="flex-1">
          <p className="text-xs opacity-90 mb-3">{widget.description}</p>
          
          {widget.type === 'metric' && (
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">{widget.data?.value}%</div>
              <div className="text-xs opacity-75">{widget.data?.trend}</div>
            </div>
          )}
          
          {widget.type === 'chart' && (
            <div className="h-20 bg-white/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 opacity-50" />
            </div>
          )}
          
          {widget.type === 'alert' && (
            <div className="text-center">
              <div className="text-lg font-bold mb-1">{widget.data?.count}</div>
              <div className="text-xs opacity-75">Alertas activas</div>
            </div>
          )}
          
          {widget.type === 'prediction' && (
            <div className="text-center">
              <div className="text-lg font-bold mb-1">{widget.data?.confidence}%</div>
              <div className="text-xs opacity-75">Confianza IA</div>
            </div>
          )}
          
          {widget.type === 'action' && (
            <div className="text-center">
              <div className="text-sm font-medium mb-1">{widget.data?.formats?.join(', ') || 'Disponible'}</div>
              <div className="text-xs opacity-75">Hacer clic para usar</div>
            </div>
          )}
          
          {widget.type === 'custom' && (
            <div className="text-center">
              <Component className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-xs opacity-75">Personalizar</div>
            </div>
          )}
        </div>

        {/* Resize Handles */}
        {isEditMode && (
          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-1">
              {['small', 'medium', 'large'].map(size => (
                <button
                  key={size}
                  onClick={() => updateWidgetSize(widget.id, size as Widget['size'])}
                  className={`w-2 h-2 rounded-full ${
                    widget.size === size ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Layout className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Dashboard Personalizable</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {widgets.length} widgets
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isEditMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isEditMode ? <Save className="w-4 h-4 mr-2" /> : <Move className="w-4 h-4 mr-2" />}
                {isEditMode ? 'Guardar' : 'Editar'}
              </button>

              {isEditMode && (
                <button
                  onClick={() => setShowWidgetPalette(!showWidgetPalette)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Widget
                </button>
              )}

              <select
                value={activeLayout}
                onChange={(e) => loadLayout(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {layouts.map(layout => (
                  <option key={layout.id} value={layout.id}>
                    {layout.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Tema:</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <button
                onClick={resetToDefault}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Resetear
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Widget Palette */}
            {showWidgetPalette && (
              <div className="w-80 border-r border-gray-200 p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Widgets Disponibles</h3>
                <div className="space-y-3">
                  {availableWidgets.map((widget, index) => {
                    const Icon = widget.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => addWidget(widget)}
                        className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(widget.color)}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900">{widget.title}</h4>
                            <p className="text-xs text-gray-600">{widget.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dashboard Grid */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className={`grid grid-cols-12 gap-4 h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <AnimatePresence>
                  {widgets.filter(w => w.isVisible).map(renderWidget)}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {isEditMode ? 'Modo Edición - Arrastra para reorganizar' : 'Modo Vista - Haz clic en widgets para interactuar'}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={saveLayout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Layout
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomizableDashboard;
