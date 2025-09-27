'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share,
  Settings,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  FileText,
  Image,
  Video,
  MessageSquare,
  Bell,
  User,
  Home,
  Wrench,
  Hammer,
  Paintbrush,
  TreePine,
  Zap,
  Shield,
  Star,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  status: 'planning' | 'demolition' | 'foundation' | 'structure' | 'finishing' | 'completed';
  progress: number;
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  timeline: {
    startDate: string;
    endDate: string;
    currentPhase: string;
  };
  cameras: {
    id: string;
    name: string;
    location: string;
    isLive: boolean;
    lastUpdate: string;
  }[];
  milestones: {
    id: string;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
    description: string;
  }[];
  decisions: {
    id: string;
    title: string;
    description: string;
    options: {
      id: string;
      name: string;
      image: string;
      price: number;
      description: string;
    }[];
    dueDate: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

const ProjectControlCenter = () => {
  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'cameras' | 'timeline' | 'decisions' | 'finances'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Casa Tradicional Kusatsu',
      location: 'Kusatsu, Gunma',
      status: 'structure',
      progress: 65,
      budget: {
        total: 180000,
        spent: 117000,
        remaining: 63000
      },
      timeline: {
        startDate: '2024-01-15',
        endDate: '2024-08-30',
        currentPhase: 'Estructura y Techado'
      },
      cameras: [
        {
          id: 'cam1',
          name: 'Vista Frontal',
          location: 'Entrada principal',
          isLive: true,
          lastUpdate: '2024-03-15T10:30:00Z'
        },
        {
          id: 'cam2',
          name: 'Área de Trabajo',
          location: 'Interior - Sala principal',
          isLive: true,
          lastUpdate: '2024-03-15T10:28:00Z'
        },
        {
          id: 'cam3',
          name: 'Jardín Trasero',
          location: 'Exterior - Zona de jardín',
          isLive: false,
          lastUpdate: '2024-03-15T09:45:00Z'
        }
      ],
      milestones: [
        {
          id: 'milestone1',
          title: 'Demolición Completa',
          status: 'completed',
          dueDate: '2024-02-15',
          description: 'Remoción de elementos estructurales dañados'
        },
        {
          id: 'milestone2',
          title: 'Cimientos y Base',
          status: 'completed',
          dueDate: '2024-03-01',
          description: 'Construcción de cimientos y base estructural'
        },
        {
          id: 'milestone3',
          title: 'Estructura Principal',
          status: 'in-progress',
          dueDate: '2024-04-15',
          description: 'Construcción de estructura principal y techado'
        },
        {
          id: 'milestone4',
          title: 'Instalaciones',
          status: 'pending',
          dueDate: '2024-05-30',
          description: 'Instalación eléctrica, plomería y climatización'
        },
        {
          id: 'milestone5',
          title: 'Acabados Interiores',
          status: 'pending',
          dueDate: '2024-07-15',
          description: 'Pisos, paredes, pintura y detalles finales'
        }
      ],
      decisions: [
        {
          id: 'decision1',
          title: 'Tipo de Madera para Pisos',
          description: 'Selecciona el tipo de madera para los pisos principales',
          options: [
            {
              id: 'option1',
              name: 'Cedro Japonés',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 4500,
              description: 'Madera tradicional, duradera y auténtica'
            },
            {
              id: 'option2',
              name: 'Bambú Premium',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 3200,
              description: 'Sostenible, moderno y fácil mantenimiento'
            },
            {
              id: 'option3',
              name: 'Roble Europeo',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 3800,
              description: 'Clásico, elegante y de alta calidad'
            }
          ],
          dueDate: '2024-03-20',
          status: 'pending'
        },
        {
          id: 'decision2',
          title: 'Color de Pintura Exterior',
          description: 'Elige el color para la fachada principal',
          options: [
            {
              id: 'option1',
              name: 'Blanco Tradicional',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 1200,
              description: 'Clásico y atemporal'
            },
            {
              id: 'option2',
              name: 'Gris Moderno',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 1200,
              description: 'Contemporáneo y elegante'
            },
            {
              id: 'option3',
              name: 'Beige Natural',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              price: 1200,
              description: 'Armonioso con el entorno'
            }
          ],
          dueDate: '2024-03-25',
          status: 'pending'
        }
      ]
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20';
      case 'pending': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!currentProject) return null;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white">
                Centro de Control del Proyecto
              </h1>
              <p className="text-white/70">
                {currentProject.title} • {currentProject.location}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">En Vivo</span>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
            </button>

            <div className="relative">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Resumen', icon: Home },
              { id: 'cameras', label: 'Cámaras', icon: Camera },
              { id: 'timeline', label: 'Cronograma', icon: Calendar },
              { id: 'decisions', label: 'Decisiones', icon: MessageSquare },
              { id: 'finances', label: 'Finanzas', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                {tab.icon && <tab.icon className="w-5 h-5" />}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Progreso General</h3>
                    <span className="text-2xl font-bold text-yellow-400">{currentProject.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${currentProject.progress}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-sm">{currentProject.timeline.currentPhase}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Presupuesto</h3>
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Total:</span>
                      <span className="text-white">{formatCurrency(currentProject.budget.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Gastado:</span>
                      <span className="text-yellow-400">{formatCurrency(currentProject.budget.spent)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Restante:</span>
                      <span className="text-green-400">{formatCurrency(currentProject.budget.remaining)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Cronograma</h3>
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Inicio:</span>
                      <span className="text-white">{formatDate(currentProject.timeline.startDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Fin:</span>
                      <span className="text-white">{formatDate(currentProject.timeline.endDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Estado:</span>
                      <span className="text-yellow-400">En Progreso</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Ver Cámaras', icon: Camera, action: () => setActiveTab('cameras') },
                    { label: 'Revisar Decisiones', icon: MessageSquare, action: () => setActiveTab('decisions') },
                    { label: 'Ver Cronograma', icon: Calendar, action: () => setActiveTab('timeline') },
                    { label: 'Reporte Financiero', icon: DollarSign, action: () => setActiveTab('finances') }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
                    >
                      {action.icon && <action.icon className="w-8 h-8 text-white mx-auto mb-2" />}
                      <span className="text-white text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cameras' && (
            <motion.div
              key="cameras"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Camera List */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Cámaras Disponibles</h3>
                  {currentProject.cameras.map((camera) => (
                    <div
                      key={camera.id}
                      onClick={() => setSelectedCamera(camera.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedCamera === camera.id
                          ? 'border-yellow-400 bg-yellow-400/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{camera.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${
                          camera.isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                        }`} />
                      </div>
                      <p className="text-white/70 text-sm mb-2">{camera.location}</p>
                      <p className="text-white/50 text-xs">
                        Última actualización: {new Date(camera.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Camera Feed */}
                <div className="lg:col-span-2">
                  {selectedCamera ? (
                    <div className="bg-black rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70 mb-4">Feed de Cámara en Vivo</p>
                          <div className="flex items-center justify-center space-x-4">
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            >
                              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                            </button>
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                              <Download className="w-5 h-5 text-white" />
                            </button>
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                              <Share className="w-5 h-5 text-white" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Live Indicator */}
                        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">EN VIVO</span>
                        </div>

                        {/* Camera Controls */}
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <Settings className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <RefreshCw className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
                      <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Selecciona una cámara para ver el feed en vivo</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Hitos del Proyecto</h3>
                <div className="space-y-4">
                  {currentProject.milestones.map((milestone, index) => {
                    const StatusIcon = getStatusIcon(milestone.status);
                    return (
                      <div
                        key={milestone.id}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className={`p-2 rounded-full ${getStatusColor(milestone.status)}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{milestone.title}</h4>
                            <span className="text-white/70 text-sm">{formatDate(milestone.dueDate)}</span>
                          </div>
                          <p className="text-white/70 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'decisions' && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {currentProject.decisions.map((decision) => (
                <div key={decision.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{decision.title}</h3>
                      <p className="text-white/70 mb-2">{decision.description}</p>
                      <p className="text-white/50 text-sm">
                        Fecha límite: {formatDate(decision.dueDate)}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      decision.status === 'pending' 
                        ? 'bg-yellow-400/20 text-yellow-400' 
                        : 'bg-green-400/20 text-green-400'
                    }`}>
                      {decision.status === 'pending' ? 'Pendiente' : 'Aprobado'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {decision.options.map((option) => (
                      <div
                        key={option.id}
                        className="p-4 rounded-xl border border-white/20 hover:border-yellow-400/50 transition-colors cursor-pointer group"
                      >
                        <div className="aspect-video bg-white/10 rounded-lg mb-3 overflow-hidden">
                          <img
                            src={option.image}
                            alt={option.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-white font-medium mb-2">{option.name}</h4>
                        <p className="text-white/70 text-sm mb-3">{option.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-semibold">
                            {formatCurrency(option.price)}
                          </span>
                          <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                            Seleccionar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'finances' && (
            <motion.div
              key="finances"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Resumen Financiero</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Presupuesto Total:</span>
                      <span className="text-white font-semibold">{formatCurrency(currentProject.budget.total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Gastado:</span>
                      <span className="text-yellow-400 font-semibold">{formatCurrency(currentProject.budget.spent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Restante:</span>
                      <span className="text-green-400 font-semibold">{formatCurrency(currentProject.budget.remaining)}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                        style={{ width: `${(currentProject.budget.spent / currentProject.budget.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Gastos por Categoría</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Demolición', amount: 15000, percentage: 13 },
                      { category: 'Cimientos', amount: 25000, percentage: 21 },
                      { category: 'Estructura', amount: 35000, percentage: 30 },
                      { category: 'Instalaciones', amount: 20000, percentage: 17 },
                      { category: 'Acabados', amount: 22000, percentage: 19 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-white/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-white text-sm font-medium w-20 text-right">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Transacciones Recientes</h3>
                <div className="space-y-3">
                  {[
                    { date: '2024-03-15', description: 'Materiales de construcción', amount: 8500, type: 'expense' },
                    { date: '2024-03-14', description: 'Servicios de albañilería', amount: 3200, type: 'expense' },
                    { date: '2024-03-13', description: 'Permisos municipales', amount: 450, type: 'expense' },
                    { date: '2024-03-12', description: 'Inspección estructural', amount: 800, type: 'expense' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-white/50 text-sm">{formatDate(transaction.date)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {transaction.type === 'expense' ? (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        )}
                        <span className={`font-semibold ${
                          transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectControlCenter;
