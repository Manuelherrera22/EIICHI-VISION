'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useArquitecto } from '@/contexts/ArquitectoContext';
import {
  Bell,
  BellRing,
  BellOff,
  Settings,
  X,
  Check,
  AlertTriangle,
  Info,
  Star,
  TrendingUp,
  Home,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Shield,
  Zap,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Smartphone,
  Desktop,
  Wifi,
  WifiOff,
  Clock,
  Filter,
  Search,
  Bookmark,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Mail,
  Phone,
  Video,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Volume1,
  Volume2 as Volume2Icon,
  Maximize2,
  Minimize2,
  Fullscreen,
  FullscreenExit,
  Monitor,
  Laptop,
  Tablet,
  Smartphone as SmartphoneIcon,
  Watch,
  Tv,
  Radio,
  Music,
  Image,
  File,
  Folder,
  Archive,
  Trash2,
  Edit,
  Copy,
  Cut,
  Paste,
  Save,
  Open,
  Close,
  Lock,
  Unlock,
  Key,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Users as UsersIcon,
  UserCircle,
  UserSquare,
  Crown,
  Award,
  Trophy,
  Medal,
  Star as StarIcon,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Wink,
  Kiss,
  Tongue,
  Sunglasses,
  Mask,
  Gem,
  Diamond,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Plus,
  Minus,
  Divide,
  Equal,
  Percent,
  Hash,
  AtSign,
  DollarSign as DollarSignIcon,
  Euro,
  Pound,
  Yen,
  Rupee,
  Bitcoin,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  Calculator,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
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
  Database,
  Server,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Star as StarIcon2,
  Planet,
  Globe,
  Map,
  Navigation,
  Compass,
  Route,
  Flag,
  Target,
  Crosshair,
  Focus,
  Zap as ZapIcon,
  Flame,
  Snowflake,
  Wind,
  Thermometer,
  Droplets,
  Umbrella,
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

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'property' | 'market' | 'investment' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    propertyId?: string;
    marketData?: any;
    investmentData?: any;
    systemData?: any;
  };
  expiresAt?: Date;
  persistent?: boolean;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  desktop: boolean;
  mobile: boolean;
  categories: {
    [key: string]: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

interface PushNotificationSystemProps {
  className?: string;
}

const PushNotificationSystem: React.FC<PushNotificationSystemProps> = ({ 
  className = '' 
}) => {
  const { t } = useLanguage();
  const { userProfile } = useArquitecto();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    vibration: true,
    desktop: true,
    mobile: true,
    categories: {
      properties: true,
      market: true,
      investment: true,
      system: true,
      alerts: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    frequency: 'immediate'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isOnline, setIsOnline] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const notificationSound = useRef<HTMLAudioElement>(null);

  // Initialize notification system
  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Load saved notifications
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp),
        expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined
      })));
    }

    // Load settings
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Initialize audio
    if (typeof window !== 'undefined') {
      notificationSound.current = new Audio('/sounds/notification.mp3');
      notificationSound.current.volume = 0.5;
    }

    // Start notification simulation
    startNotificationSimulation();

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  // Update unread count
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }, [settings]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      return permission;
    }
    return 'denied';
  };

  const createNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if permission granted
    if (permission === 'granted' && settings.enabled && settings.desktop) {
      const browserNotification = new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/tabijihouse-removebg-preview.png',
        badge: '/tabijihouse-removebg-preview.png',
        tag: newNotification.id,
        requireInteraction: newNotification.priority === 'urgent',
        silent: !settings.sound
      });

      browserNotification.onclick = () => {
        window.focus();
        if (newNotification.actionUrl) {
          window.location.href = newNotification.actionUrl;
        }
        markAsRead(newNotification.id);
        browserNotification.close();
      };

      // Auto close after 5 seconds unless urgent
      if (newNotification.priority !== 'urgent') {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }
    }

    // Play sound
    if (settings.sound && notificationSound.current) {
      notificationSound.current.play().catch(console.error);
    }

    // Vibrate if supported
    if (settings.vibration && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const startNotificationSimulation = () => {
    // Simulate various types of notifications
    const notificationTypes = [
      {
        type: 'property' as const,
        title: t('notifications.newProperty.title'),
        message: t('notifications.newProperty.message'),
        priority: 'medium' as const,
        category: 'properties'
      },
      {
        type: 'market' as const,
        title: t('notifications.marketUpdate.title'),
        message: t('notifications.marketUpdate.message'),
        priority: 'high' as const,
        category: 'market'
      },
      {
        type: 'investment' as const,
        title: t('notifications.investmentAlert.title'),
        message: t('notifications.investmentAlert.message'),
        priority: 'high' as const,
        category: 'investment'
      },
      {
        type: 'system' as const,
        title: t('notifications.systemUpdate.title'),
        message: t('notifications.systemUpdate.message'),
        priority: 'low' as const,
        category: 'system'
      }
    ];

    // Send notifications at random intervals
    const sendRandomNotification = () => {
      if (!settings.enabled) return;

      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const categoryEnabled = settings.categories[randomType.category];
      
      if (categoryEnabled) {
        createNotification(randomType);
      }

      // Schedule next notification (1-5 minutes)
      const nextDelay = Math.random() * 4 * 60 * 1000 + 60 * 1000;
      setTimeout(sendRandomNotification, nextDelay);
    };

    // Start after 10 seconds
    setTimeout(sendRandomNotification, 10000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info size={16} className="text-blue-600" />;
      case 'success': return <Check size={16} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'error': return <X size={16} className="text-red-600" />;
      case 'property': return <Home size={16} className="text-purple-600" />;
      case 'market': return <TrendingUp size={16} className="text-orange-600" />;
      case 'investment': return <DollarSign size={16} className="text-green-600" />;
      case 'system': return <Settings size={16} className="text-gray-600" />;
      default: return <Bell size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('notifications.justNow');
    if (minutes < 60) return t('notifications.minutesAgo', { count: minutes });
    if (hours < 24) return t('notifications.hoursAgo', { count: hours });
    return t('notifications.daysAgo', { count: days });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {permission === 'granted' && settings.enabled ? (
            <BellRing size={20} className="text-primary" />
          ) : (
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          )}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <Settings size={10} />
        </button>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('notifications.title')}
                </h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:text-primary/80"
                    >
                      {t('notifications.markAllRead')}
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <Bell size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t('notifications.noNotifications')}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-600">
                  {notifications.slice(0, 10).map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <button
                  onClick={clearAllNotifications}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  {t('notifications.clearAll')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('notifications.settings')}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Permission Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t('notifications.permission')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      permission === 'granted' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : permission === 'denied'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {permission}
                    </span>
                    {permission !== 'granted' && (
                      <button
                        onClick={requestNotificationPermission}
                        className="text-xs text-primary hover:text-primary/80"
                      >
                        {t('notifications.requestPermission')}
                      </button>
                    )}
                  </div>
                </div>

                {/* Enable Notifications */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t('notifications.enable')}
                  </span>
                  <button
                    onClick={() => updateSettings({ enabled: !settings.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Sound */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t('notifications.sound')}
                  </span>
                  <button
                    onClick={() => updateSettings({ sound: !settings.sound })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.sound ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.sound ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Vibration */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t('notifications.vibration')}
                  </span>
                  <button
                    onClick={() => updateSettings({ vibration: !settings.vibration })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.vibration ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.vibration ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {t('notifications.categories')}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(settings.categories).map(([category, enabled]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {t(`notifications.categories.${category}`)}
                        </span>
                        <button
                          onClick={() => updateSettings({
                            categories: {
                              ...settings.categories,
                              [category]: !enabled
                            }
                          })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            enabled ? 'bg-primary' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PushNotificationSystem;

