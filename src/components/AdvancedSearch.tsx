'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useArquitecto } from '@/contexts/ArquitectoContext';
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
  AtSign,
  MapPin,
  DollarSign,
  Building,
  Mic,
  MicOff,
  SlidersHorizontal,
  Grid3X3,
  List,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Zap,
  Sparkles,
  Wand2,
  Globe,
  Layers,
  Database,
  Cpu,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Heart,
  ThumbsUp,
  Share2,
  Copy,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Save,
  Trash2,
  Edit,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Lock,
  Unlock,
  Key,
  User,
  Mail,
  Phone,
  Map,
  Navigation,
  Compass,
  Route,
  Flag,
  Award,
  Trophy,
  Gift,
  ShoppingCart,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  Calculator,
  Percent,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
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
  Crown,
  Gem,
  Zap as ZapIcon,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
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
  ProvidencePetrel,
  KermadecPetrel as KermadecPetrel2,
  HeraldPetrel as HeraldPetrel2,
  TrindadePetrel as TrindadePetrel2,
  FeaPetrel as FeaPetrel2,
  ZinoPetrel as ZinoPetrel2,
  DesertasPetrel as DesertasPetrel2,
  BarauPetrel as BarauPetrel2,
  JuanFernandezPetrel as JuanFernandezPetrel2,
  StejnegerPetrel as StejnegerPetrel2,
  CookPetrel as CookPetrel2,
  PycroftPetrel as PycroftPetrel2,
  BoninPetrel as BoninPetrel2,
  BlackWingedPetrel as BlackWingedPetrel2,
  ChathamPetrel as ChathamPetrel2,
  PhoenixPetrel as PhoenixPetrel2,
  MurphyPetrel as MurphyPetrel2,
  SolanderPetrel as SolanderPetrel2,
  ProvidencePetrel as ProvidencePetrel2
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'section' | 'metric' | 'alert' | 'prediction' | 'action' | 'setting' | 'property' | 'analysis' | 'report' | 'user';
  title: string;
  description: string;
  category: string;
  url?: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  lastAccessed?: Date;
  isFavorite?: boolean;
  metadata?: {
    score?: number;
    relevance?: number;
    source?: string;
    actionType?: string;
    propertyId?: string;
    analysisId?: string;
    reportId?: string;
    userId?: string;
  };
}

interface SearchFilter {
  id: string;
  label: string;
  type: 'category' | 'type' | 'priority' | 'date' | 'tag' | 'user';
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
  selected: string[];
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ 
  isOpen, 
  onClose, 
  className = '' 
}) => {
  const { t } = useLanguage();
  const { userProfile } = useArquitecto();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'alphabetical' | 'priority'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history
  const saveSearchHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Search filters
  const [filters, setFilters] = useState<SearchFilter[]>([
    {
      id: 'category',
      label: t('search.filters.category'),
      type: 'category',
      options: [
        { value: 'dashboard', label: t('search.categories.dashboard'), count: 0 },
        { value: 'properties', label: t('search.categories.properties'), count: 0 },
        { value: 'analytics', label: t('search.categories.analytics'), count: 0 },
        { value: 'reports', label: t('search.categories.reports'), count: 0 },
        { value: 'settings', label: t('search.categories.settings'), count: 0 }
      ],
      selected: []
    },
    {
      id: 'type',
      label: t('search.filters.type'),
      type: 'type',
      options: [
        { value: 'section', label: t('search.types.section'), count: 0 },
        { value: 'metric', label: t('search.types.metric'), count: 0 },
        { value: 'property', label: t('search.types.property'), count: 0 },
        { value: 'analysis', label: t('search.types.analysis'), count: 0 },
        { value: 'report', label: t('search.types.report'), count: 0 }
      ],
      selected: []
    },
    {
      id: 'priority',
      label: t('search.filters.priority'),
      type: 'priority',
      options: [
        { value: 'high', label: t('search.priorities.high'), count: 0 },
        { value: 'medium', label: t('search.priorities.medium'), count: 0 },
        { value: 'low', label: t('search.priorities.low'), count: 0 }
      ],
      selected: []
    }
  ]);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: 'realtime-metrics',
      type: 'section',
      title: t('search.results.realtimeMetrics'),
      description: t('search.results.realtimeMetricsDesc'),
      category: 'dashboard',
      icon: Activity,
      priority: 'high',
      tags: ['metrics', 'real-time', 'dashboard'],
      lastAccessed: new Date(),
      metadata: { score: 0.95, relevance: 0.9 }
    },
    {
      id: 'property-opportunities',
      type: 'section',
      title: t('search.results.propertyOpportunities'),
      description: t('search.results.propertyOpportunitiesDesc'),
      category: 'properties',
      icon: Home,
      priority: 'high',
      tags: ['properties', 'opportunities', 'investment'],
      lastAccessed: new Date(),
      metadata: { score: 0.9, relevance: 0.85 }
    },
    {
      id: 'ai-predictions',
      type: 'section',
      title: t('search.results.aiPredictions'),
      description: t('search.results.aiPredictionsDesc'),
      category: 'analytics',
      icon: Brain,
      priority: 'high',
      tags: ['ai', 'predictions', 'analytics'],
      lastAccessed: new Date(),
      metadata: { score: 0.88, relevance: 0.8 }
    },
    {
      id: 'roi-calculator',
      type: 'analysis',
      title: t('search.results.roiCalculator'),
      description: t('search.results.roiCalculatorDesc'),
      category: 'analytics',
      icon: Calculator,
      priority: 'medium',
      tags: ['roi', 'calculator', 'investment'],
      lastAccessed: new Date(),
      metadata: { score: 0.85, relevance: 0.75 }
    },
    {
      id: 'market-analysis',
      type: 'report',
      title: t('search.results.marketAnalysis'),
      description: t('search.results.marketAnalysisDesc'),
      category: 'reports',
      icon: BarChart3,
      priority: 'medium',
      tags: ['market', 'analysis', 'report'],
      lastAccessed: new Date(),
      metadata: { score: 0.8, relevance: 0.7 }
    },
    {
      id: 'smart-alerts',
      type: 'section',
      title: t('search.results.smartAlerts'),
      description: t('search.results.smartAlertsDesc'),
      category: 'dashboard',
      icon: Bell,
      priority: 'high',
      tags: ['alerts', 'notifications', 'smart'],
      lastAccessed: new Date(),
      metadata: { score: 0.82, relevance: 0.78 }
    },
    {
      id: 'export-reports',
      type: 'action',
      title: t('search.results.exportReports'),
      description: t('search.results.exportReportsDesc'),
      category: 'reports',
      icon: Download,
      priority: 'medium',
      tags: ['export', 'reports', 'download'],
      lastAccessed: new Date(),
      metadata: { score: 0.75, relevance: 0.65 }
    },
    {
      id: 'user-settings',
      type: 'setting',
      title: t('search.results.userSettings'),
      description: t('search.results.userSettingsDesc'),
      category: 'settings',
      icon: Settings,
      priority: 'low',
      tags: ['settings', 'user', 'preferences'],
      lastAccessed: new Date(),
      metadata: { score: 0.7, relevance: 0.6 }
    }
  ];

  const handleSearch = async (searchTerm: string = query) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);
    saveSearchHistory(searchTerm);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter results based on search term
    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort by relevance
    const sorted = filtered.sort((a, b) => {
      const aScore = a.metadata?.score || 0;
      const bScore = b.metadata?.score || 0;
      return bScore - aScore;
    });

    setResults(sorted);
    setFilteredResults(sorted);
    setIsLoading(false);
  };

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        const newSelected = checked 
          ? [...filter.selected, value]
          : filter.selected.filter(v => v !== value);
        return { ...filter, selected: newSelected };
      }
      return filter;
    }));
  };

  const applyFilters = () => {
    let filtered = [...results];

    filters.forEach(filter => {
      if (filter.selected.length > 0) {
        filtered = filtered.filter(result => {
          switch (filter.type) {
            case 'category':
              return filter.selected.includes(result.category);
            case 'type':
              return filter.selected.includes(result.type);
            case 'priority':
              return filter.selected.includes(result.priority);
            default:
              return true;
          }
        });
      }
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          const aScore = a.metadata?.score || 0;
          const bScore = b.metadata?.score || 0;
          return bScore - aScore;
        case 'date':
          const aDate = a.lastAccessed?.getTime() || 0;
          const bDate = b.lastAccessed?.getTime() || 0;
          return bDate - aDate;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredResults(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, results]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
    // Navigate to result
    if (result.url) {
      window.location.href = result.url;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'section': return <Grid3X3 size={16} />;
      case 'metric': return <BarChart3 size={16} />;
      case 'property': return <Home size={16} />;
      case 'analysis': return <Brain size={16} />;
      case 'report': return <FileText size={16} />;
      case 'action': return <Zap size={16} />;
      case 'setting': return <Settings size={16} />;
      default: return <Search size={16} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl mx-4 max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Search size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{t('search.title')}</h2>
                    <p className="text-sm opacity-90">{t('search.subtitle')}</p>
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

            {/* Search Input */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:text-white text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-full transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => handleSearch()}
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      showFilters 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                    }`}
                  >
                    <Filter size={16} />
                    <span className="text-sm">{t('search.filters')}</span>
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      showHistory 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                    }`}
                  >
                    <History size={16} />
                    <span className="text-sm">{t('search.history')}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <option value="relevance">{t('search.sortBy.relevance')}</option>
                    <option value="date">{t('search.sortBy.date')}</option>
                    <option value="alphabetical">{t('search.sortBy.alphabetical')}</option>
                    <option value="priority">{t('search.sortBy.priority')}</option>
                  </select>
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                  >
                    {viewMode === 'grid' ? <List size={16} /> : <Grid3X3 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {filters.map(filter => (
                        <div key={filter.id}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {filter.label}
                          </label>
                          <div className="space-y-2">
                            {filter.options.map(option => (
                              <label key={option.value} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={filter.selected.includes(option.value)}
                                  onChange={(e) => handleFilterChange(filter.id, option.value, e.target.checked)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {option.label}
                                  {option.count !== undefined && (
                                    <span className="ml-1 text-gray-500">({option.count})</span>
                                  )}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Panel */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {t('search.recentSearches')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(term);
                            handleSearch(term);
                          }}
                          className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">{t('search.searching')}</span>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t('search.noResults')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('search.noResultsDesc')}
                  </p>
                </div>
              ) : (
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredResults.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleResultClick(result)}
                      className={`p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer ${
                        viewMode === 'list' ? 'flex items-center space-x-4' : ''
                      }`}
                    >
                      <div className={`flex items-center space-x-3 ${
                        viewMode === 'list' ? 'flex-shrink-0' : 'mb-3'
                      }`}>
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <result.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {result.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(result.priority)}`}>
                              {result.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(result.type)}
                              <span>{result.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tag size={12} />
                              <span>{result.category}</span>
                            </div>
                            {result.lastAccessed && (
                              <div className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{result.lastAccessed.toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>{t('search.resultsCount', { count: filteredResults.length })}</span>
                  <span>•</span>
                  <span>{t('search.totalResults', { count: results.length })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">⌘K</kbd>
                  <span>{t('search.shortcut')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearch;

