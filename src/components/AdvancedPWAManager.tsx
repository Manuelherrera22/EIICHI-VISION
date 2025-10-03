'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useArquitecto } from '@/contexts/ArquitectoContext';
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
  CloudOff,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi as WifiIcon,
  Bluetooth,
  BluetoothOff,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Power,
  PowerOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Map,
  MapPin,
  Navigation,
  Compass,
  Route,
  Flag,
  Target,
  Crosshair,
  Focus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Split,
  Columns,
  Rows,
  Table,
  Server,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Star as StarIcon,
  Planet,
  Globe,
  TreePine,
  TreeDeciduous,
  Flower,
  Leaf,
  Bug,
  Fish,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Mouse,
  Squirrel,
  Fox,
  Bear,
  Lion,
  Tiger,
  Elephant,
  Whale,
  Dolphin,
  Shark,
  Octopus,
  Crab,
  Lobster,
  Shrimp,
  Butterfly,
  Bee,
  Ant,
  Spider,
  Snail,
  Turtle,
  Frog,
  Lizard,
  Snake,
  Crocodile,
  Penguin,
  Owl,
  Eagle,
  Hawk,
  Parrot,
  Peacock,
  Flamingo,
  Swan,
  Duck,
  Chicken,
  Rooster,
  Turkey,
  Pig,
  Cow,
  Horse,
  Sheep,
  Goat,
  Donkey,
  Camel,
  Giraffe,
  Zebra,
  Hippo,
  Rhino,
  Panda,
  Koala,
  Kangaroo,
  Sloth,
  Hedgehog,
  Raccoon,
  Skunk,
  Otter,
  Beaver,
  Chipmunk,
  Hamster,
  GuineaPig,
  Ferret,
  Weasel,
  Badger,
  Wolverine,
  Lynx,
  Bobcat,
  Cougar,
  Jaguar,
  Leopard,
  Cheetah,
  Hyena,
  Wolf,
  Coyote,
  Jackal,
  Dingo,
  Fox as FoxIcon,
  ArcticFox,
  RedFox,
  GrayFox,
  FennecFox,
  Bat,
  VampireBat,
  FruitBat,
  FlyingFox,
  Megabat,
  Microbat,
  Albatross,
  Pelican,
  Cormorant,
  Gannet,
  Booby,
  Frigatebird,
  Tropicbird,
  Petrel,
  Shearwater,
  Fulmar,
  StormPetrel,
  DivingPetrel,
  Prion,
  GadflyPetrel,
  BulwerPetrel,
  KermadecPetrel,
  HeraldPetrel,
  TrindadePetrel,
  FeaPetrel,
  ZinoPetrel,
  DesertasPetrel,
  BarauPetrel,
  JuanFernandezPetrel,
  StejnegerPetrel,
  CookPetrel,
  PycroftPetrel,
  BoninPetrel,
  BlackWingedPetrel,
  ChathamPetrel,
  PhoenixPetrel,
  MurphyPetrel,
  SolanderPetrel,
  ProvidencePetrel
} from 'lucide-react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWASettings {
  notifications: boolean;
  backgroundSync: boolean;
  offlineMode: boolean;
  autoUpdate: boolean;
  cacheStrategy: 'aggressive' | 'balanced' | 'conservative';
  dataSync: boolean;
  analytics: boolean;
  crashReporting: boolean;
}

interface PWAManagerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AdvancedPWAManager: React.FC<PWAManagerProps> = ({ 
  isOpen, 
  onClose, 
  className = '' 
}) => {
  const { t } = useLanguage();
  const { userProfile } = useArquitecto();
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<'active' | 'installing' | 'error' | 'none'>('none');
  const [cacheSize, setCacheSize] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error' | 'success'>('idle');
  const [settings, setSettings] = useState<PWASettings>({
    notifications: true,
    backgroundSync: true,
    offlineMode: true,
    autoUpdate: true,
    cacheStrategy: 'balanced',
    dataSync: true,
    analytics: true,
    crashReporting: true
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  
  const deferredPromptRef = useRef<any>(null);

  // Initialize PWA functionality
  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
      setInstallPrompt({
        prompt: async () => {
          if (deferredPromptRef.current) {
            deferredPromptRef.current.prompt();
            const { outcome } = await deferredPromptRef.current.userChoice;
            if (outcome === 'accepted') {
              setIsInstalling(true);
              simulateInstallProgress();
            }
            deferredPromptRef.current = null;
            setCanInstall(false);
          }
        },
        userChoice: deferredPromptRef.current.userChoice
      });
    });

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setServiceWorkerStatus('active');
      });
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('pwaSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load cache size
    updateCacheSize();

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('pwaSettings', JSON.stringify(settings));
  }, [settings]);

  const simulateInstallProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      setInstallProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsInstalling(false);
        setIsInstalled(true);
        setInstallProgress(0);
      }
    }, 200);
  };

  const updateCacheSize = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      setCacheSize(estimate.usage || 0);
    }
  };

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
    }
  };

  const handleUninstall = () => {
    // This would typically require user to manually uninstall from device
    setIsInstalled(false);
    setCanInstall(true);
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync time
      setLastSync(new Date());
      setSyncStatus('success');
      
      // Clear success status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const handleClearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      updateCacheSize();
    }
  };

  const handleUpdateSettings = (newSettings: Partial<PWASettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'installing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'syncing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{t('pwa.title')}</h2>
                    <p className="text-sm opacity-90">{t('pwa.subtitle')}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Installation Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('pwa.installationStatus')}
                  </h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-4">
                    {/* Install Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          isInstalled ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {isInstalled ? t('pwa.installed') : t('pwa.notInstalled')}
                        </span>
                      </div>
                      {isInstalled ? (
                        <button
                          onClick={handleUninstall}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                          {t('pwa.uninstall')}
                        </button>
                      ) : (
                        <button
                          onClick={handleInstall}
                          disabled={!canInstall || isInstalling}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          {isInstalling ? t('pwa.installing') : t('pwa.install')}
                        </button>
                      )}
                    </div>

                    {/* Install Progress */}
                    {isInstalling && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>{t('pwa.installing')}</span>
                          <span>{Math.round(installProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${installProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Service Worker Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.serviceWorker')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(serviceWorkerStatus)}`}>
                        {serviceWorkerStatus}
                      </span>
                    </div>

                    {/* Online Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.onlineStatus')}
                      </span>
                      <div className="flex items-center space-x-2">
                        {isOnline ? (
                          <Wifi size={16} className="text-green-600" />
                        ) : (
                          <WifiOff size={16} className="text-red-600" />
                        )}
                        <span className="text-sm text-gray-900 dark:text-white">
                          {isOnline ? t('pwa.online') : t('pwa.offline')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cache & Sync */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('pwa.cacheAndSync')}
                  </h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-4">
                    {/* Cache Size */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.cacheSize')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatBytes(cacheSize)}
                        </span>
                        <button
                          onClick={handleClearCache}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                          {t('pwa.clearCache')}
                        </button>
                      </div>
                    </div>

                    {/* Last Sync */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.lastSync')}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {lastSync ? lastSync.toLocaleString() : t('pwa.never')}
                      </span>
                    </div>

                    {/* Sync Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.syncStatus')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSyncStatusColor(syncStatus)}`}>
                          {syncStatus}
                        </span>
                        <button
                          onClick={handleSync}
                          disabled={syncStatus === 'syncing'}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
                        >
                          <RefreshCw size={16} className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('pwa.settings')}
                  </h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-4">
                    {/* Notifications */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.notifications')}
                      </span>
                      <button
                        onClick={() => handleUpdateSettings({ notifications: !settings.notifications })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.notifications ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    {/* Background Sync */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.backgroundSync')}
                      </span>
                      <button
                        onClick={() => handleUpdateSettings({ backgroundSync: !settings.backgroundSync })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.backgroundSync ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.backgroundSync ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    {/* Offline Mode */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.offlineMode')}
                      </span>
                      <button
                        onClick={() => handleUpdateSettings({ offlineMode: !settings.offlineMode })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.offlineMode ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.offlineMode ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    {/* Auto Update */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pwa.autoUpdate')}
                      </span>
                      <button
                        onClick={() => handleUpdateSettings({ autoUpdate: !settings.autoUpdate })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.autoUpdate ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.autoUpdate ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('pwa.advancedSettings')}
                    </h3>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {showAdvanced ? t('pwa.hideAdvanced') : t('pwa.showAdvanced')}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-4"
                      >
                        {/* Cache Strategy */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('pwa.cacheStrategy')}
                          </label>
                          <select
                            value={settings.cacheStrategy}
                            onChange={(e) => handleUpdateSettings({ cacheStrategy: e.target.value as any })}
                            className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="aggressive">{t('pwa.aggressive')}</option>
                            <option value="balanced">{t('pwa.balanced')}</option>
                            <option value="conservative">{t('pwa.conservative')}</option>
                          </select>
                        </div>

                        {/* Data Sync */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('pwa.dataSync')}
                          </span>
                          <button
                            onClick={() => handleUpdateSettings({ dataSync: !settings.dataSync })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              settings.dataSync ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              settings.dataSync ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>

                        {/* Analytics */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('pwa.analytics')}
                          </span>
                          <button
                            onClick={() => handleUpdateSettings({ analytics: !settings.analytics })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              settings.analytics ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              settings.analytics ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>

                        {/* Crash Reporting */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('pwa.crashReporting')}
                          </span>
                          <button
                            onClick={() => handleUpdateSettings({ crashReporting: !settings.crashReporting })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              settings.crashReporting ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              settings.crashReporting ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('pwa.version')}: 1.0.0
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSync}
                    disabled={syncStatus === 'syncing'}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {syncStatus === 'syncing' ? t('pwa.syncing') : t('pwa.syncNow')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedPWAManager;

