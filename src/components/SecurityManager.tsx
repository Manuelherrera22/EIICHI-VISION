'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Smartphone,
  Mail,
  Fingerprint,
  ShieldCheck,
  AlertCircle,
  Settings,
  X,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Download,
  Upload,
  Database,
  Network,
  Activity,
  BarChart3,
  Calendar,
  MapPin,
  Globe,
  Server,
  HardDrive,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  LogOut,
  LogIn,
  UserCheck,
  UserX,
  History,
  FileText,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MoreVertical,
  Copy,
  ExternalLink,
  Info,
  HelpCircle,
  Zap,
  Crown,
  Star,
  Heart,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | '2fa_enabled' | '2fa_disabled' | 'suspicious_activity' | 'data_access' | 'export' | 'import';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  device?: string;
  status: 'success' | 'failed' | 'pending';
  details?: any;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  notificationsEnabled: boolean;
  auditLogging: boolean;
  dataEncryption: boolean;
  autoLogout: boolean;
  deviceTrust: boolean;
}

interface SecurityManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSecurityEvent: (event: SecurityEvent) => void;
}

const SecurityManager: React.FC<SecurityManagerProps> = ({ isOpen, onClose, onSecurityEvent }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'settings' | 'devices' | 'audit'>('overview');
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    biometricEnabled: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    notificationsEnabled: true,
    auditLogging: true,
    dataEncryption: true,
    autoLogout: true,
    deviceTrust: false
  });
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Generar eventos de seguridad simulados
  const generateSecurityEvents = (): SecurityEvent[] => {
    const now = new Date();
    return [
      {
        id: 'evt-1',
        type: 'login',
        title: 'Inicio de sesión exitoso',
        description: 'Usuario inició sesión desde dispositivo confiable',
        severity: 'low',
        timestamp: new Date(now.getTime() - 5 * 60 * 1000),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Tokio, Japón',
        device: 'Windows PC',
        status: 'success'
      },
      {
        id: 'evt-2',
        type: 'failed_login',
        title: 'Intento de inicio de sesión fallido',
        description: 'Credenciales incorrectas detectadas',
        severity: 'medium',
        timestamp: new Date(now.getTime() - 15 * 60 * 1000),
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)',
        location: 'Osaka, Japón',
        device: 'iPhone',
        status: 'failed'
      },
      {
        id: 'evt-3',
        type: '2fa_enabled',
        title: 'Autenticación de dos factores activada',
        description: '2FA configurado exitosamente',
        severity: 'low',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        location: 'Tokio, Japón',
        device: 'Windows PC',
        status: 'success'
      },
      {
        id: 'evt-4',
        type: 'suspicious_activity',
        title: 'Actividad sospechosa detectada',
        description: 'Múltiples intentos de acceso desde ubicaciones diferentes',
        severity: 'high',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        ipAddress: '45.67.89.123',
        userAgent: 'Mozilla/5.0 (Android 11; Mobile)',
        location: 'Kyoto, Japón',
        device: 'Android Phone',
        status: 'pending'
      },
      {
        id: 'evt-5',
        type: 'data_access',
        title: 'Acceso a datos sensibles',
        description: 'Usuario accedió a información financiera confidencial',
        severity: 'medium',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        location: 'Tokio, Japón',
        device: 'Windows PC',
        status: 'success'
      }
    ];
  };

  useEffect(() => {
    setSecurityEvents(generateSecurityEvents());
    calculateSecurityScore();
  }, []);

  useEffect(() => {
    setFilteredEvents(securityEvents);
  }, [securityEvents]);

  const calculateSecurityScore = () => {
    let score = 0;
    
    // Factores de seguridad
    if (settings.twoFactorEnabled) score += 25;
    if (settings.biometricEnabled) score += 20;
    if (settings.auditLogging) score += 15;
    if (settings.dataEncryption) score += 15;
    if (settings.autoLogout) score += 10;
    if (settings.deviceTrust) score += 10;
    if (settings.notificationsEnabled) score += 5;
    
    setSecurityScore(score);
    
    // Determinar nivel de amenaza
    if (score >= 80) setThreatLevel('low');
    else if (score >= 60) setThreatLevel('medium');
    else setThreatLevel('high');
  };

  const runSecurityScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Generar nuevo evento de escaneo
          const scanEvent: SecurityEvent = {
            id: `scan-${Date.now()}`,
            type: 'suspicious_activity',
            title: 'Escaneo de seguridad completado',
            description: 'No se detectaron amenazas críticas',
            severity: 'low',
            timestamp: new Date(),
            ipAddress: '192.168.1.100',
            userAgent: navigator.userAgent,
            location: 'Tokio, Japón',
            device: 'Windows PC',
            status: 'success'
          };
          
          setSecurityEvents(prev => [scanEvent, ...prev]);
          onSecurityEvent(scanEvent);
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const updateSetting = (key: keyof SecuritySettings, value: any) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      calculateSecurityScore();
      return updated;
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return LogIn;
      case 'logout': return LogOut;
      case 'failed_login': return UserX;
      case 'password_change': return Key;
      case '2fa_enabled': return ShieldCheck;
      case '2fa_disabled': return Shield;
      case 'suspicious_activity': return AlertTriangle;
      case 'data_access': return Database;
      case 'export': return Download;
      case 'import': return Upload;
      default: return Activity;
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Centro de Seguridad</h2>
              <span className={`px-2 py-1 text-xs rounded-full ${
                threatLevel === 'low' ? 'bg-green-100 text-green-800' :
                threatLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {threatLevel === 'low' ? 'Seguro' : threatLevel === 'medium' ? 'Moderado' : 'Alto Riesgo'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Security Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{securityScore}/100</div>
                <div className="text-sm text-gray-600">Puntuación de Seguridad</div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${securityScore}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <button
              onClick={runSecurityScan}
              disabled={isScanning}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Escanear Ahora</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Ejecutando escaneo de seguridad...</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart3 },
              { id: 'events', label: 'Eventos', icon: Activity },
              { id: 'settings', label: 'Configuración', icon: Settings },
              { id: 'devices', label: 'Dispositivos', icon: Smartphone },
              { id: 'audit', label: 'Auditoría', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Security Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h3 className="font-semibold text-green-900">Seguridad Activa</h3>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">8</div>
                      <div className="text-sm text-green-700">Medidas implementadas</div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        <h3 className="font-semibold text-yellow-900">Alertas</h3>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 mb-1">2</div>
                      <div className="text-sm text-yellow-700">Requieren atención</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Activity className="w-6 h-6 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Actividad</h3>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">24h</div>
                      <div className="text-sm text-blue-700">Últimas 24 horas</div>
                    </div>
                  </div>

                  {/* Recent Events */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos Recientes</h3>
                    <div className="space-y-3">
                      {securityEvents.slice(0, 5).map((event) => {
                        const TypeIcon = getTypeIcon(event.type);
                        return (
                          <div
                            key={event.id}
                            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              event.severity === 'critical' ? 'bg-red-100 text-red-600' :
                              event.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                              event.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              <TypeIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-600">{event.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">{event.timestamp.toLocaleTimeString()}</div>
                              <div className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(event.severity)}`}>
                                {event.severity}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Eventos de Seguridad</h3>
                    <div className="flex items-center space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option value="all">Todos los eventos</option>
                        <option value="critical">Críticos</option>
                        <option value="high">Altos</option>
                        <option value="medium">Medios</option>
                        <option value="low">Bajos</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredEvents.map((event) => {
                      const TypeIcon = getTypeIcon(event.type);
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventDetails(true);
                          }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                event.severity === 'critical' ? 'bg-red-100 text-red-600' :
                                event.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                                event.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-green-100 text-green-600'
                              }`}>
                                <TypeIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">{event.timestamp.toLocaleString()}</div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(event.severity)}`}>
                                  {event.severity}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                                  {event.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Configuración de Seguridad</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        key: 'twoFactorEnabled',
                        title: 'Autenticación de Dos Factores',
                        description: 'Requiere código adicional para iniciar sesión',
                        icon: ShieldCheck
                      },
                      {
                        key: 'biometricEnabled',
                        title: 'Autenticación Biométrica',
                        description: 'Usar huella dactilar o reconocimiento facial',
                        icon: Fingerprint
                      },
                      {
                        key: 'auditLogging',
                        title: 'Registro de Auditoría',
                        description: 'Registrar todas las actividades del usuario',
                        icon: FileText
                      },
                      {
                        key: 'dataEncryption',
                        title: 'Cifrado de Datos',
                        description: 'Cifrar datos sensibles en tránsito y reposo',
                        icon: Lock
                      },
                      {
                        key: 'autoLogout',
                        title: 'Cierre Automático',
                        description: 'Cerrar sesión automáticamente por inactividad',
                        icon: Clock
                      },
                      {
                        key: 'notificationsEnabled',
                        title: 'Notificaciones de Seguridad',
                        description: 'Recibir alertas de actividades sospechosas',
                        icon: Bell
                      }
                    ].map((setting) => {
                      const Icon = setting.icon;
                      return (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{setting.title}</h4>
                              <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => updateSetting(setting.key as keyof SecuritySettings, !settings[setting.key as keyof SecuritySettings])}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              settings[setting.key as keyof SecuritySettings]
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {settings[setting.key as keyof SecuritySettings] ? 'Activado' : 'Desactivado'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Event Details Panel */}
            {showEventDetails && selectedEvent && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-96 border-l border-gray-200 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalles del Evento</h3>
                  <button
                    onClick={() => setShowEventDetails(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Información General</h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium">{selectedEvent.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Severidad:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(selectedEvent.severity)}`}>
                          {selectedEvent.severity}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Estado:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedEvent.status)}`}>
                          {selectedEvent.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Detalles Técnicos</h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IP:</span>
                        <span className="font-medium">{selectedEvent.ipAddress}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ubicación:</span>
                        <span className="font-medium">{selectedEvent.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Dispositivo:</span>
                        <span className="font-medium">{selectedEvent.device}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Timestamp:</span>
                        <span className="font-medium">{selectedEvent.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">User Agent</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <code className="text-xs text-gray-700 break-all">
                        {selectedEvent.userAgent}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Centro de Seguridad v2.0 - Monitoreo en tiempo real
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Protección activa</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecurityManager;
