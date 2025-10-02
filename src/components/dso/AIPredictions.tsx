'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Home,
  Users,
  Shield,
  Zap,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  RefreshCw,
  Download,
  Share2,
  Bookmark,
  Eye,
  EyeOff
} from 'lucide-react';

interface AIPrediction {
  id: string;
  type: 'investment' | 'market' | 'lifestyle' | 'risk' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
  probability: number;
  recommendation: string;
  reasoning: string[];
  metrics: {
    current: number;
    predicted: number;
    change: number;
  };
  tags: string[];
  createdAt: Date;
  expiresAt: Date;
}

interface AIPredictionsProps {
  userId: string;
  analysis: any;
}

const AIPredictions: React.FC<AIPredictionsProps> = ({ userId, analysis }) => {
  const { t } = useLanguage();
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'investment' | 'market' | 'lifestyle' | 'risk'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  // Generar predicciones de IA
  useEffect(() => {
    const generatePredictions = (): AIPrediction[] => {
      return [
        {
          id: '1',
          type: 'investment',
          title: t('predictions.portfolioOptimization'),
          description: t('predictions.conservativeProfile'),
          confidence: 87,
          timeframe: t('predictions.timeframe.days'),
          impact: 'high',
          probability: 85,
          recommendation: t('recommendations.traditionalJapaneseProperties'),
          reasoning: [
            t('predictions.stableInvestments'),
            t('predictions.traditionalMarket'),
            t('predictions.onsenValue'),
            t('predictions.touristDemand')
          ],
          metrics: {
            current: analysis.investmentReadiness.score,
            predicted: Math.min(100, analysis.investmentReadiness.score + 15),
            change: 15
          },
          tags: [t('predictions.tags.investment'), t('predictions.tags.traditionalProperties'), t('predictions.tags.onsen'), t('predictions.tags.roi')],
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          type: 'market',
          title: t('predictions.regionalMarketTrend'),
          description: t('predictions.gunmaPrices'),
          confidence: 92,
          timeframe: t('predictions.timeframe.months'),
          impact: 'medium',
          probability: 78,
          recommendation: t('predictions.optimalInvestment'),
          reasoning: [
            t('predictions.sustainedGrowth'),
            'Aumento de la demanda por propiedades rurales',
            t('predictions.favorablePolicies'),
            'Mejora en infraestructura de transporte'
          ],
          metrics: {
            current: 2.3,
            predicted: 2.8,
            change: 0.5
          },
          tags: [t('predictions.tags.market'), t('predictions.tags.gunma'), t('predictions.tags.prices'), t('predictions.tags.growth')],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          type: 'lifestyle',
          title: t('predictions.culturalAdaptation'),
          description: t('predictions.highAdaptation'),
          confidence: 79,
          timeframe: '12 meses',
          impact: 'high',
          probability: 82,
          recommendation: t('predictions.focusLearning'),
          reasoning: [
            'Tu experiencia previa en culturas diferentes',
            t('predictions.traditionInterest'),
            'Flexibilidad en preferencias de estilo de vida',
            t('predictions.communityIntegration')
          ],
          metrics: {
            current: analysis.lifestyleAlignment.score,
            predicted: Math.min(100, analysis.lifestyleAlignment.score + 12),
            change: 12
          },
          tags: [t('predictions.tags.culture'), t('predictions.tags.adaptation'), t('predictions.tags.community'), t('predictions.tags.integration')],
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        {
          id: '4',
          type: 'risk',
          title: t('predictions.dynamicRisk'),
          description: t('predictions.riskAnalysis'),
          confidence: 85,
          timeframe: 'Continuo',
          impact: 'medium',
          probability: 90,
          recommendation: t('predictions.emergencyFund'),
          reasoning: [
            'Estabilidad financiera demostrada',
            'Experiencia limitada en cultura japonesa',
            t('predictions.limitedSupport'),
            t('predictions.englishDependency')
          ],
          metrics: {
            current: 35,
            predicted: 25,
            change: -10
          },
          tags: [t('predictions.tags.risk'), t('predictions.tags.financial'), t('predictions.tags.cultural'), t('predictions.tags.mitigation')],
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        },
        {
          id: '5',
          type: 'opportunity',
          title: t('predictions.emergingOpportunity'),
          description: t('predictions.newDevelopmentZone'),
          confidence: 76,
          timeframe: '18 meses',
          impact: 'high',
          probability: 68,
          recommendation: 'Investiga propiedades en la zona de desarrollo temprano para obtener mejores precios.',
          reasoning: [
            'Nuevo proyecto de infraestructura anunciado',
            'Aumento en turismo de salud y bienestar',
            t('predictions.improvedTransport'),
            'Desarrollo de servicios comerciales'
          ],
          metrics: {
            current: 0,
            predicted: 25,
            change: 25
          },
          tags: [t('predictions.tags.opportunity'), t('predictions.tags.kusatsu'), t('predictions.tags.development'), t('predictions.tags.growth')],
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          expiresAt: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    setPredictions(generatePredictions());
  }, [analysis]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'investment': return <DollarSign className="w-5 h-5" />;
      case 'market': return <TrendingUp className="w-5 h-5" />;
      case 'lifestyle': return <Home className="w-5 h-5" />;
      case 'risk': return <Shield className="w-5 h-5" />;
      case 'opportunity': return <Target className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investment': return 'bg-green-100 text-green-700 border-green-200';
      case 'market': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'lifestyle': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'risk': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'opportunity': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const generateNewPrediction = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPrediction: AIPrediction = {
        id: Date.now().toString(),
        type: 'investment',
        title: t('predictions.newPrediction'),
        description: t('predictions.updatedAnalysis'),
        confidence: Math.floor(Math.random() * 20) + 75,
        timeframe: '15 días',
        impact: 'medium',
        probability: Math.floor(Math.random() * 30) + 60,
        recommendation: t('predictions.continueMonitoring'),
        reasoning: [t('predictions.updatedData'), t('predictions.emergingTrends'), t('predictions.behaviorAnalysis')],
        metrics: {
          current: analysis.investmentReadiness.score,
          predicted: Math.min(100, analysis.investmentReadiness.score + Math.floor(Math.random() * 10)),
          change: Math.floor(Math.random() * 10)
        },
        tags: [t('predictions.tags.update'), t('predictions.tags.market'), t('predictions.tags.optimization')],
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      };
      setPredictions(prev => [newPrediction, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const filteredPredictions = predictions.filter(prediction => {
    if (!showExpired && prediction.expiresAt < new Date()) return false;
    if (activeTab === 'all') return true;
    return prediction.type === activeTab;
  });

  const tabs = [
    { id: 'all', label: t('predictions.filters.all'), count: filteredPredictions.length },
    { id: 'investment', label: t('predictions.filters.investment'), count: predictions.filter(p => p.type === 'investment' && (!showExpired || p.expiresAt >= new Date())).length },
    { id: 'market', label: t('predictions.filters.market'), count: predictions.filter(p => p.type === 'market' && (!showExpired || p.expiresAt >= new Date())).length },
    { id: 'lifestyle', label: t('predictions.filters.lifestyle'), count: predictions.filter(p => p.type === 'lifestyle' && (!showExpired || p.expiresAt >= new Date())).length },
    { id: 'risk', label: t('predictions.filters.risk'), count: predictions.filter(p => p.type === 'risk' && (!showExpired || p.expiresAt >= new Date())).length }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('predictions.title')}</h3>
              <p className="text-sm text-gray-500">{t('predictions.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Expired Toggle */}
            <button
              onClick={() => setShowExpired(!showExpired)}
              className={`p-2 rounded-lg transition-colors ${
                showExpired 
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
            </button>
            
            {/* Generate New */}
            <button
              onClick={generateNewPrediction}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span className="text-sm">
                {isGenerating ? t('export.generating') : t('predictions.generateNew')}
              </span>
            </button>
            
            {/* Export */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">{t('predictions.export')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-purple-200' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div className="p-6">
        <AnimatePresence>
          {filteredPredictions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay predicciones disponibles</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(prediction.type)}`}>
                        {getTypeIcon(prediction.type)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{prediction.title}</h4>
                        <p className="text-sm text-gray-600">{prediction.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                        {prediction.impact === 'high' ? t('predictions.highImpact') :
                         prediction.impact === 'medium' ? t('predictions.mediumImpact') : t('predictions.lowImpact')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {prediction.timeframe}
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{t('predictions.confidence')}</span>
                        <span className="text-sm font-medium text-gray-900">{prediction.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{t('predictions.probability')}</span>
                        <span className="text-sm font-medium text-gray-900">{prediction.probability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${prediction.probability}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{t('predictions.predictedChange')}</span>
                        <span className={`text-sm font-medium ${
                          prediction.metrics.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {prediction.metrics.change > 0 ? '+' : ''}{prediction.metrics.change}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            prediction.metrics.change > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.abs(prediction.metrics.change)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-900 mb-1">{t('predictions.recommendation')}</h5>
                        <p className="text-sm text-blue-800">{prediction.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">{t('predictions.reasoning')}</h5>
                    <ul className="space-y-1">
                      {prediction.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {prediction.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIPredictions;
