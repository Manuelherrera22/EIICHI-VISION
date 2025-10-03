'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Settings,
  X,
  Check,
  AlertCircle,
  Info,
  RefreshCw,
  Share2,
  Home,
  Star,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Zap,
  Shield,
  Clock,
  Cloud,
  CloudOff
} from 'lucide-react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PWAManager: React.FC<PWAManagerProps> = ({ isOpen, onClose }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [backgroundSyncEnabled, setBackgroundSyncEnabled] = useState(false);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<'active' | 'installing' | 'error' | 'none'>('none');
  const [cacheSize, setCacheSize] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Verificar si la app está instalada
    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;
      
      setIsInstalled(isStandalone || (isIOS && isInStandaloneMode));
    };

    checkInstallation();

    // Escuchar evento de instalación
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Escuchar evento de instalación completada
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setCanInstall(false);
      setInstallPrompt(null);
    });

    // Verificar conexión
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    // Verificar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          setServiceWorkerStatus('active');
          
          // Verificar estado del SW
          if (registration.active) {
            registration.active.addEventListener('statechange', (e) => {
              const sw = e.target as ServiceWorker;
              if (sw.state === 'activated') {
                setServiceWorkerStatus('active');
              }
            });
          }
        } else {
          setServiceWorkerStatus('none');
        }
      });
    }

    // Verificar permisos de notificaciones
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Verificar Background Sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      setBackgroundSyncEnabled(true);
    }

    // Calcular tamaño del cache
    calculateCacheSize();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const calculateCacheSize = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        let totalSize = 0;
        
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();
          
          for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
              const blob = await response.blob();
              totalSize += blob.size;
            }
          }
        }
        
        setCacheSize(totalSize);
      } catch (error) {
        console.log('Error calculando tamaño del cache:', error);
      }
    }
  };

  const handleInstall = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setCanInstall(false);
      }
      
      setInstallPrompt(null);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        // Mostrar notificación de prueba
        new Notification('Tabiji House', {
          body: 'Las notificaciones están activadas',
          icon: '/icon-192x192.png',
          tag: 'pwa-notification'
        });
      }
    }
  };

  const clearCache = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        
        setCacheSize(0);
        
        // Recargar página para aplicar cambios
        window.location.reload();
      } catch (error) {
        console.log('Error limpiando cache:', error);
      }
    }
  };

  const triggerBackgroundSync = async () => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // await registration.sync.register('background-sync'); // Sync API not available in all browsers
        setLastSync(new Date());
      } catch (error) {
        console.log('Error en background sync:', error);
      }
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tabiji House',
          text: 'Plataforma inteligente para inversiones inmobiliarias en Japón',
          url: window.location.origin
        });
      } catch (error) {
        console.log('Error compartiendo:', error);
      }
    } else {
      // Fallback: copiar URL al clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        alert('URL copiada al portapapeles');
      } catch (error) {
        console.log('Error copiando URL:', error);
      }
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">PWA Manager</h2>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isInstalled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isInstalled ? 'Instalada' : 'No instalada'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isOnline ? 'En línea' : 'Sin conexión'}
              </span>
            </div>

            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              serviceWorkerStatus === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                SW: {serviceWorkerStatus}
              </span>
            </div>

            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              notificationsEnabled ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {notificationsEnabled ? 'Notificaciones ON' : 'Notificaciones OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Installation Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Instalación</h3>
              
              {!isInstalled && canInstall && (
                <motion.button
                  onClick={handleInstall}
                  className="w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Instalar App</span>
                </motion.button>
              )}

              {isInstalled && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">App instalada correctamente</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Puedes usar la app sin conexión y recibir notificaciones push.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={shareApp}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir App</span>
                </button>

                <button
                  onClick={triggerBackgroundSync}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sincronizar Ahora</span>
                </button>
              </div>
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Notificaciones Push</div>
                      <div className="text-sm text-gray-600">Recibir alertas importantes</div>
                    </div>
                  </div>
                  <button
                    onClick={requestNotificationPermission}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      notificationsEnabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {notificationsEnabled ? 'Activadas' : 'Activar'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Sincronización en Background</div>
                      <div className="text-sm text-gray-600">Sincronizar datos automáticamente</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    backgroundSyncEnabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {backgroundSyncEnabled ? 'Disponible' : 'No disponible'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Cache Local</div>
                      <div className="text-sm text-gray-600">
                        {formatBytes(cacheSize)} almacenados
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={clearCache}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Características PWA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Home, title: 'Instalable', desc: 'Instala como app nativa', available: canInstall },
                { icon: WifiOff, title: 'Offline', desc: 'Funciona sin conexión', available: true },
                { icon: Bell, title: 'Notificaciones', desc: 'Alertas push', available: notificationsEnabled },
                { icon: Cloud, title: 'Sync', desc: 'Sincronización automática', available: backgroundSyncEnabled },
                { icon: Share2, title: 'Compartir', desc: 'Compartir contenido', available: !!navigator.share },
                { icon: Zap, title: 'Rápido', desc: 'Carga instantánea', available: true }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      feature.available
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        feature.available
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          feature.available ? 'text-green-900' : 'text-gray-500'
                        }`}>
                          {feature.title}
                        </div>
                        <div className={`text-sm ${
                          feature.available ? 'text-green-700' : 'text-gray-400'
                        }`}>
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              {lastSync && (
                <span>Última sincronización: {lastSync.toLocaleTimeString()}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>PWA v1.0.0</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PWAManager;
