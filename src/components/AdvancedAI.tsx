'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  Users,
  Calendar,
  MapPin,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
  Settings,
  Download,
  Share2,
  Filter,
  Search,
  X,
  Plus,
  Info,
  Lightbulb,
  Rocket,
  Crown,
  Sparkles,
  Shield,
  Globe,
  Layers,
  Cpu,
  Database,
  Network,
  Cloud,
  CloudRain,
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';

interface AIPrediction {
  id: string;
  type: 'investment' | 'market' | 'risk' | 'opportunity' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long';
  category: string;
  tags: string[];
  data: {
    current: number;
    predicted: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    factors: string[];
    risks: string[];
    opportunities: string[];
  };
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  accuracy?: number;
  lastUpdated: Date;
}

interface AdvancedAIProps {
  isOpen: boolean;
  onClose: () => void;
  onPredictionSelect: (prediction: AIPrediction) => void;
}

const AdvancedAI: React.FC<AdvancedAIProps> = ({ isOpen, onClose, onPredictionSelect }) => {
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [filteredPredictions, setFilteredPredictions] = useState<AIPrediction[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'confidence' | 'probability' | 'impact' | 'recent'>('confidence');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedPrediction, setSelectedPrediction] = useState<AIPrediction | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Generar predicciones simuladas avanzadas
  const generateAdvancedPredictions = (): AIPrediction[] => {
    const now = new Date();
    return [
      {
        id: 'pred-1',
        type: 'investment',
        title: 'Optimización de Portfolio Kusatsu',
        description: 'Predicción de aumento del 18% en ROI para propiedades tradicionales en Kusatsu',
        confidence: 94,
        probability: 87,
        impact: 'high',
        timeframe: 'medium',
        category: 'Inversión',
        tags: ['kusatsu', 'tradicional', 'roi', 'optimización'],
        data: {
          current: 12.5,
          predicted: 14.8,
          change: 18.4,
          trend: 'up',
          factors: [
            'Aumento en turismo termal',
            'Políticas gubernamentales favorables',
            'Demanda creciente de propiedades tradicionales',
            'Mejora en infraestructura local'
          ],
          risks: [
            'Posible regulación más estricta',
            'Competencia de nuevos desarrollos',
            'Cambios en preferencias turísticas'
          ],
          opportunities: [
            'Expansión de servicios termales',
            'Desarrollo de turismo cultural',
            'Inversión en renovación histórica'
          ]
        },
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 92,
        lastUpdated: new Date(now.getTime() - 30 * 60 * 1000)
      },
      {
        id: 'pred-2',
        type: 'market',
        title: 'Tendencia Regional Gunma',
        description: 'Análisis predictivo de crecimiento sostenido en precios inmobiliarios',
        confidence: 89,
        probability: 82,
        impact: 'high',
        timeframe: 'long',
        category: 'Mercado',
        tags: ['gunma', 'regional', 'crecimiento', 'sostenido'],
        data: {
          current: 2.3,
          predicted: 3.1,
          change: 34.8,
          trend: 'up',
          factors: [
            'Desarrollo de infraestructura de transporte',
            'Políticas de descentralización',
            'Aumento en población trabajadora remota',
            'Inversión en tecnología local'
          ],
          risks: [
            'Posible recesión económica',
            'Cambios en políticas migratorias',
            'Competencia de otras prefecturas'
          ],
          opportunities: [
            'Desarrollo de ciudades inteligentes',
            'Expansión de servicios digitales',
            'Atracción de talento internacional'
          ]
        },
        createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 88,
        lastUpdated: new Date(now.getTime() - 1 * 60 * 60 * 1000)
      },
      {
        id: 'pred-3',
        type: 'risk',
        title: 'Análisis de Riesgo Climático',
        description: 'Evaluación de impacto de eventos climáticos en propiedades costeras',
        confidence: 76,
        probability: 23,
        impact: 'medium',
        timeframe: 'short',
        category: 'Riesgo',
        tags: ['clima', 'costa', 'riesgo', 'evaluación'],
        data: {
          current: 15,
          predicted: 18,
          change: 20,
          trend: 'up',
          factors: [
            'Aumento en frecuencia de tifones',
            'Rise en nivel del mar',
            'Cambios en patrones climáticos',
            'Vulnerabilidad de infraestructura costera'
          ],
          risks: [
            'Daños por inundaciones',
            'Pérdida de valor de propiedades',
            'Aumento en costos de seguros',
            'Dificultad en acceso a financiamiento'
          ],
          opportunities: [
            'Inversión en propiedades elevadas',
            'Desarrollo de infraestructura resiliente',
            'Seguros especializados',
            'Tecnologías de mitigación'
          ]
        },
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 74,
        lastUpdated: new Date(now.getTime() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'pred-4',
        type: 'opportunity',
        title: 'Nueva Zona de Desarrollo',
        description: 'Identificación de área emergente con potencial de crecimiento del 25%',
        confidence: 91,
        probability: 78,
        impact: 'high',
        timeframe: 'medium',
        category: 'Oportunidad',
        tags: ['emergente', 'desarrollo', 'crecimiento', 'potencial'],
        data: {
          current: 8.2,
          predicted: 10.3,
          change: 25.6,
          trend: 'up',
          factors: [
            'Nuevas líneas de transporte público',
            'Planes de desarrollo urbano',
            'Inversión en servicios públicos',
            'Atracción de empresas tecnológicas'
          ],
          risks: [
            'Retrasos en proyectos de infraestructura',
            'Cambios en planes gubernamentales',
            'Competencia de desarrolladores'
          ],
          opportunities: [
            'Desarrollo de vivienda asequible',
            'Centros comerciales y servicios',
            'Espacios de coworking',
            'Servicios de entretenimiento'
          ]
        },
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 89,
        lastUpdated: new Date(now.getTime() - 15 * 60 * 1000)
      },
      {
        id: 'pred-5',
        type: 'trend',
        title: 'Evolución de Preferencias',
        description: 'Cambio hacia propiedades sostenibles y eco-friendly',
        confidence: 85,
        probability: 71,
        impact: 'medium',
        timeframe: 'long',
        category: 'Tendencia',
        tags: ['sostenible', 'eco-friendly', 'preferencias', 'evolución'],
        data: {
          current: 35,
          predicted: 52,
          change: 48.6,
          trend: 'up',
          factors: [
            'Mayor conciencia ambiental',
            'Incentivos gubernamentales',
            'Ahorro en costos operativos',
            'Valorización de propiedades verdes'
          ],
          risks: [
            'Mayores costos iniciales',
            'Regulaciones más estrictas',
            'Cambios en preferencias del mercado'
          ],
          opportunities: [
            'Certificaciones LEED',
            'Tecnologías de eficiencia energética',
            'Materiales sostenibles',
            'Servicios de consultoría verde'
          ]
        },
        createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 83,
        lastUpdated: new Date(now.getTime() - 3 * 60 * 60 * 1000)
      },
      {
        id: 'pred-6',
        type: 'recommendation',
        title: 'Estrategia de Diversificación',
        description: 'Recomendación de distribución óptima de portfolio por regiones',
        confidence: 88,
        probability: 84,
        impact: 'high',
        timeframe: 'medium',
        category: 'Recomendación',
        tags: ['diversificación', 'portfolio', 'regiones', 'estrategia'],
        data: {
          current: 65,
          predicted: 78,
          change: 20,
          trend: 'up',
          factors: [
            'Análisis de correlación entre regiones',
            'Evaluación de riesgo-rendimiento',
            'Tendencias demográficas',
            'Factores macroeconómicos'
          ],
          risks: [
            'Correlación inesperada entre mercados',
            'Cambios en políticas regionales',
            'Eventos sistémicos'
          ],
          opportunities: [
            'Reducción de riesgo total',
            'Optimización de rendimientos',
            'Acceso a mercados emergentes',
            'Hedging natural'
          ]
        },
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
        accuracy: 86,
        lastUpdated: new Date(now.getTime() - 45 * 60 * 1000)
      }
    ];
  };

  useEffect(() => {
    setPredictions(generateAdvancedPredictions());
  }, []);

  useEffect(() => {
    let filtered = [...predictions];

    // Filtrar por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filtrar por timeframe
    if (selectedTimeframe !== 'all') {
      filtered = filtered.filter(p => p.timeframe === selectedTimeframe);
    }

    // Filtrar por impacto
    if (selectedImpact !== 'all') {
      filtered = filtered.filter(p => p.impact === selectedImpact);
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Ordenar
    switch (sortBy) {
      case 'probability':
        filtered.sort((a, b) => b.probability - a.probability);
        break;
      case 'impact':
        const impactOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => impactOrder[b.impact] - impactOrder[a.impact]);
        break;
      case 'recent':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'confidence':
      default:
        filtered.sort((a, b) => b.confidence - a.confidence);
        break;
    }

    setFilteredPredictions(filtered);
  }, [predictions, selectedType, selectedTimeframe, selectedImpact, searchQuery, sortBy]);

  const runAdvancedAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simular análisis progresivo
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Generar nueva predicción
          const newPrediction = generateAdvancedPredictions()[0];
          setPredictions(prev => [newPrediction, ...prev]);
          
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'investment': return TrendingUp;
      case 'market': return BarChart3;
      case 'risk': return AlertTriangle;
      case 'opportunity': return Target;
      case 'trend': return Activity;
      case 'recommendation': return Lightbulb;
      default: return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investment': return 'bg-green-100 text-green-800';
      case 'market': return 'bg-blue-100 text-blue-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'opportunity': return 'bg-yellow-100 text-yellow-800';
      case 'trend': return 'bg-purple-100 text-purple-800';
      case 'recommendation': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'short': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'long': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      case 'stable': return Minus;
      default: return Minus;
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
              <Brain className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">IA Avanzada</h2>
              <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                {filteredPredictions.length} predicciones
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
              <div className="flex space-x-1">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'investment', label: 'Inversión' },
                  { id: 'market', label: 'Mercado' },
                  { id: 'risk', label: 'Riesgo' },
                  { id: 'opportunity', label: 'Oportunidad' },
                  { id: 'trend', label: 'Tendencia' },
                  { id: 'recommendation', label: 'Recomendación' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedType(filter.id)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedType === filter.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="confidence">Confianza</option>
                <option value="probability">Probabilidad</option>
                <option value="impact">Impacto</option>
                <option value="recent">Reciente</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={runAdvancedAnalysis}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analizando...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Nuevo Análisis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isAnalyzing && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Ejecutando análisis avanzado...</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Predictions List */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPredictions.map((prediction) => {
                  const TypeIcon = getTypeIcon(prediction.type);
                  const TrendIcon = getTrendIcon(prediction.data.trend);
                  
                  return (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedPrediction(prediction);
                        setShowDetails(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(prediction.type)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(prediction.type)}`}>
                                {prediction.category}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(prediction.impact)}`}>
                                {prediction.impact}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getTimeframeColor(prediction.timeframe)}`}>
                                {prediction.timeframe}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <TrendIcon className={`w-4 h-4 ${
                            prediction.data.trend === 'up' ? 'text-green-600' :
                            prediction.data.trend === 'down' ? 'text-red-600' :
                            'text-gray-600'
                          }`} />
                          <span className="text-sm font-medium text-gray-600">
                            {prediction.data.change > 0 ? '+' : ''}{prediction.data.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">{prediction.description}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{prediction.confidence}%</div>
                          <div className="text-xs text-gray-500">Confianza</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{prediction.probability}%</div>
                          <div className="text-xs text-gray-500">Probabilidad</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{prediction.accuracy}%</div>
                          <div className="text-xs text-gray-500">Precisión</div>
                        </div>
                      </div>

                      {/* Data Preview */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Valor Actual:</span>
                          <span className="font-medium">{prediction.data.current}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Predicción:</span>
                          <span className="font-medium">{prediction.data.predicted}%</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {prediction.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {prediction.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{prediction.tags.length - 3} más
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Actualizado: {prediction.lastUpdated.toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Expira: {prediction.expiresAt.toLocaleDateString()}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Details Panel */}
            {showDetails && selectedPrediction && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-96 border-l border-gray-200 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalles</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Factors */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Factores Positivos</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedPrediction.data.factors.map((factor, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risks */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Riesgos Identificados</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedPrediction.data.risks.map((risk, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>Oportunidades</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedPrediction.data.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onPredictionSelect(selectedPrediction)}
                        className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Usar Predicción
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Share2 className="w-4 h-4" />
                      </button>
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
              IA Avanzada v2.0 - Machine Learning & Predictive Analytics
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Procesando en tiempo real</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedAI;
